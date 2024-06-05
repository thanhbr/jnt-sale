import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import useFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { useTranslation } from 'react-i18next'

export const OrderDuplicate = () => {
  const { t } = useTranslation()
  const {duplicate} = useFilterForm()

  return (
    <Select
      className="order-filter-form__input-wide"
      value={t(duplicate.value?.name)}
    >
      {duplicate.list.length > 0 &&
        duplicate.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === duplicate.value?.value}
            onClick={() => duplicate.onChange(item)}
          >
            {t(item.name)}
          </Option>
        ))}
    </Select>
  )
}
