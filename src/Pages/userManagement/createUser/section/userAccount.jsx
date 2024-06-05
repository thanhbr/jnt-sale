import {Input} from "../../../../common/form/input";
import React from "react";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {USER_ICON} from "../../icon/icon";
import {Tooltip} from "../../../../common/tooltip";
import {USER_PROFILE} from "../../../../Component/Icons";
import useCreateUserManagement from "../../hooks/useCreateUserManagement";

const UserAccount = ({...props}) => {
  const {functions, valueForm, typeInput, validate} = useCreateUserManagement()
  return (
    <>
      <div className="create-user-info__form-group">
        <Input
          {...props}
          label={
            <>
              Tên đăng nhập <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          }
          placeholder="Nhập tên đăng nhập"
          value={valueForm?.userName}
          maxLength={100}
          validateText={validate?.errorUserName?.status ? validate?.errorUserName?.message : null}
          validateType={!validate?.errorUserName?.status ? 'success' : 'danger'}
          onChange={e => functions.onChangeUserName(e.target.value)}
          onBlur={e => validate?.onBlurUserName(e.target.value)}
          autoComplete={'false'}
        />
      </div>
      <div className="create-user-info__form-group">
        <Input
          {...props}
          label={
            <>
              <span>Mật khẩu đăng nhập</span>
              <Text color={THEME_SEMANTICS.failed}> *</Text>
              <Tooltip placement="bottom-start"
                       title={"Mật khẩu cần có độ dài ít nhất 06 ký tự. Tuy nhiên hãy luôn sử dụng mật khẩu mạnh để giữ an toàn cho thông tin đăng nhập của bạn"}
                       className={'user-management-tooltip__user-password'}
              >
                <span
                  style={{
                    marginLeft: 6,
                    display: 'inline-block',
                    transform: 'translateY(2px)',
                  }}
                >
                </span>
                <span className={"create-user-info__form-group-account--tooltip"}>{USER_ICON.question}</span>
              </Tooltip>
            </>
          }
          placeholder="Nhập mật khẩu đăng nhập"
          value={valueForm?.password}
          // maxLength={30}
          validateText={validate?.errorPassword?.status ? validate?.errorPassword?.message : null}
          validateType={!validate?.errorPassword?.status ? 'success' : 'danger'}
          type={typeInput.password}
          icon={typeInput.password === 'password' ? <i>{USER_PROFILE.not_eye}</i> : <i>{USER_PROFILE.eye}</i>}
          onChange={e => functions.onChangePassword(e.target.value)}
          onBlur={e => validate?.onBlurPassword(e.target.value)}
          onIconClick={() => functions.onChangeTypePassword()}
          autoComplete={'new-password'}
        />
      </div>
      <div className="create-user-info__form-group">
        <Input
          {...props}
          label={
            <>
              <span>Nhập lại mật khẩu</span>
              <Text color={THEME_SEMANTICS.failed}> *</Text>
            </>
          }
          placeholder="Nhập lại mật khẩu"
          value={valueForm?.confirmPassword}
          // maxLength={30}
          validateText={validate?.errorConfirmPassword?.status ? validate?.errorConfirmPassword?.message : null}
          validateType={!validate?.errorConfirmPassword?.status ? 'success' : 'danger'}
          type={typeInput.confirmPassword}
          icon={typeInput.confirmPassword === 'password' ? <i>{USER_PROFILE.not_eye}</i> : <i>{USER_PROFILE.eye}</i>}
          onChange={e => functions.onChangeConfirmPassword(e.target.value)}
          onBlur={e => validate?.onBlurConfirmPassword(e.target.value)}
          onIconClick={() => functions.onChangeTypeConfirmPassword()}
          autoComplete={'new-password'}
        />
      </div>
    </>
  )
}
export default UserAccount;