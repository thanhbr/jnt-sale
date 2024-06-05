import React, {useContext, useState} from 'react';
import {GiveBackProductContext} from "../provider/context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {giveBackProductActions} from "../provider/~reducer";
import toast from "../../../Component/Toast";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useTableGiveBackProduct = data => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(GiveBackProductContext)
  const table = pageState?.table
  const filter = pageState?.filter

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list
  const shouldOpenDetail = data?.id && detailActiveId === data.id
  const paymentValue = filter?.payment?.value
  const modalOrder = pageState?.modal?.order
  const modalPayment = pageState?.modal?.refundPayment

  const checkedList = filter?.checkedList

  const handleToggleDetail = _ => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      pageDispatch({
        type: giveBackProductActions.UPDATE_ID_GIVEBACK_PRODUCT_TABLE_DETAIL,
        payload: { id: null },
      })
      pageDispatch({
        type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL,
        payload: { active: null },
      })
      return
    }

    pageDispatch({
      type: giveBackProductActions.UPDATE_ID_GIVEBACK_PRODUCT_TABLE_DETAIL,
      payload: { id: data.id },
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL,
        payload: { active: findDetail },
      })
    }

    fetchRowDetail()
  }

  const fetchRowDetail = async (id) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/return/detail/${id || data.id}`,
    )

    if (!!response?.data?.success) {
      pageDispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL, payload: { active: response?.data?.data}})
    }
  }

  const handlePaymentChange = value => {
    pageDispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_PAYMENT_STATUS, payload: value})
    fetchGivebackProductByFilter({
      keyword: modalOrder?.keyword || '',
      start_date: '',
      end_date: '',
      status: modalOrder?.receivingState?.value?.id || '',
      payment_status: value?.join(',') || '',
      per_page: 20,
      start: 0,
    })
  }

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

  const handleSelectPayment = payment => {
    const amount = ((+payment?.total_price - +payment?.payment_money) || 0)
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_AMOUNT_PAYMENT, payload: amount.toString()})
    pageDispatch({type: giveBackProductActions.MODAL_CHANGE_DATA_REFUND_PAYMENT,
      payload: {
        open: true,
        data: payment
      }})
  }

  const toggleConfirmRefund = refund => {
    pageDispatch({type: giveBackProductActions.MODAL_UPDATE_CONFIRM_REFUND_ITEM_ACTIVE,
      payload: {
        open: !pageState?.modal?.confirmRefund?.open,
        data: pageState?.modal?.confirmRefund?.open ? '' : refund
      }})
  }

  const [debounceSubmitConfirm, setDebounceSubmitConfirm] = useState(true)
  const handleSubmitConfirm = async _ => {
    if(debounceSubmitConfirm) {
      pageDispatch({type: giveBackProductActions.SET_CHECK_LIST_GIVEBACK_PRODUCT, payload: ['1','2','3'] })
      setDebounceSubmitConfirm(false)
      setTimeout(() => setDebounceSubmitConfirm(true), 2000)

      const idUpdate = pageState?.table?.detail?.active?.id || pageState?.modal?.confirmRefund?.data?.id
      const response = await sendRequestAuth('post', `${config.API}/order/return/confirm/${idUpdate}`)

      if(response?.data?.success) {
        toast.success(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CONFIRM_SUCCESS))
        fetchRowDetail(idUpdate)

        const dataPost = {
          keyword: filter?.search?.value || '',
          start_date: !!filter?.dateTime?.start ? convertDateTimeToApiFormat(filter?.dateTime?.start) : '',
          end_date: !!filter?.dateTime?.end ? convertDateTimeToApiFormat(filter?.dateTime?.end) : '',
          status: filter?.receivingState ?.value?.id || '',
          warehouse_id: filter?.warehouse?.value?.id || '',
          per_page: pageState?.table?.pagination?.amount,
          start: pageState?.table?.pagination?.active * pageState?.table?.pagination?.amount,
        }
        fetchGivebackProductByFilter(dataPost)
      } else {
        toast.error(t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CONFIRM_FAILED))
      }
      pageDispatch({type: giveBackProductActions.MODAL_UPDATE_CONFIRM_REFUND_ITEM_ACTIVE,
        payload: {
          open: !pageState?.modal?.confirmRefund?.open,
          data: pageState?.modal?.confirmRefund?.open ? '' : pageState?.modal?.confirmRefund?.data
        }})
    }
  }

  const handleCheckboxChange = (val, type = '') => {
    if(type === 'reset') {
      pageDispatch({type: giveBackProductActions.SET_CHECK_LIST_GIVEBACK_PRODUCT, payload: val})
    } else {
      pageDispatch({type: giveBackProductActions.SET_CHECK_LIST_GIVEBACK_PRODUCT, payload: checkedList.includes(val)
          ? checkedList.filter(item => item !== val)
          : [...checkedList, val]})
    }
  }

  return {
    filter,
    table,
    modalPayment,
    functions: {
      handleToggleDetail,
      handleSelectPayment,
      toggleConfirmRefund,
      handleSubmitConfirm,

      handleCheckboxChange,
    },
    detail: {
      id: detailActiveId,
      active: detailActive,
    },
    shouldOpenDetail,
    payment: {
      value: paymentValue,
      onChange: handlePaymentChange,
    },
    checkedList,
  }
}

export default useTableGiveBackProduct;