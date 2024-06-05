import React, { useContext, useEffect, useState } from "react";
import { UserManagementContext } from "Pages/userManagement/provider/_context";
import { StyledUserTableBody } from "./_styled";
import { Tr } from "layouts/tableLayout/_tr";
import { Td } from "layouts/tableLayout/_td";
import CheckBoxConsignment from "Component/CheckBoxConsignment/CheckBoxConsignment";
import Row from "./row"
import { SwitchStatus } from "Component/SwitchStatus/SwitchStatus";
import { Text } from "common/text";
import { Tooltip } from "common/tooltipv2";
import { Tooltip as Tooltipv1 } from "../../../../../common/tooltip";
import RowOrderExtra from "./TabDetail"
import { useDetailRow } from "Pages/userManagement/hooks/useDetailRow";
import { useTableBody } from "Pages/userManagement/hooks/useTableBody";
import Skeleton from "../../skeleton/index"
import { userManagementActions } from "Pages/userManagement/provider/_reducer";
import useGlobalContext from "containerContext/storeContext";
import Empty from "../../empty/index"
import { useCheckBoxTable } from "Pages/userManagement/hooks/useCheckBoxTableBody";
import {PAYMENT_METHOD_ICONS} from "../../../../paymentsMethod/interfaces/~icon";

const Index = () => {
  const { pageState, pageDispatch } = useContext(UserManagementContext)
  const [GlobalState,] = useGlobalContext()
  const userIdGlobal = GlobalState.user.user_id
  const [list, setList] = useState()
  const [useId, setUseId] = useState()
  const { changeStatus,
    isActive,
    disable } = useTableBody()
    const {is_check} = useCheckBoxTable()
  useEffect(() => {
    setList(pageState.listUser)
  }, [pageState.listUser])
  const [isTableHover, setIsTableHover] = useState(-1)

  const detailRow = useDetailRow(useId)
  const { detailActive, shouldOpenDetail, rowDetailToggle } = detailRow
  let check = pageState.isCheck
  let load = pageState.loading
  const handleActionApply = action => {
    switch (action) {
      case 1:
        pageDispatch({ type: userManagementActions.MODAL_USER_INFOR, payload: true })
        break
      case 2:
        pageDispatch({ type: userManagementActions.OPEN_CONFIRM, payload: { open: true, id_confirm: 2 } })
        break
      case 3:
        pageDispatch({ type: userManagementActions.MODAL_USER_PASS, payload: true })
        break
      case 4:
        pageDispatch({ type: userManagementActions.MODAL_USER_ROLE, payload: true })
        break
      default:
        break
    }
  }

  const show = () => {
    if (load && list.length > 0) return list?.map(item => {
      return (
        <>
          <Tr key={item.user_id} className='user-management-table_body-row'
            onMouseEnter={() => setIsTableHover(item.user_id)}
            onMouseLeave={() => setIsTableHover()}
            extra={
              shouldOpenDetail && item.user_id === useId && <RowOrderExtra
                active={shouldOpenDetail}
                data={detailActive}
                rowData={detailRow}
              />
            }
            data-active={shouldOpenDetail && item.user_id === useId}
            onClick={() => {
              setUseId(item.user_id)
              rowDetailToggle(item.user_id)
            }}
          >
            <Td className='user-management-table_body-checkbox' onClick={e => e.stopPropagation()}>
              <CheckBoxConsignment
                isChecked={item.user_id == userIdGlobal? false : check.includes(item.user_id)}
                handleClick={(e) => {
                  e.stopPropagation()
                  is_check(item.user_id)
                }}
                disable={userIdGlobal === item.user_id}
              />
            </Td>
            <Td className='user-management-table_body-fullname'>
              <Tooltip placement='top-center' title={item.fullname} baseOn="height" className='tooltipv2'>
                <Text>{item.fullname}</Text>
              </Tooltip>
              {+item?.is_shop_manage === 1 && (
                <>
                  <Tooltipv1 placement="bottom-start" className={'tt-user-manager--default'}
                           title={<div style={{fontSize: 12}}>Đây là tài khoản Chủ shop, tài khoản có quyền quản trị <br/> cao nhất nên bạn sẽ không thể tác động được vào tình <br/> trạng hoạt động & quyền hạn của tài khoản</div>}>
                    <span
                      style={{
                        marginLeft: 6,
                        display: 'inline-block',
                        transform: 'translateY(2px)',
                      }}
                    >{PAYMENT_METHOD_ICONS.tickAdmin}</span>
                  </Tooltipv1>
                </>
              )}
            </Td>
            <Td className='user-management-table_body-phone'>
              <Text>
                {item.phone}
              </Text>
            </Td>
            <Td className='user-management-table_body-email'>
              <Tooltip placement='top-center'  title={item.email}  baseOn="width" className='tooltip_email'>
                <Text>
                  {item.email}
                </Text>
              </Tooltip>
            </Td>
            <Td className='user-management-table_body-managment'>
              <Tooltip placement='top-center' title={item.groups_list.map((role, index) => (
                <>{role.group_name}{index !== item.groups_list.length - 1 && ', '}</>
              ))} baseOn="height" className='tooltipv2'>
                {item.groups_list.map((role, index) => (
                  <Text>{role.group_name}{index !== item.groups_list.length - 1 && ', '}</Text>
                ))}
              </Tooltip>
            </Td>
            <Td className='user-management-table_body-status'>
              <div
                className={(userIdGlobal === item.user_id || +item?.is_shop_manage === 1) ? "switch-status switch-opacity" : "switch-status"}
                onClick={e=>e.stopPropagation()}
              >
                <SwitchStatus
                  disabled={(userIdGlobal === item.user_id || +item?.is_shop_manage === 1) ? true : pageState.disable_button}
                  id={item.user_id}
                  status={isActive[item.user_id] === undefined ? item.status : isActive[item.user_id]}
                  handleChange={changeStatus}
                />
              </div>

            </Td>
            {(+item?.user_id === +userIdGlobal) || (+item?.is_shop_manage !== 1) ? (
              <Td className='user-management-table_body-setting' onClick={e => {
                  e.stopPropagation()
                  setUseId(item.user_id)
                }}>
                  {isTableHover === item.user_id && <div className="settingShow">
                    <div className="user-management-table_body-toggle"
                         data-active={shouldOpenDetail && item.user_id === useId}
                         onClick={() => {
                           setUseId(item.user_id)
                           rowDetailToggle(item.user_id)
                         }}
                         onMouseEnter={() => setIsTableHover(item.user_id)}
                    >
                      <img src={'/svg/arrow.svg'} alt={'arrow'} />
                    </div>
                </div>}
                  <Row
                    dataRow={item}
                    id_user={item.user_id}
                    onActionClick={handleActionApply}
                    isTableHover={isTableHover}
                  />
                </Td>
              ) : (
                <Td className='user-management-table_body-setting'> </Td>
              )}
          </Tr>
        </>

      )
    })
    else if (!load) return <Skeleton numb={20} />
    else return <Empty />
  }
  return (
    <StyledUserTableBody>
      <div className={'user-management-table_body'}>
        {show()}
      </div>
    </StyledUserTableBody>
  )
}
export default Index;