import React from 'react';
import {OrderTag} from "../../../refactorOrder/components/orderTags/_tag";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import styled from "styled-components";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";

const PaymentTags = ({...props}) => {
    const {
        dateTime,
        groupSubmitter,
        paymentMethod,
        employeeCreate,
        typeReceipt,
        methods,
        shouldShowResetAll
    } = usePaymentManagementFilter()

    return (
        <StyledOrderTags {...props}>
            {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
                <OrderTag
                    onDelete={() => methods.filterTagDelete('dateTime')}
                >
                    Ngày tạo phiếu: {dateTime.activeValue.value}
                </OrderTag>
            )}
            {!!groupSubmitter?.activeValue?.name && (
                <OrderTag
                    onDelete={() => methods.filterTagDelete('groupSubmitter')}
                >
                    Nhóm người nhận: {groupSubmitter?.activeValue?.name}
                </OrderTag>
            )}
            {paymentMethod?.activeValue?.length > 0 && (
                <OrderTag
                    onDelete={() => methods.filterTagDelete('paymentMethod')}
                >
                    Phương thức thanh toán: {paymentMethod?.activeValue?.map(item => item.name).join(', ')}
                </OrderTag>
            )}
            {employeeCreate?.activeValue?.length > 0 && (
                <OrderTag
                    onDelete={() => methods.filterTagDelete('employeeCreate')}
                >
                    Nhân viên tạo phiếu: {employeeCreate?.activeValue?.map(item => item.fullname).join(', ')}
                </OrderTag>
            )}
            {typeReceipt?.activeValue?.length > 0 && (
                <OrderTag
                    onDelete={() => methods.filterTagDelete('typeReceipt')}
                >
                    Loại phiếu chi: {typeReceipt?.activeValue?.map(item => item.name).join(', ')}
                </OrderTag>
            )}
            {shouldShowResetAll && (
                <Text
                    as="b"
                    color={THEME_SEMANTICS.delivering}
                    lineHeight={28}
                    style={{marginBottom: 12, cursor: 'pointer'}}
                    onClick={methods.handleDeleteAll}
                >
                    Đặt lại mặc định
                </Text>
            )}
        </StyledOrderTags>
    )
}

export default PaymentTags;


export const StyledOrderTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
`