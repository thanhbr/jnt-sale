import React, {useContext} from "react";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {PaymentManagementContext} from "../../../provider/context";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../../orderSingle/components/autocompleteSingleOption";
import {useCreatePayment} from "../hooks/useCreatePayment";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import styled from "styled-components";
import {useCreatePaymentModal} from "../hooks/useCreatePaymentModal";

export const PaymentType = ({props}) => {
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form, validate} = formCreate
    const {paymentType} = form
    const {methods} = useCreatePayment()
    const {openModal} = useCreatePaymentModal()
    const handleScroll = () => {
        if (!paymentType.canLoadMore) return
        methods?.paymentMethods?.handlLoadMore()
    }
    return (
        <StyledPaymentType>
            <AlternativeAutoComplete
                {...props}
                // main input
                inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Chọn loại phiếu chi', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    label: (
                        <>
                            Loại phiếu chi <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                    ),
                    placeholder: 'Chọn loại phiếu chi',
                    readOnly: true,
                    value: form?.paymentType.value?.name || '',
                    validateText: validate?.paymentType?.message,
                    validateType: "danger",

                }}
                // search menu dropdown
                menuProps={{
                    empty:
                        form?.paymentType.list.length <= 0 ? 'Không tìm thấy loại phiếu chi' : '',
                    canLoadMore: paymentType.canLoadMore,
                    onLoadMore: handleScroll,
                    className: 'payment-management-person-payment_type'
                }}
                // search input in dropdown menu
                searchInputProps={{
                    placeholder: 'Tìm kiếm loại phiếu chi',
                    value: form?.paymentType.keyword || '',
                    onChange: methods?.paymentMethods?.onPaymentKeywordChange,
                }}
                className={'payment-management-payment_type-drop-down'}
            >
                {form?.paymentType.list.length > 0 &&
                form?.paymentType.list.map(item => (
                    <AutoCompleteSingleOption
                        key={item.id}
                        data-active={item.id === form?.paymentType.value?.value}
                        onClick={() => methods.paymentMethods?.onPaymentTypeChange(item)}
                    >
                        {item.name}
                    </AutoCompleteSingleOption>
                ))}
                {form?.paymentType.list.length === 0 && !!form?.paymentType.keyword ? ''
                    :  <CreateBox onClick={() => openModal('payment type')}/>
                }

            </AlternativeAutoComplete>
        </StyledPaymentType>
    )
}
const CreateBox = ({...props}) => {
    return (
        <StyledCreateBox {...props}>
            <div className="create-box__container">
                <i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i>
                <Text color={THEME_SEMANTICS.delivering}>Thêm loại phiếu chi</Text>
            </div>
        </StyledCreateBox>
    )
}
const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: 0;
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
const StyledPaymentType = styled.div`
  .payment-management-person-payment_type{
    padding-bottom: 0 !important;
  }
  .payment-management-payment_type-drop-down{
     .alternative-auto-complete__menu{
        height: 286px;
      }
  }
`