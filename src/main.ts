import '@fontsource/arvo/400.css'
import '@fontsource/caveat/500.css'
import pluralize from 'pluralize'

const sayings: Record<string, string[]> = {
  "The _ doesn't fall far from the _": ['apple', 'tree'],
  'The _ is mightier than the _': ['pen', 'sword'],
  'The _ is half full': ['glass'],
  "You can't make an _ without breaking a few _s": ['omelette', 'egg'],
  // "You can lead a _ to _ but you can't make it drink": ['horse', 'water'], /Isn't that funny, difficult grammar
  'The early _ catches the _': ['bird', 'worm'],
  'The _ is in the detail': ['devil'],
  'Kill two _s with one _': ['bird', 'stone'],
  "When the _'s away the _s will play": ['cat', 'mouse'], // This is due to english grammar rules and how I correct for it
  'Curiosity killed the _': ['cat'],
  'As quiet as a _': ['mouse'],
  'The _ is out of the _': ['cat', 'bag'],
  'The proof is in the _': ['pudding'],
  'The _ is greener on the other side': ['grass'],
  "A _ in _'s clothing": ['wolf', 'sheep'],
  '_s in your pants': ['ant'],
  'A little _ told me': ['bird'],
  'The _ in the room': ['elephant'],
  'A wild _ chase': ['goose'],
  'Until the _s come home': ['cow'],
  "It's a _ eat _ world": ['dog', 'dog'],
  'We have bigger _s to fry': ['fish'],
}

const findAndReplace: Record<string, string> = {
  'a grass': 'grass',
}

const emoji: Record<string, string> = {
  apple: '🍎',
  tree: '🌳',
  pen: '🖊️',
  sword: '🗡️',
  glass: '🥛',
  omelette: '🍳',
  egg: '🥚',
  bird: '🐦',
  worm: '🪱',
  devil: '😈',
  stone: '🪨',
  cat: '🐈',
  mouse: '🐁',
  bag: '👜',
  pudding: '🍮',
  grass: '🌱',
  wolf: '🐺',
  sheep: '🐑',
  ant: '🐜',
  elephant: '🐘',
  goose: '🪿',
  cow: '🐄',
  dog: '🐕',
  fish: '🐟',
}

const templates = Object.keys(sayings)
const nounList = [...new Set(Object.values(sayings).flat())]

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function generateIdiom(): [string, string[]] {
  const nouns: string[] = []
  // `_s` is a plural slot, `_` a singular one (`_'s` stays possessive)
  const idiom = randomItem(templates).replace(/_(s\b)?/g, (_, plural) => {
    const noun = randomItem(nounList)
    nouns.push(noun)
    return plural ? pluralize(noun) : noun
  })

  return [correctGrammar(idiom), nouns]
}

const recentIdioms: string[] = []

function setIdiom(): void {
  // Reroll until it's not one of the last 10 shown (the pool is thousands, so this ends fast)
  let idiom: string, nouns: string[]
  do [idiom, nouns] = generateIdiom()
  while (recentIdioms.includes(idiom))
  recentIdioms.push(idiom)
  if (recentIdioms.length > 10) recentIdioms.shift()

  const sayingElement = document.getElementById('idiom')
  if (sayingElement) sayingElement.textContent = idiom

  // Favicon is the emoji of the idiom's first noun, the static png stays as the fallback
  const icon = emoji[nouns[0]]
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!icon || !link) return
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${icon}</text></svg>`
  link.type = 'image/svg+xml'
  link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function correctGrammar(sentence: string): string {
  const words = sentence.split(' ').map((word, i, arr) => {
    // Handle a/an
    if (!/^[Aa]n?$/.test(word)) return word
    const vowel = /^[aeiou]/i.test(arr[i + 1] ?? '')
    const capital = word.charAt(0) === 'A'
    return vowel ? (capital ? 'An' : 'an') : capital ? 'A' : 'a'
  })

  // Capitalize first word and join
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  let result = words.join(' ')

  // Apply find and replace rules
  for (const [key, value] of Object.entries(findAndReplace)) {
    result = result.replace(key, value)
  }

  if (result.trim() !== sentence) {
    console.log(`Corrected grammar from: \n"${sentence}"\n to\n"${result.trim()}"`)
  }

  return `${result.trim()}.`
}

document.getElementById('new-idiom')?.addEventListener('click', setIdiom)
setIdiom()
