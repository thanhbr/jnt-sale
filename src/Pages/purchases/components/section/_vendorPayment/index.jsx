import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { Text } from '../../../../../common/text'
import { CurrencyInput } from '../../../../../common/form/input/_currencyInput'
import { PurchasePaymentMethodType } from './paymentMethod/_method'
import usePurchasePaymentVendor from '../../../hooks/usePurchasePaymentVendor'
import { Switch } from '../../../../customer/components/switch'
import { Tooltip } from '../../../../../common/tooltip'

export const VendorPayment = () => {
  const { data, validate, statusInfo, methods, generalInfo } = usePurchasePaymentVendor()

  const paymentRef = useRef()

  useEffect(() => {
    if (!generalInfo.validate?.vendor && !generalInfo.validate?.warehouse && validate?.price) {
      if (paymentRef.current) {
        paymentRef.current?.scrollIntoView()
      }
    }
  }, [validate])
  return (
    <Styled>
      <div className={'vendor-payment__switch'} ref={paymentRef} onClick={!statusInfo?.canEdit ? () => {} : methods.onStatusChange}>
        <Switch disabled={!statusInfo?.canEdit} checked={data?.status}/>
      </div>
      {!!data?.status &&
      <div className="vendor-payment">
        <div className="vendor-payment__form-input">
          <PurchasePaymentMethodType validate={''}/>
        </div>
        <div className="vendor-payment__form-input">
            <Tooltip title={!!validate?.price ? validate?.price  : '' } className={`--${validate?.type}`} placement={'bottom'}>
              <CurrencyInput
                defaultValue={data.price?.value}
                triggerDefault = {validate?.trigger}
                icon={
                  <Text as="u" style={{color: '#7C88A6'}}>
                    ₫
                  </Text>
                }
                iconProps={{style: {textAlign: 'right'}}}
                label="Số tiền thanh toán"
                onChange={methods.onMoneyChange}
                validateText={!!validate?.price ? true : ''}
                validateType={validate?.type}
                disabled={!statusInfo?.canEdit}
              />
            </Tooltip>
        </div>
      </div>
      }
    </Styled>
  )
}
const Styled = styled.div`
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