import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import { Text } from '../../../../common/text'
import { Button } from '../../../../common/button'
import { usePosOrderAction } from '../../hooks/usePosOrderAction'

const ConfirmCloseTabOrder = () => {
  const {data,confirmRemoveOrderModal,func} = usePosOrderAction()
  const handleRemoveOrder = _ => {
    func.removeOrders(confirmRemoveOrderModal.order.id, confirmRemoveOrderModal.order?.listOrder, confirmRemoveOrderModal.order?.opt)
    confirmRemoveOrderModal?.onDisplay(false,{})
  }
  const statusOrder = !!confirmRemoveOrderModal.order.listOrder ? confirmRemoveOrderModal.order.listOrder.find(item => item.id == confirmRemoveOrderModal.order.id) : {}
  return (
    <Modal open={!!statusOrder?.changed && confirmRemoveOrderModal?.status}
           onClose={() => data?.leaveModal?.onDisplay(false,{}) }
    >
      <Box>
        <StyledConfirmOrder>
          <Text as={'p'} fontWeight={600} fontSize={20}>Xóa đơn hàng</Text>
          <Text as={'p'} style={{marginTop: 24}}>Hệ thống sẽ không lưu lại thông tin của đơn hàng này. Bạn có chắc chắn muốn xóa đơn hàng này không?</Text>
          <div style={{marginTop: 24, textAlign: 'right'}}>
            <Button size={'sm'}
                    appearance={'ghost'}
                    style={{width: 110, marginRight: 8}}
                    onClick={() => confirmRemoveOrderModal?.onDisplay(false,{}) }
            >Hủy</Button>
            <Button size={'sm'}
                    className={'delete-button'}
                    style={{width: 110}}
                    onClick={handleRemoveOrder}
            >Xóa</Button>
          </div>
        </StyledConfirmOrder>
      </Box>
    </Modal>
  )
}

export default ConfirmCloseTabOrder

export const StyledConfirmOrder = styled.div`
  width: 480px;
  //height: 176px;
  
  margin: auto;
  margin-top: 300px;
  padding: 24px;
  position: relative;
  background: #FFFFFF;
  /* Style 1 */
  
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  @media screen and (max-height: 700px){
    margin-top: 200px;
  }
  button{
    &:focus{
      border: 1px solid red;
    }
  }
  .delete-button{
    background: #FF424E!important;
    border: 1px solid red;
  }
`
  