import fs from 'fs'
import readline from 'readline'
import getLineBreak from './get-line-break.js'

export default (filePath) => {
  return new Promise(async (resolve, reject) => {
    const lineBreakSize = (await getLineBreak(filePath)).length
    const index = []
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' })

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    })

    let start = 0

    rl.on('line', (line) => {
      const len = Buffer.from(line).length
      index.push({ start, len })
      start += len + lineBreakSize
    })

    rl.on('close', () => {
      resolve(index)
    })

    readStream.on('error', (err) => {
      reject(err)
    })
  })
}
