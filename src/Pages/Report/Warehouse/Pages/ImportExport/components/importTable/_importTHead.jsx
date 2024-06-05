import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_SALE_ICONS } from '../../../../../Sales/interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ImportTHead = ({ ...props }) => {
  const {t} = useTranslation()
  return (
    <>
      <Tr {...props} type="tHead"
          className={"import-export-warehouse-management-table__row"}
          style={{
        borderLeft: '1px solid #e2eaf8',
        borderRight: '1px solid #e2eaf8',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        overflow: 'hidden',
        width: "100%"
      }}>
        <Th className="import-export-warehouse-management-table__cell" dataType="th">
          STT
        </Th>
        <>
          <Th className="import-export-warehouse-management-table__cell" dataType="th">{t('product')}</Th>
          <Th className="import-export-warehouse-management-table__cell" dataType="th">{t('general_warehouse')}</Th>
          <Th className="import-export-warehouse-management-table__cell" dataType="th">{t('report__import_warehouse')}</Th>
          <Th className="import-export-warehouse-management-table__cell" dataType="th">{t('report__export_warehouse')}</Th>
          <Th className="import-export-warehouse-management-table__cell" dataType="th">{t('report_current_inventory')}</Th>

        </>
      </Tr>
    </>
  )
}
