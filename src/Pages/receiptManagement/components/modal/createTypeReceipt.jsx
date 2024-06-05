import React from 'react';
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {Grid} from "@mui/material";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Tooltip} from "../../../../common/tooltip";
import {ICONS_TYPE_OF_RECEIPT} from "../../../typeOfReceipt/interfaces/_icons";
import {Textarea} from "../../../../common/form/textarea";
import {Switch} from "../../../../common/switch";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import styled from "styled-components";
import {useCreatePaymentModal} from "../../hooks/useCreatePaymentModal";

const CreateTypeReceipt = () => {
  const {modal, method, disableSubmit} = useCreatePaymentModal()
  return (
    <>
      <RightSightPopup
        openModal={modal?.open || false}
        confirmBeforeClose={true}
        clickClose={() => method.handleToggleModal()}
        disableSubmit={disableSubmit}
        animationClose={method.closeModal}
        acceptance={() => method.submit()}
        header={
          {
            title: 'Thông tin loại phiếu thu',
            subTitle: '“Giúp bạn phân loại các nguồn thu trong hoạt động kinh doanh”',
          }
        }
        body={[
          {
            item: (
              <StyledModalPaymentMethod>
                <Grid className={"right-sight-popup__group-role--header"}>
                  <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div>
                        <Input
                          label={
                            <>
                              Tên loại phiếu thu <Text color={THEME_SEMANTICS.failed}>*</Text>
                            </>
                          }
                          placeholder="Nhập tên loại phiếu thu"
                          maxLength={31}
                          value={modal?.form?.name || ''}
                          validateText={modal?.validate?.name?.status ? modal?.validate?.name?.message : ''}
                          validateType={'danger'}
                          onChange={e => method.handleChangeForm('name', e.target.value)}
                          onBlur={() => method.handleBlurForm('name', modal?.form?.name)}
                        />
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__group-type-receipt"}>
                        <Input
                          label={
                            <>
                              <span style={{marginRight: 5}}>Mã loại phiếu thu</span>
                              <Tooltip title={'Trường hợp bạn không nhập mã loại phiếu thu, evoshop sẽ tự động sinh theo mã hệ thống'}
                                       placement={'bottom'}>{ICONS_TYPE_OF_RECEIPT.question}</Tooltip>
                            </>
                          }
                          placeholder="Nhập mã loại phiếu thu"
                          maxLength={51}
                          value={modal?.form?.code || ''}
                          validateText={modal?.validate?.code?.status ? modal?.validate?.code?.message : ''}
                          validateType={'danger'}
                          onChange={e => method.handleChangeForm('code', e.target.value)}
                          onBlur={() => method.handleBlurForm('code', modal?.form?.code)}
                          disabled={+modal?.form?.is_default === 1}
                        />
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__group-type-receipt"}>
                        <Textarea
                          label="Mô tả"
                          placeholder="Nhập mô tả"
                          value={modal?.form?.description || ''}
                          onChange={e => method.handleChangeForm('description', e.target.value)}
                          onBlur={() => method.handleBlurForm('description', modal?.form?.description)}
                          validateText={modal?.validate?.description?.status ? modal?.validate?.description?.message : ''}
                          validateType={'danger'}
                          style={{resize: 'none'}}
                          maxLength={256}
                        >
                        </Textarea>
                      </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                      <div className={"right-sight-popup__group-type-receipt--checked"}>
                        <Switch
                                defaultChecked={+modal?.form?.status === 1}
                                disabled={true}
                                onChange={status => method.handleChangeForm('status', status)}
                                style={{marginRight: 8, opacity: '0.5'}}
                        />
                        <Text fontSize={14}>Kích hoạt/Ngưng sử dụng</Text>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
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
        openModal={method?.openConfirm}
        closeModal={() => method.handleCloseConfirm()}
        acceptance={() => method.acceptanceCloseConfirm()}
        stylePopup={'payment-confirm_modal'}
        header={<Text fontSize={20} fontWeight={600}>Xác nhận rời khỏi trang</Text>}
        body={<div style={{marginTop: 24}}>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</div>}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Huỷ'
            },
            acceptance: {
              width: 110,
              title: 'Xác nhận'
            },
          }
        }
      />
      <ConfirmModal
        openModal={method?.openConfirmDuplicate}
        closeModal={() => method.handleCloseConfirmDuplicate()}
        acceptance={() => method.acceptanceCloseConfirmDuplicate()}
        stylePopup={'type-receipt-duplicate-modal'}
        header={<Text fontSize={20} fontWeight={600}>Xác nhận lưu loại phiếu thu trùng tên</Text>}
        body={<div style={{marginTop: 24}}>Hệ thống đang tồn tại loại phiếu thu có tên trùng với loại phiếu thu mà bạn đang thao tác. Bạn vẫn muốn lưu lại loại phiếu thu này?</div>}
        footer={
          {
            cancel: {
              width: 110,
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
  )
}

export default CreateTypeReceipt

const StyledModalPaymentMethod = styled.div`
  .right-sight-popup {
    &__group-type-receipt {
      margin-top: 24px;
      &--checked {
        margin-top: 24px;
        display: flex;
      }
    }
    &__default-type-receipt {
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
    &__active-type-receipt {
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