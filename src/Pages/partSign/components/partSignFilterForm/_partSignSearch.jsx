import {Input} from 'common/form/input'
import usePartSignFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useTranslation} from "react-i18next";

export const PartSignSearch = () => {
  const {search} = usePartSignFilterForm()
  const { t } = useTranslation()

  return (
    <Input
      className="order-filter-form__input-wide-search"
      icon={ORDER_ICONS.searchMd}
      placeholder={t("search_by_multi_field_order")}
      value={search.value}
      onChange={search.onChange}
    />
  )
}
