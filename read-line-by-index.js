import fs from 'fs'

export default (filePath, index, lineNumber) => {
  return new Promise((resolve, reject) => {
    if (lineNumber < 0 || lineNumber >= index.length) {
      reject(new Error(`Invalid line number: ${lineNumber}`))
    }

    const { start, len } = index[lineNumber]

    const stream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      start,
      end: len != 0 ? start + len : start,
    })

    let line = ''

    stream.on('data', (chunk) => {
      line += chunk
    })

    stream.on('end', () => {
      resolve(line)
    })

    stream.on('error', (err) => {
      reject(err)
    })
  })
}
