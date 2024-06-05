import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/ForControlCOD/hooks/useForControlCODFilterForm'
import { AlternativeAutoComplete } from '../../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";

export const ForControlCODPrint = () => {
  const {print} = useFilterForm()
    const { t } = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("general_payment"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 170,
        placeholder: t("select_print_count"),
        readOnly: true,
        value: print.value?.name || '',
        onIconClick: () => print.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          print.list.length <= 0
            ? t("single_print_number_not_found")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_print_count"),
        value: print.keyword,
        onChange: print.onKeywordChange,
      }}
    >
      {print.list.length > 0 &&
      print.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === print.value?.value}
          onClick={() => print.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
