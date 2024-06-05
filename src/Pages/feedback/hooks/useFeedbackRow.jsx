import React, {useContext, useState} from 'react';
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {FeedbackContext} from "../provider/_context";
import {feedbackActions} from "../provider/_reducer";

const useFeedbackRow = data => {
  const {state, dispatch} = useContext(FeedbackContext)
  const { table } = state
  const modalCancel = state?.table?.modal?.cancelReceipt

  const [shouldOpenSubmitPaymentModal, setShouldOpenSubmitPaymentModal] =
    useState(false)

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list

  const selectedList = table.selected.list

  const isSelected = !!selectedList.find(item => item?.id === data?.id)
  const shouldOpenDetail = data?.id && detailActiveId === data.id


  const rowDetailToggle = async () => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      dispatch({
        type: feedbackActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: { id: null },
      })
      dispatch({
        type: feedbackActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    dispatch({
      type: feedbackActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: data.id },
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      dispatch({
        type: feedbackActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: findDetail },
      })
    }

    fetchRowDetail()
  }

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/feedback/details/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      newItem?.order_payments?.length > 0 && newItem?.order_payments.map((item, index) => {
        if (index > 0) {
          newItem.order_payments[index].has_paid = item?.total_amount - newItem.order_payments[index - 1].total_amount
        } else {
          newItem.order_payments[index].has_paid = item?.total_amount
        }
      })
      dispatch({
        type: feedbackActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, list: [...detailList, newItem] },
      })
    }
  }

  return {
    detail: {
      id: detailActiveId,
      active: detailActive,
    },
    row: {
      data,
      isSelected,
      shouldOpenDetail,
      shouldOpenSubmitPaymentModal,
      onToggleDetail: rowDetailToggle,
    },
  }
}


export default useFeedbackRow