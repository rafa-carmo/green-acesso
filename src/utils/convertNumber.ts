export function convertToNumberIfPossible(value?: number) {
  return !isNaN(value!) ? Number(value) : value
}
