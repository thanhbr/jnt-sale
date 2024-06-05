import React, {useContext, useState} from 'react';
import {getData,postData,deleteData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import useOrderOriginContext from '../hooks/_context'
import toast from "../../../Component/Toast";
import { failIcon, successIcon } from '../components/notification'

const UseOrderOrigin = () => {

    const [state, dispatch]= useOrderOriginContext();

    const [listOrderOrigin, setListOrderOrigin] = useState(state.groupCustomer)
    const handleSearchChange = e => {

        const keyword = e.target.value.trim()

        if(keyword !='' ) { dispatch({type: 'SET_LOADING', payload: true}) }
        const per_page = state?.filter?.per_page || 20
        const start = state?.filter?.start || 0
        const url = `${config.API}/order/origins?keyword=${keyword}&per_page=${per_page}&start=${start}`
        getData(url)
        .then(response => {
          if (response && response?.data && response?.data?.success && response?.data?.data) {
            dispatch({type: "SET_LIST_ORDER_ORIGIN", payload: response?.data?.data})
            // dispatch({type: 'SET_FILTER', payload: {start: 1}})
            dispatch({type: 'SET_FILTER', payload: {keyword: {value: keyword, label: "Từ khóa", name: e.target.value}, total: response?.data?.meta?.total, start: 0,per_page: 20}})
            dispatch({type: 'SET_LOADING', payload: false})
          } else {
            dispatch({type: 'SET_LOADING', payload: false})
            toast.error('Tìm kiếm thất bại!')
          }
        })
        .catch(() => {
            dispatch({type: 'SET_LOADING', payload: false})
            toast.error('Tìm kiếm thất bại!')
        })
    }

    const resetPage = async () => {
        dispatch({type: 'CLOSE_OTHER_FILTER'})
        dispatch({type: 'SET_LOADING', payload: true})

        const keyword     = state?.filter?.keyword?.value || ''
        const per_page = state?.filter?.per_page || 20
        const start = state?.filter?.start || 0
        const response = await sendRequestAuth('get', `${config.API}/order/origins?keyword=${keyword}&per_page=${per_page}&start=${start}`)
        if (response?.data && response?.data?.success) {
            dispatch({type: "SET_LIST_ORDER_ORIGIN", payload: response.data.data})
            dispatch({type: 'SET_META', payload: {total: response.data.meta.total}})
            dispatch({type: 'SET_FILTER', payload: {page: 0}})
            dispatch({type: 'SET_LOADING', payload: false})
        }
    }

    const changeOrderOriginStatus = async data => {
        const url = `${config.API}/order/origin/active`
        await postData(url, data)
        .then(response => {
            if (response.data && response.data.success == true) {
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: response.data.message, success: true, iconUrl: successIcon}})
            } else {
                dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: response.data.message, success: false, iconUrl: failIcon}})
            }
        })
        .catch(() => {
        })
    }
    const changeDeleteOrderOrigin = async data => {
      const url = `${config.API}/order/origin/delete/${data}`
      await deleteData(url)
      .then(response => {
        if (response.data && response.data.success == true) {
          dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: "Xóa nguồn đơn hàng thành công", success: true, iconUrl: successIcon}})
        } else {
          dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: "Xóa nguồn đơn hàng thất bại", success: false, iconUrl: failIcon}})
        }
      })
      .catch(() => {

      })
    }
    const fetchData = async () => {
      const keyword     = state?.filter?.keyword?.value || ''
      const per_page = state?.filter?.per_page || 20
      const start = state?.filter?.start || 0
      getData(
        `${config.API}/order/origins?keyword=${keyword}&per_page=${per_page}&start=${start}`,
      )
        .then(res => {
          if (res.data.success) {
            dispatch({type: 'SET_LIST_ORDER_ORIGIN', payload: res.data.data})
            dispatch({
              type: 'SET_FILTER',
              payload: {
                total: res.data.meta.total
              },
            })
            if (res.data.data.length > 0)
              dispatch({type: 'SET_STATUS', payload: true})
          }
        })
        .catch(err => {
          console.log('error')
        })
    }


    return {
        groupCustomer: {
          list: listOrderOrigin,
          value: state.filter.group.name
        },
        search: {
            value: state.filter.keyword,
            onChange: handleSearchChange,
        },
        functions: {
            resetPage,
            changeDeleteOrderOrigin,
            changeOrderOriginStatus,
            fetchData
        }
    }
}

export default UseOrderOrigin;