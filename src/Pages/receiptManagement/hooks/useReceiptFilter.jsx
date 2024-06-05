import React, {useCallback, useContext} from 'react'
import {ReceiptManagementContext} from "../provider/context"
import { debounce } from '@mui/material'
import {sendRequestAuth} from "../../../api/api"
import config from "../../../config"
import {receiptActions} from "../provider/~initState"
import {removeAcent} from "../../../common/fieldText/_functions"
import {DateRangePicker} from "rsuite";
import {getDateFromNow} from "../../refactorOrder/utils/date";
import {useSearchParams} from "react-router-dom";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";

const useReceiptFilter = () => {
  const {pageState, pageDispatch} = useContext(ReceiptManagementContext)
  const filter = pageState?.filter

  const queries = {
    keyword: filter?.keyword || '',
    start_date:
      filter?.dateTime?.start && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[0])
        : '',
    end_date:
      filter?.dateTime?.end && filter?.dateTime.value
        ? convertDateTimeToApiFormat(filter?.dateTime?.value?.split(' - ')[1])
        : '',
    object_type: filter?.groupSubmitter?.value?.code || '',
    payment_method_id: filter?.paymentMethod?.value?.map(item => item.id)?.join(',') || '',
    user_id: filter?.employeeCreate?.value?.map(item => item.user_id)?.join(',') || '',
    receipt_type_id: filter?.typeReceipt?.value?.map(item => item.id)?.join(',') || '',
    status: filter?.status || '',
    per_page: filter?.per_page || 20,
    start: filter?.start || 0,
  }

  const fetchReceipt = async (qs) => {
    pageDispatch({type: receiptActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth( 'get', `${config.API}/cashbook/receipts/list${queryString}`,)
    if (response?.data?.success) {
      const receipts = response?.data?.data
      pageDispatch({type: receiptActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: receipts, loading: false}})
      pageDispatch({type: receiptActions?.TABLE_PAGINATION_UPDATE,
        payload: {active: response?.data?.meta?.start,
          amount: response?.data?.meta?.per_page,
          total: Math.ceil(response?.data?.meta?.total / response?.data?.meta?.per_page),
          totalItems: response?.data?.meta?.total}})
    }
  }

  const handleChangeSearch = e => {
    pageDispatch({type: receiptActions.FILTER_CHANGE_SEARCH_KEYWORD, payload: e.target.value})
    debounceChangeSearch(e.target.value)
  }

  const debounceChangeSearch = useCallback(debounce((data) => {
    fetchReceipt({...queries, keyword: data?.trim()})
  }, 500), [])

  // ===== ===== ===== DATE TIME ===== ===== =====
  const [searchParams, setSearchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    querySearch ? '' : getDateFromNow(-7, {type: 'start'}),
    querySearch ? '' : getDateFromNow(0, {type: 'end'}),
  ]
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data => {
    pageDispatch({
      type: receiptActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })
  }
  // ===== ===== ===== END DATE TIME ===== ===== =====



  //========= GROUP SUBMITTER ===============
  const groupSubmitterActiveValue = filter?.groupSubmitter?.activeValue
  const groupSubmitterKeyword = filter?.groupSubmitter?.keyword
  const groupSubmitterList = filter?.groupSubmitter?.list
  const groupSubmitterListOrigin = filter?.groupSubmitter?.listOrigin
  const groupSubmitterValue = filter?.groupSubmitter?.value

  const handleGroupSubmitterChange = cate => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE,
      payload: cate
    })
  }

  const handleGroupSubmitterKeywordChange = cate => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_GROUP_SUBMITTER_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const groupSubmitterListData = [...groupSubmitterListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_LIST,
      payload: groupSubmitterListData
    })
  }
  //========= END GROUP SUBMITTER ==========


  //========= PAYMENT METHOD ===============
  const paymentMethodActiveValue = filter?.paymentMethod?.activeValue
  const paymentMethodKeyword = filter?.paymentMethod?.keyword
  const paymentMethodList = filter?.paymentMethod?.list
  const paymentMethodListOrigin = filter?.paymentMethod?.listOrigin
  const paymentMethodValue = filter?.paymentMethod?.value
  const paymentMethodTab = filter?.paymentMethod?.tab

  const handleChangePaymentMethod = data => {
    const paymentMethodListData =
      paymentMethodTab === 'checked'
        ? paymentMethodValue.filter(item => +item.id !== +data.id)
        : paymentMethodList
    const result = !!paymentMethodValue?.find(item => +item.id === +data?.id)
                    ? paymentMethodValue?.filter(item => +item.id !== +data?.id)
                    : [...paymentMethodValue, data]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE,
      payload: {list: paymentMethodListData, value: result}
    })
    if(paymentMethodListData?.length === 0) {
      pageDispatch({
        type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE,
        payload: {
          list: paymentMethodListOrigin,
          tab: 'all',
        },
      })
    }
  }

  const handlePaymentMethodKeywordChange = cate => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const paymentMethodListData = [...paymentMethodListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE,
      payload: {list: paymentMethodListData, value: paymentMethodValue}
    })
  }

  const handlePaymentMethodResetInput = _ =>
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE,
      payload: {list: paymentMethodListOrigin, value: []}
    })

  const handlePaymentMethodTabChange = tab => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? paymentMethodValue : paymentMethodListOrigin,
        tab,
      },
    })
  }

  //========= END PAYMENT METHOD ===============


  //========= EMPLOYEE ===============
  const employeeCreateActiveValue = filter?.employeeCreate?.activeValue
  const employeeCreateKeyword = filter?.employeeCreate?.keyword
  const employeeCreateList = filter?.employeeCreate?.list
  const employeeCreateListOrigin = filter?.employeeCreate?.listOrigin
  const employeeCreateValue = filter?.employeeCreate?.value
  const employeeCreateTab = filter?.employeeCreate?.tab

  const handleChangeEmployeeCreate = data => {
    const employeeCreateListData =
      employeeCreateTab === 'checked'
        ? employeeCreateValue.filter(item => +item.user_id !== +data.user_id)
        : employeeCreateList
    const result = !!employeeCreateValue?.find(item => +item.user_id === +data?.user_id)
      ? employeeCreateValue?.filter(item => +item.user_id !== +data?.user_id)
      : [...employeeCreateValue, data]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE,
      payload: {list: employeeCreateListData, value: result}
    })
    if(employeeCreateListData?.length === 0) {
      pageDispatch({
        type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE,
        payload: {
          list: employeeCreateListOrigin,
          tab: 'all',
        },
      })
    }
  }

  const handleEmployeeCreateKeywordChange = cate => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const employeeCreateListData = [...employeeCreateListOrigin.filter(item => {
      const formatNameItem = item?.fullname
        ? removeAcent(item.fullname.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE,
      payload: {list: employeeCreateListData, value: employeeCreateValue}
    })
  }

  const handleEmployeeCreateResetInput = _ =>
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE,
      payload: {list: employeeCreateListOrigin, value: []}
    })

  const handleEmployeeCreateTabChange = tab => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? employeeCreateValue : employeeCreateListOrigin,
        tab,
      },
    })
  }
  //========= END EMPLOYEE ===============


  //========= TYPE RECEIPT ===============
  const typeReceiptActiveValue = filter?.typeReceipt?.activeValue
  const typeReceiptKeyword = filter?.typeReceipt?.keyword
  const typeReceiptList = filter?.typeReceipt?.list
  const typeReceiptListOrigin = filter?.typeReceipt?.listOrigin
  const typeReceiptValue = filter?.typeReceipt?.value
  const typeReceiptTab = filter?.typeReceipt?.tab


  const handleChangeTypeReceipt = data => {
    const typeReceiptListData =
      typeReceiptTab === 'checked'
        ? typeReceiptValue.filter(item => +item.id !== +data.id)
        : typeReceiptList
    const result = !!typeReceiptValue?.find(item => +item.id === +data?.id)
      ? typeReceiptValue?.filter(item => +item.id !== +data?.id)
      : [...typeReceiptValue, data]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE,
      payload: {list: typeReceiptListData, value: result}
    })
    if(typeReceiptListData?.length === 0) {
      pageDispatch({
        type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE,
        payload: {
          list: typeReceiptListOrigin,
          tab: 'all',
        },
      })
    }
  }

  const handleTypeReceiptKeywordChange = cate => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_CHANGE_KEYWORD,
      payload: cate?.value
    })
    const formatDataValue = cate?.value
      ? removeAcent(cate?.value?.trim()?.toLowerCase())
      : ''
    const typeReceiptListData = [...typeReceiptListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item?.name?.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })]
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE,
      payload: {list: typeReceiptListData, value: typeReceiptValue}
    })
  }

  const handleTypeReceiptResetInput = _ =>
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE,
      payload: {list: typeReceiptListOrigin, value: []}
    })

  const handleTypeReceiptTabChange = tab => {
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? typeReceiptValue : typeReceiptListOrigin,
        tab,
      },
    })
  }
  //========= END TYPE RECEIPT ===============


  const applyOrderOtherFilter = _ => {
    fetchReceipt(queries)

    // Datetime
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
      payload: {
        end: filter?.dateTime?.end,
        start: filter?.dateTime?.start,
        type: filter?.dateTime?.type,
        value: filter?.dateTime?.value,
      }
    })
    // Group submitter
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE,
      payload: filter?.groupSubmitter?.value
    })
    // Payment method
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE,
      payload: filter?.paymentMethod?.value
    })
    // Employee create
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE,
      payload: filter?.employeeCreate?.value
    })
    // Type receipt
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE,
      payload: filter?.typeReceipt?.value
    })
  }

  const filterTagDelete = type => {
    switch (type) {
      case 'dateTime':
        pageDispatch({
          type: receiptActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
          payload: []
        })
        pageDispatch({
          type: receiptActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: !dateTimeTrigger
        })
        pageDispatch({
          type: receiptActions.FILTER_DATE_TIME_UPDATE,
          payload: {
            end: '',
            start: '',
            type: 'create',
            value: '',
          },
        })
        fetchReceipt({...queries, start_date: '', end_date: ''})
        break
      case 'groupSubmitter':
        pageDispatch({
          type: receiptActions.FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE,
          payload: []
        })
        pageDispatch({
          type: receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE,
          payload: {list: groupSubmitterList, value: []}
        })
        fetchReceipt({...queries, object_type: ''})
        break
      case 'paymentMethod':
        pageDispatch({
          type: receiptActions.FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE,
          payload: []
        })
        pageDispatch({
          type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE,
          payload: {list: paymentMethodListOrigin, value: []}
        })
        fetchReceipt({...queries, payment_method_id: ''})
        break
      case 'employeeCreate':
        pageDispatch({
          type: receiptActions.FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE,
          payload: []
        })
        pageDispatch({
          type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE,
          payload: {list: employeeCreateListOrigin, value: []}
        })
        fetchReceipt({...queries, user_id: ''})
        break
      case 'typeReceipt':
        pageDispatch({
          type: receiptActions.FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE,
          payload: []
        })
        pageDispatch({
          type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE,
          payload: {list: typeReceiptListOrigin, value: []}
        })
        fetchReceipt({...queries, receipt_type_id: ''})
        break
      default: ''
    }
  }

  const handleDeleteAll = _ => {
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
      payload: []
    })
    pageDispatch({
      type: receiptActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
      payload: !dateTimeTrigger
    })
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE,
      payload: []
    })
    pageDispatch({
      type: receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE,
      payload: {list: groupSubmitterList, value: []}
    })
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE,
      payload: []
    })
    pageDispatch({
      type: receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE,
      payload: {list: paymentMethodListOrigin, value: []}
    })
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE,
      payload: []
    })
    pageDispatch({
      type: receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE,
      payload: {list: employeeCreateListOrigin, value: []}
    })
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE,
      payload: []
    })
    pageDispatch({
      type: receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE,
      payload: {list: typeReceiptListOrigin, value: []}
    })
    fetchReceipt({
      ...queries,
      start_date: '',
      end_date: '',
      object_type: '',
      payment_method_id: '',
      user_id: '',
      receipt_type_id: ''
    })
  }

  const canSubmitOtherFilter = [
    JSON.stringify(filter?.dateTime?.value) !== JSON.stringify(filter?.dateTime?.activeValue?.value),
    JSON.stringify(groupSubmitterValue?.name) !== JSON.stringify(groupSubmitterActiveValue?.name),
    JSON.stringify(paymentMethodActiveValue?.map(item => item.id).join(', ')) !== JSON.stringify(paymentMethodValue?.map(item => item.id).join(', ')),
    JSON.stringify(employeeCreateActiveValue?.map(item => item.user_id).join(', ')) !== JSON.stringify(employeeCreateValue?.map(item => item.user_id).join(', ')),
    JSON.stringify(typeReceiptActiveValue?.map(item => item.id).join(', ')) !== JSON.stringify(typeReceiptValue?.map(item => item.id).join(', ')),
  ].includes(true)

  const shouldShowResetAll = [
    !!dateTimeActiveValue?.value,
    !!groupSubmitterActiveValue?.name,
    paymentMethodActiveValue?.length > 0,
    employeeCreateActiveValue?.length > 0,
    typeReceiptActiveValue?.length > 0,
  ].includes(true)

  const countOtherFilter = [
    !!dateTimeActiveValue?.value,
    !!groupSubmitterActiveValue?.name,
    paymentMethodActiveValue?.length > 0,
    employeeCreateActiveValue?.length > 0,
    typeReceiptActiveValue?.length > 0,
  ].filter(item => item === true).length

  const refreshTable = _ => {
    fetchReceipt({
      ...queries,
      start_date: filter?.dateTime?.activeValue?.start || '',
      end_date: filter?.dateTime?.activeValue?.end || '',
      object_type: filter?.groupSubmitter?.activeValue?.code || '',
      payment_method_id: filter?.paymentMethod?.activeValue?.map(item => item.id)?.join(',') || '',
      user_id: filter?.employeeCreate?.activeValue?.map(item => item.user_id)?.join(',') || '',
      receipt_type_id: filter?.typeReceipt?.activeValue?.map(item => item.id)?.join(',') || '',
      status: filter?.status || '',
    })
  }

  const handleChangeStatus = status => {
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_STATUS,
      payload:
        !!filter?.status?.find(item => +item === +status)
          ? filter?.status?.filter(item => +item !== +status)
          : [...filter.status, status]
    })
  }

  const applyStatusFilter = type => {
    fetchReceipt({...queries, status: type === null ? '' : filter?.status?.join(',')})
  }

  const handleRefreshStatus = _ => {
    pageDispatch({
      type: receiptActions.FILTER_ACTIVE_OTHER_STATUS,
      payload: ['1', '2']
    })
  }

  return {
    canSubmitOtherFilter,
    shouldShowResetAll,
    countOtherFilter,
    filter,
    search: {
      value: pageState?.filter?.keyword,
      onChange: handleChangeSearch
    },
    methods: {
      applyOrderOtherFilter,
      filterTagDelete,
      handleDeleteAll,
      refreshTable,
      handleChangeStatus,
      applyStatusFilter,
      handleRefreshStatus
    },
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      onChange: handleDateTimeChange,
    },
    groupSubmitter: {
      activeValue: groupSubmitterActiveValue,
      keyword: groupSubmitterKeyword,
      list: groupSubmitterList,
      value: groupSubmitterValue,
      onChange: handleGroupSubmitterChange,
      onKeywordChange: handleGroupSubmitterKeywordChange,
    },
    paymentMethod: {
      activeValue: paymentMethodActiveValue,
      keyword: paymentMethodKeyword,
      list: paymentMethodList,
      tab: paymentMethodTab,
      value: paymentMethodValue,
      onChange: handleChangePaymentMethod,
      onInputReset: handlePaymentMethodResetInput,
      onKeywordChange: handlePaymentMethodKeywordChange,
      onTabChange: handlePaymentMethodTabChange,
    },
    employeeCreate: {
      activeValue: employeeCreateActiveValue,
      keyword: employeeCreateKeyword,
      list: employeeCreateList,
      tab: employeeCreateTab,
      value: employeeCreateValue,
      onChange: handleChangeEmployeeCreate,
      onInputReset: handleEmployeeCreateResetInput,
      onKeywordChange: handleEmployeeCreateKeywordChange,
      onTabChange: handleEmployeeCreateTabChange,
    },
    typeReceipt: {
      activeValue: typeReceiptActiveValue,
      keyword: typeReceiptKeyword,
      list: typeReceiptList,
      tab: typeReceiptTab,
      value: typeReceiptValue,
      onChange: handleChangeTypeReceipt,
      onInputReset: handleTypeReceiptResetInput,
      onKeywordChange: handleTypeReceiptKeywordChange,
      onTabChange: handleTypeReceiptTabChange,
    },
  }
}

export default useReceiptFilter;