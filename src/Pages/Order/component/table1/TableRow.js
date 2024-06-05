import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import {useEffect, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import {useTable} from './useTable'
import {Detail} from './Detail'
import {formatMoney} from '../../../../util/functionUtil'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import {useTranslation} from 'react-i18next'

export const Row = ({row, index, selected, handleSelected}) => {
  const {t} = useTranslation()
  const [openDetail, setOpenDetail] = useState(false)
  const [isTableHover, setIsTableHover] = useState(false)
  const {handleShippingStatusName, formatDateTime, handleStatusPayment} =
    useTable()

  useEffect(() => {
    setOpenDetail(row.checked)
  }, [row.checked])
  
  return (
    <>
      <TableRow
        key={row.id}
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
        className="table1-active"
        onClick={() => {
          const value = row.checked
          const event = {target: {checked: !value}}
          handleSelected(event)
        }}
        onMouseEnter={() => setIsTableHover(true)}
        onMouseLeave={() => setIsTableHover(false)}
      >
        <TableCell id="table-header">
          {/* <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            onChange={handleSelected}
            checked={selected[index]}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
          <input type={'checkbox'} checked={row.checked} onChange={() => {}}/>
        </TableCell>
        <TableCell component="th" scope="row" >
          <div className="">
            <div
              className="font-bold items-center idProduct"
              style={{color: '#1E9A98'}}
            >
              <span className="inline-block pr-2">{row.id}</span>
              <span className="inline-block flex">
                <CustomToolTip
                  title={t('tooltip_idProduct')}
                  placement="bottom-start"
                >
                  <img
                    src="/img/order/inventory.svg"
                    alt="inventory"
                    className="inventory-icon"
                  />
                </CustomToolTip>
              </span>
            </div>
            <div>{formatDateTime(row.date)}</div>
          </div>
        </TableCell>
        <TableCell align="left" className="" >
          <div className="">
            <div className="font-bold capitalize" style={{color: '#1A94FF'}}>
              {row.customer_name}
            </div>
            <div>{row.customer_mobile}</div>
          </div>
        </TableCell>
        <TableCell align="left" >{row.order_origin_name}</TableCell>
        <TableCell align="left" >
          <div className="!flex !items-center">
            {handleStatusPayment(row.total_amount, row.total_payment)}
          </div>
        </TableCell>
        <TableCell align="right" >{formatMoney(row.total_amount)}</TableCell>
        <TableCell align="right" >{formatMoney(row.cod_amount)}</TableCell>
        <TableCell align="center" id='row-order'>
          {handleShippingStatusName(row.shipping_status_name)}
        </TableCell>
        <TableCell align="right" style={{ width:'150px' }} >
          <div className="table-detail">
            {isTableHover && (
              <span className="text-xs detail-show py-1 px-3 rounded-full text-white hover:!inline-block">
                {(openDetail && 'Thu Gọn') || 'Chi Tiết'}
              </span>
            )}
            <span className="inline-block text-xs">
              <img src={'/svg/Manipulation.svg'} alt="Manipulation" />
            </span>
          </div>
        </TableCell>
      </TableRow>
      {openDetail && <Detail openDetail={openDetail} orderId={row.id}  />}
    </>
  )
}
