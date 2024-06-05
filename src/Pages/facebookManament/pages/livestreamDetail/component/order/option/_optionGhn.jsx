import React from 'react'
import {Radio} from '../../../../../../../common/form/radio'
import {Text} from '../../../../../../../common/text'
import useFacebookOrderShippingInfo from '../../../hooks/useFacebookOrderShippingInfo'
import {StyledColslapsContainer} from './index'

export const OptionGhn = ({...props}) => {
  const {data, methods} = useFacebookOrderShippingInfo()
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
                onClick={() =>
                  methods.onPayerSelect(item?.value, props?.position)
                }
              >
                <Radio
                  checked={item.checked}
                  name="payer"
                  value={item.value}
                  style={{transform: 'translateY(2px)'}}
                />
                <Text style={{marginLeft: 8}}>{item?.label}</Text>
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
                onClick={() =>
                  methods.onRequestDelivery(item?.value, props?.position)
                }
              >
                <Radio
                  checked={item.checked}
                  name="requestDelivery"
                  value={item.value}
                  style={{transform: 'translateY(2px)'}}
                />
                <Text style={{marginLeft: 8}}>{item?.label}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledColslapsContainer>
  )
}
