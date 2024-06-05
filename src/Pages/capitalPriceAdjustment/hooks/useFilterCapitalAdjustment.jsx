import React, {useCallback, useContext, useState} from 'react';
import {CapitalAdjustmentContext} from "../provider/context";
import {CapitalAdjustmentActions} from "../provider/action";
import {removeAcent} from "../../../common/fieldText/_functions";
import {debounce} from "@mui/material";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";

const useFilterCapitalAdjustment = () => {
  const {pageState, pageDispatch} = useContext(CapitalAdjustmentContext)

  const searchValue = pageState?.filter?.keyword
  const employeeCreate = pageState?.filter?.employeeCreate
  const employeeCreateActiveValue = employeeCreate?.activeValue
  const employeeCreateKeyword = employeeCreate?.keyword
  const employeeCreateList = employeeCreate?.list
  const employeeCreateTab = employeeCreate?.tab
  const employeeCreateValue = employeeCreate?.value
  const employeeCreateListOrigin = employeeCreate?.listOrigin
  const dateTime = pageState?.filter?.dateTime
  const dateTimeValue = dateTime?.value
  const dateTimeTriggerDefault = dateTime?.trigger
  const dateTimeActiveValue = dateTime?.activeValue
  const statusState = pageState?.filter?.statusState
  const table = pageState?.table


  // ================== Search ==================
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
  const handleChangeSearchValue = keyword => {
    debounceKeywordChange({...queries, code: keyword.trim()})

    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: keyword
    })
  }

  const debounceKeywordChange = useCallback(
    debounce(qs => {
      fetchSearch(qs)
    }, 500), []
  )

  const fetchSearch = async qs => {
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
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_PAGINATION,
        payload: {
          active: capitalAdjustment?.meta?.start,
          amount: capitalAdjustment?.meta?.per_page,
          total: Math.ceil(capitalAdjustment?.meta?.total / capitalAdjustment?.meta?.per_page),
          totalItems: capitalAdjustment?.meta?.total,
        }
      })
    }
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
      pageDispatch({
        type: CapitalAdjustmentActions.TABLE_UPDATE_PAGINATION,
        payload: {active: capitalAdjustment?.meta?.start,
          amount: capitalAdjustment?.meta?.per_page,
          total: Math.ceil(capitalAdjustment?.meta?.total / capitalAdjustment?.meta?.per_page),
          totalItems: capitalAdjustment?.meta?.total,
        }
      })
      pageDispatch({
        type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_ACTIVE_UPDATE,
        payload: {
          dateTime: {
            activeValue: !!!qs?.start_date ? '' : dateTimeValue,
            value: !!!qs?.start_date ? '' : dateTimeValue,
            start: !!!qs?.start_date ? '' : dateTime?.start,
            end: !!!qs?.start_date ? '' : dateTime?.end,
            trigger: !!!qs?.start_date ? !dateTime?.trigger : dateTime?.trigger,
          },
          employeeCreate: {
            activeValue: !!!qs?.user_id ? '' : employeeCreateValue,
            value: !!!qs?.user_id ? '' : employeeCreateValue,
          },
          statusState: {
            activeValue: !!!qs?.status ? [1,2,3] : statusState?.value,
            value: !!!qs?.status ? [1,2,3] : statusState?.value,
          },
        }
      })
    } else {
      toast.error('Hệ thống đang bận!')
    }
  }
  // ================== End Search ==================

  // ================== Employee Create Filter ==================
  const handleEmployeeCreateChange = data => {
    const findEmployee = employeeCreateValue.find(item => +item.user_id === +data.user_id)
    const employeeCreateValueData = findEmployee
      ? employeeCreateValue.filter(item => +item.user_id !== +data.user_id)
      : [...employeeCreateValue, data]
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_VALUE_CHANGE,
      payload: employeeCreateValueData
    })
  }
  const handleEmployeeCreateResetInput = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_VALUE_CHANGE,
      payload: []
    })
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_KEYWORD_UPDATE,
      payload: {
        keyword: '',
        list: employeeCreateListOrigin,
      },
    })
  }
  const handleEmployeeCreateKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim()?.toLowerCase())
      : ''
    const findList =
      employeeCreateTab === 'checked'
        ? employeeCreateValue
        : employeeCreateListOrigin

    const employeeCreateListData = findList.filter(item => {
      const formatNameItem = item?.fullname
        ? removeAcent(item.fullname.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: employeeCreateListData,
      },
    })
  }

  const handleEmployeeCreateTabChange = tab => {
    const formatDataValue = employeeCreateKeyword
      ? removeAcent(employeeCreateKeyword?.toLowerCase())
      : ''
    const employeeCreateListData = employeeCreateListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue)
    })
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_TAB_UPDATE,
      payload: {
        list: tab === 'checked' ? employeeCreateValue : employeeCreateListData,
        tab,
      },
    })
  }
  // ================== End Employee Create Filter ==================


  // ================== Date Time Filter ==================
  const handleDateTimeChange = date => {
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_DATE_TIME_UPDATE,
      payload: {
        end: date.value[1],
        start: date.value[0],
        type: date.category,
        value: date.formatValue,
      },
    })
  }
  // ================== End Date Time Filter ==================

  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const handleRefreshData = _ => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      setTimeout(() => setDebounceRefresh(true), 2000)

      fetchDataByFilter(queries, 'refresh')
    }
  }

  const applyOrderOtherFilter = _ => {
    fetchDataByFilter(queries)
  }

  const shouldShowResetAll = [
    !!dateTimeActiveValue,
    employeeCreateActiveValue?.length > 0
  ].includes(true)

  const filterTagDelete = type => {
    fetchDataByFilter({
      ...queries,
      start_date: type === 'date' ? '' : dateTime?.start,
      end_date: type === 'date' ? '' : dateTime?.end,
      user_id: type === 'employee' ? '' : employeeCreateValue?.length > 0 ? employeeCreateValue?.map(item => item.user_id)?.join(', ') : ''
    })
  }

  const handleDeleteAll = _ => {
    fetchDataByFilter({...queries, start_date: '', end_date: '', user_id: ''})
  }

  const canSubmitFilter = [
    JSON.stringify(dateTimeActiveValue) !== JSON.stringify(dateTimeValue),
    JSON.stringify(employeeCreateActiveValue) !== JSON.stringify(employeeCreateValue),
  ].includes(true)

  const otherFilterBadge = [
    dateTimeActiveValue?.length > 0,
    employeeCreateActiveValue?.length > 0,
  ].filter(item => item === true).length

  const handleChangeStatus = data => {
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_STATUS_STATE_UPDATE,
      payload: {
        value: !!statusState?.value?.find(item => +item === +data)
                ? statusState?.value?.filter(item => +item !== +data)
                : [...statusState.value, data],
        activeValue: statusState?.activeValue
      }
    })
  }

  const handleCheckboxChange = _ => {
    pageDispatch({
      type: CapitalAdjustmentActions.FILTER_ADVANCED_STATUS_STATE_UPDATE,
      payload: {
        value: !!statusState?.activeValue ? statusState?.activeValue : statusState?.value,
        activeValue: statusState?.activeValue
      }
    })
  }

  const handleRefreshStatus = _ => {
    fetchDataByFilter({...queries, status: ''})
  }


  return {
    search: {
      value: searchValue,
      onChange: handleChangeSearchValue
    },
    refreshData: {
      onClick: handleRefreshData
    },
    filter: {
      canSubmitFilter,
      applyOrderOtherFilter,
      otherFilterBadge
    },
    dateTime: {
      value: dateTimeValue,
      activeValue: dateTimeActiveValue,
      triggerDefault: dateTimeTriggerDefault,
      onChange: handleDateTimeChange,
    },
    employeeCreate: {
      activeValue: employeeCreateActiveValue,
      keyword: employeeCreateKeyword,
      list: employeeCreateList,
      tab: employeeCreateTab,
      value: employeeCreateValue,
      onChange: handleEmployeeCreateChange,
      onInputReset: handleEmployeeCreateResetInput,
      onKeywordChange: handleEmployeeCreateKeywordChange,
      onTabChange: handleEmployeeCreateTabChange,
    },
    statusState: {
      activeValue: statusState?.activeValue,
      value: statusState?.value,
    },
    tags: {
      shouldShowResetAll,
      filterTagDelete,
      handleDeleteAll,
    },
    methods: {
      handleChangeStatus,
      handleCheckboxChange,
      handleRefreshStatus
    }
  }
}

export default useFilterCapitalAdjustment