import styled from 'styled-components'
import React from 'react'
import { Text } from '../../../../../common/text'
import { CurrencyInput } from '../../../../../common/form/input/_currencyInput'
import { RefundPaymentMethodType } from './paymentMethod/_refundPaymentMethod'
import { formatMoney } from '../../../../../util/functionUtil'
import useRefundPurchasePaymentVendor from '../../../hooks/useRefundPurchasePaymentVendor'
import { Tooltip } from '../../../../../common/tooltip'
import { Switch } from '../../../../../common/switch'

export const RefundPayment = () => {
  const { data, productInfo, validate, methods } = useRefundPurchasePaymentVendor()
  return (
    <Styled>
      <div className={'vendor-payment__switch'} onClick={productInfo?.status ? methods.onStatusChange : () => {}}>
        <Switch disabled={!productInfo?.status} defaultChecked={data?.status}/>
      </div>
      {!!data?.status &&
      <>
        <div className="vendor-payment">
          <div className="vendor-payment__form-input">
            <RefundPaymentMethodType validate={''}/>
          </div>
          <div className="vendor-payment__form-input">
              <Tooltip title={!!validate?.price ? validate?.price : ''} className={'--danger'} placement={'bottom'}>
                <CurrencyInput
                  defaultValue={data.price?.value}
                  triggerDefault={!!validate?.trigger}
                  icon={
                    <Text as="u" style={{ color: '#7C88A6' }}>
                      ₫
                    </Text>
                  }
                  iconProps={{ style: { textAlign: 'right' } }}
                  label="Số tiền nhận lại từ Nhà cung cấp"
                  onChange={methods.onMoneyChange}
                  validateText={validate?.price ? true : ''}
                  validateType={'danger'}
                />
              </Tooltip>
          </div>
        </div>
        <div className="refund-payment-table__checkout">
          {productInfo.totalPayment > 0 &&
          <div
            className={`refund-payment-table__checkout-group`}
          >
            <div className="refund-payment-table__checkout-label">
              <Text color={'#00AB56'} fontWeight={600}>Đã thanh toán cho NCC</Text>
            </div>
            <div className="refund-payment-table__checkout-value">
              <Text color={'#00AB56'} fontWeight={600}>{formatMoney(productInfo.totalPayment)}</Text>
            </div>
          </div>
          }
          {productInfo.totalReturn !== 0 &&
          <div
            className={`refund-payment-table__checkout-group`}
          >
            <div className="refund-payment-table__checkout-label">
              <Text color={'#FF9F41'} fontWeight={600}>Nhận tiền hoàn từ NCC</Text>
            </div>
            <div className="refund-payment-table__checkout-value">
              <Text color={'#FF9F41'} fontWeight={600}>{formatMoney(productInfo.totalReturn)}</Text>
            </div>
          </div>
          }
        </div>
      </>
      }
    </Styled>
  )
}
const Styled = styled.div`
  .refund-payment-table__checkout{
    &-group{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    }
    &-value{
      margin-left: 73px;
    }
    margin-bottom: 24px;
  }
  .vendor-payment{
    display: flex;
    align-items: center;
    &__form-input{
      width: calc(50% - 8px);
      margin: 0 8px 24px 0;
      :nth-child(2){
        margin: 0 0 24px 8px;
      }
    }
    &__switch{
      position: absolute;
      top: 24px;
      right: 24px;,
      display: flex;
      cursor: pointer;
    }
  }
`