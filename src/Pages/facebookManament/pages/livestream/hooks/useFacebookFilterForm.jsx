import { sendRequestAuth } from 'api/api'
import { removeAcent } from 'common/fieldText/_functions'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import config from 'config'
import { useCallback, useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import {
  LIVESTREAM_STATUS,
  ORDER_FILTER_FACE_BOOK,
  ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST,
} from '../interface/_const'
import {
  formatDateTimeDefaultValue,
  facebookLivestreamInitialState,
} from '../provider/_initstate'
import { facebookConversationActions } from '../provider/_actions'
import { getDateFromNow } from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { FacebookLivestreamContext } from '../provider/_context'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import useFacebookLivestream from './useFacebookLivestream'
import useAlert from 'hook/useAlert'

const useFacebookFilterForm = () => {
  const { facebookAuth } = useFacebookAuth()
  const { auth } = facebookAuth
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageState, pageDispatch } = useContext(FacebookLivestreamContext)
  const { filter, table, page } = pageState
  const { fetch } = useFacebookLivestream()
  const {showAlert} = useAlert()

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const searchValue = filter.search.value

  const debounceOrderByFilter = useCallback(
    debounce((keyword,pagesearch) => {
      fetchOrderByFilter(
        { ...queries, keyword: keyword.trim(), page_id: pagesearch },
        { forceLoading: true },
      )
    }, 500),
    [],
  )

  const handleSearchChange = e => {
    if (e.target.value === ' ') e.target.value = ''
    const keyword = e.target.value
    pageDispatch({
      type: facebookConversationActions.FILTER_SEARCH_UPDATE,
      payload: { value: keyword },
    })
    // if(keyword.trim().length > 0) debounceOrderByFilter(keyword.trim().split(' ').join(','))
    debounceOrderByFilter(keyword,page.active.toString())
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // ADVANCED SEARCH
  // ===== ===== ===== ===== =====
  const advancedSearchCustomer = filter.advancedSearch.customer
  const advancedSearchLiveVideoId = filter.advancedSearch.liveVideoId

  const advanedSearchBadge =
    !!advancedSearchCustomer.keyword || !!advancedSearchLiveVideoId

  const handleAdvancedSearchChange = (val, id) => {
    pageDispatch({
      type: facebookConversationActions.FILTER_ADVANCED_SEARCH_UPDATE,
      payload: {
        customer: { keyword: val, value: val ? null : '' },
        liveVideoId: id,
      },
    })

    // if val exist -> search cumstomer id then fetch order
    // if (val.trim()) fetchCustomer(val.trim(), id)
    // else fecth order with empty value
    // else
    fetchOrderByFilter(
      {
        ...queries,
        keyword_customer: val.trim(),
        customer_id: '',
        livestream_id: id || '',
      },
      { forceLoading: true },
    )
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const { afterToday } = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    searchParams ? '' : getDateFromNow(-7, { type: 'start' }),
    searchParams ? '' : getDateFromNow(0, { type: 'end' }),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeValue = filter.dateTime.value
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data =>
    pageDispatch({
      type: facebookConversationActions.FILTER_DATE_TIME_UPDATE,
      payload: {
        end: data.value[1],
        start: data.value[0],
        type: data.category,
        value: data.formatValue,
      },
    })

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // ===== ===== ===== ===== =====
  // SEARCH
  // ===== ===== ===== ===== =====
  const statusList = filter.status.list
  const statusValue = filter.status.value
  const statusActiveValue = filter.status.activeValue

  const handleStatusChange = value => {
    pageDispatch({
      type: facebookConversationActions.FILTER_STATUS_UPDATE,
      payload: {value: value},
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSubmitOtherFilter = [
    dateTimeActiveValue?.value !== dateTimeValue ||
    JSON.stringify(dateTimeActiveValue?.type) !== JSON.stringify(dateTimeType),
    statusActiveValue?.value !== statusValue?.value
  ].includes(true)

  const otherFilterBadge = [
    !!dateTimeActiveValue?.value,
    statusActiveValue?.value === 0 || statusActiveValue?.value === 1
  ].filter(item => item === true).length

  const queries = {
    keyword: searchValue.trim() || '',
    date_type: dateTimeActiveValue?.type?.value || '',
    start_date: dateTimeActiveValue?.value?.split(' - ')[0] || '',
    end_date: dateTimeActiveValue?.value?.split(' - ')[1] || '',
    per_page: table.pagination.amount || 20,
    start: table.pagination.start || 0,
    page_id: page.active || '',
    status: statusActiveValue ? statusActiveValue.value : '',
  }

  const applyOrderOtherFilter = async () => {
    const collection = {
      ...queries,
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
          : '',
      status: statusValue?.value !== 0 ? statusValue?.value !== 1 ? '' : 1 : 0
    }
    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const fetchOrderByFilter = async (qs, opt) => {
    setSearchParams('')
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: true } } },
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/livestream/list${queryString}`,
    )

    if (response?.status === 200) {
      pageDispatch({
        type: facebookConversationActions.OTHER_FILTER_APPLY,
        payload: {
          display: {
            list: Array.isArray(response?.data?.data)
              ? response?.data?.data
              : [],
          },
          pagination: {
            active: opt?.activePage || 0,
            amount: table.pagination.amount,
            total: response?.data?.meta?.totals
              ? Math.ceil(response.data.meta.totals / table.pagination.amount)
              : 0,
            totalItems: response?.data?.meta?.totals || 0,
          },
        },
      })
    }

    if (!!!opt?.notClearDetail)
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
        payload: { table: { display: { loading: false } } },
      })

    pageDispatch({
      type: facebookConversationActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: null },
    })
  }

  const filterTagDelete = t => {
    pageDispatch({
      type: facebookConversationActions.TAG_FILTER_DELETE,
      payload: { type: t, isSingle: true },
    })
    let tmpCollection = {}
    switch (t) {
      case 'dateTime.current':
        tmpCollection = {
          ...tmpCollection,
          date_type: '',
          start_date: '',
          end_date: '',
        }

        pageDispatch({
          type: facebookConversationActions.FILTER_DATE_TIME_UPDATE,
          payload: { start: '', end: '', value: '', type: '' },
        })

        pageDispatch({
          type: facebookConversationActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
          trigger: !dateTimeTrigger,
        })

        break

      case 'status.current':
        tmpCollection = {
          ...tmpCollection,
          status: '',
        }

        pageDispatch({
          type: facebookConversationActions.FILTER_STATUS_UPDATE,
          payload: { value: null, activeValue: null },
        })

        break
  
      default:
        break
    }

    const collection = { ...queries, ...tmpCollection }

    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const filterTagDeleteAll = () => {
    pageDispatch({
      type: facebookConversationActions.TAG_FILTER_DELETE,
    })

    pageDispatch({
      type: facebookConversationActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
      trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
    })

    const date = formatDateTimeDefaultValue.split(' - ')

    const collection = {
      ...queries,
      start_date: '',
      end_date: '',
      status: '',
    }

    fetchOrderByFilter(collection, { forceLoading: true })
  }

  const autoSyncVideoLivestream = async (keyword) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/livestream/sync`,
      {
        "fb_id": auth.userId,
        "page_id": pageState.page?.active,
        "stream_id": keyword,
        "limit": 100
      }
    )
    if (response?.data.success) {
      // refresh
      await fetch.origin()

      // show alert
    }
  }
  const handleVideoLivestreamSync = async (keyword) => {
    pageDispatch({
      type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
      payload: {table: {display: {loading: true}}},
    })

    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/livestream/sync`,
      {
        "fb_id": auth.userId,
        "page_id": pageState.page?.active,
        "stream_id": keyword,
        "limit": 100
      }
    )
    if (response?.data.success) {
      // refresh
      await fetch.origin()

      // show alert
      showAlert({type: 'success', content: 'Đã tải video thành công', duration: 2000})
    } else showAlert({type: 'danger', content: 'Không tìm thấy video cần tải', duration: 2000})
  }

  const onChangeSyncVideo = (value) => {
    pageDispatch({type: "SET_SYNC_VIDEO_SEARCH", payload: {search: value}})
  }

  return {
    advancedSearch: {
      customer: { keyword: advancedSearchCustomer.keyword },
      liveVideoId: advancedSearchLiveVideoId,
      onChange: handleAdvancedSearchChange,
    },
    badge: {
      advanced: advanedSearchBadge,
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
    status: {
      list: statusList,
      value: statusValue,
      activeValue: statusActiveValue,
      onChange: handleStatusChange,
    },

    canSubmitOtherFilter,
    queries,
    functions: {
      handleVideoLivestreamSync: handleVideoLivestreamSync,
      autoSyncVideoLivestream,
      hasFilter: () =>
        [
          JSON.stringify(dateTimeActiveValue) !== JSON.stringify(facebookLivestreamInitialState.filter.dateTime.activeValue),
          !!statusActiveValue
        ].includes(true),
      applyOrderOtherFilter,
      refresh: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, forceLoading: true },
        ),
      fetchOrderWithCurrentFilter: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active },
        ),
      fetchUpdateData: () =>
        fetchOrderByFilter(
          {
            ...queries,
            start: table.pagination.active * table.pagination.amount,
          },
          { activePage: table.pagination.active, notClearDetail: true },
        ),
      filterTagDelete,
      filterTagDeleteAll,
      onChangeSyncVideo,
    },
  }
}

export default useFacebookFilterForm
