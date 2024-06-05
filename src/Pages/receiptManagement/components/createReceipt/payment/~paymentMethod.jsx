import React from 'react';
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {AlternativeAutoComplete} from "../general/~alternativeAutoComplete";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";
import {Option} from "../../../../../common/form/autoComplete/_option";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import styled from "styled-components";
import {useCreatePaymentModal} from "../../../hooks/useCreatePaymentModal";

const PaymentMethod = () => {
  const {data, methods} = useCreateReceiptBody()
  const {method} = useCreatePaymentModal()
  const paymentMethod = data?.paymentMethod

  return (
    <>
      <AlternativeAutoComplete
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: 'Phương thức thanh toán', value: '' }, // if not exist this value -> default category: categoryList[0]
          // categoryWidth: 140,
          categoryHidden: true,
          label: (
            <>
              Phương thức thanh toán <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          ),
          placeholder: 'Chọn phương thức thanh toán',
          readOnly: true,
          // disabled,
          value: paymentMethod?.value?.name || '',
        }}
        menuProps={{
          empty: paymentMethod?.list?.length <= 0 ? 'Không tìm thấy phương thức thanh toán' : '',
        }}
        searchInputProps={{
          placeholder: 'Tìm kiếm phương thức thanh toán',
          // value: '',
          onChange: cate => methods?.handlePaymentMethodKeywordChange(cate?.value || ''),
        }}
        // validateText={validate?.formInfoProductValidate?.unit?.message}
        // validateType={validate?.formInfoProductValidate?.unit?.status ? 'danger' : 'success'}
        // className={disabled && 'product-group-content_alternative'}
      >
        {paymentMethod?.list?.length > 0 &&
        paymentMethod?.list?.map(item => {
          return (
            <Option
              key={item.id}
              className={"receipt-create__option-text"}
              data-active={item.id === paymentMethod?.value?.id}
              onClick={() => methods.handlePaymentMethodValue(item)}
              style={{paddingTop: 16, cursor: 'pointer'}}
            >
              <Text>{item.name}</Text>
            </Option>
          )}
        )}
        {paymentMethod?.list?.length > 0 && (<CreateBox onClick={() => method?.handleToggleModalPayment()} />)}
      </AlternativeAutoComplete>
    </>
  )
}

export default PaymentMethod

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{marginRight: 4}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm phương thức thanh toán</Text>
      </div>
    </StyledCreateBox>
  )
}
const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: -12px;
  z-index: 1;

  width: 100% !important;
  height: 48px;

  display: block;

  background: #fff;

  cursor: pointer;

  .create-box {
    &__container {
      height: 100%;

      display: flex;
      align-items: center;
    }
  }
`