import fs from 'fs'
import generatePermutation from './generate-permutation.js'
import buildIndex from './build-index.js'
import readLineByIndex from './read-line-by-index.js'
import getDateFormatted from './get-date-formatted.js'

const filePath = 'test.txt'
const generateAdditionalFiles = false

console.log('Building Index...')
const index = await buildIndex(filePath)
const lineCount = index.length

console.log('Generating Permutation...')
const permutation = generatePermutation(lineCount)

const buildPath = `${getDateFormatted()}`
fs.mkdirSync(buildPath)

if (generateAdditionalFiles) {
  fs.writeFileSync(`${buildPath}/permutation.json`, JSON.stringify(permutation))
  fs.writeFileSync(`${buildPath}/index.txt`, index.map(({start, len}) => `${start} ${len}`).join('\n'))
}

let progress = 0
const writeStream = fs.createWriteStream(`${buildPath}/shuffled-${filePath}`)

for (const i of permutation) {
  if (progress % 10000 == 0) {
    console.log(`Building Shuffled File... ${(progress/lineCount * 100).toFixed(2)}%`)
  }
  writeStream.write(await readLineByIndex(filePath, index, i))
  progress++
}

writeStream.end()
console.log('Done :D')