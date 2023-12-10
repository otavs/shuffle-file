import fs from 'fs'

// const n = 10000000
const n = 1000
const fileName = 'test.txt'

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const writeStream = fs.createWriteStream(fileName)
for (let i = 0; i < n; i++) {
  // writeStream.write(String(i).padStart(Math.ceil(Math.log10(n)), '0') + '-' + repeat(chars[i % chars.length], 100) + '\n')
  writeStream.write(repeat(Math.random(), 5) + '\n')
}
writeStream.end()

function repeat(x, n) {
  let str = ''
  for (let i = 0; i < n; i++) {
    str += `${x}`
  }
  return str
}