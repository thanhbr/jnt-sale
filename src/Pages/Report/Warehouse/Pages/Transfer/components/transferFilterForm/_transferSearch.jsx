import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/Report/Warehouse/Pages/Transfer/interfaces/_icons'
import useTransferFilterForm from '../../hooks/useTransferFilterForm'
import { useTranslation } from 'react-i18next'

export const TransferSearch = () => {
  const {search} = useTransferFilterForm()
  const {t} = useTranslation()
  return (
    <Input
      className="import-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('report__search_by_product')}
      value={search.value}
      onChange={search.onChange}
    />
  )
}
