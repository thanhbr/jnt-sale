import {OrderSingleProductInfoInventoryContainer as InventoryContainer} from './_inventoryContainer'
import {StyledOrderSingleProductInfo} from './_styled'
import useOrderSingleProductInfo from "../../hooks/useOrderSingleProductInfo";

export const OrderSingleProductInfo = ({...props}) => {
  const { methods} = useOrderSingleProductInfo()

  return (
    <StyledOrderSingleProductInfo {...props}>
          <div
            className="order-single-product-info__corner"
            // DEV
            onClick={methods.onInventoryToggle}
          >
          </div>
          <div className="order-single-product-info__container">
              <InventoryContainer />
          </div>
    </StyledOrderSingleProductInfo>
  )
}
