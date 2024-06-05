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

export const ModalEditPaymentMethod = memo(() => {
  const { functions, valueForm, validate } = useModal()
  return (
    <>
      <RightSightPopup
        openModal={valueForm?.openModalEdit}
        confirmBeforeClose={true}
        clickClose={() => functions.onCloseEditModalPaymentMethod()}
        disableSubmit={validate?.errorName?.status}
        animationClose={functions.closeModalRole}
        acceptance={() => functions.onSubmitPaymentMethodEdit(valueForm?.paymentMethodActive?.id)}
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
                  {/*{validate?.errorCheckRules?.status && <span className={"right-sight-popup__group-role--error"}>{validate?.errorCheckRules?.message}</span>}*/}
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
                          value={valueForm?.editPaymentMethodName}
                          validateText={validate?.errorEditName?.status ? validate?.errorEditName?.message : null}
                          validateType={!validate?.errorEditName?.status ? 'success' : 'danger'}
                          onChange={e => functions.onChangeEditName(e.target.value)}
                          onBlur={() => validate.onBlurEditName()}
                          disabled={valueForm?.paymentMethodActive?.is_default === '1'}
                        />
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__default-payment-method"} onClick={() => {
                        if(!!!valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] ? valueForm?.editPaymentMethodStatus : valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] === '1') {
                          functions.toggleActivePaymentEdit()
                        }
                      }}>
                        <Checkbox
                          checked={valueForm?.editActiveModal === '1'}
                          disabled={!(!!!valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] ? valueForm?.editPaymentMethodStatus : valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] === '1')}
                        />
                        <span>Là phương thức thanh toán mặc định</span>
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      {valueForm?.editActiveModal !== '1' && (
                        <div className={'right-sight-popup__active-payment-method'}>
                          <input type={'checkbox'}
                                 checked={!!!valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] ? valueForm?.editPaymentMethodStatus : valueForm.isCheckStatus[valueForm?.paymentMethodActive?.id] === '1'}
                                 onChange={() => functions.toggleStatusEditPayment()}
                                 disabled={valueForm?.paymentMethodActive?.is_active === '1'}
                          />
                          <span>Kích hoạt/Ngưng sử dụng</span>
                        </div>
                      )}
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
        openModal={valueForm?.openModalConfirm}
        closeModal={() => functions.closeModalPaymentMethodConfirm()}
        acceptance={() => functions.acceptanceModalEditPaymentMethodConfirm()}
        body={<p>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</p>}
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
         background: var(--bg-pr-large-default);
        //background: rgb(123 201 200 / 80%);
        //cursor: not-allowed;
        // &:hover {
        //   background: rgb(123 201 200 / 80%);
        // }
      }
      
      input:checked[type="checkbox"]:disabled {
        background: #80c2c8;
        cursor: not-allowed;
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