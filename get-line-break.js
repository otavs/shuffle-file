import fs from 'fs'

export default (filePath) => {
  return new Promise((resolve, reject) => {
    let resolved = false
    let previousChar = ''

    const stream = fs.createReadStream(filePath, { encoding: 'utf8' })

    stream.on('data', (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] == '\n') {
          resolved = true
          if (previousChar == '\r') resolve('\r\n')
          resolve('\n')
        }
        previousChar = chunk[i]
      }
    })

    stream.on('end', () => {
      if (!resolved) resolve('\r\n')
    })

    stream.on('error', (err) => {
      reject(err)
    })
  })
}
