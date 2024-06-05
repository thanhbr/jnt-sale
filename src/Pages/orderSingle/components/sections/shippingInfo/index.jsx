import {shippingInfoContainer as ShippingInfo} from './shippingInfoContainer'
import {shippingInfoContainer as ShippingPartner} from './shippingPartnerContainer'
import useOrderSingleShippingInfo from 'Pages/orderSingle/hooks/useOrderSingleShippingInfo'
import {StyledOrderSingleShippingInfo} from './_styled'
import React, {useContext, useEffect} from 'react'
import {OrderSingleContext} from '../../../provider/_context'
import {Button} from 'common/button'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {ORDER_SINGLE_ICONS} from '../../../interface/_icons'
import {Tooltip} from '../../../../../common/tooltip'

export const OrderSingleShippingInfo = ({...props}) => {
  const productInfoHook = useOrderSingleProductInfo()
  const {state} = useContext(OrderSingleContext)
  const {data, methods} = useOrderSingleShippingInfo()

  useEffect(() => {
    methods.getDeliveryNote()
  }, [])

  return (
    <StyledOrderSingleShippingInfo {...props}>
      <div className="order-single-shipping-info__corner">
        {!data.isStorePickUp && (
          <div
            className={'order-single-shipping-info__reload'}
            onClick={methods.onResetShippingPartner}
          >
            <Tooltip title={'Làm mới thông tin vận chuyển'}>
              {ORDER_SINGLE_ICONS.reset}
            </Tooltip>
          </div>
        )}
        {productInfoHook.data.inventory && (
          <div style={{marginLeft: '16px'}}>
            <Button
              className="order-single-shipping-info__action-btn-tab"
              size="sm"
              data-active={!data.isStorePickUp}
              onClick={methods.onPickUpStoreToggle}
            >
              Giao đối tác vận chuyển
            </Button>
            <Button
              className="order-single-shipping-info__action-btn-tab"
              size="sm"
              data-active={data.isStorePickUp}
              onClick={methods.onPickUpStoreToggle}
            >
              Nhận tại cửa hàng
            </Button>
          </div>
        )}
      </div>
      {!(productInfoHook.data.inventory && data.isStorePickUp) && (
        <div className="order-single-shipping-info__container">
          {state.form.shippingInfo.shippingPartner?.list?.length == 0 &&
          !state.skeleton ? (
            ''
          ) : (
            <ShippingInfo />
          )}
          <ShippingPartner />
        </div>
      )}
    </StyledOrderSingleShippingInfo>
  )
}
