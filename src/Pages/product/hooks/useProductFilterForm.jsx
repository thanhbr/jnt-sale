import React, {useCallback, useContext, useState} from 'react';
import {debounce} from "@mui/material";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {productActions} from "../provider/~action";
import {ProductContext} from "../provider/~context";
import {EXPORT, IMPORT} from "../interfaces/~constants";
import toast from "../../../Component/Toast";
import { useSearchParams } from 'react-router-dom';
import {actionTypes} from "../../purchases/provider/_reducer";
import {useTranslation} from "react-i18next";

const useProductFilterForm = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)

  const filter = pageState?.filter
  const [paramOld, setParamOld] = useState({
    keyword: '',
    group: '',
    city_id: '',
    district_id: '',
    ward_id: '',
    per_page: 20,
    start: 0,
  })
  const debounceProductByFilter = useCallback(debounce((keyword) => {
    fetchProductByFilter({...queries, keyword: keyword})
  }, 500), [])


  const [debounceFetch, setDebounceFetch] = useState(true)
  const fetchProductByFilter = async (qs) => {
    if(debounceFetch) {
      setDebounceFetch(false)
      setTimeout(() => setDebounceFetch(true), 2000)

      pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
      let queryString = '?'
      let i = 0
      for (const [key, value] of Object.entries(qs)) {
        queryString += `${i > 0 ? '&' : ''}${key}=${value}`
        i++
      }

      const response = await sendRequestAuth(
        'get',
        `${config.API}/product/list${queryString}`,
      )
      if(response?.data?.success) {
        pageDispatch({
          type: productActions.TABLE_AMOUNT_UPDATE,
          payload: {
            display: {
              list: response?.data?.data,
            },
            pagination: {
              active: response?.data?.meta?.start || 0,
              amount: response?.data?.meta?.per_page || 20,
              total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
              totalItems: response?.data?.meta?.total,
            }
          },
        })

        // Set Tag
        pageDispatch({type: productActions.FILTER_ADVANCED_STATUS_UPDATE,
          payload: {id: filter?.status?.id, name: filter?.status?.name,
            active: {id: filter?.status?.id, name: filter?.status?.name}}
        })
        pageDispatch({type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE,
          payload: {id: filter?.category_id?.id, name: filter?.category_id?.name,
            active: {id: filter?.category_id?.id, name: filter?.category_id?.name }}})
      }
      pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
    }
    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
  }

  const queries = {
    keyword: filter?.keyword || '',
    category_id: filter?.category_id?.id || '',
    status: filter?.status?.id || '',
    per_page: '',
    start: 0,
  }
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChangeKeyword = e => {
    if (searchParams.get('search')) setSearchParams({})
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e?.target?.value || ''
    // const keyword = e.target.value.replace(/\s+/g, ',') || ''

    debounceProductByFilter(keyword.trim())
    pageDispatch({type: productActions.FILTER_ADVANCED_SEARCH_UPDATE,
                payload: keyword.trim()})
  }

  const handleChangeStatus = data => {
    pageDispatch({
      type: productActions.FILTER_ADVANCED_STATUS_UPDATE,
      payload: {id: data?.id, name: t(data?.name), active: pageState?.filter?.status?.active}
    })
  }

  const applyOrderOtherFilter = _ => {
    fetchProductByFilter({...queries, category_id: filter?.category_id?.id, status: filter?.status?.id})
  }

  const handleDeleteTag = async type => {
    const opt = {...queries,
      category_id: type === 'category' ? '' : filter?.category_id?.id,
      status: type === 'status' ? '' : filter?.status?.id}

    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(opt)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list${queryString}`,
    )
    if(response?.data?.success) {
      pageDispatch({
        type: productActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: response?.data?.data,
          },
          pagination: {
            active: response?.data?.meta?.start || 0,
            amount: response?.data?.meta?.per_page || 20,
            total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
            totalItems: response?.data?.meta?.total,
          }
        },
      })
    }
    // Set Tag
    switch (type) {
      case 'status':
        pageDispatch({type: productActions.FILTER_ADVANCED_STATUS_UPDATE, payload: {id: '', name: '', active: ''}})
        break
      case 'category':
        pageDispatch({type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE, payload: {id: '', name: '', active: ''}})
        pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: ''})
        pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: ''})
        break
      default:
        break
    }
    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
  }

  const handleDeleteAll = async _ => {
    const opt = {...queries, category_id: '' , status: '' }

    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(opt)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list${queryString}`,
    )
    if(response?.data?.success) {
      pageDispatch({
        type: productActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: response?.data?.data,
          },
          pagination: {
            active: response?.data?.meta?.start || 0,
            amount: response?.data?.meta?.per_page || 20,
            total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
            totalItems: response?.data?.meta?.total,
          }
        },
      })
    }
    // Set Tag
    pageDispatch({type: productActions.FILTER_ADVANCED_STATUS_UPDATE, payload: {id: '', name: '', active: ''}})
    pageDispatch({type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE, payload: {id: '', name: '', active: ''}})
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: ''})
    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
  }

  const canSubmitOtherFilter = [
    (JSON.stringify(filter?.status?.id) === JSON.stringify(filter?.status?.active?.id)) || !!!filter?.status?.id,
    (JSON.stringify(filter?.category_id?.id) === JSON.stringify(filter?.category_id?.active?.id)) || !!!filter?.category_id?.id,
  ].includes(false)

  const countOtherFilter = [
    !!filter?.status?.active?.id,
    !!filter?.category_id?.active?.id
  ].filter(item => item === true).length
  const handleImport = ()=>{
    pageDispatch({type:productActions.IMPORT_FILE,payload:{id:IMPORT.label}})
  }
  const handleExport = ()=>{
    pageDispatch({type:productActions.EXPORT_FILE,payload:{id:EXPORT.label}})
  }
  const doFilter = async (filter, showLoading = true) => {
    const curFilter = filter || pageState.filter

    // when the passed param is unchanged, no request will be sent
    if (
        !filter &&
        paramOld.keyword === curFilter.keyword &&
        paramOld.category_id === curFilter.category_id.id &&
        paramOld.status === curFilter.status.active &&
        paramOld.per_page === curFilter.per_page.value &&
        paramOld.start === curFilter.start
    )
      return

    pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
    const response = await sendRequestAuth(
        'get',
        `${config.API}/product/list?` +
        'keyword=' +
        curFilter.keyword +
        '&category_id=' +
        curFilter.category_id.id +
        '&status=' +
        curFilter.status.active +
        '&per_page=' +
        curFilter.per_page +
        '&start=' +
        curFilter.start,
    )

    setParamOld({
      keyword: curFilter.keyword,
      category_id:curFilter.category_id.id,
      status:curFilter.status.active,
      per_page: curFilter.per_page,
      start: curFilter.start,
    })
    if (response?.data && response?.data?.success) {
      pageDispatch({
        type: productActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: response?.data?.data,
          },
          pagination: {
            active: response?.data?.meta?.start || 0,
            amount: response?.data?.meta?.per_page || 20,
            total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
            totalItems: response?.data?.meta?.total,
          }
        },
      })
      pageDispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
      // if(pageState.filter.group.value) pageDispatch({type: 'SET_FILTER', payload: {group: {value: state.filter.group.value, name: state.filter.group.name}}})
      // if(pageState.filter.city.value) pageDispatch({type: 'SET_FILTER', payload: {city: {value: state.filter.city.value, name: state.filter.city.name}}})
      // if(pageState.filter.district.value) pageDispatch({type: 'SET_FILTER', payload: {district: {value: state.filter.district.value, name: state.filter.district.name}}})
      // if(pageState.filter.ward.value) pageDispatch({type: 'SET_FILTER', payload: {ward: {value: state.filter.ward.value, name: state.filter.ward.name}}})
    } else {
      toast.error('Lọc thất bại!')
    }
  }
  const handleNotifcationDelete = () => {
    pageDispatch({
      type: actionTypes.NOTIFICATIONS_LIST_UPDATE,
      payload: {
        notifications: {
          list: [],
        },
      },
    })
  }
  return {
    search: {
      onChange: handleChangeKeyword
    },
    functions: {
      onChangeStatus: handleChangeStatus,
      applyOrderOtherFilter,
      deleteTag: handleDeleteTag,
      handleDeleteAll,
      handleImport,
      handleExport,
      doFilter
    },
    filter,
    canSubmitOtherFilter,
    countOtherFilter,
    notifications : {
      delete:handleNotifcationDelete
    }
  }
}

export default useProductFilterForm;