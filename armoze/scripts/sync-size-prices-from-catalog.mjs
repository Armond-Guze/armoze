import {readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..', '..')
const targetCatalog = JSON.parse(
  readFileSync(path.join(projectRoot, 'src/data/catalog.json'), 'utf8'),
)
const shouldApply = process.argv.includes('--apply')
const client = getCliClient({apiVersion: '2025-05-21'}).withConfig({
  perspective: 'raw',
  useCdn: false,
})

function formatMoney(cents) {
  return `$${(Number(cents || 0) / 100).toFixed(2)}`
}

function syncPreset(presetName, options = []) {
  const targets = targetCatalog.sizePresets?.[presetName] || []

  return options.map((option, index) => {
    const target =
      targets.find(
        (candidate) => candidate.id === option.id || candidate.label === option.label,
      ) || targets[index]

    return target ? {...option, priceInCents: target.priceInCents} : option
  })
}

const documents = await client.fetch(`*[
  _type == "catalogSettings" &&
  _id in ["catalogSettings.default", "drafts.catalogSettings.default"]
]{_id, sizePresets}`)

if (!documents.length) {
  throw new Error('No Sanity catalog settings document was found.')
}

let transaction = client.transaction()
let changedDocumentCount = 0

for (const document of documents) {
  const nextSizePresets = Object.fromEntries(
    Object.entries(document.sizePresets || {}).map(([presetName, options]) => [
      presetName,
      syncPreset(presetName, options),
    ]),
  )
  let changed = false

  console.log(`\n${document._id}`)
  for (const [presetName, options] of Object.entries(document.sizePresets || {})) {
    options.forEach((option, index) => {
      const nextOption = nextSizePresets[presetName][index]
      if (option.priceInCents !== nextOption.priceInCents) {
        changed = true
        console.log(
          `  ${presetName}/${option.label}: ${formatMoney(option.priceInCents)} -> ${formatMoney(nextOption.priceInCents)}`,
        )
      }
    })
  }

  if (changed) {
    changedDocumentCount += 1
    transaction = transaction.patch(document._id, {set: {sizePresets: nextSizePresets}})
  }
}

if (!changedDocumentCount) {
  console.log('\nSanity prices already match the storefront catalog.')
} else if (!shouldApply) {
  console.log(`\nDry run: ${changedDocumentCount} document(s) need an update.`)
} else {
  const result = await transaction.commit({visibility: 'sync'})
  console.log(`\nUpdated ${changedDocumentCount} document(s) in ${result.transactionId}.`)
}
