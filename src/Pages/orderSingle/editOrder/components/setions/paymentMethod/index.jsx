import {CategoryDatePicker} from 'common/form/datePicker'
import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Radio} from 'common/form/radio'
import {Text} from 'common/text'
import useOrderSinglePaymentMethod from 'Pages/orderSingle/hooks/useOrderSinglePaymentMethod'
import {ORDER_SINGLE_CONSTANTS} from 'Pages/orderSingle/interface/_constants'
import {OrderSinglePaymentMethodType as Method} from './_method'
import {StyledOrderSinglePaymentMethod} from './_styled'
import {useContext} from "react";
import {OrderSingleContext} from "../../../../provider/_context";

export const OrderEditSinglePaymentMethod = ({...props}) => {
  const {data, methods} = useOrderSinglePaymentMethod()
  const { state } = useContext(OrderSingleContext)
  const {type, dateTime} = data
  const {money} = data

  return (
    <StyledOrderSinglePaymentMethod {...props}>
      {ORDER_SINGLE_CONSTANTS.form.paymentMethod.listType.map(item => {
        if(state.form.shippingInfo.isStorePickUp && +item.id === 2) return
        return (
          <div key={item.id} className="order-single-payment-method__group">
            <div
              className="order-single-payment-method__group-radio"
              onClick={() => item?.value && methods.onTypeChange(item.value)}
            >
              <Radio
                checked={type === item?.value}
                style={{margin: '1px 17px 0 0'}}
              />
              <Text>{item?.name || '---'}</Text>
            </div>
            {type === 'before' && item?.value === 'before' && (
              <div className="order-single-payment-method__group-container">
                <div className="order-single-payment-method__group-input">
                  <Method />
                </div>
                <div className="order-single-payment-method__group-input">
                  <CurrencyInput
                    defaultValue={money?.value || 0}
                    triggerDefault={money?.triggerDefault}
                    icon={
                      <Text as="u" color="#7C88A6">
                        đ
                      </Text>
                    }
                    iconProps={{style: {textAlign: 'right'}}}
                    label="Số tiền thanh toán"
                    onChange={methods.onMoneyChange}
                  />
                </div>
                <div
                  className="order-single-payment-method__group-input"
                  style={{paddingTop: 24}}
                >
                  <CategoryDatePicker
                    datePickerProps={{defaultValue: dateTime.value}}
                    inputProps={{label: 'Thời gian thanh toán'}}
                    onChange={methods.onDateTimeChange}
                  />
                </div>
              </div>
            )}
            {type === 'after' && item?.value === 'after' && (
              <div className="order-single-payment-method__group-container">
                <div className="order-single-payment-method__group-input">
                  <Method />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </StyledOrderSinglePaymentMethod>
  )
}
