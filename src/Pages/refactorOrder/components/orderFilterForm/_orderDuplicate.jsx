import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'

export const OrderDuplicate = () => {
  const {duplicate} = useOrderFilterForm()

  return (
    <Select
      className="order-filter-form__input-wide"
      value={duplicate.value?.name}
    >
      {duplicate.list.length > 0 &&
        duplicate.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === duplicate.value?.value}
            onClick={() => duplicate.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </Select>
  )
}
