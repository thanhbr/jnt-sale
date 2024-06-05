import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr"
import {Td} from "../../../../layouts/tableLayout/_td"
import styled from "styled-components";

const TableHeader = () => {
  return (
    <StyledUseRoleTableHeader>
      <div className={'user-role-table_header'}>
        <Tr type="tHead">
          <Td className={"user-role-table__header-no"}>
            <p>STT</p>
          </Td>
          <Td className={"user-role-table__header-name"}>
            <p>Vai trò người dùng</p>
          </Td>
          <Td className={"user-role-table__header-permission"}>
            <p>Toàn quyền quản trị</p>
          </Td>
          <Td className={"user-role-table__header-total-user"}>
            <p>SL người dùng</p>
          </Td>
          <Td className={"user-role-table__header-comment"}>
            <p>Ghi chú</p>
          </Td>
          <Td className={"user-role-table__header-cell"}>
          </Td>
        </Tr>
      </div>
    </StyledUseRoleTableHeader>
  );
};

const StyledUseRoleTableHeader = styled.div`
  .user-role-table__header {
    &-no {
      font-weight: 600;
      width: 3.5rem;
      margin-left: 4px;
      min-height: 44px;
    }
    &-name {
      font-weight: 600;
      width: 17.625rem;
      min-height: 44px;
    }
    &-permission{
      font-weight: 600;
      width: 10.375rem;
      min-height: 44px;
    }
    &-total-user {
      font-weight: 600;
      width: 11.25rem;
      display: flex;
      justify-content: center;
      min-height: 44px;
    }
    &-comment {
      font-weight: 600;
      width: 53.125rem;
      flex: 1 1 0%;
      min-height: 44px;
    }
    &-cell {
      min-height: 44px;
    }
  }
`

export default TableHeader;