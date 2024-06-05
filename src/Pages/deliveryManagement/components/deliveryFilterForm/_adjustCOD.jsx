import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { useTranslation } from 'react-i18next'

export const AdjustCOD = () => {
  const { t } = useTranslation()
  const {cod} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('COD_partial_edit'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 155,
        placeholder: t('choose_yes_no'),
        readOnly: true,
        value: t(cod.value?.name) || '',
        onIconClick: () => cod.onChange(null),
      }}
      hideSearchBar={true}
    >
      {cod.list.length > 0 &&
        cod.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === cod.value?.value}
            onClick={() => cod.onChange(item)}
          >
            {t(item.name)}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
