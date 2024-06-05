import { Button } from "common/button";
import { Text } from "common/text";
import CheckBoxConsignment from "Component/CheckBoxConsignment/CheckBoxConsignment";
import useGlobalContext from "containerContext/storeContext";
import { Td } from "layouts/tableLayout/_td";
import { Tr } from "layouts/tableLayout/_tr";
import { ORDER_ICONS } from "Pages/refactorOrder/interfaces/_icons";
import { useTableBody } from "Pages/userManagement/hooks/useTableBody";
import { TABLE_HEADER } from "Pages/userManagement/interfaces/~contants";
import { UserManagementContext } from "Pages/userManagement/provider/_context";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./index.scss"
import { StyledUserTableHeader } from "./~styled";
const Index = () => {
  const { pageState, pageDispatch } = useContext(UserManagementContext)
  const [open, setOpen] = useState(false)
  const [GlobalState,] = useGlobalContext()
  const [disabled,setDisabled] =useState(false)
  const userIdGlobal = GlobalState.user.user_id
  const list = TABLE_HEADER
  const { checkAll,
    isCheckAll,
    handleActive,
    shouldActiveCheckbox
  } = useTableBody()
  const show = () => {
    return list?.map((item, index) => {
      return (
        <Td key={index} className={`user-managment-table_header-` + item.class + ` user-managment-table_header-height`} >
          <Text fontWeight={600}>
            {item.name}
          </Text>
        </Td>
      )
    })
  }
  const checkFullPageChecked = () => {
    let checkFullPage = true
    pageState.listUser?.forEach(item => {
      const findItem = pageState.isCheck?.find(find => find === item.user_id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }
 
useEffect(()=>{
  const numb = pageState.listUser?.length
  if(numb == 1) setDisabled(true)
},[pageState.listUser])
  return (
    <StyledUserTableHeader>
      <div className={'user-managment-table_header'}>
        <Tr type="tHead">
          <Td className="user-managment-table_header-checkbox user-managment-table_header-height">
            <CheckBoxConsignment
              minus={!checkFullPageChecked()}
              isChecked={shouldActiveCheckbox}
              handleClick={checkAll} />
          </Td>
          {pageState.isCheck.length === 0 ?
            <>
              {show()}
            </>
            : <Td className="user-managment-table_header__cell" data-selected="true" data-type="th">
              <Text as="b">
                {pageState.isCheck.length < 10 && pageState.isCheck?.find(find => find === userIdGlobal) === userIdGlobal
                  ? `0${pageState.isCheck.length -1}`
                  : pageState.isCheck?.find(find => find === userIdGlobal) === userIdGlobal
                    ? pageState.isCheck.length - 1
                    : pageState.isCheck.length}{' '}
                người dùng được chọn
              </Text>
              <div className="user-managment-table_header__selected-action-dropdown">
                <Button
                  className="user-managment-table_header__selected-action-toggle"
                  size="xs"
                  onClick={() => setOpen(true)}
                >
                  Thao tác {ORDER_ICONS.caretRight}
                </Button>
                {open && (
                  <>
                    <div
                      className="user-managment-table_header__selected-action-backdrop"
                      onClick={() => setOpen(false)}
                    ></div>
                    <ul className="user-managment-table_header__selected-action-menu common-popover">
                      <li
                        className="user-managment-table_header__selected-action-menu-item"
                        onClick={() => {
                          setOpen(false)
                          handleActive({ id: pageState.isCheck, status: 1 })
                        }}
                      >
                        Kích hoạt
                      </li>
                      <li
                        className="user-managment-table_header__selected-action-menu-item"
                        onClick={() => {
                          setOpen(false)
                          handleActive({ id: pageState.isCheck, status: 2 })
                        }}
                      >
                        Ngưng kích hoạt
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </Td>
          }

        </Tr>
      </div>
    </StyledUserTableHeader>

  )
}
export default Index;