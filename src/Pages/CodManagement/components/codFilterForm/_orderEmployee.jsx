import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from '../../hooks/useCodFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";

export const OrderEmployee = () => {
  const {employee} = useFilterForm()
  const { t } = useTranslation()
  
  return ( 
    <AlternativeAutoComplete
      className="order-cod-filter-form__input-wide-item"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("order_closing_staff"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t("choose_staff_order_closing"),
        readOnly: true,
        value: employee.value?.name || '',
        onIconClick: () => employee.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
        employee.list.length <= 0
            ? t("no_find_staff_order_closing")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_staff_order_closing"),
        value: employee.keyword,
        onChange: employee.onKeywordChange,
      }}
    > 
      {employee.list.length > 0 &&
      employee.list.map(item => (
        <Option
          key={item.value}
          className="order-cod-filter-form__option-text"
          data-active={item.value === employee.value?.value}
          onClick={() => employee.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
