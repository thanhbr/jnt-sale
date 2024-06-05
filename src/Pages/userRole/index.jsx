import React, {memo, useEffect} from 'react';
import Header from "./components/header";
import useUserRole from "./hooks/useUserRole";
import {UserRoleProvider} from "./provider/index"
import TableHeader from "./components/table/tableHeader";
import {TableLayout} from "../../layouts/tableLayout";
import TableBody from "./components/table/tableBody";
import styled from "styled-components";
import {ConfirmModal} from "../../layouts/rightSightPopup/confirm";

export const UserRole = memo(() => {
  const {provider, fetch, handlePaginationAmountChange, handlePaginationPageChange, functions} = useUserRole()
  const {state, dispatch} = provider

  useEffect(() => {
    fetch.userRoleList()
  }, [])

  return (
    <UserRoleProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <StyledUserRole>
        <Header />
        <TableLayout
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
        {state.openModalConfirmDelete && (
          <>
            <ConfirmModal
              openModal={true}
              header={<p style={{fontWeight: '600', fontSize: '20px', marginBottom: '24px'}}>Xóa vai trò người dùng</p>}
              body={<p style={{fontWeight: '400', fontSize: '14px', marginBottom: '32px'}}>Vai trò người dùng sau khi xoá sẽ không thể khôi phục, bạn có chắc chắn muốn xoá không?</p>}
              footer={
                {
                  cancel: {
                    title: 'Huỷ'
                  },
                  acceptance: {
                    title: 'Xóa'
                  },
                }
              }
              footerProps= {{
                className : 'create-user-role__modal-confirm-delete-list-btn'
              }}
              stylePopup={'create-user-role__modal-confirm-delete'}
              closeModal={() => functions.closeModalRoleConfirmDelete()}
              acceptance={() => functions.acceptanceModalRoleConfirmDelete()}
            />
          </>
        )}
      </StyledUserRole>
    </UserRoleProvider>
  )
})

const StyledUserRole = styled.div`
`