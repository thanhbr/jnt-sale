import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import { usePosQuickProduct } from '../../hooks/usePosQuickProduct'
import { POS_ICON } from '../../constants/icons'

export const QuickProductSort = () => {
  const { sort } = usePosQuickProduct()

  return (
    <Select
      className="quick-product-sort__input-wide"
      value={sort.value?.name}
      inputProps={{
        icon: POS_ICON.sort
      }}
    >
      {sort.list.length > 0 &&
      sort.list.map(item => (
        <Option
          key={item.value}
          className="quick-product-sort__option-text"
          data-active={item.value === sort.value?.value}
          onClick={() => sort.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
