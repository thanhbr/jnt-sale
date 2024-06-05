import React, {useContext} from "react";
import {Input} from "../../../../../common/form/input";
import {OrderSingleContactList} from "../../../../orderSingle/components/contactList";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {PaymentManagementContext} from "../../../provider/context";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../../orderSingle/components/autocompleteSingleOption";
import {useCreatePayment} from "../hooks/useCreatePayment";
import styled from "styled-components";
export const RecipientGroup = ({props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form,validate} = formCreate;
    const {methods} = useCreatePayment()
    return(
        <StyleRecipientGroup>
            <AlternativeAutoComplete
                {...props}
                // main input
                inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name: 'Chọn nhóm người nhận', value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 140,
                    categoryHidden: true,
                    label: (
                        <>
                            Nhóm người nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                    ),
                    placeholder: 'Chọn nhóm người nhận',
                    readOnly: true,
                    value: form?.recipientGroup.value?.name || '',
                    validateText: validate?.recipientGroup?.message,
                    validateType: "danger"
                }}
                // search menu dropdown
                menuProps={{
                    empty:
                        form?.recipientGroup.list.length <= 0 ? 'Không tìm thấy nhóm người nhận' : '',
                }}
                // search input in dropdown menu
                searchInputProps={{
                    placeholder: 'Tìm kiếm nhóm người nhận',
                    value: form?.recipientGroup.keyword || '',
                    onChange: methods.onRecipientGroupKeyword,
                }}
                className = {'payment-management-recipient-group'}
            >
                {form?.recipientGroup.list.length > 0 &&
                form?.recipientGroup.list.map(item => (
                    <AutoCompleteSingleOption
                        key={item.value}
                        data-active={item.value === form?.recipientGroup.value?.value}
                        onClick={() => methods.onRecipientGroupChange(item)}
                    >
                        {item.name}
                    </AutoCompleteSingleOption>
                ))}
            </AlternativeAutoComplete>
        </StyleRecipientGroup>

    )
}
const StyleRecipientGroup = styled.div`
  .payment-management-recipient-group{
    .alternative-auto-complete__menu{
      height: 252px;
    }
  }

`