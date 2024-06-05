import React from 'react';
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../../common/button";
import styled from "styled-components";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import {Text} from "../../../../../common/text";
import useCreateInfoVersion from "../../../hooks/useCreateInfoVersion";

const ConfirmPopup2 = () => {
  const {functions} = useCreateInfoVersion()
  return (
    <Modal open={true}>
      <Box>
        <StyleConfirmPopup2>
          <p className={'confirm-1--title'}>Cập nhật thông tin sản phẩm</p>
          <div className={'confirm-1--sub-title'}>
            <p>Thao tác này sẽ thực hiện các thay đổi sau:</p>
            <ul>
              <li>Cập nhật số lượng tồn kho của sản phẩm hiện tại vào phiên bản sản phẩm đầu tiên trong danh sách phiên bản vừa tạo.</li>
              <li>Những đơn hàng đang chứa sản phẩm này (nếu có) cũng sẽ được <span style={{color: '#FF9F41', fontWeight: 500}}>thay thế bằng thông tin phiên bản sản phẩm đầu tiên</span> này.</li>
            </ul>
            <p className={'confirm-1--sub-title-last'}>Bạn có chắc muốn thực hiện?</p>
          </div>
          <div className={'confirm-1--note'}>
            {PRODUCT_ICONS.blueQuestion}
            <Text style={{marginLeft: 6}}><strong>Ghi chú:</strong> Doanh thu của sản phẩm gốc cũng sẽ được tính cho phiên bản sản phẩm đầu tiên.</Text>
          </div>
          <div className={'confirm-1--group-btn'}>
            <Button appearance={'ghost'}
                    size={'sm'}
                    onClick={() => functions.onCloseModalConfirmEdit()}
            >Hủy</Button>
            <Button
              size={'sm'}
              onClick={() => functions.onAcceptModalConfirmEdit()}
            >Xác nhận</Button>
          </div>
        </StyleConfirmPopup2>
      </Box>
    </Modal>
  )
}

export default ConfirmPopup2;
export const StyleConfirmPopup2 = styled.div`
  width: 595px;
  height: 376px;
  background: #FFFFFF;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 15rem auto;
  padding: 24px;
  
  .confirm-1 {
    &--title {
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      color: #00081D;
      margin-bottom: 24px;
    }
    &--sub-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      
      &-last {
        margin: 16px 0 24px 0;
      }
    }
    &--note {
      display: flex;
      margin-bottom: 24px;
      padding: 8px 16px;
      background: rgba(26, 148, 255, 0.1);
      border-radius: 6px;
      border: 1px solid #1A94FF;
    }
    &--group-btn {
      text-align: right;
      
      button:nth-child(1) {
        width: 110px;
        margin-right: 8px;
      }
      button:nth-child(2) {
        width: 110px;
      }
    }
  }
  
  ul {
    list-style: disc;
    margin-left: 24px;
  }
`
