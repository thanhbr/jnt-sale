import {Select} from 'common/form/select'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {SelectOption} from '../../selectSingleOption'

export const OrderSingleProductInfoPriceType = () => {
  const {data, methods} = useOrderSingleProductInfo()
  const {withInventoryConfig} = data

  return (
    <Select value={withInventoryConfig.priceType.value?.name}>
      {withInventoryConfig.priceType.list.length > 0 &&
        withInventoryConfig.priceType.list.map(item => (
          <SelectOption
            key={item.value}
            data-active={
              item.value === withInventoryConfig.priceType.value?.value
            }
            onClick={() => methods.onPriceTypeChange(item)}
          >
            {item.name}
          </SelectOption>
        ))}
    </Select>
  )
}
