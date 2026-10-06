// Editorial copy shown under each collection grid (and mirrored as FAQPage
// structured data). Keep claims limited to what the store already states:
// made-to-order canvas prints, free U.S. shipping, 30-day returns.
const shared = {
  shipping: {
    question: 'Do you offer free shipping and returns?',
    answer:
      'Yes. Armoze ships to the U.S. for free, and every print can be returned within 30 days of delivery. Each canvas is made to order, so production starts after you check out.',
  },
};

export const collectionContent = {
  'best-sellers': {
    heading: 'Our best selling motivational canvas prints',
    paragraphs: [
      'These are the Armoze prints customers order most often. Each one is a made-to-order canvas print with a single short message, so it reads clearly from across a room and still looks like art rather than a poster.',
      'Best sellers tend to work in almost any space: above a desk, across from a bed, or in a hallway you walk through every day. If you are unsure where to start, begin here and then browse the money, music, and study collections for a more specific theme.',
    ],
    faqs: [
      {
        question: 'What are the most popular Armoze canvas prints?',
        answer:
          'The best sellers collection lists the prints customers order most, and it is updated as new orders come in. Prints about money, focus, and keeping going are the most common picks.',
      },
      {
        question: 'Which room is a motivational canvas best for?',
        answer:
          'Offices and bedrooms are the most common, because you see the print every day. Studios, dorm rooms, and home gyms also work well. Pick a message you want to be reminded of daily.',
      },
      shared.shipping,
    ],
  },
  'new-arrivals': {
    heading: 'New motivational canvas prints',
    paragraphs: [
      'New arrivals are the newest additions to the Armoze catalog. We add prints as they are finished, so the collection changes often.',
      'If you are building a gallery wall, new releases are a good way to add a fresh message next to a print you already own. Every canvas is made to order, so nothing sits in a warehouse waiting for you.',
    ],
    faqs: [
      {
        question: 'How often does Armoze release new prints?',
        answer:
          'New designs are added as they are completed. Check this page for the latest releases, or join the email list to hear about them first.',
      },
      shared.shipping,
    ],
  },
  'money-ambition': {
    heading: 'Money wall art and ambition canvas prints',
    paragraphs: [
      'Money mindset art keeps your financial goals in front of you. These canvas prints put short, direct messages about income, investing, risk, and discipline on your wall, in a home office, a studio, or a room where you plan your next move.',
      'Entrepreneurs and side hustlers often hang one print at eye level above a desk, so it is in view during work. Others choose a larger canvas for an empty wall to set the tone of the whole room.',
      'Looking for something for a specific space? See our entrepreneur wall art and office motivation collections.',
    ],
    faqs: [
      {
        question: 'What is money wall art?',
        answer:
          'Money wall art is decor built around messages about wealth, ambition, investing, and discipline. It is popular in home offices, studios, and rooms where people work on their goals.',
      },
      {
        question: 'Where should I hang a money mindset canvas?',
        answer:
          'Hang it where you will see it during the work it is meant to support: above a desk, beside a monitor, or on the wall you face when you start your day.',
      },
      shared.shipping,
    ],
  },
  music: {
    heading: 'Music wall art and retro cassette canvas prints',
    paragraphs: [
      'Cassette tapes, mixtapes, and record-era graphics for people who love music. These canvas prints suit studios, listening rooms, bedrooms, and rec rooms.',
      'The retro look pairs well with warm lighting and shelves of records or books. Hang one print alone, or place two or three together for a small gallery wall.',
    ],
    faqs: [
      {
        question: 'What rooms suit retro cassette wall art?',
        answer:
          'Music studios, listening rooms, bedrooms, rec rooms, and creative workspaces. The designs are bold enough to anchor a wall on their own.',
      },
      {
        question: 'Are these prints printed on canvas?',
        answer:
          'Yes. Armoze prints are made to order on canvas, so the artwork arrives ready to display.',
      },
      shared.shipping,
    ],
  },
  'study-creative': {
    heading: 'Canvas prints for study rooms and creative workspaces',
    paragraphs: [
      'Clean, quiet designs for the rooms where focused work happens: study rooms, reading corners, writing desks, libraries, and creative studios.',
      'A print in your line of sight helps you start and keep going. Students and writers often pick a short reminder about showing up, learning, or finishing what they began.',
    ],
    faqs: [
      {
        question: 'What art works well in a study room?',
        answer:
          'Simple, uncluttered designs with a single clear message. They add personality without distracting from the work in front of you.',
      },
      shared.shipping,
    ],
  },
  'office-motivation-wall-art': {
    heading: 'Choosing motivational wall art for your office',
    paragraphs: [
      'The best office art is something you can read in a second and still find meaningful after a hundred glances. These canvas prints use short, direct messages about focus, discipline, and momentum.',
      'For a home office, hang art at eye level where you look up from your screen. For a shared workspace or studio, choose a larger statement piece for a blank wall and let smaller prints support it.',
    ],
    faqs: [
      {
        question: 'What kind of wall art is best for an office?',
        answer:
          'Choose a message that matches the work you do and a style that fits the room. Minimal designs suit most offices, while bolder prints work in studios and creative spaces.',
      },
      {
        question: 'How high should I hang a canvas in an office?',
        answer:
          'Center it at about eye level, roughly 57 inches from the floor, or slightly higher if it hangs above a desk or monitor.',
      },
      shared.shipping,
    ],
  },
  'dorm-room-motivational-art': {
    heading: 'Motivational art for dorm rooms and student spaces',
    paragraphs: [
      'Dorm walls are small, so one print has to do a lot. These canvas prints bring a clear message and a clean look to a bedroom, a desk area, or a study corner.',
      'Because every Armoze canvas is made to order and ships free in the U.S., they are easy to order ahead of move-in day.',
    ],
    faqs: [
      {
        question: 'Can I hang a canvas print in a dorm?',
        answer:
          'Many students use removable hanging strips for lightweight art. Check your residence hall rules first, since policies vary by school.',
      },
      {
        question: 'What is a good gift for a college student?',
        answer:
          'A motivational canvas is a thoughtful, lasting gift that personalizes a small space.',
      },
      shared.shipping,
    ],
  },
  'entrepreneur-wall-art': {
    heading: 'Wall art for entrepreneurs and builders',
    paragraphs: [
      'Business-minded canvas prints on risk, reward, discipline, and building something of your own. They suit home offices, studios, coworking spaces, and any room where ideas become plans.',
      'Many founders choose a print as a reminder of why they started, and hang it where they will see it on hard days.',
    ],
    faqs: [
      {
        question: 'What is a good gift for an entrepreneur?',
        answer:
          'A canvas that reflects their drive and fits their workspace. Money and discipline themes are the most popular.',
      },
      shared.shipping,
    ],
  },
  'money-mindset-canvas-prints': {
    heading: 'Money mindset canvas prints',
    paragraphs: [
      'Money mindset prints keep your goals around saving, investing, and earning in sight. Each one is a made-to-order canvas with a bold, minimal message.',
      'They fit offices, studios, and bedrooms. For more variety, see the full money wall art and ambition collection.',
    ],
    faqs: [
      {
        question: 'What does money mindset mean?',
        answer:
          'It is the set of beliefs and habits you bring to earning, saving, and investing. Many people use visual reminders to keep those habits on track.',
      },
      shared.shipping,
    ],
  },
};

export function getCollectionContent(slug) {
  return collectionContent[slug] || null;
}
