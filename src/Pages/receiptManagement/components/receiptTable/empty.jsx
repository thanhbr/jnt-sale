import React from 'react';
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {RECEIPT_ICONS} from "../../interfaces/icon";
import useReceiptTbody from "../../hooks/useReceiptTbody";

const ReceiptEmpty = ({...props}) => {
  const {shouldShowCreateBtn} = useReceiptTbody()
  return (
    <StyledReceiptEmpty {...props}>
      <img
        className={"receipt-empty__banner"}
        src={"/img/order/order-empty.png"}
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 12}} fontWeight={600}>
        {shouldShowCreateBtn
          ? 'Bạn chưa có giao dịch thu tiền nào'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {shouldShowCreateBtn && (
        <Button
          href={'/accountant/receipt/create'}
          icon={RECEIPT_ICONS.plus}
          className={'receipt-empty__create'}
        >Tạo mới phiếu thu</Button>
      )}
    </StyledReceiptEmpty>
  )
}

export default ReceiptEmpty;

export const StyledReceiptEmpty = styled.div`
  min-height: calc(100vh - 320px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .receipt-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
  .receipt-empty__create {
    width: 205px;
  }
`
