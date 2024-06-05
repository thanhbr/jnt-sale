import React from 'react';
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";
import {Option} from "../../../../../common/form/autoComplete/_option";
import styled from "styled-components";
import {useCreatePaymentModal} from "../../../hooks/useCreatePaymentModal";

const ReceiptType = () => {
  const {data, methods, validateState} = useCreateReceiptBody()
  const {method} = useCreatePaymentModal()
  const typeReceipt = data?.typeReceipt
  
  return (
    <>
      <AlternativeAutoComplete
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: 'Loại phiếu thu', value: '' }, // if not exist this value -> default category: categoryList[0]
          // categoryWidth: 140,
          categoryHidden: true,
          label: (
            <>
              Loại phiếu thu <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          ),
          placeholder: 'Chọn loại phiếu thu',
          readOnly: true,
          value: typeReceipt?.value?.name || '',

        }}
        menuProps={{
          empty: typeReceipt?.list?.length <= 0 ? 'Không tìm thấy loại phiếu thu' : '',
        }}
        searchInputProps={{
          placeholder: 'Chọn loại phiếu thu',
          // value: '',
          onChange: cate => methods?.handleReceiptTypeKeywordChange(cate?.value),
        }}
        validateText={validateState?.typeReceipt?.message}
        validateType={validateState?.typeReceipt?.status ? 'danger' : 'success'}
        // className={disabled && 'product-group-content_alternative'}
      >
        {typeReceipt?.list?.length > 0 &&
        typeReceipt?.list?.map(item => {
          return (
            <Option
              key={item.id}
              className={"receipt-create__option-text"}
              data-active={+item.id === +typeReceipt?.value?.id}
              onClick={() => methods.handleReceiptTypeValue(item)}
              style={{paddingTop: 16, cursor: 'pointer'}}
            >
              <Text>{item.name}</Text>
            </Option>
          )}
        )}
        {typeReceipt?.list?.length > 0 && (<CreateBox onClick={() => method?.handleToggleModal()} />)}
      </AlternativeAutoComplete>
    </>
  )
}

export default ReceiptType

const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{marginRight: 4}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm loại phiếu thu</Text>
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