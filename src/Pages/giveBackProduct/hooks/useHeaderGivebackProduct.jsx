import React, {useCallback, useContext, useState} from 'react';
import {GiveBackProductContext} from "../provider/context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {giveBackProductActions} from "../provider/~reducer";
import {debounce} from "@mui/material";
import {convertDateTimeToApiFormat, formatDatetime} from "../../../common/form/datePicker/_functions";
import {DateRangePicker} from "rsuite";
import {useNavigate} from "react-router-dom";
import {replaceAllCustom} from "../../../util/functionUtil";
import toast from "../../../Component/Toast";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useHeaderGivebackProduct = () => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(GiveBackProductContext)
  const [debounceApplyFilter, setDebounceApplyFilter] = useState(true)
  const filter = pageState?.filter
  const modalOrder = pageState?.modal?.order
  const {afterToday} = DateRangePicker
  const navigate = useNavigate()

  // --------------- SEARCH ---------------------------
  const fetchGivebackProductByFilter = async (qs) => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    pageDispatch({type: giveBackProductActions.LOADING_TABLE, payload: true})
    const response = await
      sendRequestAuth('get', `${config.API}/order/return/list${queryString}`)
    if(response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data) ? response?.data?.data : []
      const perPage = response?.data?.meta?.per_page
      const totalItems = response?.data?.meta?.total

      pageDispatch({type: giveBackProductActions.SET_SEARCH_TABLE, payload: qs.keyword})

      pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE, payload: !!qs?.start_date ?  filter?.dateTime?.value : ''})
      pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE, payload: !!qs?.warehouse_id ?  filter?.warehouse?.value : ''})
      pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE, payload: !!qs?.status ? filter?.receivingState?.value : ''})
      // SET list order
      pageDispatch({type: giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE, payload: displayListData})
      // SET pagination
      pageDispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION,
        payload: {
          active: 0,
          amount: perPage,
          total: Math.ceil(totalItems / perPage),
          totalItems: totalItems,
        }})
      // SET panel
      pageDispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL,
        payload: {
          totalOrder: totalItems,
          totalValueGoods: response?.data?.meta?.total_price,
          amountRefunded: response?.data?.meta?.total_payment,
        }})

      pageDispatch({type: giveBackProductActions.LOADING_TABLE, payload: false})
    }
  }
  const debounceSearchChange = useCallback(debounce((keyword) => {
    fetchGivebackProductByFilter({keyword: keyword?.trim()})
  }, 500), [])
  const handleSearchList = keyword => {
    pageDispatch({
      type: giveBackProductActions.SET_SEARCH_TABLE,
      payload: keyword
    })
    debounceSearchChange(keyword?.trim())
  }
  // --------------- SEARCH ---------------------------

  const handleSelectWarehouse = option => {
    pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_WAREHOUSE_VALUE, payload: !!!option ? '' : option})
  }

  const handleChangeStatus = status => {
    pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_REFUND_STATUS_VALUE, payload: !!!status ? '' : status})
  }

  const applyOrderOtherFilter = _ => {
    if(debounceApplyFilter) {
      setDebounceApplyFilter(false)
      setTimeout(() => setDebounceApplyFilter(true), 2000)

      const dataPost = {
        keyword: filter?.search?.value || '',
        start_date: !!filter?.dateTime?.start ? convertDateTimeToApiFormat(filter?.dateTime?.start) : '',
        end_date: !!filter?.dateTime?.end ? convertDateTimeToApiFormat(filter?.dateTime?.end) : '',
        status: filter?.receivingState ?.value?.id || '',
        // payment_status: filter?.receivingState ?.value?.id || '',
        warehouse_id: filter?.warehouse?.value?.id || '',
      }
      fetchGivebackProductByFilter(dataPost)
    }
  }

  const handleChangeDatetime = date => {
    pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME, payload: {
        value: !!!date?.value[0] ? '' : date?.value,
        start: !!!date?.value[0] ? '' : formatDatetime(date?.value[0]),
        end: !!!date?.value[1] ? '' : formatDatetime(date?.value[1]),
      }})
  }

  const canSubmitOtherFilter = [
    JSON.stringify(filter?.dateTime?.value) !== JSON.stringify(filter?.dateTime?.activeValue),
    JSON.stringify(filter?.warehouse?.value) !== JSON.stringify(filter?.warehouse?.activeValue),
    JSON.stringify(filter?.receivingState?.value) !== JSON.stringify(filter?.receivingState?.activeValue),
  ].includes(true)

  const refresh = _ => {
    if(debounceApplyFilter) {
      setDebounceApplyFilter(false)
      setTimeout(() => setDebounceApplyFilter(true), 2000)

      const dataPost = {
        keyword: filter?.search?.value || '',
        start_date: !!filter?.dateTime?.start ? convertDateTimeToApiFormat(filter?.dateTime?.start) : '',
        end_date: !!filter?.dateTime?.end ? convertDateTimeToApiFormat(filter?.dateTime?.end) : '',
        status: filter?.receivingState?.value?.id || '',
        // payment_status: filter?.receivingState ?.value?.id || '',
        warehouse_id: filter?.warehouse?.value?.id || '',
      }
      fetchGivebackProductByFilter(dataPost)
    }
  }

  const handleDeleteTag = tag => {
    const dataPost = {
      keyword: filter?.search?.value || '',
      start_date: !!filter?.dateTime?.start ? convertDateTimeToApiFormat(filter?.dateTime?.start) : '',
      end_date: !!filter?.dateTime?.end ? convertDateTimeToApiFormat(filter?.dateTime?.end) : '',
      status: filter?.receivingState?.value?.id || '',
      // payment_status: filter?.receivingState ?.value?.id || '',
      warehouse_id: filter?.warehouse?.value?.id || '',
    }
    switch (tag) {
      case 'date':
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME,
          payload: {
            value: '',
            start: '',
            end: ''
          }})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE, payload: ''})
        dataPost.start_date = ''
        dataPost.end_date = ''
        break
      case 'warehouse':
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_VALUE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE, payload: ''})
        dataPost.warehouse_id = ''
        break
      case 'status':
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_VALUE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE, payload: ''})
        dataPost.status = ''
        break
      case 'all':
        dataPost.start_date = ''
        dataPost.end_date = ''
        dataPost.warehouse_id = ''
        dataPost.status = ''
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_VALUE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_DATE_TIME_ACTIVE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_VALUE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_WAREHOUSE_ACTIVE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_VALUE, payload: ''})
        pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_CHANGE_REFUND_STATUS_ACTIVE, payload: ''})
        break
      default: break
    }

    fetchGivebackProductByFilter(dataPost)
  }

  const handleToggleModalOrder = _ => {
    pageDispatch({type: giveBackProductActions.MODAL_TOGGLE_ORDER, payload: !modalOrder?.open})
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_KEYWORD_ORDER, payload: ''})
    fetchAPIOrderList({
      keyword: modalOrder?.keyword || '',
      start_date: !!modalOrder?.dateTime?.start ? convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.start)) : '',
      end_date: !!modalOrder?.dateTime?.end ? convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.end)) : '',
      per_page: 100,
      start: 0,
    })
  }
  const handleActiveOrder = value => {
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_ITEM_ACTIVE, payload: value})
  }

  const handleLinkOrder = _ => navigate(`/giveback-product/create/${modalOrder?.value?.order_id}`)


  const fetchAPIOrderList = async qs => {
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_LOADING_LIST_ORDER, payload: true})
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await  sendRequestAuth('get', `${config.API}/order/return/filter-orders${queryString}`)
    if(response?.data?.success) {
      pageDispatch({type: giveBackProductActions.MODAL_UPDATE_LIST_ORDER,
        payload: {
          list: response?.data?.data,
          listOrigin: response?.data?.data,
        }})
    }
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_LOADING_LIST_ORDER, payload: false})
  }
  const debounceSearchOrder = useCallback(debounce( keyword => {
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_KEYWORD_ORDER, payload: keyword})
    fetchAPIOrderList({
      keyword: keyword || '',
      start_date: convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.start)) || '',
      end_date: convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.end)) || '',
      per_page: 100,
      start: 0,
    })
  }, 500), [])
  const handleSearchOrder = keyword => {
    debounceSearchOrder(keyword?.trim())
  }

  const [debounceRefreshOrder, setDebounceRefreshOrder] = useState(true)
  const handleRefreshOrder = _ => {
    if(debounceRefreshOrder) {
      setDebounceRefreshOrder(false)
      setTimeout(() => {
        setDebounceRefreshOrder(true)
      }, 2000)

      pageDispatch({type: giveBackProductActions.MODAL_UPDATE_ITEM_ACTIVE, payload: []})
      fetchAPIOrderList({
        keyword: modalOrder?.keyword || '',
        start_date: !!modalOrder?.dateTime?.start ? convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.start)) : '',
        end_date: !!modalOrder?.dateTime?.end ? convertDateTimeToApiFormat(formatDatetime(modalOrder?.dateTime?.end)) : '',
        per_page: 100,
        start: 0,
      })
    }
  }

  const handleChangeDatetimeOrder = date => {
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_DATE_TIME_ORDER, payload: {
        value: !!!date?.value[0] ? '' : date?.value,
        start: !!!date?.value[0] ? '' : date?.value[0],
        end: !!!date?.value[1] ? '' : date?.value[1],
      }})
    fetchAPIOrderList({
      keyword: modalOrder?.keyword || '',
      start_date: !!!date?.value[0] ? '' : convertDateTimeToApiFormat(formatDatetime(date?.value[0])),
      end_date: !!!date?.value[1] ? '' : convertDateTimeToApiFormat(formatDatetime(date?.value[1])),
      per_page: 100,
      start: 0,
    })
  }

  const otherFilterBadge = [
    filter?.dateTime?.activeValue?.length > 0,
    !!filter?.warehouse?.activeValue,
    !!filter?.receivingState?.activeValue,
  ].filter(item => item === true).length

  const handleCloseConfirmPayment = _ => {
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_DATA_REFUND_PAYMENT, payload: {open: false, data: []}})
  }

  const handleSubmitConfirmPayment = async _ => {
    pageDispatch({type: giveBackProductActions.SET_CHECK_LIST_GIVEBACK_PRODUCT, payload: ['1','2','3'] })

    fetchGivebackProductByFilter({
      keyword: modalOrder?.keyword || '',
      start_date: '',
      end_date: '',
      status: modalOrder?.receivingState?.value?.id || '',
      payment_status: ['1','2','3'],
      per_page: 20,
      start: 0,
    })
    const idUpdate = pageState?.modal?.refundPayment?.data?.id || pageState?.table?.detail?.active?.id || ''
    const dataPost = {
      payment_method: pageState?.modal?.refundPayment?.payment?.activeValue?.id || '',
      payment_name: pageState?.modal?.refundPayment?.payment?.activeValue?.name || '',
      payment_amount: pageState?.modal?.refundPayment?.payment?.amount || '',
    }
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_DATA_REFUND_PAYMENT, payload: {open: false, data: []}})
    const response = await sendRequestAuth('post', `${config.API}/order/return/pay/${idUpdate}`, JSON.stringify(dataPost))
    if(response?.data?.success) {
      toast.success(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_SUCCESS))
      fetchRowDetail(idUpdate)
      pageDispatch({type: giveBackProductActions.MODAL_UPDATE_AMOUNT_PAYMENT, payload: ''})

      const dataPost = {
        keyword: filter?.search?.value || '',
        start_date: !!filter?.dateTime?.start ? convertDateTimeToApiFormat(filter?.dateTime?.start) : '',
        end_date: !!filter?.dateTime?.end ? convertDateTimeToApiFormat(filter?.dateTime?.end) : '',
        status: filter?.receivingState ?.value?.id || '',
        // payment_status: filter?.receivingState ?.value?.id || '',
        warehouse_id: filter?.warehouse?.value?.id || '',
        per_page: pageState?.table?.pagination?.amount,
        start: pageState?.table?.pagination?.active * pageState?.table?.pagination?.amount,
      }
      fetchGivebackProductByFilter(dataPost)
    } else {
      toast.error(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_FAILED))
    }
  }

  const handleChangeAmount = amount => {
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_AMOUNT_PAYMENT, payload: replaceAllCustom(amount, ',', '')})
  }

  const fetchRowDetail = async id => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/return/detail/${id}`,
    )
    if (!!response?.data?.success) {
      pageDispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL, payload: { active: response?.data?.data}})
    }
  }

  const handleChangePayment = payment => {
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_ACTIVE_VALUE_PAYMENT, payload: payment})
  }

  const fetchWarehouse = async keyword => {
    const response = await sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword=${keyword}`)
    if(response?.data?.success) {
      const listWarehouse = response?.data?.data
      // const listWarehouse = response?.data?.data?.filter(item => +item?.status === 1)
      pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_WAREHOUSE,
        payload: {
          list: listWarehouse,
          listOrigin: listWarehouse
        }})
    }
  }
  const debounceSearchChangeWarehouse = useCallback(debounce((keyword) => {
    fetchWarehouse(keyword?.trim())
  }, 500), [])
  const handleSearchListWarehouse = keyword => {
    debounceSearchChangeWarehouse(keyword)
  }

  return {
    filter,
    canSubmitOtherFilter,
    disabledDate: afterToday(),
    modalOrder,
    functions: {
      handleSearchList,
      handleSelectWarehouse,
      handleChangeStatus,
      handleChangeDatetime,
      refresh,
      applyOrderOtherFilter,
      handleDeleteTag,
      handleSearchListWarehouse,

      handleToggleModalOrder,
      handleActiveOrder,
      handleLinkOrder,
      handleSearchOrder,
      handleRefreshOrder,
      handleChangeDatetimeOrder,

      onCloseConfirmPayment: handleCloseConfirmPayment,
      onSubmitConfirmPayment: handleSubmitConfirmPayment,
      onChangeAmount: handleChangeAmount,
      onChangePayment: handleChangePayment,
    },
    badge: {
      others: otherFilterBadge
    },
    search: {
      value: pageState?.filter?.search?.value
    }
  }
}

export default useHeaderGivebackProduct