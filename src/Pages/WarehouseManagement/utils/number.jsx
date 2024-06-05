class NUMBER_UTILS {
  format2DigitsNumber(n) {
    if (!Number(n) || Number(n) < 0) return '0'
    if (Number(n) < 9) return `0${n}`
    return n
  }
}

const NumberUtils = new NUMBER_UTILS()

export default NumberUtils
