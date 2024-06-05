import React from 'react';
import {PageHeader} from "../../../layouts/pageHeader";
import {GridLayout} from "../../../layouts/gridLayout";
import {CREATE_USER_CONSTANTS} from "../interfaces/~contants";
import {Tooltip} from "../../../common/tooltip";
import {USER_ICON} from "../icon/icon";
import UserInfor from "./section/userInfor";
import UserRole from "./section/userRole";
import UserAccount from "./section/userAccount";
import useUserManagement from "../hooks/useUserManagement";
import {UserManagementProvider} from "../provider";
import {ActionFormBtnList} from "./section/actionFormBtnList";
import {StyledCreateUseManagement} from "../components/~styled";


export const CreateUser = () => {
  const {provider} = useUserManagement()
  const {state, dispatch} = provider
  return (
    <UserManagementProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <PageUserSingle />
    </UserManagementProvider>
  )
}

export const PageUserSingle = ({...props}) => {
  return (
    <StyledCreateUseManagement>
      <GridLayout
        {...props}
        header={
          <PageHeader
            breadcrumbLinks={CREATE_USER_CONSTANTS.header.breadcrumb}
            breadcrumbTitle={"Quản lý người dùng"}
          />
        }
        grid={[
          {
            width: 70,
            sections: [
              {
                title: (<>
                  <span>Thông tin người dùng</span>
                  <Tooltip placement="bottom-start" title={"Thông tin chi tiết của nhân viên để phục vụ cho việc quản lý"} className={'user-management-tooltip__user-info'}>
                          <span
                            style={{
                              marginLeft: 6,
                              display: 'inline-block',
                              transform: 'translateY(2px)',
                            }}
                          >
                            {USER_ICON.question}
                          </span>
                  </Tooltip>
                </>),
                props: {
                  style: {position: 'relative'},
                  children: <UserInfor />,
                },
              },
              {
                title: (<>
                  <span>Vai trò người dùng</span>
                  <Tooltip placement="bottom-start" title={"Cho phép phân quyền vai trò nhân viên theo vai trò của người dùng đã thiết lập"} className={'user-management-tooltip__user-role'}>
                          <span
                            style={{
                              marginLeft: 6,
                              display: 'inline-block',
                              transform: 'translateY(2px)',
                            }}
                          >
                            {USER_ICON.question}
                          </span>
                  </Tooltip>
                </>),
                props: {
                  style: {position: 'relative'},
                  children: <UserRole />,
                },
              },
              {
                type: 'sticky-bottom-transparent',
                props: {
                  style: {
                    position: 'sticky',
                    bottom: -44,
                    marginBottom: 0,
                    zIndex: 999,
                    padding: "12px 24px 0 12px"
                  },
                  children: <ActionFormBtnList />,
                },
              },
            ],
            props: {style: {position: 'relative'}},
          },
          {
            width: 30,
            sections: [{
              title: 'Thông tin tài khoản',
              props: {
                children: <UserAccount />,
              },
            },],

            props: {
              style: {
                position: 'sticky',
                top: 39,
              },
            }
          },
        ]}
        data-model="container"
      />
    </StyledCreateUseManagement>
  );
}