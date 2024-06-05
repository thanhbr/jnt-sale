import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";

export const PartSignAdminUser = () => {
  const {adminUser} = useFilterForm()
    const { t } = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("order_closing_staff"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t("choose_staff_order_closing"),
        readOnly: true,
        value: adminUser.value?.name || '',
        onIconClick: () => adminUser.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          adminUser.list.length <= 0
            ? t("no_find_staff_order_closing")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_staff_order_closing"),
        value: adminUser.keyword,
        onChange: adminUser.onKeywordChange,
      }}
    >
      {adminUser.list.length > 0 &&
      adminUser.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === adminUser.value?.value}
          onClick={() => adminUser.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
