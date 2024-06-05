import {getArrayFromValue} from './array'

export const generateQuery = obj => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(obj)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}

export const joinQueryArrayToString = (arr, {character = ','}) => {
  const arrData = getArrayFromValue(arr)
  return arrData.join(`${character}`)
}

export const removeAcent = str => {
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
    const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
    const char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str.toLowerCase()
}

export const splitDateTimeRangeValue = str => {
  const split = str.split(' - ')
  return {start: split[0] || '', end: split[1] || ''}
}
