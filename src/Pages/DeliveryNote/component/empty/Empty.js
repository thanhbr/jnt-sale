import React, { useContext, useReducer } from 'react'
import "./Empty.scss"
import { TableCell, TableBody, TableRow } from "@material-ui/core"
import empty from "../../image/Empty state.png"
import { SETTING } from 'Component/Icons'
import { Button } from 'common/button'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ActionType } from 'Pages/DeliveryNote/store/action'
import { Delivery } from 'Pages/DeliveryNote'
import { SEARCH } from 'Pages/DeliveryNote/SCRIPT_NOTE'
export default function Empty({ ...props }) {
  const { state, dispatch } = useContext(Delivery)
  return (
    <Td className='empty__delivery_table'>
      <Tr className='empty__delivery'>
        <img src={empty} />
        {state.valueSearch ?
          <p className='empty__delivery-title'>{SEARCH.TITLE}</p>
          :
          <>
            <p className='empty__delivery-title'>{state.emptyTitle}</p>
            <Button appearance="primary" onClick={() => dispatch({ type: ActionType.OPEN_MODAL, payload: true })} icon={SETTING.emptyIcon} className='empty__delivery-create'>Thêm mẫu ghi chú</Button>
          </>
        }

      </Tr>
    </Td>

  )
}
