import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import {Textarea} from "../../../../common/form/textarea";

const EditDescriptionPayment = ({data, onClose, onNoteChange, onUpdateDesc, ...props}) => {
    return (
        <Modal open={data?.open}
               onClose={onClose}
        >
            <StyledEditDescriptionReceipt>
                <Box className={'edit-desc-receipt-content'}>
                    <Text fontSize={20} fontWeight={600}>Chỉnh sửa mô tả phiếu chi</Text>
                    <div className={data?.data?.length > 255? 'edit-desc-receipt-content--description edit-desc-receipt-content--description-error' : 'edit-desc-receipt-content--description'}>
                        <Textarea
                            placeholder="Nhập mô tả phiếu chi"
                            value={data?.data}
                            onChange={e => onNoteChange(e.target.value)}
                            validateText={data?.data?.length > 255 ? 'Nội dung mô tả chỉ được phép nhập tối đa 255 ký tự': ''}
                            validateType={'danger'}
                            maxLength={256}
                            className={'edit-desc-receipt-content--text-area'}
                        />
                        <Text className={'edit-desc-receipt-content--description-count'}
                              color={'#C8CBD4'}>{data?.data?.length > 255 ? 255 : data?.data?.length}/255</Text>
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

export default EditDescriptionPayment

const StyledEditDescriptionReceipt = styled.div`
  .edit-desc-receipt-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 32px;
    position: absolute;
    width: 480px;
    height: 264px;
    left: 720px;
    top: 303px;
    
    background: #FFFFFF;
    /* Style 1 */
    
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    @media screen and (max-width: 1440px){
        left: 490px;
        top: 248px;
     }
     @media screen and (max-width: 1366px){
          left: 445px;
          top: 185px;
     }
     @media screen and (max-width: 1280px){
           left: 390px;
           top: 185px;
     }
     &--description-error{
      border: 1px solid rgb(255, 66, 78) !important;
     }
    &--description  {
      position: relative;
      border: 1px solid #EBEEF5 ;
      border-radius: 6px;
      height: 100px;
      & textarea {
        resize: none;
        height: 42px;
        width: 432px;
        padding: 3px 16px;
        border: none !important;
      }
      .textarea__validate {
           top: calc(100% + 29px);
      }
      &-count {
        position: absolute;
        bottom: 10px;
        right: 7px;
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
