import {removeVietnameseTones} from "../../../../../../util/checkPasswordVN";
import {Text} from "../../../../../../common/text";
import React from "react";

export const getDateFromNow = (n, otp) => {
  let date = new Date()
  if (otp && otp?.type === 'start') date.setHours(0, 0, 0, 0)
  if (otp && otp?.type === 'end') date.setHours(23, 59, 0, 0)
  const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
  return new Date(res)
}

export const formatDatetime = (data, opt={}) => {
  const D = new Date(data)

  let d = D.getDate()
  d = d < 10 ? `0${d}` : d

  let m = D.getMonth()
  m = m + 1
  m = m < 10 ? `0${m}` : m

  let y = D.getFullYear()

  let h = D.getHours()
  h = h < 10 ? `0${h}` : h

  let min = D.getMinutes()
  min = min < 10 ? `0${min}` : min
  return !! opt?.onlyDate ? `${d}/${m}/${y}` : `${d}/${m}/${y} ${h}:${min}`
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
          {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
        </div>
        if(!!fm[2]) {
          it.display = <div style={{fontSize: 14}}>
            {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
            <Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[2]}
          </div>
        }
        // } else {
        //   it.display = <Text style={{color: '#1E9A98'}}>{text}</Text>
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
        item.display = <div style={{fontSize: 14}}>{fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}</div>
      } else {
        item.display = <Text style={{color: '#1E9A98'}}>{text}</Text>
      }
      result.push(item)
    }
  })
  return result
}