import React from 'react';
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Option} from "../../../../common/form/autoComplete/_option";
import {Tooltip} from "../../../../common/tooltip";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";

const PaymentEmployee = () => {
    const {employeeCreate} = usePaymentManagementFilter()
    return (
        <AlternativeAutoComplete
            className="receipts-filter-form__input-wide"
            // main input
            inputProps={{
                categoryList: [{name: 'Nhân viên tạo phiếu', value: ''}], // menu list in category dropdown
                categoryWidth: 140,
                placeholder: 'Chọn nhân viên tạo phiếu',
                readOnly: true,
                value: employeeCreate?.value?.length > 0 ? `Đã chọn ${employeeCreate?.value?.length}` : '',
                onIconClick: employeeCreate.onInputReset,
            }}
            // menu
            menuProps={{
                empty:
                    employeeCreate?.list?.length <= 0
                        ? employeeCreate?.tab === 'all'
                        ? 'Không tìm thấy nhân viên tạo phiếu'
                        : 'Bạn chưa chọn nhân viên tạo phiếu nào'
                        : '',
                multipleChoices: true,
                onReset: employeeCreate.onInputReset, // only use this prop for multiple choice
            }}
            // search input in dropdown menu
            searchInputProps={{
                placeholder: 'Tìm kiếm nhân viên tạo phiếu',
                value: employeeCreate?.keyword,
                onChange: employeeCreate?.onKeywordChange,
            }}
            // tab list <only use this prop for multiple choices>
            tabProps={{
                active: employeeCreate?.tab,
                checkedNumber: employeeCreate?.value?.length,
                onChange: employeeCreate.onTabChange,
            }}
        >
            {employeeCreate?.list?.length > 0 &&
            employeeCreate?.list?.map(item => (
                <Option
                    key={item.user_id}
                    className="payment-management-filter-form__option-text"
                    checked={!!employeeCreate?.value?.find(find => +find.user_id === +item.user_id)}
                    multipleChoices={true}
                    onClick={() =>{
                        employeeCreate.onChange(item)
                    }}
                >
                    {item?.fullname?.length < 50 ? item.fullname
                        : <Tooltip placement="bottom-start"
                                   title={item.fullname}
                        >
                            {item?.fullname?.substring(0, 50)+' ...'}
                        </Tooltip>
                    }
                </Option>
            ))}
        </AlternativeAutoComplete>
    )
}

export default PaymentEmployee;