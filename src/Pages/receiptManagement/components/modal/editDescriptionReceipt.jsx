import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import {Textarea} from "../../../../common/form/textarea";

const EditDescriptionReceipt = ({data, onClose, onNoteChange, onUpdateDesc, ...props}) => {
  return (
    <Modal open={data?.open}
           onClose={onClose}
           >
      <StyledEditDescriptionReceipt {...props}>
        <Box className={'edit-desc-receipt-content'}>
          <Text fontSize={20} fontWeight={600}>Chỉnh sửa mô tả phiếu thu</Text>
          <div className={'edit-desc-receipt-content--description'}>
            <div
              className={'edit-desc-receipt-content--description-group'}
              style={{border: `1px solid ${data?.data?.length > 255 ? 'red' : '#ebeef5'}`}}
            >
              <Textarea
                placeholder="Nhập mô tả phiếu thu"
                value={data?.data}
                onChange={e => onNoteChange(e.target.value)}
                validateText={data?.data?.length > 255 ? 'Nội dung mô tả chỉ được phép nhập tối đa 255 ký tự': ''}
                validateType={'danger'}
                maxLength={256}
              />
              <Text className={'edit-desc-receipt-content--description-count'}
                    color={'#C8CBD4'}>{data?.data?.length}/255</Text>
            </div>
          </div>
          <div className={'edit-desc-receipt-content--group-btn'}>
            <Button appearance={'ghost'}
                    className={'edit-desc-receipt-content--cancel'}
                    size={'sm'}
                    onClick={onClose}
            >Hủy</Button>
            <Button className={'edit-desc-receipt-content--approve'}
                    size={'sm'}
                    onClick={() => {
                      if(data?.data?.length > 255) return
                      onClose()
                      onUpdateDesc()
                    }}
                    disabled={data?.data?.length > 255}
            >Xác nhận</Button>
          </div>
        </Box>
      </StyledEditDescriptionReceipt>
    </Modal>
  );
};

export default EditDescriptionReceipt

const StyledEditDescriptionReceipt = styled.div`
  @media screen and (max-width:1520px){
    .edit-desc-receipt-content {
      left: 38rem !important;
      top: 18rem !important;
    }
  }
  .edit-desc-receipt-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 32px;
    position: absolute;
    width: 480px;
    height: 264px;
    left: 45rem;
    top: 23.75rem;
    
    background: #FFFFFF;
    /* Style 1 */
    
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
    &--description  {
      position: relative;
      &-group {
        border-radius: 6px;
        height: 100px;
      }
      & textarea {
        resize: none;
        height: 74px;
        width: 432px;
        border: none;
      }
      &-count {
        position: absolute;
        bottom: 10px;
        right: 16px;
      }
      & .textarea__validate {
        top: calc(100% + 24px)
      }
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
