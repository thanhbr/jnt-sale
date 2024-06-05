import {Input} from 'common/form/input'
import useCodFilterForm from '../../hooks/useCodFilterForm'
import {COD_ICONS} from '../../interfaces/_icons'
import {useTranslation} from "react-i18next";

export const OrderSearch = () => {
  const {search} = useCodFilterForm()
  const { t } = useTranslation()
  return (
    <Input
      className="order-cod-filter-form__input-wide"
      icon={COD_ICONS.searchMd}
      placeholder={t("search_by_multi_field_order")}
      value={search.value}
      onChange={search.onChange}
    />
  )
}
