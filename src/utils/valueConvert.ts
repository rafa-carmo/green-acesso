export function convertToCurrency(value: number) {
  let valueToConvert = 0
  if (!isNaN(value)) {
    valueToConvert = value
  }

  const formated = new Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueToConvert)

  return formated
}
