import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {OrderSingleProductInfoInventoryContainer as InventoryContainer} from './_inventoryContainer'
import {OrderSingleProductInfoNoInventoryContainer as NoInventoryContainer} from './_noInventoryContainer'
import {StyledOrderSingleProductInfo} from './_styled'
import {useContext} from 'react'
import {OrderSingleContext} from '../../../provider/_context'

export const OrderSingleProductInfo = ({...props}) => {
  const {data, methods} = useOrderSingleProductInfo()
  const {inventory} = data
  const {state} = useContext(OrderSingleContext)
  // const envLive = location.host === 'banhang.upos.vn'

  return (
    <StyledOrderSingleProductInfo {...props}>
      <>
        <div
          className="order-single-product-info__corner"
          onClick={methods.onInventoryToggle}
        >
          <Checkbox checked={inventory}/>
          <Text style={{marginLeft: 8}}>Bán hàng có khấu trừ tồn kho</Text>
        </div>
        <div className="order-single-product-info__container">
          {inventory ? (
            <InventoryContainer />
          ) : (
            <NoInventoryContainer validate={state.validate} />
          )}
        </div>
      </>
    </StyledOrderSingleProductInfo>
  )
}
