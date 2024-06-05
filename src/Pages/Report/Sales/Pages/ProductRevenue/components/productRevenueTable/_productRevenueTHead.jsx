import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ProductRevenueTHead = ({ ...props }) => {
  const {t} = useTranslation()
  return (
    <>
      <Tr {...props} type="tHead"
          className={"productRevenue-management-table__row"}
          style={{
        borderLeft: '1px solid #e2eaf8',
        borderRight: '1px solid #e2eaf8',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        overflow: 'hidden',
        width: 1800
      }}>
        <Th className="productRevenue-management-table__cell" dataType="th">
          {t('STT')}
        </Th>
        <>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('product')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('report__unit')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('report__cost_price')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('report__avg_price')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('report__quantity_order')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">
            <Text fontWeight={600} style={{marginRight: 4}}>{t('report__revenue')} <Text as={'p'}>{t('report__before_discount')}</Text></Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__before_discount_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="productRevenue-management-table__cell" dataType="th">{t('report__total_discount')}</Th>
          <Th className="productRevenue-management-table__cell" dataType="th">
            <Text fontWeight={600} style={{marginRight: 4}}>{t('report__revenue')} <Text as={'p'}>{t('report__after_discount')}</Text></Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__after_discount_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="productRevenue-management-table__cell" dataType="th">
            <Text fontWeight={600} style={{marginRight: 4}}>{t('report__total_cost_price')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__total_cost_price_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="productRevenue-management-table__cell" dataType="th">
            <Text fontWeight={600} style={{marginRight: 4}}>{t('report__profit')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__profit_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="productRevenue-management-table__cell" dataType="th">
            <Text fontWeight={600} style={{marginRight: 4}}>{t('report__success_rate')}</Text>
            <Tooltip
              placement={'bottom'}
              title={t('report__success_rate_tooltip')}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {REPORT_SALE_ICONS.question}
            </Tooltip>
          </Th>
        </>
      </Tr>
    </>
  )
}
