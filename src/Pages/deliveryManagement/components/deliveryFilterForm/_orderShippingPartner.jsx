import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { useTranslation } from 'react-i18next'

export const OrderShippingPartner = () => {
  const { t, i18n } = useTranslation()
  const {shippingPartner} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('shipping_partner'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 145,
        placeholder: t('select_shipping_partner'),
        readOnly: true,
        value: shippingPartner.value?.name || '',
        onIconClick: () => shippingPartner.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          shippingPartner.list.length <= 0
            ? t('shipping_partner_not_found')
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_shipping_partner'),
        value: shippingPartner.keyword,
        onChange: shippingPartner.onKeywordChange,
      }}
    >
      {shippingPartner.list.length > 0 &&
      shippingPartner.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === shippingPartner.value?.value}
          onClick={() => shippingPartner.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
