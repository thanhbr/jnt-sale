import { memo } from 'react'
import { Button } from '@material-ui/core'
import { TableWarehouse } from '../Warehouse/TableWarehouse'
import { Grid } from '@mui/material'
import './OrderDetails.scss'
import { orderStatus } from '../../../_constants'

export function OrderDetails ({ orderDetail }) {
  return (
    <Grid xs={12} sm={12} md={12} lg={12}>
      <Grid xs={12} sm={12} md={12} lg={12} container>
        <Grid xs={4} sm={4} md={4} lg={4} item>
          <label className="text-base font-bold pb-3 seller-info">Thông tin người bán</label>
          <div className="flex seller-details">
            <div>
              <p className="p-details">Điểm gửi hàng: </p>
              <p className="p-details">Người tạo đơn: </p>
            </div>
            <div>
              <p className="txt-blue">{orderDetail?.sender_name}</p>
              <p>{orderDetail?.creator}</p>
            </div>
          </div>
        </Grid>
        <Grid xs={4} sm={4} md={4} lg={4} item>
          <label className="text-base font-bold pb-3 seller-info">Thông Tin Người Nhận</label>
          <div className="flex seller-details">
            <div>
              <p className="p-details">Tên khách hàng: </p>
              <p className="p-details">Địa chỉ: </p>
            </div>
            <div>
              <p className="txt-blue">{orderDetail?.customer_name}</p>
              <p>{orderDetail?.customer_address}</p>
            </div>
          </div>
        </Grid>
        <Grid xs={4} sm={4} md={4} lg={4} item>
          {(orderDetail.shipping_status_id == orderStatus.GUIDONGIAOHANG.id || orderDetail.shipping_status_id == orderStatus.DONNHAP.id) && <Button className="!text-sm button_small_size custom-edit">Sửa</Button>}
          <Button className="!text-sm button_small_size !mx-3 custom-excel">Xuất Excel</Button>
          {(orderDetail?.total_amount - orderDetail?.total_payment > 0) && <Button className="!text-sm !text-white custom-payment">Xác nhận thanh toán</Button>}
        </Grid>
      </Grid>
      <div className="pt-5 content-warehouse">
        {orderDetail?.order_details?.length > 0 &&
        <TableWarehouse products={orderDetail.order_details} total={{
          total: orderDetail?.total_amount,
          totalDiscount: orderDetail?.total_discount,
          orderDiscount: orderDetail?.order_discount
        }}/>
        }
      </div>
    </Grid>
  )
}

export default memo(OrderDetails)