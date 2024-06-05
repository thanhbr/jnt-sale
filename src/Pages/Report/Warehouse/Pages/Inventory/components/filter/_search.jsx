import React from 'react';
import {Input} from "../../../../../../../common/form/input";
import {REPORT_INVENTORY_ICONS} from "../../interfaces/_icon";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import { useTranslation } from 'react-i18next'

const Search = () => {
  const {search} = useFilterReportInventory()
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

export default Search;