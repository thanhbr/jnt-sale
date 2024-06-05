import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_WAREHOUSE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ImportTHead = ({ ...props }) => {
  const {t} = useTranslation()
  return (
    <div id={'import-warehouse-management-table__header'}>
      <Tr {...props} type="tHead"
          className={'import-warehouse-management-table__row'}
          style={{
            borderLeft: '1px solid #e2eaf8',
            borderRight: '1px solid #e2eaf8',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            overflow: 'hidden',
            width: 1800
          }}>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('product')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('init_warehouse')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('import_date')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('quantity_received')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">
          <Text fontWeight={600} style={{ marginRight: 4 }}>{t('unit_price_received')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('unit_price_received_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_WAREHOUSE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">
          <Text fontWeight={600} style={{ marginRight: 4 }}>{t('vat_received')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('vat_received_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_WAREHOUSE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">
          <Text fontWeight={600} style={{ marginRight: 4 }}>{t('value_goods_received')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('value_goods_received_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_WAREHOUSE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('value_goods_returned')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">{t('vat_goods_returned')}</Th>
        <Th className="import-warehouse-management-table__cell" dataType="th">
          <Text fontWeight={600} style={{ marginRight: 4 }}>{t('remaining_goods_value')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('remaining_goods_value_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_WAREHOUSE_ICONS.question}
          </Tooltip>
        </Th>
      </Tr>
    </div>
  )
}
