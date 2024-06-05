import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {POS_ICON} from "../../../constants/icons";
import {Text} from "../../../../../common/text";
import {Button} from "../../../../../common/button";
import usePosPayment from "../../../hooks/usePosPayment";

const ResponseSubmit = () => {
  const {methods} = usePosPayment()
  return (
    <Modal open={true}
           onClose={() => {
             methods.handleToggleModalResponsePayment('close')
           }}
    >
      <Box>
        <StyledModalResponsePayment>
          <div>{POS_ICON.successCreate}</div>
          <Text as={'p'}
                fontSize={20}
                fontWeight={600}
                className={'response-submit--title'}
          >
            Thanh toán thành công
          </Text>
          <Text as={'p'}
                className={'response-submit--subtitle'}
          >
            Đơn hàng đã được thanh toán thành công. Bạn có muốn in hóa đơn?
          </Text>
          <div className={'response-submit--group-btn'}>
            <button onClick={() => methods?.handlePrintOrder('a4')}
            >In A4</button>
            <button style={{width: 76}} onClick={() => methods?.handlePrintOrder('k80')}
            >In K80</button>
            <button  style={{width: 69}} appearance={'secondary'}
                     onClick={() => methods.handleToggleModalResponsePayment('close')}
            >Đóng</button>
          </div>
        </StyledModalResponsePayment>
      </Box>
    </Modal>
  )
}

export default ResponseSubmit


export const StyledModalResponsePayment = styled.div`
  width: 520px;
  height: 280px;
  background: #fff;
  border-radius: 8px;
  
  margin: auto;
  margin-top: 244px;
  padding: 44px 62px;
  position: relative;
  text-align: center;
  
  @media screen and (max-height: 700px){
    margin-top: 140px;
  }
  .response-submit {
    &--title {
      width: 100% !important;
      margin-top: 24px;
    }
    &--subtitle {
      margin-top: 24px;
      width: 100% !important;
    }
    &--group-btn {
      margin-top: 16px;
      button {
        border: 1px solid transparent;
        height: 36px;
        border-radius: 4px;
        font-weight: 600;
        background: #1A94FF;
        color: #fff2f2;
      }
      button:focus {
        border: 1px solid #1A94FF;
        opacity: .8               ;
      }
      & button:first-child {
        width: 67px;
        padding: 0;
        margin-right: 16px;
      }
      & button:nth-child(2) {
        width: 76px;
        padding: 0;
        margin-right: 16px;
      }
      & button:nth-child(3) {
        width: 69px;
        padding: 0;
        margin-right: 16px;
        border: 1px solid #1A94FF;
        color: #1A94FF;
        background: transparent;
      }
    }
  }
`
