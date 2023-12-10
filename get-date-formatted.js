export default () => {
  const currentDate = new Date()

  let year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()

  let hours = currentDate.getHours()
  let minutes = currentDate.getMinutes()
  let seconds = currentDate.getSeconds()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return year + '-' + month + '-' + day + '_' + hours + '-' + minutes + '-' + seconds
}
