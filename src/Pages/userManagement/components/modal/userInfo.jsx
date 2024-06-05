import React, {memo, useContext, useRef} from "react";
import {Grid} from "@mui/material";
import styled from 'styled-components'

import {UserManagementContext} from "../../provider/_context";
import {useModal} from "../../hooks/useModal";
import {USER_ICON} from "../../icon/icon";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import DatePicker from "react-datepicker";
import {now} from "moment";
import {Textarea} from "../../../../common/form/textarea";
import {Radio} from "../../../../common/form/radio";
import {CategoryDatePicker} from "../../../../common/form/datePicker";

export const ModalUserManagementDetail = memo(({...props}) => {
  const { pageState } = useContext(UserManagementContext)
  const {functions, valueForm, validate, typeInput} = useModal()
  const datepickerRef = useRef(null)

  return (
    <>
      <RightSightPopup
        openModal={pageState.openModalUserInfo}
        confirmBeforeClose={true}
        disableSubmit={validate?.canSubmitInfo}
        clickClose={() => functions.onCloseModalUserInfo()}
        animationClose={functions.closeModalInfo}
        header={
          {
            title: 'Thông tin người dùng',
            subTitle: '“Thông tin chi tiết của nhân viên để phục vụ cho việc quản lý.”',
          }
        }
        body={[
          {
            item: (<StyledContentModalUserInfo>
                    <div className={'right-sight-popup'}>
                      <Grid container className={"right-sight-popup__group-role"}>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group right-sight-popup__form-group--full-name">
                            <Input
                              {...props}
                              label={
                                <>
                                  Họ tên <Text color={THEME_SEMANTICS.failed}>*</Text>
                                </>
                              }
                              placeholder="Nhập họ tên"
                              maxLength={100}
                              autoComplete={'false'}

                              value={valueForm.fullName}
                              validateText={validate?.errorFullName?.status ? validate?.errorFullName?.message : null}
                              validateType={!validate.errorFullName?.status ? 'success' : 'danger'}
                              onChange={e => functions.onChangeFullName(e.target.value)}
                              onBlur={() => validate.onBlurFullName()}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group">
                            <Input
                              {...props}
                              label={
                                <>
                                  Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                                </>
                              }
                              placeholder="Nhập số điện thoại"
                              value={valueForm.phone}
                              maxLength={11}
                              autoComplete={'false'}

                              validateText={validate?.errorPhone?.status ? validate?.errorPhone?.message : null}
                              validateType={!validate?.errorPhone?.status ? 'success' : 'danger'}
                              onChange={e => functions.onChangePhone(e.target.value)}
                              onBlur={() => validate.onBlurPhone()}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group right-sight-popup__form-group-double right-sight-popup__form-group-double--right">
                            <Input
                              {...props}
                              label={
                                <>
                                  Email
                                </>
                              }
                              placeholder={"hoten.ngaythangsinh@gmail.com"}
                              autoComplete={'false'}
                              value={valueForm.email}
                              validateText={validate?.errorEmail?.status ? validate?.errorEmail?.message : null}
                              validateType={!validate?.errorEmail?.status ? 'success' : 'danger'}
                              maxLength={100}
                              onChange={e => functions.onChangeEmail(e.target.value)}
                              onBlur={() => validate.onBlurEmail()}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group">
                            <Input
                              {...props}
                              label={
                                <>
                                  Địa chỉ
                                </>
                              }
                              placeholder={"Nhập địa chỉ"}
                              autoComplete={'false'}
                              value={valueForm.address}
                              maxLength={255}
                              onChange={e => functions.onChangeAddress(e.target.value)}
                              onBlur={e => validate?.onBlurAddress(e.target.value)}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group right-sight-popup__form-group--birthday right-sight-popup__form-group-double">
                            <Text style={{marginBottom: 8}}>Ngày sinh</Text>
                            <CategoryDatePicker
                              datePickerProps = {{
                                defaultValue: valueForm.dob || null
                              }}
                              trigger={valueForm.dob}
                              onChange={date => functions.onChangeDOBNew(date)}
                            />
                            <i onClick={() => {
                              const datepickerElement = datepickerRef.current
                              datepickerElement.setFocus(true)
                            }}>{USER_ICON.calendar}</i>
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className="right-sight-popup__form-group right-sight-popup__form-group--note">
                            <Text style={{marginBottom: 8}}>Ghi chú</Text>
                            <Textarea
                              placeholder="Nhập ghi chú"
                              value={valueForm.note}
                              maxLength={255}
                              style={{minHeight: 100}}
                              onChange={e => functions.onChangeNote(e.target.value)}
                              onBlur={() => validate.onBlurNote()}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <Text>Giới tính</Text>
                          <div className="right-sight-popup__form-group right-sight-popup__form-group--gender right-sight-popup__form-group-double right-sight-popup__form-group-double--right">
                            <Grid container>
                              <Grid xs={4} sm={4} md={4} lg={4} item>
                                <div
                                  className="right-sight-popup__form-input right-sight-popup__form-radio"
                                  onClick={() => functions.onChangeGender('1')}
                                  data-size="xl"
                                >
                                  <Radio
                                    checked={valueForm.gender === '1'}
                                    name="product-info"
                                    value={1}
                                    style={{transform: 'translateY(2px)'}}
                                  />
                                  <Text style={{marginLeft: 8}}>
                                    Nam
                                  </Text>
                                </div>
                              </Grid>
                              <Grid xs={6} sm={6} md={6} lg={6} item>
                                <div
                                  className="right-sight-popup__form-input right-sight-popup__form-radio"
                                  data-size="xl"
                                  onClick={() => functions.onChangeGender('2')}
                                >
                                  <Radio
                                    checked={valueForm.gender === '2'}
                                    name="product-info"
                                    value={2}
                                    style={{transform: 'translateY(2px)'}}
                                  />
                                  <Text style={{marginLeft: 8}}>
                                    Nữ
                                  </Text>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12} item>
                          <div className={"right-sight-popup__form-input right-sight-popup__form-checkbox"}
                               onClick={functions.onChangeStatus}>
                            <input type={'checkbox'}
                               checked={valueForm?.activeEmployee}
                               onChange={functions.onChangeStatus}
                               disabled={typeInput?.disableActive}
                            />
                            <Text style={{marginLeft: '8px'}}>Kích hoạt/Ngưng kích hoạt</Text>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </StyledContentModalUserInfo>)
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
        acceptance={() => functions.onSubmitInfo()}
      />
      <ConfirmModal
        openModal={pageState.modalConfirmUserInfo}
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
        closeModal={() => functions.closeModalInfoConfirm()}
        acceptance={() => functions.acceptanceModalInfoConfirm()}
      />
    </>
  );
})


const StyledContentModalUserInfo = styled.div`
  .right-sight-popup {
    height: 75vh;
    overflow-y: scroll;
    &__form-group {
      margin-top: 20px;
      &--full-name {
        margin-top: 0px;
      }
    }
    &__form-group--birthday {
      position: relative;
    }
    &__form-group--birthday .react-datepicker__input-container input{
      margin-top: 8px;
      width: 100%;
      height: 34px;
      border: 1px solid #ebeef5;
      border-radius: 6px;
      padding: 0 21px 0 16px;
      
      &::placeholder {
        font-size: 14px;
      }
    }
    &__form-group--birthday i {
      position: absolute;
      right: 10px;
      top: 34px;
      cursor: pointer;
    }
    &__form-group--note div {
      margin-top: 8px !important;
      min-height: 94px !important;
      & textarea {
        max-height: 68px !important;
        min-height: 68px !important;
        resize: none;
      }
    }
    &__form-group--gender {
      display: flex;
      margin-top: 8px;
    }
    &__form-radio {
      display: flex;
      cursor: pointer;
    }
    &__form-checkbox {
      display: flex;
      margin-top: 32px; 
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
        cursor: pointer;  
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
        background: rgb(123 201 200 / 80%);
        cursor: not-allowed;
      }
      
      input[type="checkbox"]:before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
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
  @media (max-width: 1280px) {
    .right-sight-popup {
      height: 64vh;
    }
  }
  @media (max-width: 1366px) {
    .right-sight-popup {
      height: 66vh;
    }
  }
  @media (max-width: 1440px) {
    .right-sight-popup {
      height: 66vh;
    }
  }
  @media (max-width: 1520px) {
    .right-sight-popup {
      height: 66vh;
    }
  }
`