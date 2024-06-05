import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Text} from "../../../../common/text";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";

const PaymentGroupSubmitter = () => {
    const {groupSubmitter} = usePaymentManagementFilter()

    return (
        <AlternativeAutoComplete
            className="payment-management-filter-form__input-wide payment-management-filter-form__input-wide--submitter"
            // main input
            inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryValue: {name: 'Nhóm người nhận', value: ''}, // if not exist this value -> default category: categoryList[0]
                categoryWidth: 140,
                placeholder: 'Chọn nhóm người nhận',
                readOnly: true,
                value: groupSubmitter?.value?.name || '',
                // onIconClick: () => groupSubmitter.onChange(null),
            }}
            // menu
            menuProps={{
                empty:
                    groupSubmitter?.list?.length <= 0
                        ? 'Không tìm thấy nhóm người nhận.'
                        : '',
            }}
            // search input in dropdown menu
            searchInputProps={{
                placeholder: 'Tìm kiếm người nhận',
                value: groupSubmitter.keyword,
                onChange: groupSubmitter.onKeywordChange,
            }}
        >
            {groupSubmitter?.list?.length > 0 &&
            groupSubmitter?.list?.map(item => (
                <Option
                    key={item?.id}
                    className="payment-management-filter-form__option-text"
                    data-active={item?.id === groupSubmitter?.value?.id}
                    onClick={() => groupSubmitter.onChange(item)}
                >
                    <Text>{item?.name}</Text>
                </Option>
            ))}
        </AlternativeAutoComplete>
    )
}

export default PaymentGroupSubmitter;