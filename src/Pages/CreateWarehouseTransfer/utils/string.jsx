class STRING_UTILS {
  getFirstLetters(str) {
    const firstLetters = str
      .split(' ')
      .map(word => word[0])
      .join('')

    return this.removeAcent(firstLetters)
  }

  removeAcent(str, opt) {
    const AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ]
    for (let i = 0; i < AccentsMap.length; i++) {
      const re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g')
      const char = AccentsMap[i][0]
      str = str.replace(re, char)
    }
    return opt?.keepCapital ? str : str.toLowerCase()
  }

  formatOrderCode(s) {
    let str = s
    str = str.replace(/`/g, '')
    str = str.replace(/~/g, '')
    str = str.replace(/!/g, '')
    str = str.replace(/@/g, '')
    str = str.replace(/#/g, '')
    str = str.replace(/\$/g, '')
    str = str.replace(/%/g, '')
    str = str.replace(/\^/g, '')
    str = str.replace(/&/g, '')
    str = str.replace(/\*/g, '')
    str = str.replace(/\(/g, '')
    str = str.replace(/\)/g, '')
    str = str.replace(/-/g, '')
    str = str.replace(/[=]/g, '')
    str = str.replace(/\+/g, '')
    str = str.replace(/\[/g, '')
    str = str.replace(/\]/g, '')
    str = str.replace(/{/g, '')
    str = str.replace(/}/g, '')
    str = str.replace(/\\/g, '')
    str = str.replace(/\|/g, '')
    str = str.replace(/;/g, '')
    str = str.replace(/:/g, '')
    str = str.replace(/'/g, '')
    str = str.replace(/"/g, '')
    str = str.replace(/,/g, '')
    str = str.replace(/</g, '')
    str = str.replace(/\./g, '')
    str = str.replace(/>/g, '')
    str = str.replace(/\//g, '')
    str = str.replace(/\?/g, '')
    str = str.replace(/ /g, '')
    const returnValue = this.removeAcent(str, {keepCapital: true})
    return returnValue
  }
}

const StringUtils = new STRING_UTILS()

export default StringUtils
