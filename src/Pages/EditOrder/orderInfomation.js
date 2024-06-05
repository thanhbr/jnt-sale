import {Navigate, useNavigate} from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import moment from 'moment'
import AsyncDropdown from '../../Component/AsyncDropdown/asyncDropdown'
import ButtonGroup from '../../Component/ButtonGroup/buttonGroup'
import {PATH} from '../../const/path'

import {OrderContext} from '../../LayoutWrapper'

import {getUrlOrigin, getUrlCreateOrder} from '../../api/url'
import {getData, postData} from '../../api/api'
import {GlobalContext} from '../../App'
import {convertStringToNumber, displayNumber} from '../../util/functionUtil'
import useGlobalContext from '../../containerContext/storeContext'

const FormData = require('form-data')

let timeOut
let pass = true
export default function OrderInfomation({...props}) {
  const {isCol1} = props
  const {t} = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  // const [stateGolbal, dispatchGlobal] = useContext(GlobalContext);

  const stateCode = state.new_order.order_info.orderCode || ''
  const note = state.new_order.order_info.note || ''
  const selectOr = state.new_order.order_info.origin || {}
  const {product_info} = state.new_order
  const [orderCode, changeOrderCode] = useState(stateCode)
  const [textAre, changeTextAre] = useState(note)
  const [listOrigin, changeListOrigin] = useState([])

  const onChangeNote = e => {
    if (timeOut) clearTimeout(timeOut)
    const text = e.target.value
    changeTextAre(text)
    setTimeout(() => {
      dispatch({type: 'UPDATE_NOTE_NEW_ORDER', payload: text})
    }, 500)
  }

  const onChangeCode = e => {
    if (timeOut) clearTimeout(timeOut)
    const text = e.target.value
    changeOrderCode(text)
    setTimeout(() => {
      dispatch({type: 'UPDATE_CODE_NEW_ORDER', payload: text})
    }, 500)
  }
  const onAction = item => {
    dispatch({type: 'UPDATE_ORGIGIN_NEW_ORDER', payload: item})
  }
  const unMount = () => {}
  const didMount = () => {
    const urlOrigin = getUrlOrigin()
    getData(urlOrigin)
      .then(res => {
        if (res && res.data && res.data.success) {
          const {data} = res.data
          const newData = []
          data.map((item, index) => {
            newData.push({label: item.name, value: item.id})
          })
          changeListOrigin(newData)
        }
      })
      .catch(err => {
        console.log('error')
      })
  }
  const checkEmptyValue = (value, objMessage) => {
    if (!value || value === '') {
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: objMessage,
      })
    } else {
      const key = Object.keys(objMessage)[0]
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {[key]: ''},
      })
    }
  }
  const genValidText = (text, mess) => {
    if (!text || text === '') {
      return mess
    }
    return ''
  }
  const caculateWeight = dataGrid => {
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
      return 1
    }
  }
  const checkShipperPartner = () => {
    try {
      const {shipping_info} = state.new_order
      const partner = shipping_info.isSelected
      let partnerInfo = null
      if (partner) partnerInfo = shipping_info.partner[partner]
      if (!partnerInfo) {
        pass = false
        const listMessage = GlobalState.noti
        const newListMessage = {
          ...listMessage,
          ...{
            not_select_shipping_partner_yet: {
              type: '',
              autoHide: true,
              icon: 'fail',
              prefix: '',
              status: 'fail',
            },
          },
        }
        GlobalDispatch({
          type: 'UPDATE_MESSAGE',
          payload: newListMessage,
        })
      } else {
        const messSenderAddress = genValidText(
          partnerInfo.id_sender,
          'please_select_address',
        )
        const dataGrid = state.new_order.product_info
        // ----caculate weight-----------
        let weightProduct
        partnerInfo.weight
          ? (weightProduct = partnerInfo.weight)
          : (weightProduct = caculateWeight(dataGrid))
        if (!weightProduct) weightProduct = '1'
        const messWeight = genValidText(weightProduct, 'please_input_weight')
        // dimension is require for GHN ( id = 3)
        let messDimmension = ''
        if (!partnerInfo.lengh || !partnerInfo.width || !partnerInfo.height) {
          if (partner === '3') messDimmension = 'please_input_dimenson'
        }
        // if (partnerInfo.lengh && partnerInfo.width && partnerInfo.height) {
        //   messDimmension = "";
        // }
        const messRequestGood = genValidText(
          partnerInfo.request_goods,
          'please_input_request_good',
        )
        const messSendGood = genValidText(
          partnerInfo.recipient_view,
          'please_input_send_good',
        )
        const messCOD = genValidText(partnerInfo.cod, 'please_input_cod')
        // insurrance is require for GHTK ( id = 2)
        let messInssurance = ''
        partner === '2'
          ? (messInssurance = genValidText(
              partnerInfo.is_insurrance,
              'please_input_inssurance',
            ))
          : (messInssurance = '')
        let messInssuranceValue = ''
        if (partnerInfo.is_insurrance === '1') {
          messInssuranceValue = genValidText(
            partnerInfo.insurrance_value,
            'please_input_inssurance_value',
          )
        }
        //--------------
        const messPaymentSide = genValidText(
          partnerInfo.payment_method,
          'please_input_payment_side',
        )
        const messPartsign = genValidText(
          partnerInfo.partsign,
          'please_input_partside',
        )
        const messPickerShift = genValidText(
          partnerInfo.pick_shift,
          'please_input_pick_shift',
        )
        const messTranport = genValidText(
          partnerInfo.transport,
          'please_input_transport',
        )
        let obj = {}
        switch (partner) {
          case '1':
            obj = {
              [partner]: {
                weight: messWeight,
                insurrance_value: messInssuranceValue,
              },
            }
            if (messWeight || messInssuranceValue) TriggerError(obj)
            break
          case '2':
            obj = {
              [partner]: {
                weight: messWeight,
                is_insurrance: messInssurance,
                insurrance_value: messInssuranceValue,
              },
            }
            if (messWeight || messInssurance || messInssuranceValue) {
              TriggerError(obj)
            }
            break
          case '3':
            obj = {
              [partner]: {
                weight: messWeight,
                insurrance_value: messInssuranceValue,
                dimenson: messDimmension,
              },
            }
            if (messWeight || messDimmension || messInssuranceValue) {
              TriggerError(obj)
            }
            break
          case '4':
            obj = {
              [partner]: {
                weight: messWeight,
                insurrance_value: messInssuranceValue,
              },
            }
            if (messWeight || messInssuranceValue) TriggerError(obj)
            break
          default:
            break
        }
      }
    } catch (error) {}
  }
  const TriggerError = obj => {
    pass = false
    dispatch({
      type: 'UPDATE_MESSAGE',
      payload: obj,
    })
  }
  const checkProductList = () => {
    const listProduct = product_info
    if (!listProduct || !listProduct.length) {
      pass = false
      const listMessage = GlobalState.noti
      const newListMessage = {
        ...listMessage,
        ...{
          have_not_product_in_cart: {
            type: '',
            autoHide: true,
            icon: 'fail',
            prefix: '',
            status: 'fail',
          },
        },
      }
      GlobalDispatch({
        type: 'UPDATE_MESSAGE',
        payload: newListMessage,
      })
    }
  }
  const checkClientInfomation = () => {
    const customer = state.new_order.client_info
    const {order_info} = state.new_order
    const customer_name = genValidText(
      customer.name,
      'client_name_must_not_empty',
    )
    const input_phone = genValidText(customer.mobile, 'mobile_must_not_empty')
    const area = genValidText(
      customer.area.label,
      'provinces_district_must_not_empty',
    )
    const ward = genValidText(customer.ward.label, 'ward_must_not_empty')
    const address = genValidText(customer.address, 'address_must_not_empty')
    const origin = genValidText(order_info.origin.value, 'please_select_origin')
    if (customer_name || input_phone || area || ward || address || origin) {
      pass = false
      const newObjErr = {
        customer_name,
        input_phone,
        provi_dis: area,
        ward,
        address,
        origin,
      }
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: newObjErr,
      })
    }
  }
  const CreateBodyOrder = isCreate => {
    try {
      const {Total, Discount} = getTotalAndDiscount()
      const {product_info} = state.new_order
      const {shipping_info} = state.new_order
      const partner = shipping_info.isSelected
      const customer = state.new_order.client_info
      let partnerInfo = {}
      if (partner) partnerInfo = shipping_info.partner[partner]
      const priceboard =
        state.new_order.price_board.value === 'retail_price_board' ? '1' : '2'
      const data = new FormData()
      checkClientInfomation()
      checkShipperPartner()
      checkProductList()
      console.log(
        `valid neworder is + ====${pass}====${JSON.stringify(
          state.new_order.message,
        )}`,
      )
      if (!pass) {
        pass = true
        return
      }
      pass = true
      let weightProduct
      partnerInfo.weight
        ? (weightProduct = partnerInfo.weight)
        : (weightProduct = caculateWeight(product_info))
      const stagProduct = []
      product_info.map((v, i) => {
        const element = {
          product_id: v.product_id,
          product_id_details: v.product_id_details,
          product_model: v.product_model,
          quantity: v.quantity,
          price: v.price,
          total_price: v.total,
          display_price: v.display_price,
          discount: v.discount.value,
        }
        stagProduct.push(element)
      })
      if (!weightProduct) weightProduct = '1'
      // ('[{"product_id":"10849", "product_id_details":"1192","product_model" : "ao240305-33-T", "quantity":2,"price":"80000","total_price":160000,"discount":0}]');
      try {
        data.append('id_sender', partnerInfo.id_sender)
        data.append(
          'customers',
          `{"customer_id":"", "customer_name" : "${customer.name}", "customer_mobile": "${customer.mobile}", "customer_address": "${customer.address}", "city_id":${customer.area.value.city_id}, "district_id":${customer.area.value.district_id}, "ward_id":${customer.ward.value}}`,
        )
        data.append('total_amount', Total)
        data.append('total_discount', Discount)
        data.append('type_price', priceboard)
        data.append('warehouse_id', state.new_order.warehouse.value)
        data.append('item_details', JSON.stringify(stagProduct))
        data.append('weight', weightProduct)
        data.append('details', '')
        data.append('order_origin_id', state.new_order.order_info.origin.value)
        data.append('is_draft', isCreate ? '1' : '0')
        data.append('is_delivery', '1')
        data.append('cod', partnerInfo.cod || 0)
        data.append('width', partnerInfo.width || 0)
        data.append('height', partnerInfo.height || 0)
        data.append('lengh', partnerInfo.lengh || 0)
        data.append('is_insurrance', partnerInfo.is_insurrance || 0)
        data.append('insurrance_value', partnerInfo.insurrance_value || 0)
        data.append('recipient_view', partnerInfo.recipient_view || 0)
        data.append('request_goods', partnerInfo.request_goods)
        data.append('payment_method', partnerInfo.payment_method)
        data.append('note', partnerInfo.note || '')
        let datePicker = ''
        if (partner === '3') {
          try {
            datePicker = moment(partnerInfo.payment_method).format('YYYY-MM-DD')
          } catch (error) {
            datePicker = ''
            console.log(`error convert date-time${error}`)
          }
          datePicker && data.append('pick_date', datePicker) // ngày lấy : ghtk
          data.append('pick_shift', partnerInfo.pick_shift) // ca lấy
          data.append('transport', partnerInfo.transport) // van chuyen bang ?
        }
        data.append('partner_ship', partner)
        data.append('partsign', partnerInfo.partsign)
        if (['2', '4'].includes(partner)) {
          data.append('serviceID', shipping_info.serviceSelected.id || '')
          // data.append("serviceID", "VTK");
        }
        const url = getUrlCreateOrder()
        dispatch({type: 'CLEAR_MESSAGE'})
        postData(url, data)
          .then(res => {
            if (res && res.data) {
              if (res.data.success) {
                const listMessage = GlobalState.noti
                const newListMessage = {
                  ...listMessage,
                  ...{
                    create_order_success: {
                      type: '',
                      autoHide: true,
                      icon: 'success',
                      prefix: '',
                      status: 'success',
                    },
                  },
                }
                GlobalDispatch({
                  type: 'UPDATE_MESSAGE',
                  payload: newListMessage,
                })
                setTimeout(() => <Navigate exact to={PATH.ORDER} />, 1000)
              }
              if (!res.data.success) {
                handelErrorCreateOrder(res.data.errors)
              }
            }
            console.log(`done =========>${res}`)
          })
          .catch(error => {
            console.log(`error ============>${error}`)
          })
      } catch (error) {
        console.log(`error ============>${error}`)
      }
    } catch (error) {
      return null
    }
  }
  const handelErrorCreateOrder = err => {
    try {
      const code = err.code || ''
      const {details} = err
      let listMessage = GlobalState.noti
      const {shipping_info} = state.new_order
      const partner = shipping_info.isSelected
      listMessage = {
        ...listMessage,
        ...{
          [code]: {
            type: '',
            autoHide: true,
            icon: 'fail',
            prefix: '',
            status: 'fail',
          },
        },
      }
      GlobalDispatch({
        type: 'UPDATE_MESSAGE',
        payload: listMessage,
      })

      const customer_name = ''
      const input_phone = ''
      const ward = ''
      const address = ''
      let objTranError = {}
      const objClientOrderErr = {}
      // const listMessage = GlobalState.noti;
      details.map((v, i) => {
        switch (v.field) {
          case 'id_sender':
            objTranError = {...objTranError, ...{id_sender: v.code}}
            break
          case 'weight':
            objTranError = {...objTranError, ...{weight: v.code}}
            break
          case 'cod':
            objTranError = {...objTranError, ...{cod: v.code}}
            break
          case 'is_insurrance':
            objTranError = {...objTranError, ...{is_insurrance: v.code}}
            break
          case 'insurrance_value':
            objTranError = {...objTranError, ...{insurrance_value: v.code}}
            break
          case 'payment_method':
            objTranError = {...objTranError, ...{payment_method: v.code}}
            break
          case 'item_details':
            // const listMessage = GlobalState.noti;
            listMessage = {
              ...listMessage,
              ...{
                [v.code]: {
                  type: '',
                  autoHide: true,
                  icon: 'fail',
                  prefix: '',
                  status: 'fail',
                },
              },
            }
            // GlobalDispatch({
            //   type: "UPDATE_MESSAGE",
            //   payload: newListMessage,
            // });
            break
          case 'partner_ship':
            // const listMessage = GlobalState.noti;
            listMessage = {
              ...listMessage,
              ...{
                [v.code]: {
                  type: '',
                  autoHide: true,
                  icon: 'fail',
                  prefix: '',
                  status: 'fail',
                },
              },
            }
            // GlobalDispatch({
            //   type: "UPDATE_MESSAGE",
            //   payload: newListMessage,
            // });
            break
          // case "id_sender":
          //   customer_name = v.code
          //   break;
          // case "id_sender":
          //   customer_name = v.code
          //   break;
          default:
            break
        }
        GlobalDispatch({
          type: 'UPDATE_MESSAGE',
          payload: listMessage,
        })
        const newObj = {[partner]: objTranError}
        TriggerError(newObj)
      })
      const newObjErr = {
        customer_name,
        input_phone,
        // provi_dis: area,
        ward,
        address,
        origin,
      }
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: newObjErr,
      })
    } catch (error) {
      console.log(`error============${error}`)
    }
  }
  const getTotalAndDiscount = () => {
    let Total = 0
    let Discount = 0
    product_info.map((item, index) => {
      const price = convertStringToNumber(item.display_price)
      const objDis = item.discount
      const dis = convertStringToNumber(objDis.value)
      const quantity = convertStringToNumber(item.quantity)
      if (objDis.unit === 'đ') {
        Total += price * quantity - dis
        Discount += dis
      } else {
        Total = Total + price * quantity - (dis * price * quantity) / 100
        Discount += (dis * price * quantity) / 100
      }
    })
    return {Total, Discount}
  }
  useEffect(() => {
    didMount()
    return unMount()
  }, [])
  const {Total, Discount} = getTotalAndDiscount()
  const {message} = state.new_order
  const messOrigin = message.origin
  return (
    <div
      className="client-info-wrapper bg-order-cmp order-info-wrapper"
      // style={{
      //   marginTop: isCol1 ? "24px" : 0,
      // }}
    >
      <div className="title-client-info">{t('order_information')}</div>
      <div className="order-info-voucher-wrapper">
        <div className="label-input">Mã đơn hàng riêng</div>
        <input
          value={orderCode}
          onChange={e => onChangeCode(e)}
          className="upos-input voucher upos-text input-boderfocus-indent"
        />
      </div>
      <div className="order-info-source-wrapper">
        <div className="label-input">Nguồn đơn hàng</div>
        <AsyncDropdown
          listOption={listOrigin}
          placeHolderText="select-origin"
          type="async-option"
          customClass="adress-select-wrapper show-scroll-bar"
          cbAction={onAction}
          selected={selectOr}
          id="order-information-orgin-select"
        />
      </div>
      <div className="upos-error-text upos-animation-opacity upos-text">
        {t(messOrigin) || ''}
      </div>
      <div className="order-info-employee-wrapper">
        <div className="label-input">{t('employee')}</div>
        <div className="label-input">{GlobalState.user.fullname || '--'}</div>
      </div>

      <div className="discount-info">
        <div className="label-input">Giảm giá</div>
        <div className="label-input">{`${displayNumber(Discount)} ₫`}</div>
      </div>

      <div className="total-info">
        <div className="label-input">Tổng cộng</div>
        <div className="label-input">{`${displayNumber(Total)} ₫`}</div>
      </div>

      <div className="label-input payment-detail-tran">Ghi chú đơn hàng</div>
      <textarea
        onChange={e => onChangeNote(e)}
        value={textAre}
        className="upos-textare upos-text"
      />
      <ButtonGroup
        list={[
          {
            label: 'Lưu nháp',
            fnFunction: () => {
              dispatch({type: 'CLEAR_MESSAGE'})
              CreateBodyOrder()
            },
            customClass: 'save-draft',
          },
          {
            label: 'Tạo đơn hàng',
            fnFunction: () => {
              dispatch({type: 'CLEAR_MESSAGE'})
              CreateBodyOrder(true)
            },
            customClass: 'create-order',
          },
        ]}
      />
    </div>
  )
}
