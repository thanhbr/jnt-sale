import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {OrderSingleProductInfoInventoryContainer as InventoryContainer} from './_inventoryContainer'
import {OrderSingleProductInfoNoInventoryContainer as NoInventoryContainer} from './_noInventoryContainer'
import {StyledOrderSingleProductInfo} from './_styled'
import {useContext} from 'react'
import {OrderSingleContext} from '../../../../provider/_context'

export const OrderEditSingleProductInfo = ({...props}) => {
  const {data , methods} = useOrderSingleProductInfo()
  const {inventory} = data
  const {state} = useContext(OrderSingleContext)
  const shippingStatus = state.shipping_status.value
  const paid = state.field_paid
  // const envLive = location.host === 'banhang.upos.vn'

  return (
    <StyledOrderSingleProductInfo {...props}>
      <>
        <div
          //DEV
          className={`order-single-product-info__corner ${(+shippingStatus !== 1 && +shippingStatus !== 8 && +paid === 0) && 'order-single-product-info__corner-accept'}`}
          onClick={() => {
            if(+shippingStatus !== 1 && +shippingStatus !== 8  && +paid === 0) methods.onInventoryToggle()
          }}
        >
          <Checkbox checked={inventory} disabled={+shippingStatus === 1 || +shippingStatus === 8 || +paid !== 0} />
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
