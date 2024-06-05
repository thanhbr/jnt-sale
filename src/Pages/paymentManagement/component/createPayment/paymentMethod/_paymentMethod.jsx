import React, {useContext} from "react";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {PaymentManagementContext} from "../../../provider/context";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../../orderSingle/components/autocompleteSingleOption";
import {useCreatePaymentMethod} from "../hooks/useCreatePaymentMethod";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import styled from "styled-components";
import {useCreatePaymentModal} from "../hooks/useCreatePaymentModal";

export const PaymentMethod = ({props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form,validate} = formCreate;
    const {paymentMethod} = form
    const {functions} = useCreatePaymentMethod()
    const {openModal} = useCreatePaymentModal()
    const handleScroll = ()=>{
        if(!paymentMethod.canLoadMore)  return
        functions?.handlLoadMore()
    }
    return(
        <StyledPaymentMethod>
            <AlternativeAutoComplete
                {...props}
                // main input
                inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Chọn phương thức thanh toán', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    label: (
                        <>
                            Phương thức thanh toán <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                    ),
                    placeholder: 'Chọn phương thức thanh toán',
                    readOnly: true,
                    value: form?.paymentMethod.value?.name || '',
                    validateText: validate?.paymentMethod.message,
                    validateType: "danger"
                }}
                // search menu dropdown
                menuProps={{
                    empty:
                        form?.paymentMethod.list.length <= 0 ? 'Không tìm thấy phương thức thanh toán' : '',
                    canLoadMore : paymentMethod.canLoadMore,
                    onLoadMore:handleScroll,
                    className:'payment-management-person-payment_method'
                }}
                // search input in dropdown menu
                searchInputProps={{
                    placeholder: 'Tìm kiếm phương thức thanh toán',
                    value: form?.paymentMethod.keyword || '',
                    onChange: functions?.onPaymentKeywordChange,
                }}
                className={'payment-management-person-payment_method-drop-down'}
            >
                {form?.paymentMethod.list.length > 0 &&
                form?.paymentMethod.list.map(item => (
                    <AutoCompleteSingleOption
                        key={item.id}
                        data-active={item.id === form?.paymentMethod.value?.value}
                        onClick={() => functions.onChangePaymentMethod(item)}
                    >
                        {item.name}
                    </AutoCompleteSingleOption>
                ))}
                {
                    form?.paymentMethod.list.length === 0 &&  !!form?.paymentMethod.keyword ? '':
                        <CreateBox  onClick={()=>openModal('payment methods')}/>
                }

            </AlternativeAutoComplete>
        </StyledPaymentMethod>

    )
}
const CreateBox = ({...props}) => {
    return (
        <StyledCreateBox {...props}>
            <div className="create-box__container">
                <i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i>
                <Text color={THEME_SEMANTICS.delivering}>Thêm phương thức thanh toán</Text>
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
const StyledPaymentMethod = styled.div`
  .payment-management-person-payment_method{
    padding-bottom: 0 !important;
  }
  .payment-management-person-payment_method-drop-down{
    .alternative-auto-complete__menu{
    height: 286px;
  }
  }
`