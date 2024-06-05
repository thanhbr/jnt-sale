import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";

export const PartSignOrderOrigin = () => {
  const {orderOrigin} = useFilterForm()
    const { t } = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("source_order"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t("select_source_order"),
        readOnly: true,
        value: orderOrigin.value?.name || '',
        onIconClick: () => orderOrigin.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          orderOrigin.list.length <= 0
            ? t("no_data_source_order")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_source_order"),
        value: orderOrigin.keyword,
        onChange: orderOrigin.onKeywordChange,
      }}
    >
      {orderOrigin.list.length > 0 &&
      orderOrigin.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === orderOrigin.value?.value}
          onClick={() => orderOrigin.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
