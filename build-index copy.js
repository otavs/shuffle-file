import fs from 'fs'

export default (filePath) => {
  const index = []

  return new Promise((resolve, reject) => {
    let start = 0
    let len = 0
    let previousChar = ''

    const stream = fs.createReadStream(filePath, { encoding: 'utf8' })

    stream.on('data', (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        len += Buffer.from(chunk[i], 'utf8').length
        if (chunk[i] === '\n') {
          if (previousChar != '\r') {
            index.push({ start, len: len - 1 })
          } else {
            index.push({ start, len: len - 2 })
          }
          start += len
          len = 0
        }
        previousChar = chunk[i]
      }
    })

    stream.on('end', () => {
      if (len > 0) {
        index.push({ start, len })
      }
      resolve(index)
    })

    stream.on('error', (err) => {
      reject(err)
    })
  })
}
