import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import { useTranslation } from 'react-i18next'

export const OrderShippingStatus = () => {
  const {shippingStatus} = useOrderFilterForm()
  const {t} = useTranslation()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: t('order_status'), value: ''}], // menu list in category dropdown
        categoryWidth: 140,
        placeholder: t('report__select_order_status'),
        readOnly: true,
        value:
          shippingStatus.value.length > 0
            ? `${t('selected')} (${shippingStatus.value.length})`
            : '',
        onIconClick: shippingStatus.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          shippingStatus.list.length <= 0
            ? shippingStatus.tab === 'all'
              ? t('report__search_no_status_order')
              : t('report__havent_status_order_yet')
            : '',
        multipleChoices: true,
        onReset: shippingStatus.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('report__search_order_status'),
        value: shippingStatus.keyword,
        onChange: shippingStatus.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: shippingStatus.tab,
        checkedNumber: shippingStatus.value.length,
        onChange: shippingStatus.onTabChange,
      }}
    >
      {shippingStatus.list.length > 0 &&
        shippingStatus.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={
              !!shippingStatus.value.find(find => find.value === item.value)
            }
            multipleChoices={true}
            onClick={() => shippingStatus.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
