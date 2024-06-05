import React, {useReducer} from 'react';
import {receiptReducer} from "../provider/~reducer";
import {receiptActions, receiptInitialState} from "../provider/~initState";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {RECEIPT_FILTER_FORM_GROUP_SUBMITTER} from "../interfaces/contant";

const useCreateReceipt = () => {
  const [state, dispatch] = useReducer(receiptReducer, receiptInitialState)
  const form = state?.formCreate?.form

  const handleFetchOrigin = async _ => {
    const response = await Promise.all([
      sendRequestAuth('get',`${config.API}/payment/payment-method?keyword&status=1&per_page=200&start=0`),
      sendRequestAuth('get',`${config.API}/cashbook/receipts-type/list?keyword=&status=1&per_page=200&start=0`),
      sendRequestAuth('get',`${config.API}/admin/employees?keyword=&group&status&per_page=200&start=0`),
      sendRequestAuth('get',`${config.API}/customer/customer-search?keyword=&status=1&group=&city_id=&district_id=&ward_id=&per_page=200&start=0`),
      sendRequestAuth('get',`${config.API}/supplier/suppliers?keyword=&status=1&per_page=200&start=0`),
      sendRequestAuth('get',`${config.API}/setting/shipping/partner-setting`),
    ])

    // Payment method
    if(response[0]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_LIST,
        payload: {
          list: response[0]?.data?.data,
          listOrigin: response[0]?.data?.data,
          value: response[0]?.data?.data?.find(item => +item.is_active === 1)
        }
      })
      dispatch({
        type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
        payload: {...form,
                  payment_method_id: response[0]?.data?.data?.find(item => +item.is_active === 1)?.id,
                  dt_record: new Date()
        }
      })
    }
    // Type receipt
    if(response[1]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_LIST,
        payload: {
          list: response[1]?.data?.data?.filter(item => +item.is_default !== 1),
          listOrigin: response[1]?.data?.data?.filter(item => +item.is_default !== 1)
        }
      })
    }
    // Employee create
    if(response[2]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_EMPLOYEE_LIST,
        payload: {
          list: response[2]?.data?.data?.map(item => {
            item.id = item.user_id
            item.name = item.fullname
            return item
          })?.filter(item => +item.status === 1 || +item.is_shop_manage === 1),
          listOrigin: response[2]?.data?.data?.map(item => {
            item.id = item.user_id
            item.name = item.fullname
            return item
          })?.filter(item => +item.status === 1 || +item.is_shop_manage === 1)
        }
      })
    }
    // Customer
    if(response[3]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_CUSTOMER_LIST,
        payload: {
          list: response[3]?.data?.data,
          listOrigin: response[3]?.data?.data
        }
      })
    }
    // Supplier
    if(response[4]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_SUPPLIER_LIST,
        payload: {
          list: response[4]?.data?.data?.map(item => {
            item.id = item.supplier_id
            item.name = item.supplier_name
            return item
          }),
          listOrigin: response[4]?.data?.data?.map(item => {
            item.id = item.supplier_id
            item.name = item.supplier_name
            return item
          })
        }
      })
    }
    // Partner ship
    if(response[5]?.data?.success) {
      dispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_PARTNER_SHIP_LIST,
        payload: {
          list: response[5]?.data?.data?.filter(item => item.connected),
          listOrigin: response[5]?.data?.data?.filter(item => item.connected)
        }
      })
    }
    // Group submitter
    dispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_LIST,
      payload: {
        list: RECEIPT_FILTER_FORM_GROUP_SUBMITTER.filter(item => item?.id !== 0),
        listOrigin: RECEIPT_FILTER_FORM_GROUP_SUBMITTER.filter(item => item?.id !== 0)
      }
    })
  }

  return {
    provider: {
      state,
      dispatch
    },
    fetch: {
      origin: handleFetchOrigin
    }
  }
}

export default useCreateReceipt;