import React, {useContext} from 'react'
import './Empty.scss'
import empty from '../../image/Empty state.png'
import {SETTING} from 'Component/Icons'
import {Button} from 'common/button'
import {ActionType} from 'Pages/UnitsManage/store/action'
import {Unit} from 'Pages/UnitsManage'
import {SEARCH} from 'Pages/UnitsManage/SCRIPT_UNIT'
import { StyledUnitEmpty } from './_style'
import { Text } from 'common/text'
export default function Empty({...props}) {
  const {state, dispatch} = useContext(Unit)

  return (
    <StyledUnitEmpty {...props}>
      <img src={empty} />
      {!state.check_search ? (
        <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>{SEARCH.TITLE}</Text>
      ) : (
        <>
          <Text as="b" color="#7C88A6" style={{marginBottom: 16}}>{state.emptyTitle}</Text>
          <Button
            appearance="primary"
            onClick={() =>
              dispatch({type: ActionType.OPEN_MODAL, payload: true})
            }
            icon={SETTING.emptyIcon}
            className="empty__unit-create"
          >
            Tạo mới đơn vị tính
          </Button>
        </>
      )}
    </StyledUnitEmpty>
  )
}
