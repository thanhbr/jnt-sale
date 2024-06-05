import {Input} from "../../../../../../../common/form/input";
import {REPORT_INVENTORY_ICONS} from "../../../Inventory/interfaces/_icon";
import React from "react";
import useFilter from "../../hooks/useFilter";
import { useTranslation } from 'react-i18next'

const Search = () => {
  const {search} = useFilter()
  const {t} = useTranslation()
  return (
    <Input
      className={"report-inventory-filter-form__input-wide"}
      icon={REPORT_INVENTORY_ICONS.searchMd}
      placeholder={t('report__search_by_product')}
      value={search.value}
      // defaultValue={searchParams.get('search')}
      onChange={search.onChange}
      style={{maxWidth: '24.5rem'}}
    />
  )
}

export default Search