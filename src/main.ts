import '@fontsource/arvo/400.css'
import '@fontsource/caveat/500.css'
import './normalize.css'
import './style.css'
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

const templates = Object.keys(sayings)
const nounList = [...new Set(Object.values(sayings).flat())]

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function generateIdiom(): string {
  // `_s` is a plural slot, `_` a singular one (`_'s` stays possessive)
  const idiom = randomItem(templates).replace(/_(s\b)?/g, (_, plural) => {
    const noun = randomItem(nounList)
    return plural ? pluralize(noun) : noun
  })

  return correctGrammar(idiom)
}

function setIdiom(): void {
  const sayingElement = document.getElementById('idiom')
  if (sayingElement) sayingElement.textContent = generateIdiom()
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
