import {TableCell, TableRow} from '@material-ui/core'
import React, {useContext, useEffect, useRef, useState} from 'react'
import Detail from '../detailRow/index.jsx'
import './row.scss'
import {CustomerContext} from 'Pages/customer'
import {Link} from 'react-router-dom'
import useCustomer from 'Pages/customer/useCustomer'
import {Switch} from '../switch'
import {failIcon, successIcon} from '../SuccessMessage'
import {Tooltip} from 'common/tooltipv2'
import {Tooltip as TooltipV1} from 'common/tooltip'
import {ICONS} from 'Pages/customer/_icons'

export const Row = ({openDetail, dataRow, setDetailId}) => {
  const [isTableHover, setIsTableHover] = useState(false)
  const [isActionActive, setIsActionActive] = useState(false)
  const {confirm, setConfirm, setSuccessMessage, fetchData, dispatch, state} =
    useContext(CustomerContext)
  const {selectedList, listCustomer} = state
  const {changeDeleteCustomer, changeCustomerStatus} = useCustomer()

  useEffect(() => {
    if (openDetail) {
      setIsTableHover(true)
      dispatch({type: 'CLEAR_SHIPPING_STATUS'})
    }
  }, [openDetail])

  const handleDelete = e => {
    e.stopPropagation()
    setConfirm({
      ...confirm,
      active: true,
      title: 'Xóa khách hàng',
      content: 'Bạn có chắc chắn muốn xoá khách hàng đã chọn?',
      btnCancel: 'Hủy',
      btnAccept: 'Xóa',
      acceptStyle: 'delete',
      handleConfirm: async () => {
        const result = await changeDeleteCustomer(dataRow.id)
        if (result.status) {
          fetchData()
          setSuccessMessage({
            active: true,
            message: result.message,
            success: true,
            iconUrl: successIcon,
          })
        } else {
          setSuccessMessage({
            active: true,
            message: result.message,
            success: false,
            iconUrl: failIcon,
          })
        }
      },
    })
  }

  const changeStatus = async status => {
    const result = await changeCustomerStatus({
      id: [dataRow.id],
      status: status,
    })
    if (result.status) {
      fetchData()
      setSuccessMessage({
        active: true,
        message: result.message,
        success: true,
        iconUrl: successIcon,
      })
    } else {
      setSuccessMessage({
        active: true,
        message: result.message,
        success: false,
        iconUrl: failIcon,
      })
    }
  }

  const handleChangeStatus = async event => {
    event.stopPropagation()
    if (dataRow.status === '1')
      setConfirm({
        ...confirm,
        active: true,
        title: 'Ngưng kích hoạt khách hàng',
        content: 'Bạn có chắc chắn muốn ngưng kích hoạt khách hàng đã chọn?',
        btnCancel: 'Hủy',
        btnAccept: 'Xác nhận',
        acceptStyle: 'accept',
        handleConfirm: () => changeStatus('-1'),
      })
    else changeStatus('1')
  }

  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        setIsActionActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const [over, setOver] = useState(false)
  const [hasOneRow, setHasOneRow] = useState(false)

  const handleSelected = event => {
    const checked = event.target.checked
    if (checked) {
      dispatch({type: 'SET_SELECTED_LIST', payload: [...selectedList, dataRow]})
    } else {
      const selectedIndex = selectedList.findIndex(x => x.id === dataRow.id)
      selectedList.splice(selectedIndex, 1)
      dispatch({type: 'SET_SELECTED_LIST', payload: selectedList})
    }
  }

  useEffect(() => {
    if (state.listCustomer.length === 1) setHasOneRow(true)
  }, [state.listCustomer])

  return (
    <>
      <TableRow
        className={`table_body_customer${openDetail ? ' active' : ''}`}
        onClick={() => setDetailId(dataRow.id)}
        onMouseEnter={() => setIsTableHover(true)}
        onMouseLeave={() => {
          if (!openDetail) setIsTableHover(false)
        }}
      >
        <TableCell align="center" className="table_checkbox">
          <input
            type={'checkbox'}
            checked={!!selectedList?.find(x => x.id === dataRow.id)}
            onChange={handleSelected}
          />
          {/* <CheckBoxConsignment /> */}
        </TableCell>
        <TableCell align="left" className="customer-id-rows table_consignment">
          <span>{dataRow.code}</span>
        </TableCell>
        <TableCell
          align="left"
          className="customer-name-rows table_consignment"
        >
          <Tooltip placement="top-center" title={dataRow.name} baseOn="height">
            <span>{dataRow.name}</span>
          </Tooltip>
        </TableCell>
        <TableCell align="left" className="group-name-rows table_consignment">
          <span>{dataRow.group_name}</span>
        </TableCell>
        <TableCell
          align="left"
          className="customer-phone-rows table_consignment"
        >
          <span>{dataRow.mobile}</span>
        </TableCell>
        <TableCell
          align="left"
          className="customer-address-rows table_consignment"
        >
          {!!!dataRow?.address
            ? '---'
            : dataRow?.address?.length < 50
              ? dataRow?.address || ''
              : <TooltipV1 placement="bottom-start"
                           title={dataRow?.address}
              >
                {dataRow?.address?.substring(0, 50)+'...'}
              </TooltipV1>
          }
        </TableCell>
        <TableCell
          align="center"
          className={`customer-status-rows table_consignment`}
        >
          <div className="customer-switch">
            <Switch
              checked={dataRow.status === '1' ? true : false}
              onChange={handleChangeStatus}
            />
          </div>
        </TableCell>
        <TableCell align="right" className="table_setting">
          <div className="setting">
            <div className="settingShow" onClick={e => e.stopPropagation()}>
              {isTableHover && (
                <div
                  className={`text-xs detail-show py-1 px-3 rounded-full text-white hover:!inline-block ${
                    openDetail ? 'detail-active-up' : 'detail-active-down'
                  }`}
                  onClick={() => setDetailId(dataRow.id)}
                >
                  {/* {(openDetail && 'Thu Gọn') || 'Chi Tiết'} */}
                  <img src={'/svg/arrow.svg'} alt={'arrow'} />
                </div>
              )}
            </div>
            <div className="settingHide">
              <div
                ref={wrapperRef2}
                className="table_icon"
                onClick={e => {
                  setIsActionActive(prev => !prev)
                  e.stopPropagation()
                }}
                onMouseOver={() => setOver(true)}
                onMouseOut={() => setOver(false)}
              >
                {over || isActionActive
                  ? ICONS.manipulation_hover
                  : ICONS.manipulation}
              </div>

              {isActionActive && (
                <div ref={wrapperRef} className="action-popup">
                  <Link to={`/partner-management/customer/edit/${dataRow.id}`}>
                    <div className="drop-edit">
                      {ICONS.edit05}
                      <p>Chỉnh sửa</p>
                    </div>
                  </Link>
                  <div className="drop-delete" onClick={handleDelete}>
                    <img src={'/svg/delete.svg'} alt="delete" />
                    <p>Xóa</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>
      {(openDetail || hasOneRow) && (
        <Detail
          hasOneRow={hasOneRow}
          openDetail={openDetail}
          customer={dataRow}
        />
      )}
    </>
  )
}
