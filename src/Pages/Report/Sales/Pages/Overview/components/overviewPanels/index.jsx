import { OrderPanel } from './_orderPanel'
import { StyledOrderPanels } from './_styled'
import { useContext } from 'react'
import { SaleOverviewContext } from '../../provider/_context'
import { useTranslation } from 'react-i18next'

export const OverviewPanels = ({ ...props }) => {
  const { pageState } = useContext(SaleOverviewContext)
  const { statisticTab } = pageState
  const { meta } = pageState.overview
  const { loading } = pageState.overview
  const {t} = useTranslation()
  return (
    <StyledOrderPanels {...props}>
      <OrderPanel
        className={`order-panels__item total-revenue ${statisticTab == 1 ? 'active' : ''}`}
        currency="₫"
        title={t('total_revenue')}
        titleTooltip={t('total_revenue_tooltip')}
        value={meta?.total_revenue || 0}
        loading={loading}
      />
      <OrderPanel
        className={`order-panels__item total-profits ${statisticTab == 1 ? 'active' : ''}`}
        currency="₫"
        title={t('total_profit')}
        titleTooltip={t('total_profit_tooltip')}
        value={meta?.total_profit || 0}
        loading={loading}
      />
      <OrderPanel
        className={`order-panels__item total-orders ${statisticTab == 2 ? 'active' : ''}`}
        currency={t('orders')}
        title={t('order_quantity')}
        titleTooltip={t('order_quantity_tooltip')}
        value={meta?.total_order || 0}
        loading={loading}
      />
      <OrderPanel
        className={`order-panels__item total-products ${statisticTab == 2 ? 'active' : ''}`}
        currency={t('product')}
        title={t('product_quantity')}
        titleTooltip={t('product_quantity_tooltip')}
        value={meta?.total_product || 0}
        loading={loading}
      />
    </StyledOrderPanels>
  )
}
