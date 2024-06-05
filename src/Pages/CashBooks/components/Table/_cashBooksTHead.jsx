import {Text} from 'common/text'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import {CASHBOOKS_ICONS} from 'Pages/CashBooks/interfaces/_icons'
import {Tooltip} from '../../../../common/tooltip'
import { useTranslation } from 'react-i18next'

export const CashBooksTHead = ({...props}) => {
  const { t } = useTranslation()
  return (
    <Tr {...props} type="tHead">
      <Th className="cash-books-table__cell">{t('cashbook_receipt_number')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_entry_date')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_partner')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_description')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_income')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_expense')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_payment_method')}</Th>
      <Th className="cash-books-table__cell">{t('cashbook_reference_document')}</Th>
    </Tr>
  )
}
