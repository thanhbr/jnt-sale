/* eslint-disable complexity */
import {useContext, useRef, useState, useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {Calendar} from 'react-date-range'
import * as locales from 'react-date-range/dist/locale'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import {DisplayedGroupCreator} from 'ag-grid-community'
import AsyncDropdown from '../../Component/AsyncDropdown/asyncDropdown'
import {OrderContext} from '../../LayoutWrapper'
import {
  getUrlAdress,
  getListShippingPartner,
  getUrlShippingFee,
} from '../../api/url'
import {v4 as uuidv4} from 'uuid'

import {getData, postData} from '../../api/api'
import {
  getLogoShipperPartner,
  CheckShippingFee,
  getObjectCaculateFee,
  convertStringToNumber,
  displayNumber,
  validCurrency,
  getDiscountPrice,
} from '../../util/functionUtil'
import {GlobalContext} from '../../App'
import PureDropdown from '../../Component/PureDropdown/Dropdown'
import useGlobalContext from 'containerContext/storeContext'

const FormData = require('form-data')

let countrender
let noteTimeout
let timeout
const nameMapper = {
  ar: 'Arabic',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  enGB: 'English (United Kingdom)',
  enUS: 'English (United States)',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  faIR: 'Persian',
  fi: 'Finnish',
  fil: 'Filipino',
  fr: 'French',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  ko: 'Korean',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mk: 'Macedonian',
  nb: 'Norwegian Bokmål',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sr: 'Serbian',
  sv: 'Swedish',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
  zhCN: 'Chinese Simplified',
  zhTW: 'Chinese Traditional',
}

const checked = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.25" stroke="#3DDBBC" strokeWidth="1.5" />
    <circle cx="6" cy="6" r="3" fill="#3DDBBC" />
  </svg>
)
const uncheck = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.25" stroke="#B5CBE8" strokeWidth="1.5" />
  </svg>
)
const unCheckRec = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="10"
      height="10"
      rx="1"
      stroke="#B5CBE8"
      strokeWidth="2"
    />
  </svg>
)
const checkRec = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="12" height="12" rx="2" fill="#3DDBBC" />
    <path
      d="M3.20711 5.89289C2.81658 5.50237 2.18342 5.50237 1.79289 5.89289C1.40237 6.28342 1.40237 6.91658 1.79289 7.30711L3.20711 5.89289ZM4.9 9L4.19289 9.70711C4.40193 9.91614 4.69273 10.022 4.98723 9.99619C5.28172 9.9704 5.54971 9.81564 5.71923 9.57346L4.9 9ZM9.91923 3.57346C10.2359 3.12101 10.1259 2.49748 9.67346 2.18077C9.22101 1.86405 8.59748 1.97409 8.28077 2.42654L9.91923 3.57346ZM1.79289 7.30711L4.19289 9.70711L5.60711 8.29289L3.20711 5.89289L1.79289 7.30711ZM5.71923 9.57346L9.91923 3.57346L8.28077 2.42654L4.08077 8.42654L5.71923 9.57346Z"
      fill="#F2F7FC"
    />
  </svg>
)
function RenderAddressSenderId({...props}) {
  const {t} = useTranslation()
  const {listAdress, onAction, selectAd, messSenderAddress} = props
  return (
    <>
      <div className="label-input adress-detail-tran">Địa chỉ gửi hàng</div>
      <PureDropdown
        cb={onAction}
        listOption={listAdress}
        selected={selectAd}
        customClass="adress-select-wrapper show-scroll-bar"
        expandIconPath="/img/order/icon.png"
        byPassTran
      />
      {/* <AsyncDropdown
        listOption={listAdress}
        placeHolderText="select-adress"
        type="async-option"
        customClass="adress-select-wrapper show-scroll-bar"
        cbAction={onAction}
        selected={selectAd}
        hideXbutton
      /> */}
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messSenderAddress ? t(messSenderAddress) : ''}
      </div>
    </>
  )
}
function RenderServicePack({...props}) {
  const {t} = useTranslation()
  const {
    listService = [],
    onSelectService = () => {},
    messService = '',
    selected = {},
    value = '',
  } = props
  return (
    <>
      <div
        className={
          value === '3' || value === '4'
            ? 'label-input adress-detail-tran '
            : 'label-input adress-detail-tran'
        }
      >
        Gói dịch vụ
      </div>
      <PureDropdown
        cb={item => onSelectService(item)}
        listOption={listService}
        selected={selected}
        customClass="dropdown-type2"
        expandIconPath="/img/order/icon.png"
        byPassTran
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messService ? t(messService) : ''}
      </div>
    </>
  )
}
let type = false
function RenderWeight({...props}) {
  const state = useContext(OrderContext)[0]
  const {weight, messWeight, value, dispatch} = props
  const [displayWeight, changeDisplayWeight] = useState('')
  const {t} = useTranslation()
  const updateStoreService = data => {
    if (!data) return
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  return (
    <>
      <div className="label-input weight-detail-tran">Trọng lượng</div>
      <input
        value={displayWeight || weight || (type ? '' : 1)}
        type="number"
        className="upos-input upos-text detail-tranport-input input-boderfocus-indent upos-input-weight show-unit-input"
        onChange={e => {
          type = true
          const text = e.target.value
          changeDisplayWeight(text)
          // if (timeout) clearTimeout(timeout);
          // timeout = setTimeout(() => {
          //   let obj = getObjectCaculateFee(state);
          //   obj = {
          //     ...obj,
          //     ...{
          //       weight: text,
          //     },
          //   };
          //   CheckShippingFee(obj, updateStoreService);
          //   dispatch({
          //     type: "CHANGE_DETAIL_SHIPPING_NEW_ORDER",
          //     payload: { field: value, value: "weight", data: text },
          //   });
          // }, 100);
        }}
        onBlur={() => {
          // if (!displayWeight && !weight) {
          //   changeDisplayWeight("1");

          // }
          timeout = setTimeout(() => {
            if (displayWeight) {
              let obj = getObjectCaculateFee(state)
              obj = {
                ...obj,
                ...{
                  weight: displayWeight,
                },
              }
              CheckShippingFee(obj, updateStoreService)
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {field: value, value: 'weight', data: displayWeight},
              })
            }
          }, 100)
        }}
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messWeight ? t(messWeight) : ''}
      </div>
    </>
  )
}
function RenderDimension({...props}) {
  const {
    lengh,
    changeLength,
    value,
    width,
    height,
    messDimmension,
    dispatch,
    changeHeight,
    changeWidth,
  } = props
  const {t} = useTranslation()
  return (
    <>
      <div className="label-input dimen-detail-tran">Kích thước</div>
      <div className="dimension-wrapper">
        <input
          placeholder={t('long')}
          value={lengh}
          type="number"
          onChange={e => {
            const text = e.target.value
            changeLength(text)
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {field: value, value: 'lengh', data: text},
              })
            }, 350)
          }}
          className="upos-input upos-text detail-tranport-input input-boderfocus-indent show-unit-input"
        />
        <input
          placeholder={t('width')}
          value={width}
          type="number"
          onChange={e => {
            const text = e.target.value
            changeWidth(text)
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {field: value, value: 'width', data: text},
              })
            }, 350)
          }}
          className="upos-input upos-text detail-tranport-input input-boderfocus-indent show-unit-input"
        />
        <input
          placeholder={t('height')}
          value={height}
          type="number"
          onChange={e => {
            const text = e.target.value
            changeHeight(text)
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {field: value, value: 'height', data: text},
              })
            }, 350)
          }}
          className="upos-input upos-text detail-tranport-input input-boderfocus-indent show-unit-input"
        />
      </div>
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messDimmension ? t(messDimmension) : ''}
      </div>
    </>
  )
}
function RenderRequestGood({...props}) {
  const {value, messRequestGood} = props
  const {t} = useTranslation()
  return (
    <>
      <div className="label-input require-get-detail-tran">
        Yêu cầu lấy hàng
      </div>
      <CheckboxRadio
        list={[
          {
            label: 'Đến lấy tại nhà',
            value: '1',
          },
          {
            label: 'Gửi tại bưu cục',
            value: '6',
          },
        ]}
        customClass="horizon-checkbox"
        shipping_id={value}
        params="request_goods"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messRequestGood ? t(messRequestGood) : ''}
      </div>
    </>
  )
}
function RenderRecipientView({...props}) {
  const {value, messSendGood} = props
  const {t} = useTranslation()
  return (
    <>
      <div className="label-input require-send-detail-tran">
        Yêu cầu khi giao
      </div>
      <CheckboxRadio
        list={
          value === '3'
            ? [
                {
                  label: 'Cho xem không cho thử',
                  value: '1',
                },
                {
                  label: 'Không cho khách xem',
                  value: '2',
                },
                {
                  label: 'Cho thử hàng',
                  value: '3',
                },
              ]
            : [
                {
                  label: 'Cho khách xem hàng',
                  value: '1',
                },
                {
                  label: 'Không cho khách xem',
                  value: '2',
                },
              ]
        }
        customClass="horizon-checkbox"
        shipping_id={value}
        key={value}
        params="recipient_view"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messSendGood ? t(messSendGood) : ''}
      </div>
    </>
  )
}
function RenderCOD({...props}) {
  const {
    // cod,
    value,
    // changeCod,
    messCOD,
    dispatch,
    totals,
  } = props
  const {t} = useTranslation()
  const [cod, changeCod] = useState('')
  // useEffect(() => {
  //   if (totals != 0) {
  //     dispatch({
  //       type: "CHANGE_DETAIL_SHIPPING_NEW_ORDER",
  //       payload: {
  //         field: value,
  //         value: "cod",
  //         data: totals,
  //       },
  //     });
  //   }
  //   console.log("kynk --- render cod ");
  // }, [totals]);
  useEffect(() => {
    changeCod(totals)
  }, [totals])
  return (
    <>
      <div
        className={
          value === '3' || value === '4'
            ? 'label-input cod-detail-tran margin-top-16px'
            : 'label-input cod-detail-tran'
        }
      >
        Tiền thu hộ (COD)
      </div>
      <input
        value={validCurrency(cod || totals || 0)}
        onChange={e => {
          let text = e.target.value
          text = text.replaceAll(',', '')
          const numb = validCurrency(text)
          changeCod(numb)
        }}
        onBlur={() => {
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(() => {
            if (cod) {
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {
                  field: value,
                  value: 'cod',
                  data: convertStringToNumber(cod),
                },
              })
            }
          }, 350)
        }}
        className="upos-input upos-text detail-tranport-input input-boderfocus-indent show-unit-input cod-input"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messCOD ? t(messCOD) : ''}
      </div>
    </>
  )
}
function RenderInsurrance({...props}) {
  const {value, messInssurance, isInsurrance} = props
  const {t} = useTranslation()
  return (
    <>
      <div className={'protect-detail-input-wrapper'}>
        <div className="label-input protect-detail-tran">Bảo hiểm hàng hóa</div>
        {value === '2' ? (
          <></>
        ) : (
          <CheckboxRadio
            list={[
              {
                label: 'Có',
                value: '1',
              },
              {
                label: 'Không',
                value: '0',
              },
            ]}
            customClass="horizon-checkbox"
            shipping_id={value}
            key={value}
            params="is_insurrance"
          />
        )}
      </div>

      <div className="upos-error-text upos-animation-opacity upos-text ">
        {messInssurance ? t(messInssurance) : ''}
      </div>
    </>
  )
}
function RenderInsurranceValue({...props}) {
  const {
    // InssuranceValue,
    dispatch,
    messInssuranceValue,
    // changeInssuranceValue,
    value,
    partnerInfo = {},
    totals,
    // Total = 0,
    // Discount = 0,
    state,
    isInsurrance,
  } = props

  const {t} = useTranslation()
  const [InssuranceValue, changeInssuranceValue] = useState()
  let defaultValue = 0
  if (value === '2' || partnerInfo.is_insurrance === '1') {
    defaultValue = totals
  }
  // const isInsurrance = partnerInfo.is_insurrance;
  // console.log(`kyn --- is inssurance ? ===> ${isInsurrance}`);
  useEffect(() => {
    // console.log(`kyn-total change ========${totals}`);
    if (!InssuranceValue) {
      if (value === '2' || partnerInfo.is_insurrance === '1') {
        if (partnerInfo.insurrance_value === undefined) {
          dispatch({
            type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
            payload: {
              field: value,
              value: 'insurrance_value',
              data: convertStringToNumber(totals),
            },
          })
        }
      }
    }
  }, [totals, isInsurrance])
  return (
    <div>
      {isInsurrance === '1' || value === '2' ? (
        <input
          value={validCurrency(InssuranceValue || defaultValue)}
          disabled={!(isInsurrance === '1') && value !== '2'}
          onChange={e => {
            const text = e.target.value
            const numb = validCurrency(text)
            changeInssuranceValue(numb)
          }}
          onBlur={() => {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
              if (InssuranceValue) {
                dispatch({
                  type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                  payload: {
                    field: value,
                    value: 'insurrance_value',
                    data: convertStringToNumber(InssuranceValue),
                  },
                })
              }
            }, 350)
          }}
          className={
            'upos-input upos-text detail-tranport-input input-boderfocus-indent insurrance-input show-unit-input '
          }
        />
      ) : (
        <div className="upos-value-disabled upos-text">
          {validCurrency(InssuranceValue || defaultValue)}
        </div>
      )}
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messInssuranceValue ? t(messInssuranceValue) : ''}
      </div>
    </div>
  )
}
function RenderPaymentSide({...props}) {
  const {value, messPaymentSide} = props
  const {t} = useTranslation()
  return (
    <>
      <div className="label-input payment-detail-tran person-payment">
        Người trả phí
      </div>
      <CheckboxRadio
        list={
          value !== '1'
            ? [
                {
                  label: 'Người gửi',
                  value: 'PP_CASH',
                },
                {
                  label: 'Người nhận',
                  value: 'CC_CASH',
                },
              ]
            : [
                {
                  label: 'Người gửi',
                  value: 'PP_CASH',
                },
                {
                  label: 'Người gửi cuối tháng trả phí',
                  value: 'PP_PM',
                },
                {
                  label: 'Người nhận',
                  value: 'CC_CASH',
                },
              ]
        }
        customClass="horizon-checkbox"
        shipping_id={value}
        key={value}
        params="payment_method"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messPaymentSide ? t(messPaymentSide) : ''}
      </div>
    </>
  )
}
function RenderNote({...props}) {
  const {onChangeTextArea, textNote} = props

  return (
    <>
      <div className="label-input payment-detail-tran">Yêu cầu khác</div>
      <textarea
        value={textNote}
        onChange={e => onChangeTextArea(e)}
        className="upos-textare upos-text input-boderfocus-indent"
      />
    </>
  )
}

