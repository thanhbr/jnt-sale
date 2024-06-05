import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { useContext, useEffect, useState } from 'react'
import OrderDetails from '../TabDetail/OrderDetail/OrderDetails'
import { Shipping } from '../TabDetail/Shipping/Shipping'
import { Payment } from '../TabDetail/Payment/Payment'
import { ORDER_DETAIL_TAB } from '../../_constants.jsx'
import { getData } from '../../../../api/api'
import config from '../../../../config'
import { OrderHistory } from '../TabDetail/OrderHistory/OrderHistory'
import { OrderContext } from '../../../../LayoutWrapper'

const {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Tab,
} = require('@material-ui/core')

export const Detail = ({ openDetail, orderId }) => {
  const [valueTabs, setValueTabs] = useState(ORDER_DETAIL_TAB.order_detail)
  const handleChange = (event, newValue) => {
    setValueTabs(newValue)
  }
  const [orderDetail, setOrderDetail] = useState([])

  const [state, ] = useContext(OrderContext)
  useEffect(
    () => {
      const getOrderDetails = async () => getData(`${config.API}/order/detail/${orderId}`)
        .then(res => {
          if (res.data.success) {
            setOrderDetail(res.data.data)
          }
        })
        .catch(err => {
          console.log('error')
        })
      getOrderDetails()
    }, [state.loadDetail]
  )
  return (
    <>
      {orderDetail && <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={12} className="content-tab">
          <Collapse in={openDetail} timeout="auto" unmountOnExit className="content-detail">
            <TabContext value={valueTabs} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="header-tabs">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  indicatorColor="none"
                >
                  <Tab label="Chi tiết đơn hàng" value={ORDER_DETAIL_TAB.order_detail} className="tab-detail"/>
                  <Tab label="Giao hàng" value={ORDER_DETAIL_TAB.shipping} className="tab-detail"/>
                  <Tab label="Thanh toán" value={ORDER_DETAIL_TAB.payment} className="tab-detail"/>
                  <Tab label="Lịch sử đơn hàng" value={ORDER_DETAIL_TAB.order_history} className="tab-detail"/>
                </TabList>
              </Box>
              <TabPanel value={ORDER_DETAIL_TAB.order_detail} className="order-detail">
                <OrderDetails orderDetail={orderDetail}/>
              </TabPanel>
              <TabPanel value={ORDER_DETAIL_TAB.shipping} className="shipping">
                <Shipping orderDetail={orderDetail}/>
              </TabPanel>
              <TabPanel value={ORDER_DETAIL_TAB.payment} className="payment">
                <Payment orderDetail={orderDetail}/>
              </TabPanel>
              <TabPanel value={ORDER_DETAIL_TAB.order_history} className="order-his">
                <OrderHistory orderDetail={orderDetail}/>
              </TabPanel>
            </TabContext>
          </Collapse>
        </TableCell>
      </TableRow>
      }
        </>
  )
}
