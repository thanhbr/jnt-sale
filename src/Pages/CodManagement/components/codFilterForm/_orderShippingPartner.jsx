import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from '../../hooks/useCodFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from "react-i18next";

export const OrderShippingPartner = () => {
  const {shippingPartner} = useFilterForm()
    const { t } = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-cod-filter-form__input-wide-item"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t("Shipping_partner"), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t("select_shipping_partner"),
        readOnly: true,
        value: shippingPartner.value?.name || '',
        onIconClick: () => shippingPartner.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          shippingPartner.list.length <= 0
            ? t("no_data_shipping_partner")
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t("search_shipping_partner"),
        value: shippingPartner.keyword,
        onChange: shippingPartner.onKeywordChange,
      }}
    >
      {shippingPartner.list.length > 0 &&
      shippingPartner.list.map(item => (
        <Option
          key={item.value}
          className="order-cod-filter-form__option-text"
          data-active={item.value === shippingPartner.value?.value}
          onClick={() => shippingPartner.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
