import React, {useContext} from 'react';
import {UserRoleContext} from "../../provider/~context";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Text} from "../../../../common/text";
import Row from "./row";
import styled from "styled-components";
import Skeleton from "../skeleton/index";

const TableBody = () => {
  const { pageState,  } = useContext(UserRoleContext)

  const show = () => {
    if(!pageState?.loading && pageState?.userRoleList?.length > 0 ) {
      return pageState?.userRoleList?.map((item, index) => {
        return (
          <StyledUseRoleTableBody key={item?.id}>
            <Tr className={`user-role-table__body-row`}>
              <Td className='user-role-table__body-no'>
                <Text>{index+1}</Text>
              </Td>
              <Td className='user-role-table__body-name'>
                <Text>{item.group_name}</Text>
              </Td>
              <Td className='user-role-table__body-permission'>
                <Text>{item.is_full_permission}</Text>
              </Td>
              <Td className='user-role-table__body-total-user'>
                <Text>{item.total_user}</Text>
              </Td>
              <Td className='user-role-table__body-comment'>
                <Text>{item.group_comment}</Text>
              </Td>
              <Td
                className={"user-role-table__body-cell"}
                data-menu="true"
                data-type="td"
                onClick={e => e.stopPropagation()}
              >
                <Row
                  dataRow={item}
                  index={index}
                />
              </Td>
            </Tr>
          </StyledUseRoleTableBody>
        )
      })
    }
    else return <Skeleton numb={20} />
  }
  return (
    <>
      <div>
        {show()}
      </div>
    </>
  );
};

const StyledUseRoleTableBody = styled.div`
  .user-role-table__body {
    &-no {
      width: 3rem;
      margin-left: 14px;
    }
    &-name {
      width: 17.625rem;
    }
    &-permission{
      width: 10.375rem;
    }
    &-total-user {
      width: 11.25rem;
      display: flex;
      justify-content: center;
    }
    &-comment {
      width: 53.125rem;
      flex: 1 1 0%;
    }
    &-cell {
      margin-right: 12px;
      i {
        width: 20px;
        text-align: center;
      }
    }
  }
`

export default TableBody;