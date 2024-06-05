// import {Alert} from 'common/alert'
import React, {createContext, useEffect, useReducer, useState} from 'react'
import {CustomerHeader} from './components/header'
import {CustomerBody} from './components/body/index.jsx'
import CustomerReducer from './store/reducer'
import {initCustomerState} from './store/initState'
import {sendRequestAuth} from '../../api/api'
import config from '../../config'
import './index.scss'
import Filter from './components/filter/index'
// #lib
import {Grid} from '@material-ui/core'
// import Pagination from '@material-ui/lab/Pagination'
import Notification from 'Pages/Order/component/TabDetail/Notification/index'
import {StickyFooter} from 'common/stickyFooter'
import {Pagination} from 'common/pagination'
import ConfirmModal from './components/ConfirmModal'
import SuccessMessage from './components/SuccessMessage'
import {
  createSearchParams,
  useNavigate,
  // useParams,
  useSearchParams,
} from 'react-router-dom'
import useCustomerFilterForm from './components/hooks/useCustomerFilterForm'
import location from '../addressSeparationTool/_data.json'
import {PATH} from 'const/path'

export const CustomerContext = createContext(null)

export const Customer = ({...props}) => {
  const [state, dispatch] = useReducer(CustomerReducer, initCustomerState)
  const {filter} = state
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const {functions} = useCustomerFilterForm({
    state,
    dispatch,
  })

  const [confirm, setConfirm] = useState({
    active: false,
    value: -1,
    isAccept: false,
    title: '',
    message: '',
    btnAccept: 'Accept',
    btnCancel: 'Cancel',
    handleConfirm: () => {},
  })

  const [successMessage, setSuccessMessage] = useState({
    active: false,
    message: '',
    iconUrl: '',
  })

  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_LIST',
      payload: [],
    })
    const fetchShippingStatus = async () => {
      const res = await sendRequestAuth(
        'get',
        `${config.API}/order/shipping/status`,
      )
      if (res.status === 200) {
        dispatch({type: 'FETCH_SHIPPING_STATUS', payload: res.data.data})
      }
    }
    fetchShippingStatus()

    return () => {
      dispatch({type: 'CLEAR_HAS_FILTER', payload: false})
      dispatch({type: 'CLEAR_SELECTED'})
    }
  }, [])

  let [searchParams] = useSearchParams()
  useEffect(() => {
    let filter = state.filter

    if (searchParams.toString().trim()) {
      const city = location?.find(x => x.id === searchParams.get('city')) || {}
      const district =
        city?.list?.find(x => x.id === searchParams.get('district')) || {}
      const ward =
        district?.list?.find(x => x.id === searchParams.get('ward')) || {}

      filter = {
        keyword: {
          label: 'Từ khóa',
          value: searchParams.get('keyword') || '',
          name: searchParams.get('keyword') || '',
        },
        group: {
          label: 'Nhóm khách hàng',
          value: searchParams.get('group') || '',
          name: filter.group.name || '',
        },
        city: {
          label: 'Tỉnh/Thành phố',
          value: searchParams.get('city') || '',
          name: city.name,
        },
        district: {
          label: 'Quận/Huyện',
          value: searchParams.get('district') || '',
          name: district.name,
        },
        ward: {
          label: 'Phường/Xã',
          value: searchParams.get('ward') || '',
          name: ward.name,
        },
        start: parseInt(searchParams.get('start'), 10) || state.filter.start,
        per_page:
          parseInt(searchParams.get('per_page'), 10) || state.filter.per_page,
      }
    }

    functions.doFilter(filter)

    const start = parseInt(searchParams.get('start') || 0, 10)
    const per_page = parseInt(searchParams.get('per_page') || 0, 10)
    setPage(parseInt(start / per_page || 0, 10))
  }, [searchParams])

  const fetchData = () => {
    functions.doFilter(filter, false)
  }

  const onchangePagination = newPage => {
    navigate({
      pathname: '/partner-management/customer',
      search: `?${createSearchParams({
        keyword: state.filter?.keyword?.value,
        group: state.tag?.group?.value,
        city: state.tag?.city?.value,
        district: state.tag?.district?.value,
        ward: state.tag?.ward?.value,
        per_page: state.filter?.per_page,
        start: newPage * state.filter.per_page,
      })}`,
    })
  }

  const handleChangeRowsPerPage = perPage => {
    const currStart = searchParams.get('start')
    navigate({
      pathname: '/partner-management/customer',
      search: `?${createSearchParams({
        keyword: state.filter?.keyword?.value,
        group: state.tag?.group?.value,
        city: state.tag?.city?.value,
        district: state.tag?.district?.value,
        ward: state.tag?.ward?.value,
        per_page: parseInt(perPage, 10),//total/perpage
        start: Math.floor(currStart / perPage) * perPage,
      })}`,
    })
  }

  return (
    <CustomerContext.Provider
      value={{
        state,
        dispatch,
        confirm,
        setConfirm,
        successMessage,
        setSuccessMessage,
        fetchData,
      }}
    >
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <SuccessMessage
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />

      <section {...props}>
        <CustomerHeader />
        <Notification />
        <Filter />
        <CustomerBody />
      </section>
      {filter?.total !== 0 && (
        <StickyFooter>
          <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <Pagination
              active={page}
              amount={filter?.per_page || 10}
              total={Math.ceil(filter?.total / filter?.per_page)}
              totalItems={filter?.total}
              onAmountChange={handleChangeRowsPerPage}
              onPageChange={onchangePagination}
            />
          </div>
        </StickyFooter>
      )}
    </CustomerContext.Provider>
  )
}
