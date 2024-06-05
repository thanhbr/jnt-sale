import React, {useContext} from 'react';
import {CapitalAdjustmentContext} from "../provider/context";
import {CapitalAdjustmentActions} from "../provider/action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";

const useTBodyCapitalAdjustment = () => {
  const {pageState, pageDispatch} = useContext(CapitalAdjustmentContext)
  const display = pageState?.table?.display
  const modalCancelBill = pageState?.table?.modal?.cancelBill
  const modalApproveBill = pageState?.table?.modal?.approveBill
  const searchValue = pageState?.filter?.keyword

  const employeeCreate = pageState?.filter?.employeeCreate
  const employeeCreateValue = employeeCreate?.value
  const dateTime = pageState?.filter?.dateTime
  const statusState = pageState?.filter?.statusState
  const table = pageState?.table
  const keyword = pageState?.filter?.keyword

  const handleApproveCancelBill = async _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_CANCEL_BILL_UPDATE,
      payload: { open: false, id: '' }
    })
    const response = await sendRequestAuth( 'get', `${config.API}/warehouse/cost-price/delete/${modalCancelBill?.id}`)
    if(response?.data?.success) {
      fetchDataByFilter(queries)
      toast.success('Đã hủy phiếu điều chỉnh giá vốn thành công')
    } else {
      toast.error('Đã hủy phiếu điều chỉnh giá vốn thất bại')
    }
  }
  const handleCancelBill = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_CANCEL_BILL_UPDATE,
      payload: { open: false, id: '' }
    })
  }


  const handleApproveBill = async _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_APPROVE_BILL_UPDATE,
      payload: { open: false, id: '' }
    })
    const response = await sendRequestAuth( 'get', `${config.API}/warehouse/cost-price/adjusted/${modalApproveBill?.id}`)
    if(response?.data?.success) {
      fetchDataByFilter(queries)
      toast.success('Đã thực hiện điều chỉnh giá vốn thành công')
    } else {
      toast.error('Đã thực hiện điều chỉnh giá vốn thất bại')
    }
  }

  const handleCloseBill = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.MODAL_APPROVE_BILL_UPDATE,
      payload: { open: false, id: '' }
    })
  }
  const queries = {
    code: searchValue.trim() || '',
    start_date:
      dateTime?.start && dateTime.value
        ? convertDateTimeToApiFormat(dateTime.value.split(' - ')[0])
        : '',
    end_date:
      dateTime?.end && dateTime.value
        ? convertDateTimeToApiFormat(dateTime.value.split(' - ')[1])
        : '',
    user_id: employeeCreateValue?.map(item => item.user_id).join(',') || '',
    status: statusState?.value || '',
    per_page: table.pagination.amount,
    start: 0,
  }
  const fetchDataByFilter = async (qs) => {
    pageDispatch({
      type: CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST,
      payload: {
        list: [],
        loading: true
      }
    })
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth('get', `${config.API}/warehouse/cost-price/list${queryString}`)
    if(response?.data?.success) {
      const capitalAdjustment = response?.data
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST,
        payload: {
          list: capitalAdjustment?.data,
          loading: false
        }
      })
    } else {
      toast.error('Hệ thống đang bận!')
    }
  }

  return {
    display,
    keyword,
    modalCancelBill,
    modalApproveBill,
    method: {
      onCancelBill: handleCancelBill,
      onApproveCancelBill: handleApproveCancelBill,
      onApproveBill: handleApproveBill,
      onCloseBill: handleCloseBill,
    }
  }
}

export default useTBodyCapitalAdjustment