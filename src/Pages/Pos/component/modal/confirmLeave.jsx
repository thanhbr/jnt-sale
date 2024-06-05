import React from 'react'
import { Box, Modal } from '@mui/material'
import styled from 'styled-components'
import { Text } from '../../../../common/text'
import { Button } from '../../../../common/button'
import { usePosSearchBox } from '../../hooks/usePosSearchBox'
import { useNavigate } from 'react-router-dom'

const ConfirmLeave = () => {
  const { data, state } = usePosSearchBox()
  const nav = useNavigate()

  const handleLeavePage = _ => {
    const orderPos = state
    orderPos.general.modal.leave = false
    orderPos.general.modal.removeOrder = {
      display: false,
      order: {}
    }
    orderPos.orders.list.map((item, index) => {
      orderPos.orders.list[index].changed = false
    })
    window.localStorage.setItem('order_pos', JSON.stringify(orderPos))
    nav('/admin')
  }
  return (
    <Modal open={data?.statusUpdate && data?.leaveModal?.status}
           onClose={() => data?.leaveModal?.onDisplay(false)}
    >
      <Box>
        <StyledConfirmOrder>
          <Text as={'p'} fontWeight={600} fontSize={20}>Xác nhận trở về trang quản lý bán hàng?</Text>
          <Text as={'p'} style={{ marginTop: 24 }}>Bạn có chắc chắn muốn trở về Trang quản lý bán hàng Evoshop?</Text>
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Button size={'sm'}
                    appearance={'ghost'}
                    style={{ width: 110, marginRight: 8 }}
                    onClick={handleLeavePage}
            >Có</Button>
            <Button size={'sm'}
                    style={{ width: 110 }}
                    onClick={() => data?.leaveModal?.onDisplay(false)}
            >Không</Button>
          </div>
        </StyledConfirmOrder>
      </Box>
    </Modal>
  )
}

export default ConfirmLeave

export const StyledConfirmOrder = styled.div`
  width: 480px;
  height: 176px;
  
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
`
  