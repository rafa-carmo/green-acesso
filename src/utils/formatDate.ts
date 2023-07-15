export function simpleFormatDate() {
  const date = new Date(Date.now())
  const day = date.getDay().toString().padStart(2, '0')
  const month = date.getMonth().toString().padStart(2, '0')
  const year = date.getFullYear()
  const hour = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return [day, month, year, hour, minutes].join('-')
}
