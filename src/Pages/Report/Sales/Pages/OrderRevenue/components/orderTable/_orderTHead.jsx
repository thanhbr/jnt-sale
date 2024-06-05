import { Text } from 'common/text'
import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import useOrderTHead from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderTHead'
import { Tooltip } from '../../../../../../../common/tooltip'
import { ORDER_ICONS } from '../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const OrderTHead = ({ ...props }) => {
  const {t} = useTranslation()
  const { globalLoading } = useOrderTHead()

  return (
    <>
      <Tr {...props} type="tHead"
          // style={{ height: '44px' }}
          style={{
            borderLeft: '1px solid #e2eaf8',
            borderRight: '1px solid #e2eaf8',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
      >
        <Th className="order-revenue-table__cell" data-type="th">{t('order_id')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('general_cost_price')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('sell_price')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('report__quantity_order')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('report__discount_on_product')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">
          <Text as={'p'} fontWeight={600}>{t('report__value_on_product')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('report__value_on_product_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {ORDER_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('report__total_cost_price')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">{t('report__shipping_fee')}</Th>
        <Th className="order-revenue-table__cell" data-type="th">
          <Text as={'p'} fontWeight={600}>{t('discount')} <br/> <Text fontWeight={400}>{t('report__on_order')}</Text> </Text>
          <Tooltip
            placement={'bottom'}
            title={
              t('report__discount_on_order_tooltip')
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {ORDER_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="order-revenue-table__cell" data-type="th">
          <Text as={'p'} fontWeight={600}>{t('revenue')} <br/> <Text fontWeight={400}>{t('report__after_discount')}</Text> </Text>
          <Tooltip
            placement={'bottom'}
            title={t('report__revenue_after_discount_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {ORDER_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="order-revenue-table__cell">
          <Text as={'p'} fontWeight={600}>{t('report__profit')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('report__profit_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {ORDER_ICONS.question}
          </Tooltip>
        </Th>
      </Tr>
      {globalLoading.value && (
        <div className="order-revenue-table__loading">
          <img src="/img/loading.gif"/>
        </div>
      )}
    </>
  )
}
