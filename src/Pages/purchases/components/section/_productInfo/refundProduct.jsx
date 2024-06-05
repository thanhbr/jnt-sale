import { Text } from '../../../../../common/text'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from '../../../../../common/form/checkbox'
import { Switch } from '../../../../../common/switch'
import { RefundProductTable } from '../../productTable/refundProductTable'
import useRefundPurchaseProductInfo from '../../../hooks/useRefundPurchaseProductInfo'

export const RefundProduct = ({ ...props }) => {
  const { data,paymentVendor, validate, statusInfo, methods } = useRefundPurchaseProductInfo()
  return (
    <div>
      <StyledNoInventoryContainer {...props}>
        <div className={'refund-product__action'}>
          {data?.status &&
          <div className={'refund-product__action-checked'}
               onClick={() => methods?.onChangeSelectAllProduct(data?.refundAll)}>
            <Checkbox className={'refund-product__action-checkbox'} checked={data?.refundAll}/>
            <Text>Trả toàn bộ sản phẩm</Text>
          </div>
          }
          <div className={'refund-product__action-switch'}
               onClick={() => paymentVendor?.status ? methods?.onChangeStatusProduct(data?.status) : {}}>
            <Switch disabled={!paymentVendor?.status} defaultChecked={data?.status}/>
          </div>
        </div>
        {data?.status &&
        <div className="order-single-product-info-no-inventory-container__auto">
          <RefundProductTable
            list={data.selected}
            vat={data.vat}
            totalPayment={data.totalPayment}
            validate={validate}
            totalReturn={data.totalReturn}
            canEdit={!!statusInfo?.canEdit}
            onChangeVAT={methods.onChangeVAT}
            onQuantityChange={methods.onProductSelect}
          />
        </div>
        }
      </StyledNoInventoryContainer>
    </div>
  )
}

const StyledNoInventoryContainer = styled.div`
  .refund-product__action{
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    &-checked{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    &-checkbox{
    margin-right: 4px;
    }
    &-switch{
      margin-left: 24px;
    }
  }
  .order-single-product-info-no-inventory-container {
    &__not-found {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__radio-list {
      display: flex;
      flex-wrap: wrap;
    }

    &__radio-item {
      margin-right: 70px;
      margin-bottom: 16px;

      display: flex;

      cursor: pointer;
    }

    &__manual,
    &__auto {
      margin-bottom: 24px;
    }
  }
`
