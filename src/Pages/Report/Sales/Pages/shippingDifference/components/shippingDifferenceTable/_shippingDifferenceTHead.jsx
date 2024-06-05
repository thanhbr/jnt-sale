import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { useContext } from 'react'
import { ShippingDifferenceContext } from '../../provider/_context'
import { useTranslation } from 'react-i18next'

export const ShippingDifferenceTHead = ({ ...props }) => {
  const { pageState } = useContext(ShippingDifferenceContext)
  const {t} = useTranslation()
  const viewType = pageState.view
  return (
    viewType.value == 1
      ?
      <Tr {...props} type="tHead" style={{
        borderLeft: '1px solid #e2eaf8',
        borderRight: '1px solid #e2eaf8',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: 'none!important',
        width: '100%'
      }}
      >
        <Th className="shipping-fee-management-table__cell" data-type="th">
          STT
        </Th>
        <>
          <Th className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="th">{t('source_order')}</Th>
          <Th className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="th">
            <Text fontWeight={600} color={'#1A94FF'}>{t('report__total_handing_fee')}</Text>
            </Th>
          <Th className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="th">
            <Text fontWeight={600} color={'#FF830A'}>{t('report__total_shipping_fee')}</Text>
          </Th>
          <Th className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="th">
            <Text fontWeight={600} color={'#00AB56'}>{t('report__total_revenue_fee')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__total_revenue_fee_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.questionGreen}
            </Tooltip>
          </Th>
        </>
      </Tr>
      :
      <Tr {...props} type="tHead" style={{
        borderLeft: '1px solid #e2eaf8',
        borderRight: '1px solid #e2eaf8',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: 'none!important',
        width: 1604
      }}
          className={'report-table__employee-row'}
      >
        <Th className="shipping-fee-management-table__cell" data-type="th">
          STT
        </Th>
        <>
          <Th className="shipping-fee-management-table__cell" data-type="th">{t('source_order')}</Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">{t('Send_delivery')}</Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">{t('successfully_pick_up_goods')}</Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">
            <Text fontWeight={600}>{t('delivering_goods')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('delivering_goods_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">
            <Text fontWeight={600}>{t('return')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('return_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">
            <Text fontWeight={600}>{t('delivery_successful')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('delivery_successful_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">{t('Settled')}</Th>
          <Th className="shipping-fee-management-table__cell" data-type="th">
            <Text fontWeight={600}> {t('report__total_revenue')} <br/> {t('report__shipping_cost_difference')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__total_revenue_fee_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.questionGreen     }
            </Tooltip>
          </Th>
        </>
      </Tr>
  )
}
