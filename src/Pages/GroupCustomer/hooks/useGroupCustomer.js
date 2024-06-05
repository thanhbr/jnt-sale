import React, {useContext, useState} from 'react';
import {getData,postData,deleteData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import useGroupCustomerContext from '../hooks/_context'
import toast from "../../../Component/Toast";
import { failIcon, successIcon } from '../components/notification'
import { useTranslation } from "react-i18next";

const UseGroupCustomer = () => {

    const [state, dispatch]= useGroupCustomerContext();

    const [listGroupCustomer, setListGroupCustomer] = useState(state.groupCustomer)
    const { t } = useTranslation()
    const handleSearchChange = e => {
        
        const keyword = e.target.value.trim()

        if(keyword !='' ) { dispatch({type: 'SET_LOADING', payload: true}) }
        const per_page = state?.filter?.per_page || 20
        const start = state?.filter?.start || 0
        const url = `${config.API}/customer/groups?keyword=${keyword}&per_page=${per_page}&start=${start}`
        getData(url)
        .then(response => {
            if (response && response?.data && response?.data?.success && response?.data?.data) {
            dispatch({type: "SET_LIST_GROUP_CUSTOMER", payload: response?.data?.data})
            // dispatch({type: 'SET_FILTER', payload: {start: 1}})
            dispatch({type: 'SET_FILTER', payload: {keyword: {value: keyword, label: t("search"), name: e.target.value}, total: response?.data?.meta?.total, start: 0,per_page: 20}})
            dispatch({type: 'SET_LOADING', payload: false})
            } else {
            dispatch({type: 'SET_LOADING', payload: false})
            toast.error(t("search_failed"))
            }
        })
        .catch(() => {
            dispatch({type: 'SET_LOADING', payload: false})
            toast.error(t("search_failed"))
        })
    }

    const resetPage = async () => {
        dispatch({type: 'CLOSE_OTHER_FILTER'})
        dispatch({type: 'SET_LOADING', payload: true})

        const keyword     = state?.filter?.keyword?.value || ''
        const per_page = state?.filter?.per_page || 20
        const start = state?.filter?.start || 0
        const response = await sendRequestAuth('get', `${config.API}/customer/groups?keyword=${keyword}&per_page=${per_page}&start=${start}`)
        if (response?.data && response?.data?.success) {
            dispatch({type: "SET_LIST_GROUP_CUSTOMER", payload: response.data.data})
            dispatch({type: 'SET_META', payload: {total: response.data.meta.total}})
            dispatch({type: 'SET_FILTER', payload: {page: 0}})
            dispatch({type: 'SET_LOADING', payload: false})
        }
    }

    const changeGroupCustomerStatus = async data => {
        const url = `${config.API}/customer/group/status`
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
    const changeDeleteGroupCustomer = async data => {
        const url = `${config.API}/customer/group/delete?ids=${data}`
        await deleteData(url)
        .then(response => {
          if (response.data && response.data.success == true) { 
              dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: t("delete_customer_group_success"), success: true, iconUrl: successIcon}})
          } else {
              dispatch({type:'SET_SUCCESS_MESSAGE', payload: {active: true, message: t("delete_customer_group_fail"), success: false, iconUrl: failIcon}})
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
          `${config.API}/customer/groups?keyword=${keyword}&per_page=${per_page}&start=${start}`,
        )
          .then(res => {
            if (res.data.success) {
              dispatch({type: 'SET_LIST_GROUP_CUSTOMER', payload: res.data.data})
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
          list: listGroupCustomer,
          value: state.filter.group.name
        },
        search: {
            value: state.filter.keyword,
            onChange: handleSearchChange,
        },
        functions: {
            resetPage,
            changeDeleteGroupCustomer,
            changeGroupCustomerStatus,
            fetchData
        }
    }
}

export default UseGroupCustomer;