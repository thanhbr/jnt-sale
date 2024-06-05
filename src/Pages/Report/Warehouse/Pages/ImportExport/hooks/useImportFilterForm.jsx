import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import React, {useCallback, useContext, useState} from 'react'
import {DateRangePicker} from 'rsuite'
import {
  ORDER_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'
import { ImportExportContext} from '../provider/_context'
import {formatDateTimeDefaultValue, importExportActions, importExportInitialState} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import {removeVietnameseTones} from "../../../../../../util/checkPasswordVN";
import {Text} from "../../../../../../common/text";
import {productActions} from "../../../../../product/provider/~action";

const useImportFilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageState, pageDispatch} = useContext(ImportExportContext)
  const {filter, table} = pageState
  const [groupParent, setGroupParent] = useState('')
  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value
  const querySearch = searchParams.get('search') || ''

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const {afterToday} = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    querySearch ? '' : getDateFromNow(-30, {type: 'start'}),
    querySearch ? '' : getDateFromNow(0, {type: 'end'}),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data =>
    pageDispatch({
      type: importExportActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })


  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // WAREHOUSE
  // ===== ===== ===== ===== =====
  const warehouseActiveValue = filter.warehouse.activeValue
  const warehouseKeyword = filter.warehouse.keyword
  const warehouseList = filter.warehouse.list
  const warehouseListOrigin = filter.warehouse.listOrigin
  const warehouseValue = filter.warehouse.value

  const handleWarehouseChange = data =>
    pageDispatch({
      type: importExportActions.FILTER_WAREHOUSE_UPDATE,
      payload: {value: data},
    })

  const handleWarehouseKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const warehouseListData = warehouseListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    pageDispatch({
      type: importExportActions.FILTER_WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: warehouseListData,
      },
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // PRODUCT GROUP
    // ===== ===== ===== ===== =====
  const categoryId = pageState?.filter?.category_id
  const categoryActive = pageState?.filter?.category_id?.active
  const categoryName = pageState?.filter?.category_id?.name
  const handleSelectParent = (target, value) => {
    pageDispatch({type: importExportActions.FORM_CREATE_UPDATE_LIST_CHILDREN_TWO, payload: value?.category_childs})

    if(value?.category_childs?.length !== 0) {
      target.stopPropagation()
      setGroupParent(value?.category_name)
    } else {
      pageDispatch({type: importExportActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: value?.category_name})
      pageDispatch({type: importExportActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status: false, message: ''}})

      // Filter product
      pageDispatch({type: importExportActions.FILTER_ADVANCED_CATEGORY_UPDATE,
        payload: {id: value?.id, name: value?.category_name, active: pageState?.filter?.category_id?.active}})
    }
  }
  const handleSelectChild = value => {
    if(!!value) {
      pageDispatch({type: importExportActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: `${groupParent} - ${value?.category_name}`})
      pageDispatch({type: importExportActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status: false, message: ''}})
      // Filter product
      pageDispatch({type: importExportActions.FILTER_ADVANCED_CATEGORY_UPDATE,
        payload: {id: value?.id, name: `${groupParent} - ${value?.category_name}`, active: pageState?.filter?.category_id?.active}})
    } else {
      pageDispatch({type: importExportActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: ''})
      // Filter product
      pageDispatch({type: importExportActions.FILTER_ADVANCED_CATEGORY_UPDATE, payload: {id: '', name: '', active: pageState?.filter?.category_id?.active}})
    }
  }

  const handleSelectSearchParent = value => {
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status: false, message: ''}})
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC,
      payload: value?.parent_name? `${value?.parent_name} - ${value?.category_name}` : value?.category_name})
    pageDispatch({type: importExportActions.FILTER_ADVANCED_CATEGORY_UPDATE,
      payload: {id: value?.id, name: value?.parent_name? `${value?.parent_name} - ${value?.category_name}` : value?.category_name, active: pageState?.filter?.category_id?.active}})
  }

  const handleGroupProductKeywordChange = data => {
    debounceGroupProductKeywordChange(data?.value)
  }
  const debounceGroupProductKeywordChange = useCallback(
      debounce((keyword) => {
        handleGroupProductSearch(keyword?.trim())
      }, 500),
      [],
  )

  const handleGroupProductSearch = async keyword => {
    const response = await sendRequestAuth( 'get', `${config.API}/product/category/list?keyword=${keyword}&status`)
    if(response?.data?.success) {
      pageDispatch({type: importExportActions.FORM_CREATE_SEARCH_LIST_ORIGIN, payload:
            {keyword: keyword, list: highlightGroupProduct(keyword, response?.data?.data)}})
    }
  }

  const getStartEnd = (str, sub) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1]

  const highlightGroupProduct = (keyword, data) => {
    const keywordEng = removeVietnameseTones(keyword)?.toLowerCase()

    let result = []
    data.map(item => {
      if(item?.category_childs?.length !== 0 && !!item?.category_childs) {
        item?.category_childs?.map(it => {
          // const cateEng = removeVietnameseTones(it?.category_name)?.toLowerCase()
          const text = !!it.parent_id
              ? `${item.category_name} - ${it.category_name}`
              : `${it.category_name}`
          // if(cateEng?.includes(keyword)) {
          const convertEng = removeVietnameseTones(text)?.toLowerCase()
          const abc = getStartEnd(convertEng, keywordEng)
          const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
          const fm = text?.split(subText)
          it.parent_name = item.category_name
          it.display = <div style={{fontSize: 14}}>
            {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
          </div>
          if(!!fm[2]) {
            it.display = <div style={{fontSize: 14}}>
              {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
              <Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[2]}
            </div>
          }
          result.push(it)
        })
      } else {
        const cateEng = removeVietnameseTones(item?.category_name)?.toLowerCase()
        const text = item.parent_code
            ? `${item.parent_name} - ${item.category_name}`
            : `${item.category_name}`
        if(cateEng?.includes(keyword)) {
          const convertEng = removeVietnameseTones(text)?.toLowerCase()
          const abc = getStartEnd(convertEng, keywordEng)
          const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
          const fm = text?.split(subText)
          item.display = <div style={{fontSize: 14}}>{fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}</div>
        } else {
          item.display = <Text style={{color: '#1E9A98'}}>{text}</Text>
        }
        result.push(item)
      }
    })
    return result
  }


  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
      JSON.stringify(dateTimeActiveValue.value) !== JSON.stringify(dateTimeValue),
    JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    JSON.stringify(categoryActive) !== JSON.stringify(categoryName)
  ].includes(true)


  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    !!warehouseActiveValue?.value,
      !!categoryActive,
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue.trim() || '',
    start_date:
      dateTimeActiveValue?.start && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
        : '',
    end_date:
      dateTimeActiveValue?.end && dateTimeActiveValue.value
        ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
        : '',
    warehouse_id: warehouseActiveValue?.value || '',
    per_page: 5000,
    start: 0,
    category_id: filter?.groupProduct?.id  || ''
  }


  const debounceImportByFilter = useCallback(debounce((keyword, queries) => {
    fetchImportByFilter(
      {...queries, keyword: keyword.trim()},
      {forceLoading: true},
    )
  }, 500), [])

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value
    // pageDispatch({
    //   type: importExportActions.FILTER_SEARCH_UPDATE,
    //   payload: {value: keyword},
    // })
    debounceImportByFilter(keyword.trim(), queries)
    // if(keyword.trim().length > 0) debounceImportByFilter(keyword.trim().split(' ').join(','))
  }


  const applyImportOtherFilter = async () => {
    const collection = {
      ...queries,
      keyword: searchValue.trim() || '',
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
          : '',
      warehouse_id: warehouseValue?.value || '',
      category_id: categoryId?.id || ''
    }
    fetchImportByFilter(collection, {forceLoading: true})
  }


  const fetchImportByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: importExportActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: true}}},
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/report/warehouses/inventory${queryString}`),
    ])
    if (response[0]?.status === 200) {
      if(opt?.delete){
        pageDispatch({
          type: importExportActions.FILTER_DELETE_UPDATE,
          payload: {
            display: {
              list: Array.isArray(response[0]?.data?.data)
                  ? response[0].data.data
                  : [],
            },
            pagination: {
              totalItems: response[0]?.data?.meta?.totals || 0,
            },
          },
        })
        pageDispatch({type:importExportActions.PANELS_UPDATE,payload:{
            panels:response[0]?.data?.meta
          }})
      }else {
        pageDispatch({
          type: importExportActions.OTHER_FILTER_APPLY,
          payload: {
            display: {
              list: Array.isArray(response[0]?.data?.data)
                  ? response[0].data.data
                  : [],
            },
            pagination: {
              totalItems: response[0]?.data?.meta?.totals || 0,
            },
          },
        })
        pageDispatch({type:importExportActions.PANELS_UPDATE,payload:{
            panels:response[0]?.data?.meta
          }})
      }

    }
    pageDispatch({
      type: importExportActions.FILTER_SEARCH_UPDATE,
      payload: {value: qs?.keyword || ''},
    })
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: importExportActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: {table: {display: {loading: false}}},
      })
  }

  const filterTagDelete = t => {
    pageDispatch({
      type: importExportActions.TAG_FILTER_DELETE,
      payload: {type: t, isSingle: true},
    })

    let tmpCollection = {}
    switch (t) {
      case 'dateTime.current':
        tmpCollection = {
          ...tmpCollection,
          start_date: '',
          end_date: '',
        }

        pageDispatch({
          type: importExportActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          payload: {trigger: null},
        })

        break

      case ORDER_FILTER_TAG_FIELDS[0]:
        tmpCollection = {
          ...tmpCollection,
        }
        break

      case ORDER_FILTER_TAG_FIELDS[1]:
        tmpCollection = {...tmpCollection, warehouse_id: ''}
        break

      case ORDER_FILTER_TAG_FIELDS[2]:
        tmpCollection = {...tmpCollection, category_id: ''}
        break

      default:
        break
    }

    const collection = {...queries, ...tmpCollection}
    fetchImportByFilter(collection, {forceLoading: true,delete:true})
  }

  const filterTagDeleteAll = isSoft => {
    ORDER_FILTER_TAG_FIELDS.forEach(item =>
      pageDispatch({
        type: importExportActions.TAG_FILTER_DELETE,
        payload: {type: item},
      }),
    )

    pageDispatch({
      type: importExportActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
      payload: {
        trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
      },
    })

    if (isSoft) return

    const date = formatDateTimeDefaultValue.split(' - ')

    const collection = {
      ...queries,
      start_date: convertDateTimeToApiFormat(date[0]),
      end_date: convertDateTimeToApiFormat(date[1]),
      warehouse_id: '',
      category_id: '',
    }

    fetchImportByFilter(collection, {forceLoading: true})
  }
  return {
    badge: {
      others: otherFilterBadge,
    },
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      onChange: handleDateTimeChange,
    },
    search: {
      value: searchValue,
      onChange: handleSearchChange,
    },
    warehouse: {
      activeValue: warehouseActiveValue,
      keyword: warehouseKeyword,
      list: warehouseList,
      value: warehouseValue,
      onChange: handleWarehouseChange,
      onKeywordChange: handleWarehouseKeywordChange,
    },
    category:{
      categoryId,
      categoryActive,
      categoryName
    },
   productGroup:{
     onSelectParent: handleSelectParent,
     onSelectChild: handleSelectChild,
     onGroupProductKeywordChange: handleGroupProductKeywordChange,
     onSelectSearchParent: handleSelectSearchParent,
     groupProductSearch: filter?.groupProduct?.search,
      groupProduct : filter?.groupProduct?.list,
     groupProductChild : filter?.groupProduct?.listChildTwo,
     active: filter?.groupProduct
   },
    canSubmitOtherFilter,
    queries,
    functions: {
      hasFilter: () => [
        JSON.stringify(dateTimeActiveValue?.value) !==
          JSON.stringify(importExportInitialState.filter.dateTime.activeValue?.value),
        !!warehouseActiveValue?.name,
        !!categoryActive
      ].includes(true),
      applyImportOtherFilter,
      refresh: () =>
        fetchImportByFilter(
          {
            ...queries,
            start: 0,
          },
          {activePage: 0, forceLoading: true},
        ),
      fetchUpdateData: () =>
        fetchImportByFilter(
          {
            ...queries,
            start: 0,
          },
          {activePage: 0, notClearDetail: true},
        ),
      filterTagDelete,
      filterTagDeleteAll,
    },
  }
}

export default useImportFilterForm
