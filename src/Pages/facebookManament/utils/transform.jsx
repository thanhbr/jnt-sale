export const transformQueryObjToString = data => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(data)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}

export const transformPostData = data => ({
  data,
  name: data?.product_name || '---',
  value: data?.id || '',
})
export const transformListDetailData = data => {
  // let list = []
  data.reverse()
  // data.map((item, index) => {
  //   if (list.length > 0) {
  //     if (item?.from.id == data[(index - 1)]?.from.id) {
  //       let child = list[(list.length - 1)]?.child || []
  //       list[(list.length - 1)].child =[...child, item]
  //     } else {
  //       list = [...list, item]
  //     }
  //   } else {
  //     list = [...list, item]
  //   }
  // })
  return data
}