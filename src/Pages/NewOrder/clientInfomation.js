import {useContext, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import moment from 'moment'
import {getData, postData} from '../../api/api'
import {v4 as uuidv4} from 'uuid'
import {
  getUrlCustomer,
  getUrlDangerCustomer,
  getUrlOrder,
  getUrlProvinceDistrict,
  getWardInfo,
} from '../../api/url'
import {OrderContext} from '../../LayoutWrapper'
import DropdownFilter from '../../Component/DropdownServerFilter/Dropdown'
import {
  CheckShippingFee,
  getObjectCaculateFee,
  displayNumber,
  DetectAddress,
  UposLogFunc,
  getDefaultShippingFeeService,
} from '../../util/functionUtil'
import TrackingStatus from '../../Component/TrackingStatus/trackingStatus'

const FormData = require('form-data')

let timeout
let count = 0
let secondTimeOut
export function UpdateFeeService(objUpdate = {}, state, dispatch) {
  // const [state, dispatch] = useContext(OrderContext);
  const objFee = getObjectCaculateFee(state)
  const newObj = {...objFee, ...objUpdate}
  const callback = data => {
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  CheckShippingFee(newObj, callback)
  return null
}
const RenderOrderHistory = ({...params}) => {
  const {order} = params
  const [showOrder, changShowOrder] = useState(false)
  const {t} = useTranslation()
  const ref = useRef(null)
  const clickOrderHistory = () => {
    changShowOrder(!showOrder)
  }
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      changShowOrder(false)
    }
  }
  const didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
  }
  const unmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    didmout()
    return () => {
      unmount()
    }
  }, [ref])
  if (order && order.length) {
    return (
      <div ref={ref} className="order-history">
        <img
          onClick={() => clickOrderHistory()}
          className="cursor-pointer"
          src="/svg/order.svg"
        />
        <div
          onClick={() => clickOrderHistory()}
          className="cursor-pointer numb-history-order"
        >
          <span>{order.length}</span>
        </div>
        <div
          className={
            showOrder
              ? 'upos-show-item popup-order-history upos-shadow'
              : 'upos-hide-item popup-order-history upos-shadow'
          }
        >
          {order.map((v, i) => {
            if (i > 9) return
            const date = moment(v.date, 'YYYY-MM-DD HH:mm:ss').format(
              'HH:mm | DD/MM/YYYY',
            )
            return (
              <div key={uuidv4()} className="row-order-history">
                <div className="cell-order-id upos-text">
                  <div className="cell-order-id-label">
                    {`${t('id_of_order')} : `}
                    <span className="order-id">{v.id}</span>
                  </div>
                  <div className="cell-order-id-value">{date}</div>
                </div>
                <div className="cell-order-status">
                  <TrackingStatus status={v.shipping_status_id} />
                </div>
                <div className="cell-order-totals upos-text">
                  <div className="cell-order-totals-label">
                    {t('total_amount')}
                  </div>
                  <div className="cell-order-totals-value">
                    {`${displayNumber(v.total_amount)} đ`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return null
}
const RenderMobilePhone = ({...props}) => {
  const {
    messagePhone,
    phone,
    listPhone,
    validateOrder,
    onChangePhone,
    showPhoneSuggest,
    changePhoneSuggest,
    onClickSuggestPhone,
  } = props
  const {t} = useTranslation()
  const ref = useRef(null)
  const didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
  }
  const unmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    didmout()
    return () => {
      unmount()
    }
  }, [ref])
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      changePhoneSuggest(false)
    }
  }
  return (
    <div className="phone-client-info">
      <div className="label-input">{t('phone')}</div>
      <input
        className={
          messagePhone
            ? 'border-red-input client-input upos-text'
            : 'client-input upos-text'
        }
        value={phone}
        onBlur={() => {
          if (
            listPhone &&
            listPhone.length === 1 &&
            listPhone[0].mobile === phone
          ) {
            validateOrder(listPhone[0].id)
          }
        }}
        onChange={e => onChangePhone(e)}
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messagePhone ? t(messagePhone) : ''}
      </div>
      <div
        ref={ref}
        className={
          showPhoneSuggest
            ? 'upos-show-item phone-suggest-wrapper upos-shadow show-scroll-bar'
            : 'upos-hide-item phone-suggest-wrapper upos-shadow show-scroll-bar'
        }
      >
        {listPhone.map((item, index) => (
          <div
            key={uuidv4()}
            onClick={() => onClickSuggestPhone(item)}
            className="upos-row"
          >
            <div className="upos-avatar">
              <img src="/svg/account.svg" />
            </div>
            <div className="upos-info-account">
              <div className="upos-text">{item.name}</div>
              <div className="upos-text">{item.mobile}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
const RenderBoomOrder = ({...props}) => {
  const {boom, changeBoom = () => {}} = props
  if (boom && boom.status) {
    return (
      <div className="boom-order">
        <img src="/svg/boom.svg" />
        <div className="numb-boom-order">
          <span>{boom.data.length}</span>
        </div>
      </div>
    )
  }
  return null
}
export default function ClientInfomation({...props}) {
  const [state, dispatch] = useContext(OrderContext)
  const {t} = useTranslation()
  const [showPhoneSuggest, changePhoneSuggest] = useState(true)
  const customerInfo = state.new_order.client_info

  const [phone, changePhone] = useState(customerInfo.mobile)
  const [addr, changeAddr] = useState(customerInfo.address)
  const [name, changeName] = useState(customerInfo.name)

  const [listPhone, changeListPhone] = useState([])
  const [listAdress, changeListAdress] = useState([])
  const [listWard, changeListWard] = useState([])

  const [order, changeOrder] = useState([])
  // const [boom, changeBoom] = useState({
  //   status: true,
  //   data: [
  //     {
  //       shop: "SHOP THỜI TRANG NAM NỮ",
  //       created_date: "09/12/2020",
  //       content: "Lươn lẹo, đặt hàng cho sang mà không thèm lấy hàng!",
  //     },
  //     {
  //       shop: "SHOP THỜI TRANG NAM NỮ",
  //       created_date: "09/12/2020",
  //       content: "Lươn lẹo, đặt hàng cho sang mà không thèm lấy hàng!",
  //     },
  //   ],
  // });
  const ref = useRef(null)
  const isCharNumeric = charStr => {
    if (charStr === '') return true
    return !!/\d/.test(charStr)
  }
  const onChangePhone = (e, mess) => {
    try {
      let text = e.target.value
      text = text.replace(/[^0-9]+/g, '')
      if (!/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g.test(text)) {
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {input_phone: 'phone_not_valid'},
        })
      } else {
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {input_phone: ''},
        })
      }
      if (!text || text === '') {
        changePhoneSuggest(false)
      }
      changePhone(text)
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (text) {
          const url = getUrlCustomer({keyword: text})
          getData(url)
            .then(res => {
              if (res.data.success) {
                changeListPhone(res.data.data)
                changePhoneSuggest(true)
              }
            })
            .catch(error => {
              UposLogFunc(
                `ERROR AT GET DATA VALID PHONE NUMBER: ${error.message}`,
              )
            })
        }
      }, 300)
      if (secondTimeOut) clearTimeout(secondTimeOut)
      secondTimeOut = setTimeout(() => {
        dispatch({type: 'UPDATE_PHONE', payload: text})
      }, 0)
    } catch (e) {
      UposLogFunc(`ERROR AT VALID PHONE NUMBER: ${e.message}`)
    }
  }
  const validateCustome = phone => {
    const data = new FormData()
    data.append('phone', phone)
    const url = getUrlDangerCustomer()
    postData(url, data)
      .then(res => {
        if (res && res.data && res.data.success) {
          // changeBoom({
          //   status: true,
          //   data: data,
          // });
        }
      })
      .catch(error => {
        console.log(`error validate custome ${error}`)
      })
  }
  const validateOrder = id => {
    const url = getUrlOrder({customer_id: id, start: '0'})
    getData(url)
      .then(res => {
        // console.log(res);
        if (res && res.data && res.data.success) {
          changeOrder(res.data.data || [])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onClickSuggestPhone = item => {
    changePhone(item.mobile)
    changePhoneSuggest(false)
    validateCustome(item.mobile) // check boom
    validateOrder(item.id) // check history
    dispatch({
      type: 'UPDATE_MESSAGE',
      payload: {input_phone: ''},
    })
    const element = {
      name: item.name,
      mobile: item.mobile,
      city_id: item.city_id,
      city_name: item.city_name,
      district_id: item.district_id,
      district_name: item.district_name,
      ward_id: item.ward_id,
      ward_name: item.ward_name,
      address: item.address,
      area: {
        label: `${item.city_name} - ${item.district_name}`,
        value: {
          district_id: item.district_id,
          city_id: item.city_id,
        },
      },
      ward: {
        label: item.ward_name,
        value: item.ward_id,
      },
    }
    let obj = getObjectCaculateFee(state)
    obj = {
      ...obj,
      ...{
        ward_id: item.ward_id,
        city_id: item.city_id,
        district_id: item.district_id,
      },
    }
    CheckShippingFee(obj, updateStoreService)
    dispatch({
      type: 'UPDATE_ALL_INFO_CUSTOMER',
      payload: element,
    })
  }
  function handleClickOutside(event) {
    console.log('click out side')
    if (ref.current && !ref.current.contains(event.target)) {
      changePhoneSuggest(false)
    }
  }
  const getDataProvince = () => {
    const url = getUrlProvinceDistrict()
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const data = res.data.data || []
          const newData = []
          data.map((item, index) => {
            const element = {
              label: item.city_district,
              value: {
                city_id: item.city_id,
                district_id: item.district_id,
              },
            }
            newData.push(element)
          })
          changeListAdress(newData)
        } else {
        }
      })
      .catch(error => {
        console.log(`error${error}`)
      })
  }
  const getDataWard = item => {
    if (!item.value.district_id && !item.value.city_id) {
      changeListWard([
        {
          label: t('no_data'),
          value: '',
        },
      ])
      return
    }
    const wardInfo = item.value
    const {district_id, city_id} = wardInfo
    const url = getWardInfo(city_id, district_id)
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const data = res.data.data || []
          const newData = []
          data.map((item, index) => {
            const element = {
              label: item.ward_name,
              value: item.ward_id,
            }
            newData.push(element)
          })
          changeListWard(newData)
        } else {
        }
      })
      .catch(error => {
        console.log(`error${error}`)
      })
  }
  const updateStoreService = data => {
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  const comDidmout = () => {
    // get data adress;
    getDataProvince()
    // getDataWard();
    document.addEventListener('mousedown', handleClickOutside)
  }
  const compUnmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    comDidmout()
    return compUnmount()
  }, [ref])
  count++
  console.log(`render time ===========  clientInfomation${count}`)
  // const
  const {message} = state.new_order
  const messagePhone = message.input_phone
  const messageName = message.customer_name
  const messageAddress = message.address
  const messageProviDis = message.provi_dis
  const messageWard = message.ward
  const listOrder = order
  const cb = res => {
    if (res && res.data && res.data.success) {
      console.log('detect adress')
      const data = res.data.data || {}
      const newArea = {
        label: `${data.district_name || ''} - ${data.city_name || ''}`,
        value: {
          district_id: data.district_id || '',
          city_id: data.city_id || '',
        },
      }
      const newWard = {
        label: data.ward_name || '',
        value: data.ward_id || '',
      }
      dispatch({type: 'CHANGE_AREA', payload: newArea})
      dispatch({type: 'CHANGE_WARD', payload: newWard})
    } else {
      UposLogFunc(`ERROR DETECT ADDRESS: ${JSON.stringify(res)}`)
    }
  }
  const changeArea = item => {
    UpdateFeeService(
      {
        district_id: item.value.district_id,
        city_id: item.value.city_id,
      },
      state,
      dispatch,
    )
  }
  return (
    <div className="client-info-wrapper bg-order-cmp">
      <div className="create-new-order-title-wrapper">
        <div className="upos-text-roboto-medium-500 upos-text-indygo-dye">
          {t('client-infomation')}
        </div>
        <div className="info-client">
          <RenderOrderHistory order={listOrder} />
        </div>
      </div>
      <RenderMobilePhone
        messagePhone={messagePhone}
        phone={phone || customerInfo.mobile}
        listPhone={listPhone}
        validateOrder={validateOrder}
        onChangePhone={event => {
          console.log('change phone')
          onChangePhone(event, messagePhone)
        }}
        showPhoneSuggest={showPhoneSuggest}
        changePhoneSuggest={changePhoneSuggest}
        onClickSuggestPhone={onClickSuggestPhone}
      />
      <div className="name-client-info">
        <div className="label-input">{t('full_name')}</div>
        <div className="name-wrapper">
          <input
            value={name || customerInfo.name}
            className={
              messageName
                ? 'border-red-input client-input upos-text'
                : 'client-input upos-text'
            }
            onChange={e => {
              const text = e.target.value
              changeName(text)
              if (timeout) clearTimeout(timeout)
              timeout = setTimeout(() => {
                dispatch({type: 'UPDATE_NAME', payload: text})
              }, 500)
            }}
          />
          <img
            onClick={() => {
              // showContact(true);
              dispatch({type: 'SHOW_MODAL', payload: true})
            }}
            src="/svg/contact.svg"
          />
        </div>
      </div>
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messageName ? t(messageName) : ''}
      </div>

      <div className="adress-client-info">
        <div className="label-input">{t('adress')}</div>
        <div className="adress-wrapper">
          <input
            value={addr || customerInfo.address}
            className={
              messageAddress
                ? 'border-red-input client-input upos-text'
                : 'client-input upos-text'
            }
            onChange={e => {
              const text = e.target.value
              changeAddr(text)
              if (timeout) clearTimeout(timeout)
              timeout = setTimeout(() => {
                dispatch({type: 'UPDATE_ADDRESS', payload: text})
              }, 300)
            }}
          />
          <img
            onClick={() => {
              DetectAddress(cb, addr || customerInfo.address)
              // showContact(true);
              // dispatch({ type: "SHOW_MODAL", payload: true });
            }}
            className=" detect-address"
            src="/svg/location.svg"
          />
        </div>
      </div>
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messageAddress ? t(messageAddress) : ''}
      </div>
      <div className="district-client-info">
        <div className="label-input">{t('adress_get_order')}</div>
        <DropdownFilter
          pathExpandDropIcon="/img/order/icon.png"
          selected={state.new_order.client_info.area}
          cb={item => {
            if (!item || item === 'CLICK_DELETE') {
              const itemDefault = {
                label: '',
                value: {
                  district_id: '',
                  city_id: '',
                },
              }
              dispatch({type: 'CHANGE_AREA', payload: itemDefault})
              const shippingPartner = state.new_order.shipping_info.partner
              const data = getDefaultShippingFeeService(shippingPartner)
              updateStoreService(data)
            } else {
              let obj = getObjectCaculateFee(state)
              obj = {
                ...obj,
                ...{
                  district_id: item.value.district_id,
                  city_id: item.value.city_id,
                },
              }
              CheckShippingFee(obj, updateStoreService)
              dispatch({type: 'CHANGE_AREA', payload: item})
              // changeArea(item);
              getDataWard(item)
            }
            if (customerInfo.ward.value) {
              dispatch({
                type: 'CHANGE_WARD',
                payload: {
                  label: '',
                  value: '',
                },
              })
            }
          }}
          listOption={listAdress}
          customClass="show-scroll-bar client-search-adress"
          message={messageProviDis}
        />
        <div className="upos-error-text upos-animation-opacity upos-text">
          {messageProviDis ? t(messageProviDis) : ''}
        </div>
      </div>
      <div className="city-client-info">
        <div className="label-input">{t('ward')}</div>
        <DropdownFilter
          pathExpandDropIcon="/img/order/icon.png"
          selected={state.new_order.client_info.ward}
          cb={item => {
            if (!item || item === 'CLICK_DELETE') {
              const itemDefault = {
                label: '',
                value: '',
              }
              dispatch({type: 'CHANGE_WARD', payload: itemDefault})
              const shippingPartner = state.new_order.shipping_info.partner
              const data = getDefaultShippingFeeService(shippingPartner)
              updateStoreService(data)
            } else {
              let obj = getObjectCaculateFee(state)
              obj = {
                ...obj,
                ...{
                  ward_id: item.value,
                },
              }
              CheckShippingFee(obj, updateStoreService)
              dispatch({type: 'CHANGE_WARD', payload: item})
            }
          }}
          listOption={listWard}
          customClass="show-scroll-bar client-search-adress"
          message={messageWard}
        />
        <div className="upos-error-text upos-animation-opacity upos-text">
          {messageWard ? t(messageWard) : ''}
        </div>
      </div>
    </div>
  )
}