function RenderPickDate({...props}) {
  const {date, setDate} = props
  const [Globalstate] = useGlobalContext()
  const ref = useRef(null)
  const icon = useRef(null)
  let locale = 'vi'
  if (Globalstate.lang === 'en') locale = 'enGB'
  const [show, changeShow] = useState(false)
  const textDate = date
    ? moment(date).format('DD/MM/YYYY')
    : 'Chọn ngày lấy hàng'

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShow(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className="upos-calendar-wrapper">
      <div
        onClick={() => {
          changeShow(!show)
        }}
        className="upos-calendar-selected upos-text"
      >
        {textDate}
      </div>
      <div
        ref={ref}
        className={
          show
            ? 'upos-show-item upos-calendar'
            : 'upos-hide-item upos-calendar dropdown-hide'
        }
      >
        <Calendar
          weekdayDisplayFormat="eeeee"
          onChange={item => {
            changeShow(false)
            setDate(item)
          }}
          locale={locales[locale]}
          date={date}
          disabledDay={current => {
            const a = moment(current)
            const b = moment(new Date().getTime())
            const dif = a.diff(b, 'days')
            return !!(dif < 0)
          }}
        />
      </div>
    </div>
  )
}
function RenderPickShift({...props}) {
  const {value, messPickerShift} = props
  return (
    <>
      <div className="label-input pick-shift-tran">Ca Lấy hàng</div>
      <CheckboxRadio
        list={[
          {
            label: 'Sáng',
            value: '1',
          },
          {
            label: 'Chiều',
            value: '2',
          },
          {
            label: 'Tối',
            value: '3',
          },
        ]}
        customClass="horizon-checkbox"
        shipping_id={value}
        key={value}
        params="pick_shift"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messPickerShift || ''}
      </div>
    </>
  )
}
function RenderTranport({...props}) {
  const {value, messTranport} = props
  const {t} = useTranslation()
  return (
    <>
      <div className="label-input tranport-tran">Vận chuyển bằng</div>
      <CheckboxRadio
        list={[
          {
            label: 'Máy bay',
            value: 'fly',
          },
          {
            label: 'Đường bộ',
            value: 'road',
          },
        ]}
        customClass="horizon-checkbox"
        shipping_id={value}
        key={value}
        params="transport"
      />
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messTranport ? t(messTranport) : ''}
      </div>
    </>
  )
}

