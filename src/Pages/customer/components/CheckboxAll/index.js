import {CustomerContext} from 'Pages/customer'
import {useContext, useEffect, useState} from 'react'
import './style.scss'

const CheckboxAll = ({allChecked, checkedLess, setAllChecked}) => {
  const {state, dispatch} = useContext(CustomerContext)
  const {selectedList, listCustomer} = state

  const handleCheckAll = event => {
    const checked = event.target.checked

    listCustomer.forEach(cus => {
      const existCusIndex = selectedList.findIndex(x => x.id === cus.id)

      if (existCusIndex > -1 && !checked) {
        selectedList.splice(existCusIndex, 1)
      }

      if (checked && existCusIndex <= -1) {
        selectedList.push(cus)
      }
    })

    dispatch({
      type: 'SET_SELECTED_LIST',
      payload: selectedList,
    })

    setAllChecked(checked)
  }

  return (
    <div className="checkbox-all">
      <input
        className={!checkedLess ? 'checked-less' : ''}
        type={'checkbox'}
        checked={allChecked}
        onChange={handleCheckAll}
      />
    </div>
  )
}

export default CheckboxAll
