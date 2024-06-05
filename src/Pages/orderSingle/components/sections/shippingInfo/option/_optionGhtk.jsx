import React, {useContext} from 'react'
import styled from 'styled-components'
import {Radio} from '../../../../../../common/form/radio'
import {Text} from '../../../../../../common/text'
import {THEME_SEMANTICS} from '../../../../../../common/theme/_semantics'
import {Input} from '../../../../../../common/form/input'
import {OrderSingleContext} from '../../../../provider/_context'
import useOrderSingleShippingInfo from '../../../../hooks/useOrderSingleShippingInfo'
import {Option} from '../../../../../../common/form/select/_option'
import {Select} from '../../../../../../common/form/select'
import {CategoryDatePicker} from '../../../../../../common/form/datePicker'
import {ORDER_SINGLE_CONSTANTS} from '../../../../interface/_constants'

export const OptionGhtk = ({...props}) => {
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
            Vận chuyển bằng
          </p>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            {props?.partner?.config?.transport?.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() =>
                  methods.onDeliveryMethod(item?.value, props?.position)
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
            Yêu cầu lấy hàng
          </p>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            {props?.partner?.config?.request_goods.map(item => (
              <div
                key={item?.value}
                className="shipping-partner-colslaps-container__radio-item"
                onClick={() =>
                  methods.onRequestPickUp(item?.value, props?.position)
                }
              >
                <Radio
                  checked={item.checked}
                  name="requestPickUp"
                  value={item.value}
                  style={{transform: 'translateY(2px)'}}
                />
                <Text style={{marginLeft: 8}}>{item?.label}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={'shipping-partner-colslaps-container__item'}>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <div
            className={'shipping-partner-colslaps-container__right-item-title'}
            style={{marginBottom: '8px'}}
          >
            <p>Ngày lấy hàng</p>
          </div>
          <CategoryDatePicker
            defaulValue={
              state.form.shippingInfo.shippingPartner?.optionValue?.pickUpDate
            }
            onChange={methods.handleDateTimeChange}
            placeholder={'Chọn ngày'}
            disabledTime={'isBefore'}
            datePickerProps={{
              placement: props?.isLast ? 'topStart' : 'bottomStart',
            }}
          />
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <div
            className={'shipping-partner-colslaps-container__right-item-title'}
            style={{marginBottom: '8px'}}
          >
            <p>Ca lấy hàng</p>
          </div>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            <Select
              className={`order-filter-form__input-wide ${props?.partner?.config?.pick_shift.find(item => !!item.checked)?.label ? 'active' : ''}`}
              value={props?.partner?.config?.pick_shift.find(item => !!item.checked)?.label || 'Chọn ca'
              }
            >
              {props?.partner?.config?.pick_shift.map(item => (
                <Option
                  key={item.value}
                  className="order-filter-form__option-text"
                  data-active={item.checked}
                  onClick={() => methods.onChangePickupShift(item.value,props?.position)}
                >
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={'shipping-partner-colslaps-container__right-item'}>
          <div
            className={'shipping-partner-colslaps-container__right-item-title'}
            style={{marginBottom: '8px'}}
          >
            <p>
              Bảo hiểm hàng hóa <Text color={THEME_SEMANTICS.failed}>*</Text>
            </p>
          </div>
          <div
            className={'shipping-partner-colslaps-container__right-item-desc'}
          >
            <Input
              placeholder={'Nhập giá trị bảo hiểm'}
              value={props?.partner?.config?.cargoInsurrance?.value}
              onChange={e => {
                methods.setValueCargoInsurrance(e.target.value, props.position)
              }}
              validateText={
                props?.partner?.config?.cargoInsurrance?.active &&
                !!state.validate?.shippingPartner
                  ? state.validate?.shippingPartner[props.position]
                      ?.cargoInsurrance
                  : ''
              }
              validateType="danger"
            />
          </div>
        </div>
      </div>
    </StyledColslapsContainer>
  )
}

const StyledColslapsContainer = styled.div`
  .order-filter-form__option-text {
    margin-bottom: 16px;
    &[data-active='true'],:hover {
      cursor: pointer;
      color: #1e9a98;
    }
  }
  .order-filter-form__input-wide {
    input {
      color: #7c88a6;
    }
    
  }
  .order-filter-form__input-wide.active {
    input {
      color: #00081d;
    }
    
  }
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
  .order-filter-form__option-text[data-active='true'] {
    color: #1e9a98;
  }
`
