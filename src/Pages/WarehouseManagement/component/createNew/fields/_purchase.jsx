import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import useInfo from '../../../hooks/useInfo'
import { Checkbox } from './checkbox'

const Purchase = () => {
  const {data, methods} = useInfo()
  const {isPurchase} = data
  const {onIsPurchaseChange} = methods

  return (
    <>
      <Checkbox checked={isPurchase.value} onChange={onIsPurchaseChange} label='Là kho nhập hàng' id='isPurchaseWarehouse'/>
      {/* <Text as='label'
        className="units-manage-checkboxText"
        color={THEME_COLORS.gray_300}
        fontSize={14}
        fontWeight={400}
        id='isPurchaseWarehouse'
      >
        Là kho nhập hàng
      </Text> */}
    </>
  )
}

export default Purchase
