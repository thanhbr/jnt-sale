import {ADDRESS_FILE_READ_CHUNK_SIZE} from './_constants'
import ADDRESS_DATA from './_data.json'

const checkMatchingNames = (
  a, // inputData
  b, // staticData
  type,
) => {
  // 0. Đã tìm kiếm theo thứ tự và IN HOA hoặc không in hoa từ function bên ngoài

  // 1. giống tên 100%
  if (a === b) return true

  // 2. giống tên nhung k co space
  if (['disctrict', 'town'].includes(type) && !/\d/.test(a))
    return a.includes(b)

  // 3. chứa số (vd: quận 10)
  const targetNumber = Number(b)
  if (targetNumber) {
    const numberArr = a.split(' ').map(item => Number(item))
    if (numberArr.includes(targetNumber)) return true
  }

  if (a === getFirstLetter(b)) return true

  // 4. So sánh theo chữ cái đầu tiên ===> cover được cases: sai chính tả, viết tắt, viết thiếu
  if (getFirstLetter(a) === getFirstLetter(b)) return true

  return false
}

const findDistrict = data => {
  const districts = data?.data?.list
  if (!Array.isArray(districts)) return null

  const target = data?.nextFindingTarget

  return findTarget('district', target, districts)
}

const findProvince = data => findTarget('province', data, ADDRESS_DATA)

const findTown = data => {
  const towns = data?.data?.list
  if (!Array.isArray(towns)) return null

  const target = data?.nextFindingTarget

  return findTarget('town', target, towns)
}

const findTarget = (type, target, data) => {
  let find = []
  let groupOrder = []

  target.forEach((item, i) => {
    const formatItem = removeAcent(item).trim()

    const result = data.find(find => {
      const formatName = removeNameAcent(type, find?.name || '')

      return checkMatchingNames(formatItem, formatName, type)
    })

    if (result) {
      groupOrder.push(i)
      find.push(result)
    } else find.push(null)
  })

  return find
    ? find.map((item, i) => ({
        data: item,
        nextFindingTarget: target.filter((filter, j) => j !== groupOrder[i]),
        name: item?.name,
      }))
    : null
}

const getFirstLetter = str => {
  return str
    .split(' ')
    .map(word => word[0])
    .join('')
}

const removeAcent = str => {
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

const removeNameAcent = (type, str) => {
  let result = str

  switch (type) {
    case 'province':
      result = str.replace(/Thành phố/g, '').replace(/Tỉnh/g, '')
      break

    case 'district':
      result = str
        .replace(/Huyện/g, '')
        .replace(/Quận/g, '')
        .replace(/Thành phố/g, '')
        .replace(/Thị xã/g, '')
      break

    case 'town':
      result = str
        .replace(/Phường/g, '')
        .replace(/Thị trấn/g, '')
        .replace(/Xã/g, '')
      break

    default:
      break
  }

  return removeAcent(result.trim())
}

export const sliceIntoChunks = arr => {
  const res = []
  for (let i = 0; i < arr.length; i += ADDRESS_FILE_READ_CHUNK_SIZE) {
    const chunk = arr.slice(i, i + ADDRESS_FILE_READ_CHUNK_SIZE)
    res.push(chunk)
  }
  return res
}

export const splitAddress = data => {
  const rexString =
    typeof data === 'string' || data instanceof String
      ? data.replace(/,|;/g, ';')
      : data
  const group = rexString.split(';').reverse()

  let province = null,
    district = null,
    town = null

  const provinces = findProvince(group)
  provinces.forEach(item => {
    if (item?.name) {
      const districts = findDistrict(item)
      const districtFilter = districts.find(find => (find?.data ? true : false))
      if (districtFilter) {
        province = item
        district = districtFilter
      }
    }
  })

  if (group.length > 3) {
    if (district?.nextFindingTarget) {
      const removeAcentArr = district.nextFindingTarget.map(item =>
        removeAcent(item.trim()),
      )
      const filter = removeAcentArr.filter(item => {
        const check = ['phuong ', 'p.', 'p ', 'quan ', 'q.', 'q '].filter(s =>
          item.startsWith(s),
        )
        return check.length > 0
      })
      district.nextFindingTarget = filter
    }

    const towns = findTown(district)
    town = towns[0] || null
  }

  return {
    address: data,
    province: province?.name,
    district: district?.name,
    town: town?.name,
  }
}
