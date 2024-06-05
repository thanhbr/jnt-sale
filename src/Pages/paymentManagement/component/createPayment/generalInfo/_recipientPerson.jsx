import React, {useContext} from "react";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {PaymentManagementContext} from "../../../provider/context";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../../orderSingle/components/autocompleteSingleOption";
import {useCreatePayment} from "../hooks/useCreatePayment";
import {ICON_PAYMENT_MANAGEMENT} from "../../../interfaces/_const";
import styled from 'styled-components'
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import StringUtils from "../../../../orderSingle/utils/string";
export const RecipientPerson = ({props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form,validate} = formCreate
    const {methods} = useCreatePayment()
    const handlePostListScroll = () => {
        if (!form?.recipientPerson?.canLoadMore) return
        methods.onPostFetchMoreProductList()
    }
    const linkUrl = (type,keyword,id,phone)=>{
        switch (type) {
            case 'customer':
                return`/partner-management/customer?keyword=${phone}&group=&city=&district=&ward=&per_page=20&start=0`
            case 'supplier'  :
                return `/partner/suppliers?search=${keyword}`
            case 'user':
                return `/users?search=${keyword}`
            case 'partner_ship':
                return `/shipping/shipping-partners?id=${id}`
            default:
                break
        }
    }
    return(
        <StyleRecipientPerson>
            {form?.recipientGroup.value?.value === 'other' ?
                <Input
                    className="payment-management-person-input"
                    placeholder={'Nhập tên người nhận'}
                    autoComplete={'false'}
                    label={ <>
                        Người nhận <Text color={THEME_SEMANTICS.failed}>*</Text>

                    </>}
                    validateText={validate?.recipientPerson?.status ? validate?.recipientPerson?.message : null}
                    validateType={!validate?.recipientPerson?.status ? 'success' : 'danger'}
                    // defaultValue={searchParams.get('search')}
                    value={form?.recipientPerson.value?.name || ''}
                    onChange={e => methods.onChangeOther(e)}
                    onBlur={e => methods.onBlurChangeOther(e)}
                    maxLength={51}
                /> :

                <AlternativeAutoComplete
                    {...props}
                    // main input
                    inputProps={{
                        categoryList: [], // menu list in category dropdown
                        categoryValue: {name: 'Chọn người nhận', value: ''}, // if not exist this value -> default category: categoryList[0]
                        categoryWidth: 140,
                        categoryHidden: true,
                        label: (
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <div>
                                    Người nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
                                </div>

                                {!!form?.recipientPerson.value?.name ?
                                <Text as={'a'}
                                      target={'_blank'}
                                      href={linkUrl(form?.recipientGroup.value?.value,form?.recipientPerson.value?.name,form?.recipientPerson.value?.value,form?.recipientPerson.value?.mobile)}
                                      onClick = {e => e.stopPropagation()}
                                      color={THEME_COLORS.blue_500}
                                >
                                    {ICON_PAYMENT_MANAGEMENT.link} Xem thông tin người nhận
                                </Text>
                                    :''
                                }

                            </div>

                        ),
                        placeholder: 'Chọn người nhận',
                        disabled: !!!form?.recipientGroup.value?.value,
                        readOnly: true,
                        value: form?.recipientPerson.value?.name || '',
                        validateText: validate?.recipientPerson?.message,
                        validateType: "danger",
                        className:'payment-management-person-link'
                    }}
                    // search menu dropdown
                    menuProps={{
                        empty:
                            form?.recipientPerson.list.length <= 0 ? 'Không tìm thấy người nhận' : '',
                        canLoadMore : form?.recipientPerson?.canLoadMore,
                        onLoadMore:handlePostListScroll,
                    }}
                    // search input in dropdown menu
                    searchInputProps={{
                        placeholder: 'Tìm kiếm người nhận',
                        value: form?.recipientPerson.keyword || '',
                        onChange: methods.onRicipientPersonKeywordChange,
                    }}
                    className={form?.recipientGroup.value?.value !== 'partner_ship'? 'payment-management-recipient_person': 'payment-management-recipient_person_partner'}
                >
                    {form?.recipientPerson.list.length > 0 && form?.recipientGroup.value?.value !== 'partner_ship' ?
                    form?.recipientPerson.list.map(item => (
                        <AutoCompleteSingleOption
                            key={item.value}
                            data-active={item.value === form?.recipientPerson.value?.value}
                            onClick={() => methods.onRicipientPersonChange(item)}
                        >
                            <div className="payment-management-recipient_person__avatar">
                                <Text
                                    as="b"
                                    color="#fff"
                                    fontSize={12}
                                    lineHeight={17}
                                    style={{textTransform: 'uppercase'}}
                                >
                                    {!!item?.name
                                        ? StringUtils.getFirstLetters(item.name).substring(0, 2)
                                        : '--'}
                                </Text>
                            </div>
                            <div className="payment-management-recipient_person__info">
                                <Text className="payment-management-recipient_person__name">
                                    {item?.name || '---'}
                                </Text>
                                <Text color="#7C88A6">{item?.mobile || '---'}</Text>
                            </div>
                        </AutoCompleteSingleOption>
                    )) :
                        form?.recipientPerson.list.map(item => (
                            <AutoCompleteSingleOption
                                key={item.value}
                                data-active={item.value === form?.recipientPerson.value?.value}
                                onClick={() => methods.onRicipientPersonChange(item)}
                            >
                                {item?.name}
                            </AutoCompleteSingleOption>
                        ))
                    }
                </AlternativeAutoComplete>
            }


        </StyleRecipientPerson>

    )
}
const StyleRecipientPerson = styled.div`
  .payment-management-person-link{
    .input__label{
      width: 100% !important;
    }
  }
.payment-management-recipient_person{
  .alternative-auto-complete__menu{
    height: 298px;
  }
  .auto-complete__option{
    margin-bottom: 20px;
  }
   &__avatar {
      width: 32px;
      height: 32px;
      margin: 4px 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${THEME_COLORS.primary_300};
      border-radius: 50%;
    }

    &__info {
      flex: 1;
    }

    &__name {
      display: -webkit-box;
      overflow: hidden;

      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
}
.payment-management-recipient_person_partner{
  .alternative-auto-complete__menu{
    height: 218px;
  }
}
`