import fs from 'fs'
import readline from 'readline'

export default (filePath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    })

    let lineCount = 0

    rl.on('line', () => {
      lineCount++
    })

    rl.on('close', () => {
      resolve(lineCount)
    })

    rl.on('error', (err) => {
      reject(err)
    })
  })
}
