import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import { Option } from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import { useTranslation } from 'react-i18next'

const PaymentMethodFilter = () => {
  const { t } = useTranslation()
  const {paymentMethod} = useFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('cashbook_payment_method'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 170,
        placeholder: t('cashbook_choose_payment_method'),
        readOnly: true,
        value: paymentMethod.value.length > 0
          ? `Đã chọn ${paymentMethod.value.length}`
          : '',
        onIconClick: paymentMethod.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          paymentMethod.list.length <= 0
            ? t('cashbook_payment_method_not_found')
            : '',
        multipleChoices: true,
        onReset: paymentMethod.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('cashbook_search_payment_method'),
        value: paymentMethod.keyword,
        onChange: paymentMethod.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: paymentMethod.tab,
        checkedNumber: paymentMethod.value.length,
        onChange: paymentMethod.onTabChange,
      }}
    >
      {paymentMethod.list.length > 0 &&
        paymentMethod.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={
              !!paymentMethod.value.find(find => find.value === item.value)
            }
            multipleChoices={true}
            onClick={() => paymentMethod.onChange(item)}
          >
            {item.name}
          </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default PaymentMethodFilter