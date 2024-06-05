import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from '../../hooks/useCodFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";


export const OrderComparing = () => {
  const {statusComparing} = useFilterForm()
    const { t } = useTranslation()
  return ( 
    <AlternativeAutoComplete
      className="order-cod-filter-form__input-wide-item"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("code_checked"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t("select_status_cod_checked"),
        readOnly: true,
        value: t(statusComparing.value?.name) || '',
        onIconClick: () => statusComparing.onChange(null),
      }}

      // menu
      menuProps={{
        empty:
        statusComparing.list.length <= 0
            ? t("no_find_status_code_checked")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_status_code_checked"),
        value: statusComparing.keyword,
        onChange: statusComparing.onKeywordChange,
      }}
    >
      {
      statusComparing.list.map(item => (
        <Option
          key={item.value}
          className="order-cod-filter-form__option-text"
          data-active={item.value === statusComparing.value?.value}
          onClick={() => statusComparing.onChange(item)}
        >
          {t(item.name)}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
