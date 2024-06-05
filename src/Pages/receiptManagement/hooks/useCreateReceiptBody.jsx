import React, {useCallback, useContext, useState} from 'react';
import {ReceiptManagementContext} from "../provider/context";
import {receiptActions} from "../provider/~initState";
import {RECEIPT_FILTER_FORM_GROUP_SUBMITTER} from "../interfaces/contant";
import {removeAcent} from "../../../common/fieldText/_functions";
import useGlobalContext from "../../../containerContext/storeContext";
import {debounce} from '@mui/material'
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import StringUtils from "../../orderSingle/utils/string";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";
import toast from "../../../Component/Toast";
import {useNavigate} from "react-router-dom";

const useCreateReceiptBody = () => {
  const {pageState, pageDispatch} = useContext(ReceiptManagementContext)
  const [GlobalState, ] = useGlobalContext()

  const form = pageState?.formCreate?.form
  const validateState = pageState?.formCreate?.validate
  const fetch = pageState?.formCreate?.fetch

  const groupSubmitter = fetch?.groupSubmitter
  const submitter = fetch?.submitter
  const customer = fetch?.customer
  const supplier = fetch?.supplier
  const employee = fetch?.employee
  const partnerShip = fetch?.partnerShip
  const typeReceipt = fetch?.typeReceipt
  const paymentMethod = fetch?.paymentMethod
  const currentUser = GlobalState?.user
  const currentShopInfo = GlobalState?.shopInfo
  const navigate =  useNavigate()

  // ======= Group Submitter =========
  const groupSubmitterListOrigin = RECEIPT_FILTER_FORM_GROUP_SUBMITTER.filter(item => item?.id !== 0)

  const handleGroupSubmitterValue = data => {
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_VALUE,
      payload: data
    })
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, object_type: data?.code}
    })
    switch (data?.id) {
      case 1:
        pageDispatch({
          type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST,
          payload: {
            list: supplier?.listOrigin,
            listOrigin: supplier?.listOrigin,
            type: 'supplier',
            value: submitter?.type === 'supplier' ? submitter?.value : []
          }
        })
        break
      case 2:
        pageDispatch({
          type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST,
          payload: {
            list: customer?.listOrigin,
            listOrigin: customer?.listOrigin,
            type: 'customer',
            value: submitter?.type === 'customer' ? submitter?.value : []
          }
        })
        break
      case 3:
        pageDispatch({
          type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST,
          payload: {
            list: employee?.listOrigin,
            listOrigin: employee?.listOrigin,
            type: 'user',
            value: submitter?.type === 'user' ? submitter?.value : []
          }
        })
        break
      case 4:
        pageDispatch({
          type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST,
          payload: {
            list: partnerShip?.listOrigin,
            listOrigin: partnerShip?.listOrigin,
            type: 'partner_ship',
            value: submitter?.type === 'partner_ship' ? submitter?.value : []
          }
        })
        break
      case 5:
        pageDispatch({
          type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST,
          payload: {
            type: 'other',
            value: submitter?.type === 'other' ? submitter?.value : []
          }
        })
        break
      default: ''
    }
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState, groupSubmitter: { status: false, message: ''}}
    })
  }
  const handleGroupSubmitChangeKeyword = keyword => {
    const formatDataValue = keyword
      ? removeAcent(keyword?.trim()?.toLowerCase())
      : ''
    const groupSubmitterListData = [...groupSubmitterListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item?.name?.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]

    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_UPDATE_LIST,
      payload: {
        list: groupSubmitterListData,
        listOrigin: groupSubmitterListOrigin
      }
    })
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_KEYWORD,
      payload: keyword
    })
  }
  // ======= End Group Submitter =========


  // ======= Submitter =========
  const submitterListOrigin = submitter?.listOrigin
  const linkDetail =
    submitter?.type === 'customer'
      ? `/partner-management/customer?keyword=${submitter?.value?.mobile}`
      : submitter?.type === 'supplier'
        ? `/partner/suppliers?search=${submitter?.value?.supplier_code}`
        : submitter?.type === 'user'
          ? `/users?search=${submitter?.value?.fullname}`
          : `/shipping/shipping-partners?id=${submitter?.value?.id}`

  const handleSubmitterValue = data => {
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_VALUE,
      payload: data
    })
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, object_id: data?.id}
    })
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState, submitter: { status: data?.id?.length > 50, message: data?.id?.length > 50 ? 'Người nộp chỉ được phép nhập tối đa 50 ký tự' : ''}}
    })
  }

  const handleSubmitterOther = other => {
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_OTHER,
      payload: other
    })
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, object_id: other}
    })
  }

  const fetchCustomerData = async qs => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth('get',`${config.API}/customer/customer-search${queryString}`)
    if(response?.data?.success) {
      pageDispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST_UPDATE,
        payload: {
          list: response?.data?.data,
          listOrigin: response?.data?.data,
        }
      })
    }
  }

  const debounceCustomerKeywordChange = useCallback(
    debounce(data => {
      fetchCustomerData({
        keyword: data?.trim(),
        per_page: 100,
        start: 0
      })
    }, 500),
    [],
  )

  const handleCustomerKeywordChange = keyword => {
    if(submitter?.type === 'customer') {
      debounceCustomerKeywordChange(keyword)
    } else {
      const formatDataValue = keyword
        ? removeAcent(keyword?.trim()?.toLowerCase())
        : ''
      const submitterListData = [...submitterListOrigin.filter(item => {
        const formatNameItem = item?.name
          ? removeAcent(item?.name?.toLowerCase())
          : ''
        return formatNameItem.includes(formatDataValue)
      })]
      pageDispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST_UPDATE,
        payload: {
          list: submitterListData,
          listOrigin: submitterListOrigin,
        }
      })
    }
  }

  const handleReceiptTypeValue = data => {
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_VALUE,
      payload: data
    })
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, receipt_type_id: data?.id || ''}
    })
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState, typeReceipt: { status: false, message: ''}}
    })
  }
  // ======= End Submitter =========

  // ========= Receipt Type =======
  const typeReceiptListOrigin = typeReceipt?.listOrigin || []
  const handleReceiptTypeKeywordChange = keyword => {
    const formatDataValue = keyword
      ? removeAcent(keyword?.trim()?.toLowerCase())
      : ''
    const typeReceiptListData = [...typeReceiptListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item?.name?.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_KEYWORD,
      payload: {
        keyword: keyword,
        list: typeReceiptListData
      }
    })
  }
  // ========= End Receipt Type =======


  // ========= Receipt Code ============
  const handleChangeReceiptCode = keyword => {
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, receipt_code: keyword}
    })
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState,
        receiptCode: { status: form?.receipt_code?.length > 50 || (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code),
          message: form?.receipt_code?.length > 50 ? 'Mã phiếu thu chỉ được phép nhập tối đa 50 ký tự' :
            (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code)
              ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt' : ''}
      }
    })
  }
  // ========= End Receipt Code ============


  // ======== Payment Method =============
  const paymentMethodListOrigin = paymentMethod?.listOrigin
  const handlePaymentMethodValue = data => {
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_VALUE,
      payload: data
    })
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, payment_method_id: data?.id}
    })
  }
  const handlePaymentMethodKeywordChange = keyword => {
    const formatDataValue = keyword
      ? removeAcent(keyword?.trim()?.toLowerCase())
      : ''
    const paymentMethodListData = [...paymentMethodListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item?.name?.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_KEYWORD,
      payload: {
        keyword: keyword,
        list: paymentMethodListData,
      }
    })
  }
  const handleChangeTotalAmount = amount => {
    const result = +(amount?.split(',')?.reduce((p, n) => p + n))
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, total_amount: result}
    })
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState, revenueValue: { status: !!!form?.total_amount || +form?.total_amount === 0,
                                                  message: !!!form?.total_amount ? 'Giá trị thu không được để trống'
                                                    : +form?.total_amount === 0 ? 'Giá trị thu cần > 0' : ''}}
    })
  }
  // ======== End Payment Method =============

  const handleChangeDateTime = date => {
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, dt_record: date?.value}
    })
  }

  const handleChangeReferenceCode = keyword => {
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, reference_code: StringUtils.formatOrderCode(keyword)}
    })
  }

  const handleChangeDescription = keyword => {
    pageDispatch({
      type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
      payload: {...form, description: keyword}
    })
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState, description: {status: form?.description?.length > 255,
                                      message: form?.description?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}}
    })
  }

  const handleBlurFormCreate = type => {
    switch (type) {
      case 'code':
        pageDispatch({
          type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
          payload: {...validateState,
            receiptCode: { status: form?.receipt_code?.length > 50 || (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code),
              message: form?.receipt_code?.length > 50 ? 'Mã phiếu thu chỉ được phép nhập tối đa 50 ký tự' :
                (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code)
                  ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt' : ''}
          }
        })
        break
      case 'revenue':
        pageDispatch({
          type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
          payload: {...validateState, revenueValue: { status: !!!form?.total_amount || +form?.total_amount === 0,
              message: !!!form?.total_amount ? 'Giá trị thu không được để trống'
                : +form?.total_amount === 0 ? 'Giá trị thu cần > 0' : ''}}
        })
        break
      case 'description':
        pageDispatch({
          type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
          payload: {...validateState, description: {status: form?.description?.length > 255,
              message: form?.description?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}}
        })
        break
      case 'submitter':
        pageDispatch({
          type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
          payload: {...validateState,
            submitter: { status: !!!form?.object_id || form?.object_id?.length > 50,
              message: !!!form?.object_id ? 'Người nộp không được để trống' :
                form?.object_id?.length > 50 ? 'Người nộp chỉ được phép nhập tối đa 50 ký tự' : ''}
          }
        })
        break
      default: ''
    }
  }

  const validateForm = _ => {
    pageDispatch({
      type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
      payload: {...validateState,
                  groupSubmitter: { status: !!!form?.object_type,
                                    message: !!!form?.object_type ? 'Nhóm người nộp không được để trống' : ''},
                  submitter: { status: !!!form?.object_id || form?.object_id?.length > 50,
                                message: !!!form?.object_id ? 'Người nộp không được để trống' :
                                            form?.object_id?.length > 50 ? 'Người nộp chỉ được phép nhập tối đa 50 ký tự' : ''},
                  typeReceipt: { status: !!!form?.receipt_type_id,
                                message: !!!form?.receipt_type_id ? 'Loại phiếu thu không được để trống' : ''},
                  receiptCode: { status: form?.receipt_code?.length > 50 || (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code),
                                message: form?.receipt_code?.length > 50 ? 'Mã phiếu thu chỉ được phép nhập tối đa 50 ký tự' :
                                        (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code)
                                            ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt' : ''},
                  revenueValue: {status: !!!form?.total_amount || +form?.total_amount === 0,
                                message: !!!form?.total_amount ? 'Giá trị thu không được để trống'
                                        : +form?.total_amount === 0 ? 'Giá trị thu cần > 0' : ''},
                  description: {status: form?.description?.length > 255,
                                message: form?.description?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}
                }
    })
    return !!!form?.object_type || !!!form?.object_id || form?.object_id?.length > 50
          || !!!form?.receipt_type_id || form?.receipt_code?.length > 50 || (!form?.receipt_code?.match(REGEX_CUSTOMER_CODE) && !!form?.receipt_code)
          || !!!form?.total_amount || +form?.total_amount === 0 || form?.description?.length > 255
  }

  // console.log('form', form)
  // console.log('validateState', validateState)

  const canSubmitForm = [
    validateState?.groupSubmitter?.status,
    validateState?.submitter?.status,
    validateState?.typeReceipt?.status,
    validateState?.receiptCode?.status,
    validateState?.revenueValue?.status,
    validateState?.description?.status,
    form?.reference_code?.length > 30
  ].includes(true)

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const submitCreate = async _ => {
    if(debounceSubmit && !validateForm()) {
      setDebounceSubmit(false)
      setTimeout(() => {
        setDebounceSubmit(true)
      }, 2000)
      const dateState = form?.dt_record
      const dateFormat = ("0" + dateState.getDate()).slice(-2) + "/" + ("0"+(dateState.getMonth()+1)).slice(-2) + "/" +
        dateState.getFullYear() + " " + ("0" + dateState.getHours()).slice(-2) + ":" + ("0" + dateState.getMinutes()).slice(-2)

      const dataPost = {...form, dt_record: convertDateTimeToApiFormat(dateFormat)}

      const response = await sendRequestAuth(
        'post',
        `${config.API}/cashbook/receipts/create`, JSON.stringify(dataPost),
      ).catch(() => toast.error('Thêm mới phiếu thu thất bại'))
      if(response?.data?.success) {
        navigate('/accountant/receipts')
        toast.success('Thêm mới phiếu thu thành công')
      } else {
        toast.error('Thêm mới phiếu thu thất bại')
        response?.data?.errors?.details?.map(item => {
          console.log('item', item)
          if(item.code === 5111) {
            pageDispatch({
              type: receiptActions.VALIDATE_FORM_CREATE_RECEIPT,
              payload: {
                ...validateState,
                receiptCode: {
                  status: true,
                  message: item?.message || ''
                },
              }
            })
          }
        })
      }
    }
  }

  // console.log('form', form)
  // console.log('validateState', validateState)

  return {
    data: {
      groupSubmitter,
      submitter,
      linkDetail,
      typeReceipt,
      paymentMethod,
      currentUser,
      currentShopInfo
    },
    form,
    methods: {
      handleGroupSubmitterValue,
      handleGroupSubmitChangeKeyword,

      handleSubmitterValue,
      handleSubmitterOther,
      handleCustomerKeywordChange,

      handleReceiptTypeValue,
      handleReceiptTypeKeywordChange,

      handleChangeReceiptCode,

      handlePaymentMethodValue,
      handlePaymentMethodKeywordChange,

      handleChangeTotalAmount,

      handleChangeDateTime,
      handleChangeReferenceCode,
      handleChangeDescription,

      handleBlurFormCreate,

      submitCreate,
    },
    canSubmitForm,
    validateState
  }
}

export default useCreateReceiptBody;