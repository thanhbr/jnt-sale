import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import {AlternativeAutoComplete} from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import {useTranslation} from 'react-i18next'

export const OrderPrint = () => {
  const {t} = useTranslation()
  const {print} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('order_print_count'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t('select_print_count'),
        readOnly: true,
        value: t(print.value?.name) || '',
        onIconClick: () => print.onChange(null),
      }}
      // menu
      menuProps={{
        empty: print.list.length <= 0 ? t('single_print_number_not_found') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_print_count'),
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
            {t(item.name)}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
