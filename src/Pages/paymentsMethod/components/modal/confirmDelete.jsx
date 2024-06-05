import React, {memo, useContext} from "react";
import {Button} from "../../../../common/button";
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {PaymentMethodContext} from "../../provider/~context";
import {paymentMethodActions} from "../../provider/~reducer";
import useTableBody from "../../hooks/useTableBody";

export const ModalConfirmDelete = memo(() => {
  const { pageState, pageDispatch } = useContext(PaymentMethodContext)
  const { functions } = useTableBody()
  return (
    <>
      <Modal
        open={pageState.openModalConfirmDelete}
        onClose={() => pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM_DELETE, payload: false })}
      >
        <StyledModalConfirmDelete>
          <Box className={`confirm-delete-popup`}>
            <div>
              <p className={'confirm-delete-popup__title'} >Xóa phương thức thanh toán</p>
              <p className={'confirm-delete-popup__sub-title'} >Phương thức thanh toán được xoá sẽ không thể khôi phục, bạn có chắc chắn muốn xóa không?</p>
              <div className={'confirm-delete-popup__group-btn'} >
                <Button appearance={'ghost'}
                        className={'confirm-delete-popup__dismiss'}
                        onClick={() => pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM_DELETE, payload: false })}
                >Hủy</Button>
                <Button className={'confirm-delete-popup__save'} onClick={() => functions.confirmDeleteItem()}>Xóa</Button>
              </div>
            </div>
          </Box>
        </StyledModalConfirmDelete>
      </Modal>
    </>
  )})

const StyledModalConfirmDelete = styled.div`
.confirm-delete-popup {
  background: white;
  margin: 20rem auto 0 auto;
  padding: 32px 24px;
  line-height: 140%;

  width: 480px;
  height: 204px;
  border-radius: var(--border-radius);

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
  }
  
  &__sub-title {
    margin-top: 24px;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
  }
  
  &__body {
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
  }
  &__group-btn {
    margin-top: 1.5rem;
    text-align: right;
    button {
      font-weight: 400;
      font-size: 15px;
      line-height: 140%;

      cursor: pointer;
      padding: 8px 24px;
      border-radius: var(--border-radius-component);
      border: 1px solid #edf0f6;
    }
  }
  &__dismiss {
    background: var(--white-color);
    margin-right: .75rem;
    width: 110px;
    height: 32px;
    border-radius: 6px; 
    font-size: 14px !important;
    line-height: 100% !important;
    
    &:hover {
      border: 1px solid var(--color-package-up2022-7);
    }
  }
  &__save {
    width: 110px;
    height: 32px;
    background: #FF424E;
    border-radius: 6px;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 100% !important;
    // &:hover {
    //   background: var(--color-hover-package-up2022-7);
    //   color: var(--white-color);
    // }
  }
}
`