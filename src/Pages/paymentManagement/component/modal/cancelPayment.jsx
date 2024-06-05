import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";

const CancelPayment = ({modal, onClose, submit, ...props}) => {

    return (
        <Modal
            open={modal?.open}
            onClose={onClose}
        >
            <StyledCancelReceipt>
                <Box className={'cancel-receipt-content'}>
                    <div>
                        <Text fontWeight={600} fontSize={20}>Xác nhận hủy phiếu chi</Text>
                    </div>
                    <div>
                        <Text>Thao tác này sẽ hủy bỏ giá trị của phiếu chi đang chọn. Bạn có chắc chắn muốn thực hiện ?</Text>
                    </div>
                    <div className={'cancel-receipt-content--group-btn'}>
                        <Button appearance={'ghost'}
                                className={'cancel-receipt-content--cancel'}
                                size={'sm'}
                                onClick={onClose}
                        >Hủy</Button>
                        <Button className={'cancel-receipt-content--approve'}
                                size={'sm'}
                                onClick={() => {
                                    onClose()
                                    submit()
                                }}
                        >Xác nhận</Button>
                    </div>
                </Box>
            </StyledCancelReceipt>
        </Modal>
    )
}
export default CancelPayment


const StyledCancelReceipt = styled.div`
  .cancel-receipt-content {
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
    
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    left: 720px;
    top: 380px;
     @media screen and (max-width: 1440px){
        left: 490px;
        top: 258px;
     }
     @media screen and (max-width: 1366px){
           left: 445px;
          top: 205px;
     }
     @media screen and (max-width: 1280px){
           left: 407px;
     }
    &--group-btn {
      width: 100%;
      text-align: end;
    }
    &--cancel {
      width: 110px;
    }
    &--approve {
      margin-left: 8px;
      width: 110px;
    }
  }
`
