export function simpleFormatDate() {
  const date = new Date(Date.now())

  return date.toLocaleDateString('pt-br', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
