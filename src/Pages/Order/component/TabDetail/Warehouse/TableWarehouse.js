import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {formatMoney} from '../../../../../util/functionUtil'
import {useEffect, useState} from 'react'
import './TableWarehouse.scss'

export const TableWarehouse = ({products, total}) => {
  const [totalAmount, setTotalAmount] = useState(0)
  let amount = 0
  useEffect(() => {
    products.map((product, index) => {
      amount = amount + parseFloat(product.quantity)
    })
    setTotalAmount(amount)
  }, [amount])
  return (
    <>
      <div className="info-products">
        <div className="flex">
          <p className="text-info-pd">Thông tin sản phẩm</p> (Tổng số lượng:{' '}
          {totalAmount})
        </div>
        <div className="flex">
          Kho xuất hàng: <p className="default-repository">Kho mặc định</p>
        </div>
      </div>
      <div className='table-warehouse-container'>
        {products && (
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="">
              <TableHead>
                <TableRow>
                  <TableCell>Mã sản phẩm/SKU</TableCell>
                  <TableCell align="left">Tên sản phẩm</TableCell>
                  <TableCell align="right">Đơn vị</TableCell>
                  <TableCell align="right">Số Lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Giảm giá</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.product_model}</TableCell>
                      <TableCell>
                        <p className="pd-name">{row.product_name}</p>
                      </TableCell>
                      <TableCell align="right">{row.unit_name}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {formatMoney(parseFloat(row.price))}
                      </TableCell>
                      <TableCell align="right">
                        {formatMoney(parseFloat(row.discount))}
                      </TableCell>
                      <TableCell align="right">
                        {formatMoney(row.price * row.quantity - row.discount)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div className="total">
          <div className="total-price">
            <p className="txt-sale">Giảm giá theo đơn hàng</p>
            <p className="price-sale">
              {total.orderDiscount
                ? formatMoney(total.orderDiscount)
                : formatMoney(0)}
            </p>
          </div>
          <div className="total-price">
            <p className="txt-sale">Tổng giảm giá</p>
            <p align="right">
              {total.totalDiscount
                ? formatMoney(total.totalDiscount)
                : formatMoney(0)}
            </p>
          </div>
          <div className="total-price">
            <p className="txt-sale">Tổng tiền</p>
            <p align="right" className="txt-sale">
              {total.total ? formatMoney(total.total) : formatMoney(0)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
