import {useReducer} from "react";
import {CapitalAdjustmentReducer} from "../provider/reducer";
import {CapitalAdjustmentState} from "../provider/inittialState";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {CapitalAdjustmentActions} from "../provider/action";
import toast from "../../../Component/Toast";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";

export const useCapitalAdjustment = () =>{
  const [state,dispatch] = useReducer(CapitalAdjustmentReducer,CapitalAdjustmentState)

  const searchValue = state?.filter?.keyword
  const employeeCreate = state?.filter?.employeeCreate
  const employeeCreateValue = employeeCreate?.value
  const dateTime = state?.filter?.dateTime
  const statusState = state?.filter?.statusState
  const table = state?.table

  const handleOriginFetch = async _ => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/warehouse/cost-price/list?code=&status=&start_date=&end_date=&per_page=20&start=0`),
      sendRequestAuth('get', `${config.API}/admin/employees?keyword=&group=&per_page=200&start=0`),
    ])

    if(response[0]?.data?.success) {
      const capitalAdjustment = response[0]?.data
      dispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST,
        payload: {
          list: capitalAdjustment?.data,
          loading: false
        }
      })
      dispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST_ORIGIN,
        payload: capitalAdjustment?.data
      })
      dispatch({type: CapitalAdjustmentActions.TABLE_UPDATE_PAGINATION,
        payload: {active: +capitalAdjustment?.meta?.start,
          amount: +capitalAdjustment?.meta?.per_page,
          total: Math.ceil(+capitalAdjustment?.meta?.total / +capitalAdjustment?.meta?.per_page),
          totalItems: +capitalAdjustment?.meta?.total,
        }})
    }
    if(response[1]?.data?.success) {
      dispatch({
        type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_UPDATE,
        payload: {
          list: response[1]?.data?.data,
          listOrigin: response[1]?.data?.data
        }
      })
    }
  }

  const onPageChange = page => {
    fetchPagination({...queries,
                        per_page: +state?.table?.pagination?.amount,
                        start: +state?.table?.pagination?.amount * +page})
  }

  const onAmountChange = amount => {
    fetchPagination({...queries, per_page: amount, start: 0})
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

  const fetchPagination = async qs => {
    dispatch({
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
      dispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST,
        payload: {
          list: capitalAdjustment?.data,
          loading: false
        }
      })
      console.log('145', capitalAdjustment?.meta?.start)
      dispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_PAGINATION,
        payload: {
          active: +capitalAdjustment?.meta?.start / +capitalAdjustment?.meta?.per_page,
          amount: +capitalAdjustment?.meta?.per_page,
          total: Math.ceil(capitalAdjustment?.meta?.total / capitalAdjustment?.meta?.per_page),
          totalItems: +capitalAdjustment?.meta?.total,
        }
      })
    } else {
      toast.error('Hệ thống đang bận!')
    }
  }

  return {
    fetch: {
      origin: handleOriginFetch
    },
    provider:{
      state,
      dispatch
    },
    pagination: {
      onAmountChange,
      onPageChange
    }
  }
}