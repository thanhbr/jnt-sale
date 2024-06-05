import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {CategoryDatePicker} from 'common/form/datePicker'
import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Radio} from 'common/form/radio'
import {Text} from 'common/text'
import {paymentDefaultDateTime} from 'Pages/orderSingle/provider/_initialState'
import styled from 'styled-components'
import {PaymentMethodAutoComplete} from './_PaymentMethodAutoComplete'

const PAYMENT_LIST = [
  {id: 1, name: 'Khách hàng thanh toán trước', value: 'before'},
  {id: 2, name: 'Thu COD sau khi giao hàng thành công', value: 'cod'},
  {id: 3, name: 'Thanh toán sau', value: 'after'},
]

export const Payment = ({...props}) => {
  const {data, paymentMethods} = useFacebookConversationOrder()
  const {paymentInfo} = data

  return (
    <Container {...props}>
      {PAYMENT_LIST.map(item => (
        <div key={item.id} className="order-single-payment-method__group">
          <div
            className="order-single-payment-method__group-radio"
            onClick={() =>
              item?.value && paymentMethods.onTypeChange(item.value)
            }
          >
            <Radio
              checked={paymentInfo.type === item?.value}
              style={{margin: '1px 17px 0 0'}}
            />
            <Text>{item?.name || '---'}</Text>
          </div>
          {paymentInfo.type === 'before' && item?.value === 'before' && (
            <div className="order-single-payment-method__group-container">
              <div className="order-single-payment-method__group-input">
                <PaymentMethodAutoComplete />
              </div>
              <div className="order-single-payment-method__group-input">
                <CurrencyInput
                  defaultValue={paymentInfo.money}
                  icon={
                    <Text as="u" color="#7C88A6">
                      đ
                    </Text>
                  }
                  iconProps={{style: {textAlign: 'right'}}}
                  label="Số tiền thanh toán"
                  onChange={paymentMethods.onMoneyChange}
                />
              </div>
              <div
                className="order-single-payment-method__group-input"
                style={{paddingTop: 24}}
              >
                <CategoryDatePicker
                  datePickerProps={{
                    defaultValue: paymentDefaultDateTime,
                  }}
                  inputProps={{label: 'Thời gian thanh toán'}}
                  onChange={paymentMethods.onDateChange}
                  horizontal={'End'}
                />
              </div>
            </div>
          )}
          {paymentInfo.type === 'after' && item?.value === 'after' && (
            <div className="order-single-payment-method__group-container">
              <div className="order-single-payment-method__group-input">
                <PaymentMethodAutoComplete />
              </div>
            </div>
          )}
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  .order-single-payment-method {
    &__group {
      margin-bottom: 16px;
    }

    &__group-radio {
      display: flex;

      cursor: pointer;
    }

    &__group-container {
      width: calc(100% + 16px);
      margin: 8px -8px 0 -8px;

      display: flex;
      align-items: flex-end;
    }

    &__group-input {
      width: calc(100% / 3 - 16px);
      margin: 0 8px 8px 8px;
    }
  }
  .auto-complete__option-container{
    width: 100%!important;
    -webkit-box-orient: vertical!important;
    -webkit-line-clamp: 1;
    display: -webkit-box!important;
    overflow: hidden!important;
    text-overflow: ellipsis!important;
  }
`
