import {Input} from 'common/form/input'
import useImportFilterForm from "../../hooks/useImportFilterForm";
import {ORDER_ICONS} from "../../interfaces/_icons"
import { useTranslation } from 'react-i18next'
export const ImportSearch = () => {
  const {search} = useImportFilterForm()
  const {t} = useTranslation()
  return (
    <Input
      className="import-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('report__search_by_product')}
      // value={search.value}
      onChange={search.onChange}
    />
  )
}
