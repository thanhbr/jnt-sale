import React, {memo} from 'react';
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {Grid} from "@mui/material";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Checkbox} from "../../../../common/form/checkbox";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import styled from "styled-components";
import {useCreatePaymentModal} from "../../hooks/useCreatePaymentModal";
import {Switch} from "../../../customer/components/switch";

export const CreatePaymentMethod = memo(() => {
  const {modalPaymentMethod, method, disableSubmitPayment} = useCreatePaymentModal()

  return (
    <>
      <RightSightPopup
        openModal={modalPaymentMethod?.open || false}
        confirmBeforeClose={true}
        clickClose={() => method.handleCloseModalPaymentMethod()}
        disableSubmit={disableSubmitPayment}
        animationClose={method.closeModalRole}
        acceptance={() => method.handleSubmitPaymentMethod()}
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
                          maxLength={51}
                          value={modalPaymentMethod?.form?.name}
                          validateText={modalPaymentMethod?.validate?.name?.status ? modalPaymentMethod?.validate?.name?.message : null}
                          validateType={!modalPaymentMethod?.validate?.name?.status ? 'success' : 'danger'}
                          onChange={e => method.handleChangeNamePayment(e.target.value)}
                          onBlur={() => method.handleBlurFormPaymentMethod('name')}
                        />
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__default-payment-method"}
                           onClick={() => method.handleToggleActivePayment()}
                      >
                        <Checkbox
                          checked={modalPaymentMethod?.form?.is_active}
                        />
                        <span>Là phương thức thanh toán mặc định</span>
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={'right-sight-popup__active-payment-method'}>
                        <Switch type={'checkbox'}
                                checked={modalPaymentMethod?.form?.status}
                                disabled={true}
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
              width: 74,
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
        openModal={method?.openModalConfirm}
        closeModal={() => method.closeModalPaymentMethodConfirm()}
        acceptance={() => method.acceptanceModalPaymentMethodConfirm()}
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
      display: flex;
      
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
        margin-left: 42px;
        position: absolute;
        
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
      
      input:checked[type="checkbox"] {
         background: var(--bg-pr-large-default);
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