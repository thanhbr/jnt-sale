import {OrderContext} from 'Pages/Report/Sales/Pages/OrderRevenue/provider/_context'
import {useContext} from 'react'
import {OrderPanel} from './_orderPanel'
import {StyledOrderPanels} from './_styled'
import { useTranslation } from 'react-i18next'

export const OrderPanels = ({...props}) => {
  const {t} = useTranslation()
  const {pageState} = useContext(OrderContext)
  const {panels} = pageState

  return (
    <StyledOrderPanels {...props}>
      <OrderPanel
        className="order-panels__item"
        currency={t('orders')}
        title={t('total_orders')}
        value={panels?.orderTotal}
      />
      <OrderPanel
        className="order-panels__item"
        currency="₫"
        title={t('total_revenue')}
        value={panels?.orderRevenue}
      />
      <OrderPanel
        className="order-panels__item"
        currency="₫"
        title={t('total_profit')}
        value={panels?.orderProfit}
      />
    </StyledOrderPanels>
  )
}
