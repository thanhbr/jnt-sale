import React, {useContext} from 'react'
import {Radio} from '../../../../../../../common/form/radio'
import {Text} from '../../../../../../../common/text'
import {Option} from '../../../../../../../common/form/select/_option'
import {Select} from '../../../../../../../common/form/select'
import {CategoryDatePicker} from '../../../../../../../common/form/datePicker'
import useFacebookOrderShippingInfo from '../../../hooks/useFacebookOrderShippingInfo'
import {StyledColslapsContainer} from './index'

export const OptionGhtk = ({...props}) => {

  const {data, methods} = useFacebookOrderShippingInfo()
  return (
    <StyledColslapsContainer>
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
              props?.partner?.config?.optionValue?.pickUpDate
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
                  onClick={() => methods.onChangePickupShift(item.value, props?.position)}
                >
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
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
      </div>
    </StyledColslapsContainer>
  )
}
