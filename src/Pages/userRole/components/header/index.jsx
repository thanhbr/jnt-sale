import React from 'react';
import {USER_ROLE_BREADCRUMB, USER_ROLE_HEADER_ACTIONS} from "../../interfaces/~contants";
import {PageHeader} from "../../../../layouts/pageHeader";
import {useNavigate} from "react-router-dom";
import useTableBody from "../../hooks/useTableBody";
import styled from "styled-components";

const Index = () => {
  const { functions } = useTableBody()

  const navigate = useNavigate()
  const actions = [() => functions.handleRefresh(), () => navigate('/user-role/create')]
  return (
    <StyledUseRoleHeader>
      <div className={"user-role-header"}>
        <PageHeader
          actions={USER_ROLE_HEADER_ACTIONS.map((item, i) => ({
            ...item,
            onClick: actions[i],
          }))}
          breadcrumbLinks={USER_ROLE_BREADCRUMB}
          breadcrumbTitle={'Quản lý vai trò người dùng'}
        />
      </div>
    </StyledUseRoleHeader>
  );
};

const StyledUseRoleHeader = styled.div`
  .user-role-header {
    .page-header__actions {
      .page-header__action-item:nth-child(2) button {
        width: 157px;
        
        & .button__container {
          width: 141px;
        }
      } 
    }
  }
`
export default Index;