import React, {memo, useEffect} from 'react';

import Header from "./components/header"
import {UserFilter} from "./components/filter"
import useUserManagement from "./hooks/useUserManagement";
import {UserManagementProvider} from "./provider";
import {StyledUserManagement} from "./components/~styled"
import {TableLayout} from "../../layouts/tableLayout";
import TableHeader from "./components/table/tableHeader/index"
import TableBody from "./components/table/tableBody/index"
import Modal from "./components/confirm/"
import Notification from "./components/userNotification/index"
import {ModalUserManagement} from "./components/modal";
import {ModalUserManagementDetail} from "./components/modal/userInfo";
import {ModalUserManagementPassword} from "./components/modal/userPassword";

export const UserPage = memo(() => {
  const {fetch ,provider,handlePaginationAmountChange,handlePaginationPageChange} = useUserManagement()
  const {state, dispatch} = provider

  useEffect(() => {
    fetch.userManagement()
  }, [])
  
  return (
    <UserManagementProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <StyledUserManagement>
        <Header />
        <Notification/>
        <TableLayout
          header={
            <UserFilter />
          }
          table={{
            tHead: <TableHeader />,
            tBody: <TableBody />,
          }}
          pagination={{
            ...state.paginate,
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange
          }}
        />
        {state.open_confirm.open && <Modal/>}
        {state.openModalUserInfo && <ModalUserManagementDetail />}
        {state.modalUserInfo && <ModalUserManagement />}
        {state.openModalUserPass && <ModalUserManagementPassword />}
        
      </StyledUserManagement>
    </UserManagementProvider>
  )
})