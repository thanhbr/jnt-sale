import React, {memo} from "react";
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Input} from "../../../../common/form/input";
import {Grid} from "@mui/material";
import {Checkbox} from "../../../../common/form/checkbox";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import "./index.scss"
export const ModalCreatePaymentMethod = memo(() => {
  const { functions, valueForm, validate } = useModal()
  return (
    <>
      <RightSightPopup
        openModal={valueForm?.openModalCreate}
        confirmBeforeClose={true}
        clickClose={() => functions.onCloseModalPaymentMethod()}
        disableSubmit={validate?.errorName?.status}
        animationClose={functions.closeModalRole}
        acceptance={() => functions.onSubmitPaymentMethod()}
        header={
          {
            title: 'Thông tin phương thức thanh toán',
            subTitle: '“Sử dụng khi bạn thực hiện thanh toán mua/bán hàng”',
          }
        }
        body={[
          {
            item: (
              <StyledModalPaymentMethod>
                <div className={"right-sight-popup__group-role--header"}>
                  <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__group-payment-method"}>
                        <Input
                          label={
                            <>
                              Phương thức thanh toán <Text color={THEME_SEMANTICS.failed}>*</Text>
                            </>
                          }
                          placeholder="Nhập tên phương thức thanh toán"
                          maxLength={50}
                          value={valueForm?.paymentMethodName}
                          validateText={validate?.errorName?.status ? validate?.errorName?.message : null}
                          validateType={!validate?.errorName?.status ? 'success' : 'danger'}
                          onChange={e => functions.onChangeName(e.target.value)}
                          onBlur={() => validate.onBlurName()}
                        />
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__default-payment-method"} onClick={() => functions.toggleActivePayment()}>
                        <Checkbox
                          checked={valueForm?.paymentMethodIsActive}
                        />
                        <span>Là phương thức thanh toán mặc định</span>
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={'right-sight-popup__active-payment-method'}>
                        <input type={'checkbox'}
                          checked={valueForm?.paymentMethodStatus}
                          onChange={() => functions.toggleStatusPayment()}
                        />
                        <span>Kích hoạt/Ngưng sử dụng</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </StyledModalPaymentMethod>)
          }
        ]}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Huỷ'
            },
            save: {
              width: 110,
              title: 'Lưu'
            },
          }
        }
      />
      <ConfirmModal
        openModal={valueForm?.openModalConfirm}
        closeModal={() => functions.closeModalPaymentMethodConfirm()}
        acceptance={() => functions.acceptanceModalPaymentMethodConfirm()}
        stylePopup={'payment-confirm_modal'}
        body={<Modal_Confirm/>}
        footer={
          {
            cancel: {
              width: 74,
              title: 'Huỷ'
            },
            acceptance: {
              width: 110,
              title: 'Xác nhận'
            },
          }
        }
      />
    </>
  )})
const Modal_Confirm=()=>{
  return(
      <StylePaymentConfirm>
        <Text  as={'P'} fontSize={20} fontWeight={600}>Xác nhận rời khỏi trang</Text>
        <Text className={'payment_txt'} as={'P'}>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
      </StylePaymentConfirm>
  )
}
const StylePaymentConfirm =styled.div`
  .payment_txt{
    margin-top:24px;
  }
`
const StyledModalPaymentMethod = styled.div`
  .right-sight-popup {
    &__default-payment-method {
      margin-top: 24px;
      display: flex;
      
      span {
        cursor: pointer;  
        margin-left: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
    }
    &__active-payment-method {
      margin-top: 32px;
      position: relative;
      
      input[type="checkbox"] {
        position: relative;
        width: 2.125rem !important;
        height: 1.25rem !important;
        -webkit-appearance: none;
        background: #c6c6c6;
        outline: none;
        border-radius: 1.25rem;
        transition: 0.7s;
        cursor: pointer;
      }
      
      span {
        // cursor: pointer;  
        margin-left: 8px;
        position: absolute;
        
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
      
      input:checked[type="checkbox"] {
         background: #00AB56;
        //background: rgb(123 201 200 / 80%);
        //cursor: not-allowed;
        // &:hover {
        //   background: rgb(123 201 200 / 80%);
        // }
      }
      
      input[type="checkbox"]:before {
        content: '';
        position: absolute;
        width: 16.67px;
        height: 16.67px;
        border-radius: 50%;
        top: .1rem;
        left: 0;
        background: #ffffff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: .5s;
      }
      input:checked[type="checkbox"]:before {
        left: 1rem
      }
    }
  }
`