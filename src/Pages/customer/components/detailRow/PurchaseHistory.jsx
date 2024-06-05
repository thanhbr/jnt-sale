import {Button, TableCell, TableRow} from '@material-ui/core'
import {getData} from 'api/api'
import config from '../../../../config'
import {useContext, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {CustomerContext} from '../../index'
import {ORDER_PAGE} from 'Component/Icons'
import DateTimeRangePickerCustom from '../DateTimeRangePickerCustom'
import StatusCustomer from '../StatusCustomer'
import SearchDateCustomer from '../SearchDateCustomer'
import {useTable} from './useTable'
import moment, {now} from 'moment'
import {formatMoney} from 'util/functionUtil'
import {CustomerShippingStatus} from './_customerShippingStatus'
import { Link } from 'react-router-dom'
import { CustomerSkeleton } from 'Pages/GroupCustomer/components/skeleton'

export const PurchaseHistory = ({customerId}) => {
  const {state, dispatch} = useContext(CustomerContext)
  const {shippingStatus, customerPurchase} = state
  const { originList } = customerPurchase
  const shippingStatusId = shippingStatus?.value?.map(item => item.id) ?? []

  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [perPage, setPerPage] = useState('')
  const [page, setPage] = useState('')
  const [loading, setLoading] = useState(false)
  const {handleShippingStatusName, formatDateTime, handleStatusPayment} =
    useTable()
  const [isOrderEmpty, setIsOrderEmpty] = useState(
    keyword === '' &&
      startDate === null &&
      endDate === null &&
      shippingStatusId.length <= 0,
  )

  const fetchDataOrderList = (
    startDate,
    endDate,
    keyword,
    shippingStatusId,
    isSetOrigin,
  ) => {
    getData(
      `${
        config.API
      }/customer/order-list/${customerId}?keyword=${keyword}&start_date=${
        startDate ?? ''
      }&end_date=${
        endDate ?? ''
      }&shipping_status_id=${shippingStatusId}&per_page=${perPage}&start=${page}`,
    )
      .then(res => {
        setLoading(true)

        if (res.data.success) {
          setData(res?.data?.data)
        } else {
          setData([])
        }

        setIsOrderEmpty(
          keyword === '' &&
          startDate === null &&
          endDate === null &&
          shippingStatusId.length <= 0,
        )
        isSetOrigin && dispatch({type: 'CUSTOMER_PURCHASE_UPDATE', payload: res?.data?.data || []})
      })
      .catch(err => {
        // console.log('error')
      })
  }
  
  useEffect(() => {
    setLoading(false)
    fetchDataOrderList(startDate, endDate, keyword, shippingStatusId, true)
    return dispatch({type: 'CUSTOMER_PURCHASE_UPDATE', payload: []})
  }, [])

  const handleReset = async () => {
    setKeyword('')
    setStartDate(null)
    setEndDate(null)
    dispatch({type: 'CLEAR_SHIPPING_STATUS'})

    fetchDataOrderList(null, null, '', [])
  }

  const handleApplyFilter = async () => {
    fetchDataOrderList(startDate, endDate, keyword, shippingStatusId)
  }

  return (
    <div className="purchase_history">
      {originList?.length > 0 && (
        <div className="keyword-filter">
          <div className="input-search">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hàng, mã vận đơn"
              onChange={e => setKeyword(e.target.value)}
              value={keyword}
            />
            {ORDER_PAGE.search}
          </div>
          <div className="input-date-calendar">
            <SearchDateCustomer
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
            />
          </div>
          <div className="input-status">
            {/* <StatusCustomer
            checked={shippingStatusId}
            setChecked={setShippingStatusId}
          /> */}
            <CustomerShippingStatus />
          </div>
          <div className="input-group">
            <div className="input-reset" onClick={handleReset}>
              Đặt lại mặc định
            </div>
            <div className="input-btn" onClick={handleApplyFilter}>
              Áp dụng
            </div>
          </div>
        </div>
      )}
      {!loading && <CustomerSkeleton rows={4} />}
      {loading && data?.length > 0 && (
        <div className="table">
          <TableRow className="table_purchase_history">
            <TableCell align="left" className="table_id">
              Mã đơn hàng
            </TableCell>
            <TableCell align="left" className="table_bill">
              Mã vận đơn
            </TableCell>
            <TableCell align="left" className="table_date">
              Ngày mua hàng
            </TableCell>
            <TableCell align="right" className="table_price">
              Giá trị đơn hàng
            </TableCell>
            <TableCell align="center" className="table_status">
              Trạng thái đơn hàng
            </TableCell>
          </TableRow>
          {data?.map(row => (
            <TableRow key={row.id} className="table_content">
              <TableCell align="left" className="table_id">
              <Link to={`/orders?search=${row?.id}`} target="_blank">{row.id}</Link>
              </TableCell>
              <TableCell align="left" className="table_bill">
                {row?.billcode || '---'}
              </TableCell>
              <TableCell align="left" className="table_date">
                {formatDateTime(row.dt_created || '---')}
              </TableCell>
              <TableCell align="right" className="table_price">
                {formatMoney(row.total_amount)}
              </TableCell>
              <TableCell align="right" className="table_status">
                {handleShippingStatusName(row.shipping_status_name)}
              </TableCell>
            </TableRow>
          ))}
        </div>
      )}
      {loading && data?.length <= 0 && (
        <div className="no-image-data">
          <div className="img">
            <img src={'/img/customer/no-image-data.svg'} alt="no-image-data" />
          </div>
          <div className="text">
            <p>{isOrderEmpty ? 'Khách hàng chưa có lịch sử mua hàng' : 'Không tìm thấy dữ liệu phù hợp'}</p>
          </div>
        </div>
      )}
    </div>
  )
}
