import React, {useContext} from 'react'
import styled from 'styled-components'
import {Radio} from '../../../../../../../common/form/radio'
import {Text} from '../../../../../../../common/text'
import {Input} from '../../../../../../../common/form/input'
import {Switch} from '../../../../../../../common/switch'
import {OrderSingleContext} from '../../../../../provider/_context'
import useOrderSingleShippingInfo from '../../../../../hooks/useOrderSingleShippingInfo'

export const OptionGhn = ({...props}) => {
  const {state} = useContext(OrderSingleContext)
  const {methods} = useOrderSingleShippingInfo()
  return (
    <StyledColslapsContainer>
      <div className={'shipping-partner-colslaps-container__item'}>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p
            className={'shipping-partner-colslaps-container__right-item-title'}
          >
            Người trả phí
          </p>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            {props?.partner?.config?.payer?.map(item => (
               <div
                  key={item?.value}
                  className="shipping-partner-colslaps-container__radio-item"
                  onClick={() => methods.onPayerSelect(item?.value,props?.position)}
               >
                 <Radio
                    checked={item.checked}
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
          <p
            className={'shipping-partner-colslaps-container__right-item-title'}
          >
            Yêu cầu khi giao
          </p>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            {props?.partner?.config?.request.map(item => (
               <div
                  key={item?.value}
                  className="shipping-partner-colslaps-container__radio-item"
                  onClick={() => methods.onRequestDelivery(item?.value,props?.position)}
               >
                 <Radio
                    checked={item.checked}
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
          <div
            className={'shipping-partner-colslaps-container__right-item-title'}
            style={{marginBottom: '8px'}}
          >
            <p>Bảo hiểm hàng hóa</p>
            <Switch
             onChange={() => methods.onChangeCargoInsurrance(!props?.partner?.config?.cargoInsurrance?.active,props.position)}
              defaultChecked={
                props?.partner?.config?.cargoInsurrance?.active
              }
            />
          </div>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            <Input
              disabled={props?.partner?.config?.cargoInsurrance?.active ? '' : 'disabled'}
              placeholder={'Nhập giá trị bảo hiểm'}
              value={
                props?.partner?.config?.cargoInsurrance?.value
              }
              onChange={e => {
                methods.setValueCargoInsurrance(e.target.value,props.position)
              }}
              onBlur={methods.handleCargoInsurranceValidate}
              validateText={props?.partner?.config?.cargoInsurrance?.active && !!state.validate?.shippingPartner ? state.validate?.shippingPartner[props.position]?.cargoInsurrance : ''}
              validateType="danger"
            />
          </div>
        </div>
      </div>
    </StyledColslapsContainer>
  )
}

const StyledColslapsContainer = styled.div`
  .shipping-partner-colslaps-container {
    &__item {
      margin-top: 12px;
      display: flex;
      .shipping-partner-colslaps-container__right-item {
        width: 33.33%;
      }
    }
    &__right-item {
      padding-right: 16px;
    }
    &__right-item-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #00081d;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
    }
    &__radio-item {
      display: flex;
      margin-bottom: 12px;
    }
  }
`
