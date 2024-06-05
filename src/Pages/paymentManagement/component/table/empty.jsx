
import React from 'react';
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {PAYMENT_MANAGEMENT_ICONS} from "../../interfaces/icon";
import usePaymentManagementTable from "../../hooks/usePaymentManagementTable";

const PaymentEmpty = ({...props}) => {
    const {shouldShowCreateBtn, detailListOrigin} = usePaymentManagementTable()
    return (
        <StyledReceiptEmpty {...props}>
            <img
                className={"payment-management-empty__banner"}
                src={"/img/order/order-empty.png"}
                alt="empty"
            />
            <Text as="b" color="#7C88A6" style={{marginBottom: 12}} fontWeight={600}>
                {!shouldShowCreateBtn && detailListOrigin.length === 0
                    ? 'Bạn chưa có giao dịch chi tiền nào'
                    : 'Không tìm thấy dữ liệu phù hợp'}
            </Text>
            {!shouldShowCreateBtn && detailListOrigin.length === 0?(
                <Button
                    href={'/accountant/payment/create'}
                    icon={PAYMENT_MANAGEMENT_ICONS.plus}
                    className={'payment-management-empty__create'}
                >Tạo mới phiếu chi</Button>
            ):''}
        </StyledReceiptEmpty>
    )
}

export default PaymentEmpty;

export const StyledReceiptEmpty = styled.div`
  min-height: calc(100vh - 390px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .payment-management-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
  .payment-management-empty__create {
    width: 205px;
  }
`
