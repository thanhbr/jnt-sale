import React, {useContext, useState} from 'react';
import {transformOriginData} from "../utils/transformOriginData";
import {userDeliveryOverviewActions} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {DeliveryOverviewContext} from "../provider/~context";
import {formatDatetime} from "../utils/_functions";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {getDateFromNow} from "../utils/date";
import {SCRIPT} from "../interfaces/~scripts";
import StringUtils from "../../productGroup/util/string";
import {useProductAction} from "../../productGroup/provider/_reducer";

const UseDeliveryOverviewFilter = () => {
  const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
  const [tabActive, setTabActive] = useState(SCRIPT.TABS.TAB_1)
//delivery date
  const deliveryDate = pageState.date?.delivery
  const splitDeliveryDate = deliveryDate?.format_date.split(' - ')
  const start_delivery = convertDateTimeToApiFormat(splitDeliveryDate[0])
  const end_delivery = convertDateTimeToApiFormat(splitDeliveryDate[1])

  //for control date
  const controlDate = pageState.date?.for_control
  const splitControlDate = controlDate?.format_date.split(' - ')
  const start_control = convertDateTimeToApiFormat(splitControlDate[0])
  const end_control = convertDateTimeToApiFormat(splitControlDate[1])

  //bill and fee
  const billDate = pageState.date?.bill_lading
  const splitBillDate = billDate?.format_date.split(' - ')
  const start_bill = convertDateTimeToApiFormat(splitBillDate[0])
  const end_bill = convertDateTimeToApiFormat(splitBillDate[1])

  //part sign date
  const partSignDate = pageState.date?.one_part
  const splitPartSignDate = partSignDate?.format_date.split(' - ')
  const start_part_sign = convertDateTimeToApiFormat(splitPartSignDate[0])
  const end_part_sign = convertDateTimeToApiFormat(splitPartSignDate[1])
  const collectOriginData = data => {
    const fields = [
      'shippingPartnerListData',
    ]
    let collections = {}
    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })
    pageDispatch({
      type: userDeliveryOverviewActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  const handleDeliveryOverview = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/order/shipping/partner`),
    ])
    collectOriginData(response)
  }
  const shippingPartnerActiveValue = pageState.filter.shippingPartner.activeValue
  const shippingPartnerList = pageState.filter.shippingPartner.list
  const shippingPartnerValue = pageState.filter.shippingPartner.value
  const handleChangeTab = (e) =>  setTabActive(e.target.textContent)
  const handleFetchData = async ()=>{
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/delivery/overview/delivery?partner_id=1&start_date=${start_delivery}&end_date=${end_delivery}`),
      sendRequestAuth('get', `${config.API}/delivery/overview/for-control?partner_id=1&start_date=${start_control}&end_date=${end_control}`),
      sendRequestAuth('get', `${config.API}/delivery/overview/total-delivery?partner_id=1&start_date=${start_bill}&end_date=${end_bill}`),
      sendRequestAuth('get', `${config.API}/delivery/overview/partsign?partner_id=1&start_date=${start_part_sign}&end_date=${end_part_sign}`),
    ])
    if (
        !!response[0]?.data?.success ||
        !!response[1]?.data?.success ||
        !!response[2]?.data?.success ||
        !!response[3]?.data?.success
    ) {
      pageDispatch({
        type: userDeliveryOverviewActions.DELIVERY_OVER_VIEW,
        payload: {
          arr_status: response[0]?.data.data?.arr_status.map(item => item?.status_name) || [],
          total_cod: response[0]?.data.data?.arr_status.map(item => item?.total_cod),
          total_orders: response[0]?.data.data?.arr_status.map(item => item?.total_orders),
          list_option_delivery: response[0]?.data.data?.arr_status,
          total_order_delivery:response[0]?.data.data.total_orders
        }
      })
      pageDispatch({
        type: userDeliveryOverviewActions.OVER_VIEW_FOR_CONTROL, payload: {
          data: response[1]?.data.data,
          arr_percent: response[1]?.data.data.map(item => item.orders_percent),
          meta: response[1]?.data.meta
        }
      })
      pageDispatch({
        type: userDeliveryOverviewActions.DELIVERY_BILL_FEE, payload: {
          data: response[2]?.data.data?.arr_status,
          arr_status: response[2]?.data.data?.arr_status.map(item => item?.status_name),
          arr_total_cod: response[2]?.data.data?.arr_status.map(item => item?.total_cod),
          arr_total_orders: response[2]?.data.data?.arr_status.map(item => item?.total_orders),
          total_orders: response[2]?.data.data?.total_orders,
          avg_fee: response[2]?.data.data?.avg_fee,
          total_fee: response[2]?.data.data?.total_fee,
          total_cod: response[2]?.data.data?.total_cod,
          arr_cod_percent: response[2]?.data.data?.arr_status.map(item => item?.arr_cod_percent),
          arr_order_percent: response[2]?.data.data?.arr_status.map(item => item?.arr_orders_percent),
        }
      })
      pageDispatch({
        type: userDeliveryOverviewActions.DELIVERY_SIGN_ONE_PART, payload: {
          data: response[3]?.data.data?.arr_status,
          arr_status: response[3]?.data.data?.arr_status.map(item => item?.status_name),
          arr_total_cod: response[3]?.data.data?.arr_status.map(item => item?.total_cod),
          arr_total_orders: response[3]?.data.data?.arr_status.map(item => item?.total_orders),
          total_orders: response[3]?.data.data?.total_orders,
          avg_fee: response[3]?.data.data?.avg_fee,
          total_fee: response[3]?.data.data?.total_fee,
          total_cod: response[3].data.data?.total_cod,
          arr_cod_percent: response[3]?.data.data?.arr_status.map(item => item?.arr_cod_percent),
          arr_order_percent: response[3]?.data.data?.arr_status.map(item => item?.arr_orders_percent),
          total_signart: response[3]?.data.data.total_signart,
          total_return: response[3]?.data.data.total_return,
          total_delivering: response[3]?.data.data.total_delivering,
          total_totality: response[3]?.data.data.total_totality,
        }
      })
      pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL, payload: true})
      pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_BILL_LADING, payload: true})
      pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN, payload: true})
      pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_DELIVERY, payload: true})
    }
  }
  const handleShippingPartnerChange=(e)=>{
    let nameShipping = pageState.filter.shippingPartner.activeValue
    if(e?.name !== nameShipping){
      pageDispatch({type:userDeliveryOverviewActions.FILTER_SHIPPING_PARTNER,payload:{
          list: shippingPartnerList,
          activeValue:e?.name,
          value:e?.value ? e?.value: ''}})
      pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL,payload:false})
      pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_BILL_LADING, payload: false})
      pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_DELIVERY,payload:false})
      pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN,payload:false})
      handleFetchData()
    }
  }
  const searchkeyWord = (data) => {
    const formatDataValue = data?.value
        ? StringUtils.removeAcent(data?.value?.toLowerCase())
        : ''
    const listData = pageState.filter?.shippingPartner?.listOrigin.filter(item => {
      const formatNameItem = item?.name
          ? StringUtils.removeAcent(item?.name.toLowerCase())
          : ''
      if (formatNameItem.includes(formatDataValue.trim())) return true
      return false
    })
    if(data?.value == ''){
      pageDispatch({type:userDeliveryOverviewActions.SEARCH_SHIPPING_PARTNER,payload:pageState.filter?.shippingPartner?.listOrigin})
      pageDispatch({type:userDeliveryOverviewActions.KEY_WORD_SHIPPING,payload:formatDataValue})
    }else {
      pageDispatch({type:userDeliveryOverviewActions.SEARCH_SHIPPING_PARTNER,payload:listData})
      pageDispatch({type:userDeliveryOverviewActions.KEY_WORD_SHIPPING,payload:formatDataValue})
    }

  }
  return {
    fetch: {
      deliveryOverview: handleDeliveryOverview,
    },
    shippingPartner: {
      activeValue: shippingPartnerActiveValue,
      // keyword: shippingPartnerKeyword,
      list: shippingPartnerList,
      value: shippingPartnerValue,
      onChange: handleShippingPartnerChange,
      onKeywordChange: searchkeyWord,
    },
    functions: {
      handleChangeTab
    },
    value: {
      tabActive
    }
  }
};

export default UseDeliveryOverviewFilter;