import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Text} from "../../../../../common/text";
import {Button} from "../../../../../common/button";
import usePosPayment from "../../../hooks/usePosPayment";

const ConfirmOrder = () => {
  const {modals, methods} = usePosPayment()
  return (
    <Modal open={modals?.confirmOrder?.open}
           onClose={() => methods?.handleCloseConfirmOrder() }
    >
      <Box>
        <StyledConfirmOrder>
          <Text as={'p'} fontWeight={600} fontSize={20}>Xác nhận tạo đơn hàng 0₫?</Text>
          <Text as={'p'} style={{marginTop: 30}}>Đơn hàng này đang có giá trị là 0₫. Bạn có chắc chắn muốn thực hiện tạo đơn?</Text>
          <div style={{marginTop: 30, textAlign: 'right'}}>
            <Button size={'sm'}
                    appearance={'ghost'}
                    style={{width: 110, marginRight: 8}}
                    onClick={() => methods?.handleCloseConfirmOrder()}
            >Hủy</Button>
            <Button size={'sm'}
                    style={{width: 110}}
                    onClick={() => methods?.handleApproveConfirmOrder()}
            >Xác nhận</Button>
          </div>
        </StyledConfirmOrder>
      </Box>
    </Modal>
  )
}

export default ConfirmOrder

export const StyledConfirmOrder = styled.div`
  width: 480px;
  height: 196px;
  background: #fff;
  border-radius: 8px;
  
  margin: auto;
  margin-top: 300px;
  padding: 20px 29px;
  position: relative;
    
  @media screen and (max-height: 700px){
    margin-top: 200px;
  }
`
  