import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Dropdown from 'Component/PureDropdown/Dropdown'
import CheckboxAll from 'Pages/customer/components/CheckboxAll'
import useCustomer from 'Pages/customer/useCustomer'
import {CUSTOMER_COLUMN_NAMES} from 'Pages/customer/_constants'
import {useContext, useEffect, useState} from 'react'
import {CONSIGNMENT} from '../../../../Component/Icons'
import {CustomerContext} from '../../index'
import Empty from '../Empty'
import {CustomerSkeleton} from '../skeleton/index'
import { failIcon, successIcon } from '../SuccessMessage'
import {Row} from './row'

export const CustomerBody = () => {
  const {state, confirm, setConfirm, setSuccessMessage, fetchData, dispatch} =
    useContext(CustomerContext)
  const {changeDeleteCustomer, changeCustomerStatus} = useCustomer()
  const { selectedList, listCustomer } = state

  /////////////////////////////////
  // Handle Checkbox All
  const [allChecked, setAllChecked] = useState(false)
  const [detailId, setDetailId] = useState(-1)

  const checkedLess = (() => {
    if (selectedList.length <= 0) return true

    let checkFullPage = true
    listCustomer.forEach(item => {
      const findItem = selectedList.find(find => find.id === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  })()

  useEffect(() => {
    if (selectedList.length <= 0) { 
      setAllChecked(false)
      return
    }

    let checkFullPage = true
    listCustomer.forEach(item => {
      const findItem = selectedList.find(find => find.id === item.id)
      if (!findItem) checkFullPage = false
    })
    setAllChecked(checkFullPage)
  }, [selectedList.length, listCustomer])
  
  const handleSelected = (event, index) => {
    const item = listCustomer[index]
    const selectedIndex = selectedList.findIndex(x => x.id === item.id)
    if (selectedIndex > -1) 
      dispatch({type: 'SET_SELECTED_LIST', payload: selectedList.splice(selectedIndex, 1)})
    else {
      selectedList.push(item)
      dispatch({type: 'SET_SELECTED_LIST', payload: selectedList})
    }
  }
  
  const changeAction = async value => {
    if (selectedList.length <= 0) return

    const ids = selectedList.map(item => item.id)
    let result = null
    if (value === -2) result = await changeDeleteCustomer({id: ids})
    else result = await changeCustomerStatus({id: ids, status: value})
    // dispatch({type: 'SET_LOADING', payload: true})
    fetchData()

    if (result.status) {
      setSuccessMessage({active: true, message: result.message, success: true, iconUrl: successIcon})
      dispatch({type: 'SET_SELECTED_LIST', payload: []})
    } else {
      setSuccessMessage({active: true, message: result.message, success: false, iconUrl: failIcon})
    }
  }

  const handleActions = action => {
    const value = action.value
    if (value === -1)
      setConfirm({
        ...confirm,
        active: true,
        title: 'Ngưng kích hoạt khách hàng',
        content: 'Bạn có chắc chắn muốn ngưng kích hoạt khách hàng đã chọn?',
        btnCancel: 'Hủy',
        btnAccept: 'Xác nhận',
        acceptStyle: 'accept',
        handleConfirm: () => changeAction(value),
      })
    else if (value === -2)
      setConfirm({
        ...confirm,
        active: true,
        title: 'Xóa khách hàng',
        content: 'Bạn có chắc chắn muốn xoá khách hàng đã chọn?',
        btnCancel: 'Hủy',
        btnAccept: 'Xóa',
        acceptStyle: 'delete',
      handleConfirm: () => changeAction(value),
      })
    else changeAction(value)
  }
  ////////////////////////////////
  return (
    <div className="container-table-customer">
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead className="table-header-body">
            <TableRow>
              <TableCell align="center" className="table_checkbox">
                <CheckboxAll allChecked={allChecked} checkedLess={checkedLess} setAllChecked={setAllChecked} />
              </TableCell>
              {(allChecked || !checkedLess) && (
                <TableCell colSpan={6} className="checkbox-column">
                  <div className="flex dropdown-table-customer">
                    <label>{selectedList?.length} khách hàng được chọn</label>
                    <Dropdown
                      cb={handleActions}
                      filter="order_source"
                      placeHolderText="Order_source"
                      customClass="show-scroll-bar"
                      byPassTran
                      labelKey="name"
                      PlaceHolderText="Thao tác"
                      idKey="id"
                      listOption={[
                        {label: 'Kích hoạt', value: 1},
                        {label: 'Ngưng kích hoạt', value: -1},
                        // {label: 'Xóa', value: -2, className: 'delete-option'},
                      ]}
                    />
                  </div>
                </TableCell>
              )}

              {!(allChecked || !checkedLess) &&
                CUSTOMER_COLUMN_NAMES.map((i, index) => (
                  <TableCell align="left" className={i.className} key={index}>
                    {i.name}
                  </TableCell>
                ))}
              <TableCell align="right" className="icon-settings">
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCustomer.length > 0 && !state.isLoading ? (
              //
              // <CustomerSkeleton rows={20} />
              listCustomer.map((customer, index) => (
                <Row
                  dataRow={customer}
                  key={index}
                  handleSelected={event => handleSelected(event, index)}
                  openDetail={detailId === customer.id}
                  setDetailId={(id) => setDetailId(prev => prev !== id ? id : -1)}
                />
              ))
            ) : state.isLoading ? (
              <CustomerSkeleton rows={20} />
            ) : (
              <Empty />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
