import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useOrder} from '../../useOrder'
import './table.scss'
import {Row} from './TableRow'
import {OrderSkeleton} from '../skeleton'
import {StickyFooter} from '../../../../common/stickyFooter'
import {Pagination} from '../../../../common/pagination'
import Empty from '../Empty/index'
import Dropdown from 'Component/PureDropdown/Dropdown'
import {Box, Button, IconButton, Modal, Snackbar} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const OrderTable = ({setFailOrderList}) => {
  const {
    data,
    meta,
    loading,
    loadDetail,
    fetchData,
    onchangePagination,
    handleAmountChange,
    changeOrderStatus,
  } = useOrder()
  const [selectedList, setSelectedList] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [successMessage, setSuccessMessage] = useState({
    active: false,
    message: '',
  })
  const [confirm, setConfirm] = useState({active: false, value: -1})
  const [listOrigin, setListOrigin] = useState('')
  const [hideTableHeader, setHideTableHeader] = useState(false)
  const [selectedListLength, setSelectedListLength] = useState(0)

  useEffect(() => {
    fetchData()
  }, [loadDetail])

  useEffect(() => {
    setSelectedList(data.map(item => ({...item, checked: false})))
  }, [data])

  useEffect(() => {
    if (
      selectedList &&
      selectedList.length > 0 &&
      selectedList.find(item => item.checked === false)
    )
      setAllChecked(false)
    else setAllChecked(true)
  }, [selectedList])

  useEffect(() => {
    setSelectedListLength(
      selectedList.filter(item => item.checked === true).length,
    )
  }, [selectedList])

  const handleSelected = (event, index) =>
    setSelectedList(
      selectedList.map((item, index2) =>
        index2 === index ? {...item, checked: event.target.checked} : item,
      ),
    )

  const changeStatus = async value => {
    const currSelectedList = selectedList.filter(item => item.checked === true)
    if (currSelectedList.length <= 0) return

    const order_ids = currSelectedList.map(item => item.id)
    const result = await changeOrderStatus({
      order_ids,
      status: value,
    })
    fetchData()

    if (result.status) {
      setSuccessMessage({active: true, message: result.message, success: true})
      setFailOrderList([])
    } else {
      setSuccessMessage({active: true, message: result.message, success: false})
      setFailOrderList(result.errorData)
    }

    setTimeout(() => setSuccessMessage({active: false, message: ''}), 5000)
  }

  const handleShippingActions = action => {
    const value = action.value
    if (value < 0) return
    if (value === 7 || value === 15)
      setConfirm({...confirm, active: true, value: value})
    else changeStatus(value)
  }

  const handleSuccessMessageClose = () => {
    setSuccessMessage({active: false, message: ''})
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSuccessMessageClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  const handleConfirm = () => {
    changeStatus(confirm.value)
    setConfirm({...confirm, active: false})
  }

  return (
    <div>
      {/* Notification popup */}
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={successMessage.active}
        autoHideDuration={6000}
        onClose={handleSuccessMessageClose}
        action={action}
      >
        <div className="t-notification-message">
          <img src={'/svg/check-circle.svg'} alt="check-circle" />
          <p>{successMessage.message}</p>
        </div>
      </Snackbar>

      {/* Confirm Actions */}
      <Modal
        open={confirm.active}
        onClose={() => setConfirm({...confirm, active: false})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="t-confirm-message">
          <p>Bạn có chắc chắn muốn hủy đơn giao hàng với đơn đã chọn?</p>
          <div className="t-btn">
            <Button
              className="t-btn-close"
              onClick={() => setConfirm({...confirm, active: false})}
            >
              Đóng
            </Button>
            <Button className="t-btn-accept" onClick={handleConfirm}>
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>

      <TableContainer component={Paper}>
        <Table
          className="table-basic"
          sx={{minWidth: 650}}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{maxWidth: 20}} id="table-header">
                <input
                  className={
                    selectedListLength > 0 &&
                    selectedListLength < selectedList.length
                      ? 'checked-less'
                      : ''
                  }
                  type={'checkbox'}
                  checked={allChecked}
                  onChange={event => {
                    if (
                      selectedList.filter(item => item.checked === true)
                        .length > 0 &&
                      selectedList.filter(item => item.checked === true)
                        .length < selectedList.length
                    ) {
                      setSelectedList(
                        selectedList?.map(item => ({
                          ...item,
                          checked: false,
                        })),
                      )
                      setAllChecked(false)
                    } else {
                      setSelectedList(
                        selectedList?.map(item => ({
                          ...item,
                          checked: event.target.checked,
                        })),
                      )
                      setAllChecked(event.target.checked)
                    }
                  }}
                />
              </TableCell>
              {selectedListLength > 0 && (
                <TableCell colSpan={selectedListLength > 0 ? 8 : 0}>
                  <div className="flex dropdown-table-order">
                    <label>{selectedListLength} đơn hàng được chọn</label>
                    <Dropdown
                      cb={handleShippingActions}
                      filter="order_source"
                      placeHolderText="Order_source"
                      customClass="show-scroll-bar"
                      byPassTran
                      labelKey="name"
                      PlaceHolderText="Thao tác"
                      idKey="id"
                      listOption={[
                        {label: 'Gửi đơn giao hàng', value: 1},
                        {label: 'Hủy giao hàng', value: 7},
                        {label: 'Hủy đơn hàng', value: 15},
                      ]}
                    />
                  </div>
                </TableCell>
              )}
              {hideTableHeader && <div></div>}
              {selectedListLength <= 0 && (
                <>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell align="left">Khách hàng</TableCell>
                  <TableCell align="left">Nguồn đơn hàng</TableCell>
                  <TableCell align="left ">
                    <div className={'table-payment'}>
                      Thanh toán
                      <img
                        src={'/svg/filter-funnel-02.svg'}
                        alt="filter-funnel-02"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right">Giá trị đơn</TableCell>
                  <TableCell align="right">Phí vận chuyển</TableCell>
                  <TableCell align="center">Tình trạng đơn hàng</TableCell>
                  <TableCell align="right" id="setting-icon">
                    <img src={'/svg/GearSix.svg'} alt="GearSix" />
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedList.length > 0 && !loading ? (
              selectedList.map((row, index) => (
                <Row
                  row={row}
                  key={index}
                  index={index}
                  selected={selectedList}
                  handleSelected={event => handleSelected(event, index)}
                />
              ))
            ) : loading ? (
              <OrderSkeleton rows={15} />
            ) : (
              <Empty />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {meta.totals != 0 && (
        <StickyFooter>
          <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            {console.log({
              active:
                meta?.start != 0 ? Math.floor(meta?.start / meta?.per_page) : 0,
              amount: meta?.per_page || 10,
              total: Math.ceil(meta?.totals / meta?.per_page),
              totalItems: meta?.totals,
            })}
            <Pagination
              active={
                meta?.start != 0 ? Math.floor(meta?.start / meta?.per_page) : 0
              }
              amount={meta?.per_page || 10}
              total={Math.ceil(meta?.totals / meta?.per_page)}
              totalItems={meta?.totals}
              onAmountChange={handleAmountChange}
              onPageChange={onchangePagination}
            />
          </div>
        </StickyFooter>
      )}
    </div>
  )
}
