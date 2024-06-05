import {Option} from 'common/form/autoComplete/_option'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import DeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { useState } from 'react'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { useTranslation } from 'react-i18next'

export const OrderProduct = () => {
  const { t } = useTranslation()
  const {product} = DeliveryFilterForm()
  const [keyword, setKeyWord] = useState('')

  const handleKeywordChange = data => {
    setKeyWord(data?.value || '')
    product.onKeywordChange(data)
  }

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('product'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 85,
        placeholder: t('select_product'),
        readOnly: true,
        value:
          product.value.length > 0 ? `${t('selected')} ${product.value.length}` : '',
        onIconClick: product.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          product.list.length <= 0
            ? product.tab === 'all'
            ? t('product_not_found')
            : t('no_product_selected')
            : '',
        multipleChoices: true,
        onReset: product.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_product'),
        value: keyword,
        onChange: handleKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: product.tab,
        checkedNumber: product.value.length,
        onChange: product.onTabChange,
      }}
    >
      {product.list.length > 0 &&
      product.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          checked={!!product.value.find(find => find.value === item.value)}
          multipleChoices={true}
          style={{marginBottom: 16}}
          onClick={() => product.onChange(item)}
        >
          <Text color={THEME_COLORS.gray_900} style={{display: 'block'}}>
            {item.name}
          </Text>
          <Text color="#808089" fontSize={12} lineHeight={17}>
            {item?.data?.sku}
          </Text>
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
