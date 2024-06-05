import { Unit } from 'Pages/UnitsManage'
import { ActionType } from 'Pages/UnitsManage/store/action'
import {useContext, useEffect, useState} from 'react'
import './style.scss'

const CheckboxAll = ({allChecked, checkedLess, setAllChecked}) => {
  const {state, dispatch} = useContext(Unit)
  const {isCheck, list} = state

  const empty = list.length <= 0

  const handleCheckAll = event => {
    let checked = event.target.checked

    list.forEach(item => {
      const existCusIndex = isCheck.findIndex(x => x === item.id)

      if (existCusIndex > -1 && !checked) {
        isCheck.splice(existCusIndex, 1)
      }

      if (checked && existCusIndex <= -1) {
        isCheck.push(item.id)
      }
    })
    
    dispatch({type: ActionType.IS_CHECK, payload: isCheck})

    setAllChecked(checked)
  }

  return (
    <div className="checkbox-all">
      <input
        className={(!checkedLess ? 'checked-less' : '') + (empty ? ' disabled' : '')}
        type={'checkbox'}
        checked={allChecked}
        onChange={handleCheckAll}
      />
    </div>
  )
}

export default CheckboxAll
