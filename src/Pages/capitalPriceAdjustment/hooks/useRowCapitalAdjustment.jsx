import React, {useContext, useState} from 'react';
import {CapitalAdjustmentContext} from "../provider/context";
import {CapitalAdjustmentActions} from "../provider/action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useNavigate} from "react-router-dom";

const useRowCapitalAdjustment = (data) => {
  const { pageState, pageDispatch } = useContext(CapitalAdjustmentContext)
  const { table } = pageState
  const navigate = useNavigate()

  const [shouldOpenSubmitPaymentModal, setShouldOpenSubmitPaymentModal] =
    useState(false)

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list

  const selectedList = table.selected.list

  const isSelected = !!selectedList.find(item => item?.id === data?.id)

  const shouldOpenDetail = data?.id && detailActiveId === data.id

  const handleToggleDetail = _ => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: { id: null },
      })
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    pageDispatch({
      type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: data.id },
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: findDetail },
      })
    }

    fetchRowDetail()
  }

  const fetchRowDetail = async _ => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/warehouse/cost-price/detail/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, list: [...detailList, newItem] },
      })
    } else {
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: [], list: [...detailList, []] },
      })
    }
  }

  const handleEditDetail = _ => {
    navigate(`/accountant/price-adjustment/edit/${data?.id || ''}`)
  }

  const handleToggleCancelBill = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_CANCEL_BILL_UPDATE,
      payload: {
        open: true,
        id: data?.id
      }
    })
  }
  const handleToggleAdjust = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_APPROVE_BILL_UPDATE,
      payload: {
        open: true,
        id: data?.id
      }
    })
  }

  return {
    detail: {
      id: detailActiveId,
      active: detailActive,
      // tabs: { payment: { formatDateTime: cellCodeOrderFormatDateTime } },
    },
    row: {
      data,
      isSelected,
      shouldOpenDetail,
      shouldOpenSubmitPaymentModal,
      onCloseSubmitPaymentModal: () => setShouldOpenSubmitPaymentModal(false),
      onToggleDetail: handleToggleDetail,
      onEditDetail: handleEditDetail,
      onToggleCancelBill: handleToggleCancelBill,
      onAdjust: handleToggleAdjust,
    },
  }
}

export default useRowCapitalAdjustment;