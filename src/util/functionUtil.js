import {useRef, useEffect, useState} from 'react'
import {getData, postData} from '../api/api'
import {getUrldetectAddress, getUrlSendLog, getUrlShippingFee} from '../api/url'

const FormData = require('form-data')

export function debounce(func, wait) {
  let timeout

  return function () {
    // eslint-disable-next-line no-invalid-this
    const context = this
    const args = arguments

    const executeFunction = function () {
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(executeFunction, wait)
  }
}
export function getPriceBoardName(id) {
  switch (id) {
    case '1':
    case 1:
      return 'retail_price_board'
    case '2':
    case 2:
      return 'wholesale_price_board'
    default:
      // return '--'
      return 'Bảng giá lẻ'
  }
}
export function getLogoShipperPartner(id) {
  switch (id) {
    case '1':
      return <img src="/img/shipper-partner/jnt.png" />
    case '2':
      return <img src="/img/shipper-partner/ghtk.png" />
    case '3':
      return <img src="/img/shipper-partner/ghn.png" />
    case '4':
      return <img src="/img/shipper-partner/VTpost.png" />
    case '5':
      return <img src="/img/shipper-partner/superShip.png" />
    default:
      return '--'
  }
}
export function getRequestGood(id) {
  switch (id) {
    case '1':
      return 'get_at_home'
    case '2':
      return 'get_at_office'
    default:
      return '--'
  }
}
export function getInsurance(id) {
  switch (id) {
    case '0':
      return 'no'
    case '1':
      return 'yes'
    default:
      return '--'
  }
}
export function getPaymentSide(id) {
  switch (id) {
    case 'PP_CASH':
      return 'sender_pay'
    case 'CC_CASH':
      return 'geter_pay'
    default:
      return '--'
  }
}
export function getRecipientView(id) {
  switch (id) {
    case '1':
      return 'sender_pay'
    case '0':
      return 'geter_pay'
    default:
      return '--'
  }
}
export function displayNumber(input) {
  try {
    if (!input) return 0
    input = input.toString().split('.')
    input[0] = input[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return input.join('.')
  } catch (error) {
    console.log(`error at convertToNumber ${input}=====${error}`)
    return input
  }
}
export function convertStringToNumber(input) {
  try {
    input += ''
    input = input.replace(/\D+/g, '')
    input = Number(input)
    return input
  } catch (error) {
    return 0
  }
}
export function useCaculateFee(info) {
  // useAxiosFetch(url, cb);
}
export function useFocus() {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }
  return [htmlElRef, setFocus]
}
let timeOutCheckFee = null
export function CheckShippingFee(obj, callback) {
  const {weight, id_sender, ward_id, city_id, district_id} = obj
  let w
  if (!weight) {
    w = 1
  } else {
    w = weight
  }
  if (!id_sender || !city_id || !district_id || !ward_id) {
    console.log('kyn --- not enought information get fee')
    return null
  }
  if (timeOutCheckFee) clearTimeout(timeOutCheckFee)
  timeOutCheckFee = setTimeout(() => {
    const data = new FormData()
    data.append('id_sender', id_sender)
    data.append('city_id', city_id)
    data.append('district_id', district_id)
    data.append('ward_id', ward_id)
    data.append('weight', w)
    data.append('cod_amount', '0')
    data.append('is_insurrance', '0')
    data.append('insurrance_value', '0')
    const url = getUrlShippingFee()
    postData(url, data)
      .then(res => {
        console.log('ressssssssssssssssss')
        if (res && res.data && res.data.success) {
          const {data} = res.data
          callback && callback(data)
        }
      })
      .catch(err => {
        console.log('errrorrrrrr')
      })
  }, 500)
}
export function getDefaultShippingFeeService(objPartner = {}) {
  const arr = []
  Object.keys(objPartner).map(item => {
    const element = {
      id: item.id,
      name: item.name,
      fee: '',
      time: '2-3 ngày',
      services: [],
    }
    return arr.push(element)
  })
  return arr
}

export function UposLogFunc(mess) {
  const url = getUrlSendLog(mess)
  getData(url)
    .then(res => {
      console.log(`logger: ${mess}`)
    })
    .catch(error => {
      console.log(`log error${error}`)
    })
}

export function getObjectCaculateFee(state, selected) {
  if (!state) return
  const isSelected = selected || state.new_order.shipping_info.isSelected
  if (!isSelected || isSelected === '') {
    UposLogFunc(`ERROR: NOT SHIPPING PARTNER SELECTED`)
    return
  }
  const partner = state.new_order.shipping_info.partner[isSelected]
  const client = state.new_order.client_info
  const {city_id, district_id} = client.area.value
  const ward_id = client.ward.value
  const {id_sender, weight} = partner
  return {
    weight,
    id_sender,
    ward_id,
    city_id,
    district_id,
  }
}
// return true if empty
export function CheckEmpty(params) {
  if (params === null || params === undefined) {
    return true
  }
  if (Array.isArray(params)) {
    return !(params.length > 0)
  }
  const typeParams = typeof params
  switch (typeParams) {
    case 'string':
      return false
    case 'object':
      return !(Object.keys(params).length > 0)
    case 'number':
      return false
    default:
      return true
  }
}

export function DetectAddress(cb, address) {
  const url = getUrldetectAddress(address)
  getData(url)
    .then(res => {
      cb && cb(res)
    })
    .catch(error => {
      UposLogFunc(`Error detect address ${address} : ${error.message}`)
    })
}
export function validCurrency(text) {
  try {
    text += ''
    if (!text) {
      return '0'
    }
    if (text.length > 1 && text[0] === '0') {
      text = text.replace('0', '')
    }
    text = text.replace(/[^0-9+/.]+/g, '')
    text = displayNumber(text)
    return text
  } catch (error) {
    UposLogFunc(`ERROR: validCurrency, value: ${text}`)
  }
}
export function getDiscountPrice(data = {}, totals = 0) {
  totals = convertStringToNumber(totals)
  if (!data.unit) {
    return convertStringToNumber(data)
  }
  if (data.unit === 'đ') {
    return convertStringToNumber(data.value)
  }
  if (data.unit === '%') {
    const num = convertStringToNumber(data.value)
    return (totals * num) / 100
  }
}
export function CaculateWeight(dataGrid) {
  try {
    let weight = 0
    dataGrid.map((v, i) => {
      const unit = v.weight_unit
      const weightOrigin = convertStringToNumber(v.weight.value) || 0
      const quantity = convertStringToNumber(v.quantity) || 0
      switch (unit.toLowerCase()) {
        case 'g':
          weight += (weightOrigin * quantity) / 1000
          break
        case 'kg':
          weight += weightOrigin * quantity
          break
        default:
          break
      }
    })
    return weight
  } catch (error) {
    UposLogFunc(`ERROR caculateWeight ${JSON.stringify(dataGrid)}`)
    return 0
  }
}
/**
 * 
 * @param {*} mess -- meassage , type: success or fail
 * @param {*} GlobalState 
 * @param {*} GlobalDispatch 
 * example: 
 *  const mess = {
    [res.data.code]: {
      type: '',
      autoHide: true,
      icon: 'success',
      prefix: '',
      status: 'success',
      details: [
        {sub: "", message: ""}
      ]
    },
    }
  PushNotification(mess, GlobalState, GlobalDispatch)
 */
export function PushNotification(mess, GlobalState, GlobalDispatch) {
  const listMessage = GlobalState.noti
  const newListMessage = {
    ...listMessage,
    ...mess,
  }
  GlobalDispatch({
    type: 'UPDATE_MESSAGE',
    payload: newListMessage,
  })
}
export function PushNotificationFinal(res, GlobalState, GlobalDispatch, t) {
  try {
    let mess = {}
    if (res && res.data && res.data.success) {
      mess = {
        [res.data.code]: {
          type: '',
          autoHide: true,
          icon: 'success',
          prefix: '',
          status: 'success',
        },
      }
    } else {
      const details = res.data.errors.details
      details &&
        details.length &&
        details.map((v, i) => {
          // v.sub = `${} ${i}`;
        })
      mess = {
        [res.data.errors.code]: {
          type: '',
          autoHide: true,
          icon: 'fail',
          prefix: '',
          status: 'fail',
          details: res.data.errors.details || [],
        },
      }
    }
    const listMessage = GlobalState.noti
    const newListMessage = {
      ...listMessage,
      ...mess,
    }
    GlobalDispatch({
      type: 'UPDATE_MESSAGE',
      payload: newListMessage,
    })
  } catch (error) {
    UposLogFunc('PushNotificationFinal Error ' + res)
  }
}
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
// {
//   "id": "1",
//   "name": "evoshop",
//   "logo": "https://khachhang.upos.vn/my-assets/image/s_partner_1.png",
//   "connected": true
// },
// {
//   "id": "2",
//   "name": "Giao hàng tiết kiệm",
//   "logo": "https://khachhang.upos.vn/my-assets/image/s_partner_2.png",
//   "connected": true
// },
// {
//   "id": "3",
//   "name": "Giao hàng nhanh",
//   "logo": "https://khachhang.upos.vn/my-assets/image/s_partner_3.png",
//   "connected": true
// },
// {
//   "id": "4",
//   "name": "Viettel post",
//   "logo": "https://khachhang.upos.vn/my-assets/image/s_partner_4.png",
//   "connected": true
// }

export function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}
export function getMobilePhoneFromString(str) {
  try {
    const num = str.replace(/^\D+/g, '')
    // eslint-disable-next-line
    const valid =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(num)//
    if (valid) return num
    return ''
  } catch (error) {
    return ''
  }
}
export function formatMoney (money) {
    let str_money = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
    str_money = str_money.replace(/\./g,',')
    return str_money
}
export function calculateDate(dateEnd){
  const start = new Date()
  const end = new Date(dateEnd)
  const diffTime = Math.abs(end - start)
  const date = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const hour = Math.floor((diffTime / (1000 * 60 * 60 * 24) - date) * 24)
  return date + " ngày " + hour + ' giờ'
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAllCustom(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}