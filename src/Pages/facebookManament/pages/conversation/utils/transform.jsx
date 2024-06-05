export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const transformCustomerData = data => ({
  data: data,
  name: data?.name || '---',
  value: data?.id || '',
})

export const transformQueryObjToString = data => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(data)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}

export const transformMessage = data => {
  if (data.includes('https://')) {
    let splitURL = data.toString().split('https://')
    let content = transformMessageHttp(splitURL.shift())
    let tag, tail = ''
    splitURL.map(item => {
      tag = item.split(' ')
      tag.length > 1
        ? tag.map((item, index) => {
          if(index > 0){
            tail += ` ${item}`
          }
        })
        : ''
      content += `<span style='text-align: left;'><a href='https://${tag[0]}' target='blank'>https://${tag[0]}</a></span><p>${tail}</p>`
      tag = tail = ''
    })
    return content
  }
  return data
}

export const transformMessageHttp = data => {
  if (data.includes('http://')) {
    let splitURL = data.toString().split('http://')
    let content = `<p>${splitURL.shift()}</p>`
    let tag, tail = ''
    splitURL.map(item => {
      tag = item.split(' ')
      tail = tag.length > 1 ? tag.filter((item, index) => index > 0).toString() : ''
      content += `<span style='text-align: left;'><a href='http://${tag[0]}' target='blank'>https://${tag[0]}</a></span><p>${tail}</p>`
      tag = ''
    })
    return content
  }
  return `<p>${data}</p>`
}



export const transformConversationUnread = num => {
  let tail = 0
  if(num < 1000) {
    return num
  }
  if( num < 1000000){
    tail= num%1000
    num = Math.floor(num/1000)
    tail = tail > 100 ? Math.floor(tail/100) : 0
    num = tail > 0 ? `${num}.${tail}K` : `${num}K`
    return num
  }
  if( num < 1000000000){
    tail= num%1000000
    num = Math.floor(num/1000000)
    tail = tail > 100000 ? Math.floor(tail/100000) : 0
    num = tail > 0 ? `${num}.${tail}M` : `${num}M`
    return num
  }
}

