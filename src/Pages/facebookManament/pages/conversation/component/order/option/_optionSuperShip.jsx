import React  from 'react'
import styled from 'styled-components'
import { Radio } from '../../../../../../../common/form/radio'
import { Text } from '../../../../../../../common/text'
import { THEME_SEMANTICS } from '../../../../../../../common/theme/_semantics'
import { Checkbox } from '../../../../../../../common/form/checkbox'
import { Input } from '../../../../../../../common/form/input'
import { Switch } from '../../../../../../../common/switch'
import { FACEBOOK_CONSTANTS } from '../../../../../interfaces/_constants'
import useFacebookOrderShippingInfo from '../../../hooks/useFacebookOrderShippingInfo'
import { StyledColslapsContainer } from './index'

export const OptionSuperShip = ({...props}) => {
  const { data,methods } = useFacebookOrderShippingInfo()
  return (
    <StyledColslapsContainer>
      <div className={'shipping-partner-colslaps-container__item'}>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Người trả phí</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
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
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Yêu cầu khi giao</p>
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
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <p className={'shipping-partner-colslaps-container__right-item-title'}>Yêu cầu lấy hàng</p>
          <div className={'shipping-partner-colslaps-container__right-item-desc'}>
            {props?.partner?.config?.request_goods.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() => methods.onRequestPickUp(item?.value,props?.position)}
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
              <Checkbox checked={!!props?.partner?.config?.partsign}/>
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
            <Input value={props?.partner?.config?.packageQuantity}
                   onChange={(e)=>{methods.setValuePackageQuantity(e.target.value,props.position)}}
                   validateText={!!data.validate?.shippingPartner ? data.validate?.shippingPartner[props.position]?.PackageQuantity : ''}
                   validateType="danger"
            />
          </div>
        </div>
      </div>
    </StyledColslapsContainer>
  )
}
