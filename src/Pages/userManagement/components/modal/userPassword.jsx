import React, {memo, useContext} from "react";
import {UserManagementContext} from "../../provider/_context";
import {useModal} from "../../hooks/useModal";
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {Grid} from "@mui/material";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import styled from "styled-components";
import {Tooltip} from "../../../../common/tooltip";
import {USER_ICON} from "../../icon/icon";
import {USER_PROFILE} from "../../../../Component/Icons";

export const ModalUserManagementPassword = memo(({...props}) => {
  const { pageState } = useContext(UserManagementContext)
  const {functions, valueForm, validate, typeInput} = useModal()

  return (
    <>
      <RightSightPopup
        openModal={pageState.openModalUserPass}
        confirmBeforeClose={true}
        disableSubmit={validate?.canSubmitPass}
        clickClose={() => functions.onCloseModalUserPass()}
        animationClose={functions.closeModalPass}
        header={
          {
            title: 'Thay đổi mật khẩu tài khoản',
            subTitle: '“Cập nhật thông tin để Evoshop hỗ trợ bạn tốt nhất!”',
          }
        }
        body={[
          {
            item: (<StyledContentModalUserPass>
              <div className={'right-sight-popup'}>
                <Grid container className={"right-sight-popup__group-role"}>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <div className="right-sight-popup__form-group right-sight-popup__form-group--full-name">
                      <Input
                        {...props}
                        label={
                          <>
                            Tên đăng nhập <Text color={THEME_SEMANTICS.failed}>*</Text>
                          </>
                        }
                        placeholder="Nhập họ tên"
                        autoComplete={'false'}
                        maxLength={100}
                        value={valueForm.currentUserName}
                        disabled={true}
                        onChange={e => functions.onChangeFullName(e.target.value)}
                        onBlur={() => validate.onBlurFullName()}
                      />
                    </div>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <div className="right-sight-popup__form-group right-sight-popup__form-password">
                      <Input
                        {...props}
                        label={
                          <>
                            <span>Mật khẩu đăng nhập hiện tại </span>
                            <Text color={THEME_SEMANTICS.failed}> *</Text>
                          </>
                        }
                        placeholder="Nhập mật khẩu đăng nhập hiện tại"
                        autoComplete={'new-password'}
                        value={valueForm?.currentPassword}
                        // maxLength={30}
                        validateText={validate?.errorCurrentPassword?.status ? validate?.errorCurrentPassword?.message : null}
                        validateType={!validate?.errorCurrentPassword?.status ? 'success' : 'danger'}
                        type={typeInput.currentPassword}
                        icon={typeInput.currentPassword === 'password' ? <i>{USER_PROFILE.not_eye}</i> : <i>{USER_PROFILE.eye}</i>}
                        onChange={e => functions.onChangeCurrentPassword(e.target.value)}
                        onBlur={e => validate?.onBlurCurrentPassword(e.target.value)}
                        onIconClick={() => functions.onChangeTypeCurrentPassword()}
                      />
                    </div>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <div className="right-sight-popup__form-group right-sight-popup__form-password">
                      <Input
                        {...props}
                        label={
                          <>
                            <span>Mật khẩu mới</span>
                            <Text color={THEME_SEMANTICS.failed}> *</Text>
                            <Tooltip placement="bottom" title={"Mật khẩu cần có độ dài ít nhất 06 ký tự. Tuy nhiên hãy luôn sử dụng mật khẩu mạnh để giữ an toàn cho thông tin đăng nhập của bạn"}>
                              <span
                                style={{
                                  marginLeft: 6,
                                  display: 'inline-block',
                                  transform: 'translateY(2px)',
                                }}
                              >
                              </span>
                                    <span className={"right-sight-popup__form-group-account--tooltip"}>{USER_ICON.question}</span>
                                  </Tooltip>
                                </>
                              }
                              placeholder="Nhập mật khẩu mới"
                              autoComplete={'new-password'}
                              value={valueForm?.password}
                              // maxLength={30}
                              validateText={validate?.errorNewPassword?.status ? validate?.errorNewPassword?.message : null}
                              validateType={!validate?.errorNewPassword?.status ? 'success' : 'danger'}
                              type={typeInput.newPassword}
                              icon={typeInput.newPassword === 'password' ? <i>{USER_PROFILE.not_eye}</i> : <i>{USER_PROFILE.eye}</i>}
                              onChange={e => functions.onChangeNewPassword(e.target.value)}
                              onBlur={e => validate?.onBlurNewPassword(e.target.value)}
                              onIconClick={() => functions.onChangeTypeNewPassword()}
                            />
                    </div>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <div className="right-sight-popup__form-group right-sight-popup__form-password">
                      <Input
                        {...props}
                        label={
                          <>
                            <span>Xác nhận mật khẩu mới</span>
                            <Text color={THEME_SEMANTICS.failed}> *</Text>
                          </>
                        }
                        placeholder="Nhập xác nhận mật khẩu mới"
                        autoComplete={'new-password'}
                        value={valueForm?.confirmPassword}
                        // maxLength={30}
                        validateText={validate?.errorConfirmPassword?.status ? validate?.errorConfirmPassword?.message : null}
                        validateType={!validate?.errorConfirmPassword?.status ? 'success' : 'danger'}
                        type={typeInput.confirmPassword}
                        icon={typeInput.confirmPassword === 'password' ? <i>{USER_PROFILE.not_eye}</i> : <i>{USER_PROFILE.eye}</i>}
                        onChange={e => functions.onChangeConfirmPassword(e.target.value)}
                        onBlur={e => validate?.onBlurConfirmPassword(e.target.value)}
                        onIconClick={() => functions.onChangeTypeConfirmPassword()}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </StyledContentModalUserPass>)
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
        acceptance={() => functions.onSubmitPass()}
      />
      <ConfirmModal
        openModal={pageState.modalConfirmUserPass}
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
        closeModal={() => functions.closeModalPassConfirm()}
        acceptance={() => functions.acceptanceModalPassConfirm()}
      />
    </>
  );
})


const StyledContentModalUserPass = styled.div`
  .right-sight-popup {
    &__form-password {
      margin-top: 24px;
    }
  }
`