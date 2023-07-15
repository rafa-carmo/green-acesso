export async function filter(page: string) {
  const lines = page.split('\n')
  const index = lines.indexOf('Pagador')

  if (index === -1) {
    return null
  }
  const clientLine = lines[index + 1].split('-')
  const payer = clientLine[0].trim()
  const lote = clientLine[1].replace('lote: ', '').trim()

  return { payer, lote }
}
