import React from 'react';
import {Box, Modal} from "@mui/material";
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import styled from "styled-components";

const CancelAdjustmentPrice = ({modalCancelBill, onCancel, onApprove, ...props}) => {
  return (
    <Modal
      open={modalCancelBill?.open}
      // onClose={}
    >
      <StyledModalConfirm>
        <Box>
          <Text
            fontWeight={600}
            fontSize={20}
          >Xác nhận hủy phiếu điều chỉnh giá vốn</Text>
          <div className={'confirm-adjustment-price--detail'}>
            <Text>Thao tác này sẽ hủy bỏ giá trị của phiếu đang chọn. Bạn có chắc chắn muốn thực hiện?</Text>
          </div>
          <div className={'confirm-adjustment-price--group'}>
            <Button
              size={'sm'}
              appearance={'ghost'}
              onClick={onCancel}
            >Hủy</Button>
            <Button
              size={'sm'}
              onClick={onApprove}
            >Xác nhận</Button>
          </div>
        </Box>
      </StyledModalConfirm>
    </Modal>
  )
}

export default CancelAdjustmentPrice


const StyledModalConfirm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 32px;
  
  position: relative;
  width: 480px;
  height: 204px;
  
  background: #FFFFFF;
  /* Style 1 */
  
  margin: auto;
  top: 360px;
  
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  .confirm-adjustment-price {
    &--detail {
      margin: 24px 0 32px 0;
    }
    &--group {
      text-align: end;
      & button:first-child {
        width: 56px;
        margin-right: 8px;
        padding: 0;
        font-weight: 400;
      }
      & button:nth-child(2) {
        width: 90px;
        padding: 0;
        font-weight: 400;
      }
    }
  }
`
