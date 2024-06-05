import { NotificationBar } from "common/notificationBar";
import { Text } from "common/text";
import { THEME_SEMANTICS } from "common/theme/_semantics";
import toast from "Component/Toast";
import { CustomToolTip } from "Component/tooltip/CustomTooltip";
import { USER_ICON } from "Pages/userManagement/icon/icon";
import { UserManagementContext } from "Pages/userManagement/provider/_context";
import { userManagementActions } from "Pages/userManagement/provider/_reducer";
import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";
const Index = () => {
  const {t} = useTranslation()
    const { pageState, pageDispatch } = useContext(UserManagementContext)
    let { password } = pageState.reset_password.data
    const [checkClick, setCheckClick] = useState(true)
    const handleCopyToClipboard = () => {
        if (checkClick) {
            setCheckClick(false)
            navigator.clipboard.writeText(password)
            toast.success({ title: t(DISPLAY_NAME_MENU.USER_PAGE.SUCCESS_COPY) })
            setTimeout(() => {
                setCheckClick(true)
            }, 2000);
        }

    }
    const close = () => {
        pageDispatch({ type: userManagementActions.GET_DATA_RESET_PASSWORD, payload: '' })
    }
    return (
        <>
            {pageState.reset_password.data !== '' && <StyledUserNotification>
                <div className={"user-management-notification"}>
                    <NotificationBar
                        type="success"
                        style={{ marginBottom: 8 }}
                        className='user-management-notification_content'
                        onClose={close}
                    >
                        Khôi phục mật khẩu thành công! Mật khẩu mới của tài khoản là:{'  '}
                        <CustomToolTip title="Sao chép" placement="top">
                            <Text
                                className="user-management-notification_save"
                                color={THEME_SEMANTICS.delivering}
                                style={{ cursor: 'pointer' }}
                                onClick={handleCopyToClipboard}
                            >
                                {password}
                                {USER_ICON.save}
                            </Text>
                        </CustomToolTip>


                    </NotificationBar>
                </div>
            </StyledUserNotification>}
        </>
    )
}
export default Index;
const StyledUserNotification = styled.div`
    .user-management-notification{
        margin-top: 2px;
        margin-bottom: 16px;
        height:40px;
        
        &_content{
            display:flex;
            align-item:center;
            height: 40px;
            svg{
                height:23px !important;
                width:23px !important;
            }
            padding: 8px 12px;
        }
        &_save{
            svg{
                margin-left:5px;
                height:16px !important;
                width:16px !important;
                path{
                    stroke: ${THEME_SEMANTICS.delivering}
                }
            }
        }
        .notification-bar__delete-btn{
            top:16px
        }
    }
`