function Loading() {
  return <div>Loading...</div>
}
function RenderRow({...props}) {
  const {children, value, listAdress} = props
  const {t} = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const {isSelected} = state.new_order.shipping_info
  const feeObj =
    ((state.new_order.shipping_info.partner || {})[value] || {}).shipping_fee ||
    {}

  const isSelect = state.new_order.shipping_info.isSelected === value
  const {serviceSelected} = state.new_order.shipping_info
  const service = (serviceSelected[value] || feeObj).name
  const estimateTime = (serviceSelected[value] || feeObj).time_calc
  const estimateFee = (serviceSelected[value] || feeObj).fee
  const listService = feeObj.services || []
  listService.map((v, i) => {
    v.value = v.id
    v.label = v.name
  })
  const updateStoreService = data => {
    if (!data) return
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  const onchangeInput = () => {
    dispatch({
      type: 'CHANGE_SHIPPING_PARTNER',
      payload: value,
    })
    const obj = getObjectCaculateFee(state, value)
    if (!obj) {
      return
    }
    CheckShippingFee(obj, updateStoreService)
  }
  return (
    <>
      <div
        onClick={() => onchangeInput()}
        className={isSelect ? 'row-tranport row-trans-active' : 'row-tranport'}
      >
        {isSelect ? checked : uncheck}
        <div className="tranport-display tranport-col1">
          {getLogoShipperPartner(value)}
        </div>
        <div className="service-package tranport-col2">
          {service || t('basic-package') || '--'}
          {/* {service || "Gói tiêu chuẩn"} */}
        </div>
        <div className="estimate-time tranport-col3">
          {/* {estimateTime || "2 - 3 Ngày"} */}
          {estimateTime || t('2-3-day') || '--'}
        </div>
        <div className="estimate-fee tranport-col4">
          {`${estimateFee || 0} đ`}
          {/* {estimateFee || "N/A"} */}
        </div>
      </div>
      <div className={isSelect ? 'detail-tranport-wrapper' : 'height-none'}>
        <DetailTranport
          listService={listService}
          listAdress={listAdress}
          value={value}
        />
      </div>
    </>
  )
}
const CheckboxRadio = ({...props}) => {
  const [state, dispatch] = useContext(OrderContext)
  try {
    const {
      list = [],
      callback = () => {},
      customClass = null,
      customIcon = {},
      params,
      shipping_id,
      isCheckbox,
      checkboxDefault,
    } = props
    const handleClickCheck = item => {
      let current = false
      const isSelected =
        (state.new_order.shipping_info.partner[shipping_id] || {})[params] ||
        false
      if (!isSelected) {
        current = item.value
      }
      if (isCheckbox) {
        dispatch({
          type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
          payload: {field: shipping_id, value: params, data: current},
        })
      } else {
        dispatch({
          type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
          payload: {field: shipping_id, value: params, data: item.value},
        })
      }
    }
    const caculateSelect = () => {
      let stagSelect = null
      if (isCheckbox) {
        return (
          (state.new_order.shipping_info.partner[shipping_id] || {})[params] ||
          checkboxDefault ||
          false
        )
      }
      if (
        (state.new_order.shipping_info.partner[shipping_id] || {})[params] // check value in store
      ) {
        // get value if check is true;
        stagSelect = (state.new_order.shipping_info.partner[shipping_id] || {})[
          params
        ]
        // case empty
        if (!stagSelect) {
          stagSelect = list[1] // update store if empty
          // dispatch({
          //   type: "CHANGE_DETAIL_SHIPPING_NEW_ORDER",
          //   payload: {
          //     field: shipping_id,
          //     value: params,
          //     data: stagSelect.value,
          //   },
          // });
        }
      } else {
        // update store if empty
        stagSelect = list[1]
        dispatch({
          type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
          payload: {
            field: shipping_id,
            value: params,
            data: stagSelect.value,
          },
        })
      }
      return stagSelect
    }
    const isSelect = caculateSelect()
    return list.map((item, index) => (
      <div
        key={index}
        onClick={() => {
          handleClickCheck(item)
        }}
        className={
          customClass
            ? `${customClass} upos-checkbox-wrapper cursor-pointer`
            : 'upos-checkbox-wrapper cursor-pointer'
        }
      >
        <div className="upos-check-icon">
          {isSelect === item.value
            ? (customIcon || {}).check || checked
            : (customIcon || {}).uncheck || uncheck}
        </div>
        <div className="upos-check-label">{item.label || ''}</div>
      </div>
    ))
  } catch (error) {
    console.log(`error ===========${error}`)
  }
}
const caculateWeight = dataGrid => {
  try {
    let weight = 0
    dataGrid.map((v, i) => {
      const unit = v.weight_unit
      const weightOrigin = convertStringToNumber(v.weight) || 0
      const quantity = convertStringToNumber(v.quantity) || 0
      switch (unit.toLowerCase()) {
        case 'g':
          weight += (weightOrigin * quantity) / 1000
          //   value: weight + (weightOrigin * quantity) / 1000,
          //   display: `${weightOrigin / 1000} x ${quantity}`,
          // };
          break
        case 'kg':
          weight += weightOrigin * quantity
          //   value: weight + weightOrigin * quantity,
          //   display: `${weightOrigin} x ${quantity}`,
          // };
          // weight = weight + weightOrigin * quantity;
          break
        default:
          break
      }
    })
    return weight
  } catch (error) {
    return 1
  }
}
function DetailTranport({...props}) {
  const [state, dispatch] = useContext(OrderContext)
  const {product_info} = state.new_order
  const {listAdress, value, listService} = props
  const dataTranport = state.new_order.shipping_info.partner[value] || {}
  const {shipping_info} = state.new_order
  const partner = shipping_info.isSelected
  let partnerInfo = {}
  if (partner) partnerInfo = shipping_info.partner[partner]
  let selectAd = {}
  const selectedAddress = dataTranport.id_sender || ''
  if (selectedAddress) {
    listAdress.map((item, index) => {
      if (item.value === selectedAddress) selectAd = item
    })
  } else {
    listAdress.map((item, index) => {
      if (item.is_default === '1') selectAd = item
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: value, value: 'id_sender', data: item.value},
      })
      // return;
    })
  }
  const dataGrid = state.new_order.product_info
  let weightProduct
  if (dataTranport.weight) {
    weightProduct = dataTranport.weight
  } else {
    weightProduct = caculateWeight(dataGrid)
  }

  const weight = weightProduct
  const [height, changeHeight] = useState(dataTranport.height)
  const [lengh, changeLength] = useState(dataTranport.lengh)
  const [width, changeWidth] = useState(dataTranport.width)
  const serviceSelected =
    state.new_order.shipping_info.serviceSelected[value] || {}
  const [InssuranceValue, changeInssuranceValue] = useState(
    dataTranport.insurrance_value || '',
  )
  const [cod, changeCod] = useState(dataTranport.cod || '')
  const [textNote, changeTextNote] = useState(dataTranport.note || '')
  const onAction = item => {
    let obj = getObjectCaculateFee(state)
    obj = {...obj, ...{id_sender: item.value}}
    CheckShippingFee(obj, updateStoreService)
    dispatch({
      type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
      payload: {field: value, value: 'id_sender', data: item.value},
    })
  }
  const onChangeTextArea = e => {
    const text = e.target.value
    changeTextNote(text)
    if (noteTimeout) clearTimeout(noteTimeout)
    noteTimeout = setTimeout(() => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: value, value: 'note', data: text},
      })
    }, 350)
  }
  const {message} = state.new_order
  let messSenderAddress = ''
  let messWeight = ''
  let messDimmension = ''
  let messRequestGood = ''
  let messSendGood = ''
  let messCOD = ''
  let messInssurance = ''
  let messInssuranceValue = ''
  let messPaymentSide = ''
  let messPartsign = ''
  let messPickerShift = ''
  let messTranport = ''
  if (message[value]) {
    messSenderAddress = message[value].id_sender
    messWeight = message[value].weight
    messSendGood = message[value].recipient_view
    messRequestGood = message[value].request_goods
    // messRequestGood = message[value].recipient_view;
    messCOD = message[value].cod
    messInssurance = message[value].is_insurrance
    messInssuranceValue = message[value].insurrance_value
    messPaymentSide = message[value].payment_method
    messPartsign = message[value].partsign
    messDimmension = message[value].dimenson
    messPickerShift = message[value].pick_shift
    messTranport = message[value].transport
  }
  const updateStoreService = data => {
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  const getTotalAndDiscount = () => {
    let Total = 0
    const Discount = 0
    product_info.map((item, index) => {
      const price = convertStringToNumber(item.display_price)
      const quantity = convertStringToNumber(item.quantity)
      const numDiscount = getDiscountPrice(item.discount, price * quantity)

      Total += price * quantity - numDiscount
    })
    return {Total, Discount}
  }
  const {Total, Discount} = getTotalAndDiscount()
  return (
    <Grid container className="tranport-detail-wrapper">
      <Grid className="left-trans-detail" item xs={12} sm={12} md={6}>
        <RenderAddressSenderId
          listAdress={listAdress}
          onAction={onAction}
          selectAd={selectAd}
          messSenderAddress={messSenderAddress}
        />
        <RenderWeight
          weight={weight}
          messWeight={messWeight}
          value={value}
          dispatch={dispatch}
        />
        <RenderDimension
          lengh={lengh}
          changeLength={changeLength}
          value={value}
          width={width}
          height={height}
          messDimmension={messDimmension}
          dispatch={dispatch}
          changeHeight={changeHeight}
          changeWidth={changeWidth}
        />
        {value === '1' ? (
          <RenderRequestGood value={value} messRequestGood={messRequestGood} />
        ) : null}
        {value === '1' ? (
          <RenderRecipientView value={value} messSendGood={messSendGood} />
        ) : null}
        {value === '2' ? (
          <RenderPickDate
            date={dataTranport.pick_date || null}
            setDate={item => {
              dispatch({
                type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
                payload: {field: value, value: 'pick_date', data: item},
              })
            }}
          />
        ) : null}
        {value === '2' ? (
          <div className="picker-shift-tranport-wrapper">
            <div className="picker-shift-wrapper">
              <RenderPickShift
                value={value}
                messPickerShift={messPickerShift}
              />
            </div>
            <div className="new-order-tranport-wrapper">
              <RenderTranport value={value} messTranport={messTranport} />
            </div>
          </div>
        ) : null}
        {value === '3' ? (
          <div className="tranport-info-2-cols ">
            <div className="tranport-info-col1">
              <RenderRecipientView value={value} messSendGood={messSendGood} />
            </div>
            <div className="tranport-info-col2">
              <RenderPaymentSide
                messPaymentSide={messPaymentSide}
                value={value}
              />
            </div>
          </div>
        ) : null}
        {value === '4' ? (
          <div className="tranport-info-2-cols ">
            <div className="tranport-info-col1">
              <RenderRequestGood value={value} messRequestGood={messSendGood} />
            </div>
            <div className="tranport-info-col2">
              <RenderPaymentSide
                messPaymentSide={messPaymentSide}
                value={value}
              />
            </div>
          </div>
        ) : null}
      </Grid>
      <Grid className="right-trans-detail" item xs={12} sm={12} md={6}>
        {value === '3' || value === '4' ? (
          <RenderServicePack
            selected={serviceSelected}
            value={value}
            listService={listService}
            onSelectService={item => {
              dispatch({
                type: 'UPDATE_SHIPPING_SERVICE',
                payload: {
                  field: value,
                  data: item,
                },
              })
            }}
          />
        ) : null}
        <RenderCOD
          Total={Total}
          Discount={Discount}
          totals={Total - Discount}
          cod={cod}
          value={value}
          changeCod={changeCod}
          messCOD={messCOD}
          dispatch={dispatch}
        />
        <RenderInsurrance
          value={value}
          messInssurance={messInssurance}
          isInsurrance={partnerInfo.is_insurrance}
        />
        <RenderInsurranceValue
          Total={Total}
          totals={Total - Discount}
          Discount={Discount}
          InssuranceValue={InssuranceValue}
          dispatch={dispatch}
          messInssuranceValue={messInssuranceValue}
          changeInssuranceValue={changeInssuranceValue}
          value={value}
          partnerInfo={partnerInfo}
          state={state}
          isInsurrance={partnerInfo.is_insurrance}
        />
        {value === '1' ? (
          <RenderPaymentSide messPaymentSide={messPaymentSide} value={value} />
        ) : null}
        {value === '2' ? (
          <div className="ghtk-paymentside-request-good-wrapper">
            <div className="ghtk-payment-side">
              <RenderPaymentSide
                messPaymentSide={messPaymentSide}
                value={value}
              />
            </div>
            <div className="ghtk-request-good">
              <RenderRequestGood
                value={value}
                messRequestGood={messRequestGood}
              />
            </div>
          </div>
        ) : null}
        {value === '1' ? (
          <CheckboxRadio
            list={[{label: 'Cho phép ký nhận 1 phần', value: '1'}]}
            customClass="sign-1-parth"
            shipping_id={value}
            key={value}
            params="partsign"
            isCheckbox
            customIcon={{check: checkRec, uncheck: unCheckRec}}
            checkboxDefault="0"
          />
        ) : null}
        <RenderNote onChangeTextArea={onChangeTextArea} textNote={textNote} />
      </Grid>
    </Grid>
  )
}
function RenderSaleMethod({...props}) {
  const {saleAt, CallBackSale = () => {}, listTab = []} = props
  const {t} = useTranslation()
  return (
    <div className="switch-button-wrapper">
      {listTab.map((v, i) => {
        const isActive = saleAt === v.value
        return (
          <div
            key={i}
            onClick={() => CallBackSale(v)}
            className={
              isActive ? 'swicht-button switch-active' : 'swicht-button'
            }
          >
            {t(v.label)}
          </div>
        )
      })}
    </div>
  )
}
export default function TranportInfomation({...props}) {
  const {t} = useTranslation()
  const [listAdress, changlistAdress] = useState([])
  const [state, dispatch] = useContext(OrderContext)
  const listPartner = state.new_order.shipping_info.partner
  const {saleAt} = state.new_order.shipping_info
  const didMout = () => {
    const urlAdress = getUrlAdress()
    const urlGetShipping = getListShippingPartner()
    getData(urlGetShipping).then(res => {
      if (res && res.data && res.data.success) {
        const newData = {}
        const {data = []} = res.data || {}
        Object.keys(data).map((v,i) => {
          const element = data[v];
          newData[element.id] =element
        })
        dispatch({type: 'UPDATE_LIST_SHIPPING_PARTER', payload: newData})
      }
    })
    getData(urlAdress) // get adress
      .then(res => {
        if (res && res.data && res.data.success) {
          const data = res.data.data || []
          data.map((item, index) => {
            item.value = item.id
            item.label = `${item.fullname} ${item.phone}`
          })
          // is_default
          changlistAdress(data)
        }
      })
      .catch(error => {})
  }
  const unMount = () => {}
  useEffect(() => {
    didMout()
    return unMount()
  }, [])
  const arrListPartner = Object.keys(listPartner)
  // console.log(`kyn list partner : ${JSON.stringify(listPartner)}`);
  // const arrListPartner = [];
  return (
    <div className="TranportInfomation bg-order-cmp">
      <div className="create-new-order-title-wrapper">
        <div className="upos-text-roboto-medium-500 upos-text-indygo-dye">
          Thông tin vận chuyển
        </div>
        <div className="prod-info-add">+ Thêm nhà vận chuyển</div>
      </div>
      <RenderSaleMethod
        saleAt={saleAt}
        CallBackSale={item => {
          dispatch({type: 'CHANGE_SALE_LOCATION', payload: item.value})
        }}
        listTab={[
          {
            value: 'sale_with_shipping_partner',
            label: 'sale_with_shipping_partner',
          },
          {value: 'sale_at_shop', label: 'sale_at_shop'},
        ]}
      />
      {saleAt === 'sale_at_shop' ? (
        <div className="fake-div-80" />
      ) : (
        <>
          <div className="header-tranport">
            <div className="fake-check-icon">checked</div>
            <div className="header-tranport-item tranport-col1">
              Nhà vận chuyển
            </div>
            <div className="header-tranport-item tranport-col2">
              Gói dịch vụ
            </div>
            <div className="header-tranport-item tranport-col3">
              Thời gian dự kiến
            </div>
            <div className="header-tranport-item tranport-col4">
              Phí dự kiến
            </div>
          </div>
          {arrListPartner &&
          arrListPartner.length &&
          arrListPartner.length > 0 ? (
            arrListPartner.map((value, index) => {
              const item = listPartner[value]
              if (!Object.keys(item)) return
              const {id} = item
              // console.log(`kyn id shipping partner ==================== ${  id}`);
              // console.log(
              //   `kyn is connected partner ==================== ${
              //     item.connected}`
              // );
              return (
                <RenderRow
                  key={id}
                  item={item}
                  // service={service}
                  // estimateFee={estimateFee}
                  // estimateTime={estimateTime}
                  value={id}
                  listAdress={listAdress}
                />
              )
            })
          ) : (
            <div className="no-tranport-selected">
              <img src="/img/order/no-tranport.png" />
              <div className="upos-text">
                {t('Vui lòng thêm nhà vận chuyển để nhập thông tin giao hàng')}
              </div>
            </div>
          )}
          <div className="fake-div-80" />
        </>
      )}
    </div>
  )
}
