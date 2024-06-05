import React, { useContext } from 'react'
import styled from 'styled-components'
import { Radio } from '../../../../../../../common/form/radio'
import { Text } from '../../../../../../../common/text'
import { ORDER_SINGLE_CONSTANTS } from '../../../../../interface/_constants'
import { THEME_SEMANTICS } from '../../../../../../../common/theme/_semantics'
import { Checkbox } from '../../../../../../../common/form/checkbox'
import { Input } from '../../../../../../../common/form/input'
import { Switch } from '../../../../../../../common/switch'
import { OrderSingleContext } from '../../../../../provider/_context'
import useOrderSingleShippingInfo from '../../../../../hooks/useOrderSingleShippingInfo'

export const OptionSuperShip = ({...props}) => {
  const { state } = useContext(OrderSingleContext)
  const { methods } = useOrderSingleShippingInfo()
  return (
    <StyledColslapsContainer>
      <div className={'shipping-partner-colslaps-container__item'}>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Người trả phí</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            {ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0] && ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0].payer.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() => methods.onPayerSelect(item?.value)}
              >
                <Radio
                  checked={item.value == state.form.shippingInfo.shippingPartner.optionValue.payer}
                  name="payer"
                  value={item.value}
                  style={{ transform: 'translateY(2px)' }}
                />
                <Text style={{ marginLeft: 8 }}>
                  {item?.label}
                </Text>
              </div>
            ))}

          </div>
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Yêu cầu khi giao</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            {ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0] && ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0].requestDelivery.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() => methods.onRequestDelivery(item?.value)}
              >
                <Radio
                  checked={item.value == state.form.shippingInfo.shippingPartner.optionValue.requestDelivery}
                  name="requestDelivery"
                  value={item.value}
                  style={{ transform: 'translateY(2px)' }}
                />
                <Text style={{ marginLeft: 8 }}>
                  {item?.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Yêu cầu lấy hàng</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            {ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0] && ORDER_SINGLE_CONSTANTS.form.shippingInfo[props?.partner?.id||0].requestPickUp.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() => methods.onRequestPickUp(item?.value)}
              >
                <Radio
                  checked={item.value == state.form.shippingInfo.shippingPartner.optionValue.requestPickUp}
                  name="requestPickUp"
                  value={item.value}
                  style={{ transform: 'translateY(2px)' }}
                />
                <Text style={{ marginLeft: 8 }}>
                  {item?.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={'shipping-partner-colslaps-container__item'}>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'} style={{marginBottom: '8px'}}>Ký nhận 1 phần</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'} style={{paddingTop: '10px'}}>
            <div
              // key={item?.id}
              className="shipping-partner-colslaps-container__radio-item"
              onClick={() => methods.onChangePartSign(props.position)}
            >
              <Checkbox checked={state.form.shippingInfo.shippingPartner?.optionValue?.partSign}/>
              <Text style={{ marginLeft: 8 }}> Cho phép ký nhận 1 phần </Text>
            </div>
          </div>
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <div className={'shipping-partner-colslaps-container__right-item-title'} style={{marginBottom: '8px'}}>
            <p>
              Số kiện hàng <Text
               color={THEME_SEMANTICS.failed}>*</Text>
            </p>
          </div>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            <Input value={state.form.shippingInfo.shippingPartner?.optionValue?.packageQuantity}
                   onChange={(e)=>{methods.setValuePackageQuantity(e.target.value,props.position)}}
            />
          </div>
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <div className={'shipping-partner-colslaps-container__right-item-title'}
               onClick={() => methods.onChangeCargoInsurrance(!props?.partner?.config?.cargoInsurrance?.active,props.position)}
               style={{marginBottom: '8px'}}
          >
            <p>Bảo hiểm hàng hóa</p>
            <Switch defaultChecked={props?.partner?.config?.cargoInsurrance?.active}/>
          </div>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            <Input disabled={props?.partner?.config?.cargoInsurrance?.active ? '' : 'disabled'}
                   placeholder={'Nhập giá trị bảo hiểm'}
                   value={props?.partner?.config?.cargoInsurrance?.value}
                   onChange={(e)=>{methods.setValueCargoInsurrance(e.target.value,props.position)}}
                   onBlur={methods.handleCargoInsurranceValidate}
                   validateText={state.validate?.cargoInsurrance}
                   validateType="danger"
            />
          </div>
        </div>
      </div>
    </StyledColslapsContainer>
  )
}

const StyledColslapsContainer = styled.div`
  .shipping-partner-colslaps-container{
    &__item{
      margin-top: 12px;
      display: flex;
      .shipping-partner-colslaps-container__right-item{
        width: 33.33%;
      }
    }
    &__right-item{
      padding-right: 16px;
    }
    &__right-item-title{
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #00081D;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
    }
    &__radio-item{
      display: flex;
      margin-bottom: 12px;
    }
  }
`