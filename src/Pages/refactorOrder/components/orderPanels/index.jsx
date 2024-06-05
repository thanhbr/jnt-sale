import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {useContext, useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import {OrderPanel} from './_orderPanel'
import {StyledOrderPanels} from './_styled'

export const OrderPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(OrderContext)
  const {filter, panels} = pageState

  const [canFetch, setCanFetch] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const querySearch = searchParams.get('search') || ''

      const splitDate = dateTimeValue.split(' - ')
      const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
      const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])
      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/order/order-total?keyword=${querySearch}&date_type=&start_date=${startDate}&end_date=${endDate}&customer_id=&user_id=&warehouse_id=&shipping_partner=&shipping_status=&order_origin_id=&livestream_id=&product_id=&is_duplicate=&per_page=20&start=0`,
        )

        if (!!response?.data?.success) {
          setCanFetch(false)

          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              pagination: {totalItems: response?.data?.data?.totals || 0},
              panels: {
                codTotal: response?.data?.data?.totals_cod || 0,
                orderTotal: response?.data?.data?.totals || 0,
                orderValueTotal: response?.data?.data?.totals_amount || 0,
                shippingFeeTotal: response?.data?.data?.totals_ship_fee || 0,
              },
            },
          })
        }
      }

      fetchData()
    }
  }, [filter?.dateTime?.activeValue?.value])

  return (
    <StyledOrderPanels {...props}>
      <OrderPanel
        className="order-panels__item"
        title="Tổng số lượng đơn"
        value={panels.orderTotal}
      />
      <OrderPanel
        className="order-panels__item"
        currency="₫"
        title="Tổng COD"
        value={panels.codTotal}
      />
      <OrderPanel
        className="order-panels__item"
        currency="₫"
        title="Tổng giá trị đơn hàng"
        value={panels.orderValueTotal}
      />
      <OrderPanel
        className="order-panels__item"
        currency="₫"
        title="Tổng phí vận chuyển"
        value={panels.shippingFeeTotal}
      />
    </StyledOrderPanels>
  )
}
