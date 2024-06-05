import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_WAREHOUSE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const TransferTHead = ({ ...props }) => {
  const {t} = useTranslation()
  return (
    <>
      <Tr {...props} type="tHead"
          className={'transfer-warehouse-management-table__row'}
          style={{
            borderLeft: '1px solid #e2eaf8',
            borderRight: '1px solid #e2eaf8',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            overflow: 'hidden',
          }}>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">STT</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('product')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('transfer_date')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('warehouse_export')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('init_warehouse')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('warehouse__unit')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('transfer_quantity')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('general_cost_price')}</Th>
        <Th className="transfer-warehouse-management-table__cell" dataType="th">{t('warehouse__total')}</Th>
      </Tr>
    </>
  )
}
