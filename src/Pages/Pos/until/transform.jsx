import { removeVietnameseTones } from '../../../util/checkPasswordVN'
import { Text } from '../../../common/text'
import React from 'react'

export const transformAddressData = data => ({
  name: data?.name || '---',
  value: data?.id || '',
  list: data?.list,
})

export const transformCustomerData = data => ({
  data,
  name: data?.name || '---',
  value: data?.id || '',
})

export const transformDateApiToReportFormat = str =>
  str
    ? str.split(' ')[0]
      ? str.split(' ')[0].split('-').reverse().join('/')
      : '---'
    : '---'

export const transformDateApiToOrderFormat = dateTimeParam => {
  const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
  const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
  const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
  const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
  const hm = `${hms[0]}:${hms[1]}`
  return `${dmy} ${hm}`.trim()
}

export const transformPaymentMethodData = data => ({
  data,
  name: data?.name || '---',
  value: data?.id || '',
})

export const transformProductData = data => ({
  data,
  name: data?.product_name || '---',
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

export const transformWarehouseData = data => ({
  data,
  name: data?.warehouse_name || '---',
  value: data?.id || '',
})

export const transformMoneyToSendRequest = (money) => {
  return !!money ? Number(money.toString().replaceAll(',','')) : Number(money)
}

const getStartEnd = (str, sub) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1]

export const highlightGroupProduct = (keyword, data) => {
  const keywordEng = removeVietnameseTones(keyword)?.toLowerCase()

  let result = []
  data.map(item => {
    if(item?.category_childs?.length !== 0 && !!item?.category_childs) {
      item?.category_childs?.map(it => {
        // const cateEng = removeVietnameseTones(it?.category_name)?.toLowerCase()
        const text = !!it.parent_id
          ? `${item.category_name} - ${it.category_name}`
          : `${it.category_name}`
        // if(cateEng?.includes(keyword)) {
        const convertEng = removeVietnameseTones(text)?.toLowerCase()
        const abc = getStartEnd(convertEng, keywordEng)
        const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
        const fm = text?.split(subText)
        it.parent_name = item.category_name
        it.display = <div style={{fontSize: 14}}>
          {fm[0]}<Text style={{color: '#1A94FF'}}>{subText}</Text>{fm[1]}
        </div>
        if(!!fm[2]) {
          it.display = <div style={{fontSize: 14}}>
            {fm[0]}<Text style={{color: '#1A94FF'}}>{subText}</Text>{fm[1]}
            <Text style={{color: '#1A94FF'}}>{subText}</Text>{fm[2]}
          </div>
        }
        // } else {
        //   it.display = <Text style={{color: '#1A94FF'}}>{text}</Text>
        // }
        result.push(it)
      })
    } else {
      const cateEng = removeVietnameseTones(item?.category_name)?.toLowerCase()
      const text = item.parent_code
        ? `${item.parent_name} - ${item.category_name}`
        : `${item.category_name}`
      if(cateEng?.includes(keyword)) {
        const convertEng = removeVietnameseTones(text)?.toLowerCase()
        const abc = getStartEnd(convertEng, keywordEng)
        const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
        const fm = text?.split(subText)
        item.display = <div style={{fontSize: 14}}>{fm[0]}<Text style={{color: '#1A94FF'}}>{subText}</Text>{fm[1]}</div>
      } else {
        item.display = <Text style={{color: '#1A94FF'}}>{text}</Text>
      }
      result.push(item)
    }
  })
  return result
}