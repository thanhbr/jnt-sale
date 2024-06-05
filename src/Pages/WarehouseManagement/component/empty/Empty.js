import React, { useContext, useReducer } from 'react'
import "./Empty.scss"
import { TableCell, TableBody, TableRow } from "@material-ui/core"
import empty from "../../image/Empty state.png"
import { SETTING } from 'Component/Icons'
import { Button } from 'common/button'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ActionType } from '../../store/action'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { SEARCH } from '../../SCRIPT_WAREHOUSE'
export default function Empty({ ...props }) {
  const { state, dispatch } = useContext(WarehouseManager)
  return (
    <Td className='empty__warehouse-manager_table'>
      <Tr className='empty__warehouse-manager'>
        <img src={empty} />
        {state.check_search ?
          <p className='empty__warehouse-manager-title'>{SEARCH.TITLE}</p>
          :
          <>
            <p className='empty__warehouse-manager-title'>{state.emptyTitle}</p>
            <Button appearance="primary" onClick={() => dispatch({ type: ActionType.OPEN_MODAL, payload: true })} icon={SETTING.emptyIcon} className='empty__warehouse-manager-create'>Tạo mới kho</Button>
          </>
        }
      </Tr>
    </Td>
  )
}
