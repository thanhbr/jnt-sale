import {postData} from 'api/api'
import {active_unit} from 'api/url'
import toast from 'Component/Toast'
import useAlert from 'hook/useAlert'
import {Unit} from 'Pages/UnitsManage'
import { useUnit } from 'Pages/UnitsManage/hooks/useUnit'
import {ALERT_UNIT} from 'Pages/UnitsManage/SCRIPT_UNIT'
import {ActionType} from 'Pages/UnitsManage/store/action'
import {useContext, useEffect, useState} from 'react'

export const useCheckBox = () => {
  const {state, dispatch} = useContext(Unit)
  const {isCheck, list} = state
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [isCheckAll, setIschekcAll] = useState(false)
  const [disable, setDisabled] = useState(false)
  const {showAlert} = useAlert()
  const { fetchList } = useUnit()
  
  useEffect(() => {
    // setIsActive(state.is_active)
  }, [state.is_active])
  
  const setActive = async data => {
    try {
      const res = await postData(active_unit(), data)
      if (res.data.success) {
        if (data.status === 1) showAlert({content: ALERT_UNIT.ACTIVE_STATUS, type: 'success', duration: 2000})
        else showAlert({content: ALERT_UNIT.DEACTIVE_UNIT, type: 'success', duration: 2000})
      }
    } catch (er) {
      console.log(er)
    }
  }

  const checkedLess = (() => {
    if (isCheck?.length <= 0) return true

    let checkFullPage = true
    list.forEach(item => {
      const findItem = isCheck.find(find => find === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  })()

  const checkAll = (event) => {
    let checked = event.target.checked
    // if (checkedLess()) checked = true

    list.forEach(item => {
      const existCusIndex = isCheck.findIndex(x => x === item.id)

      if (existCusIndex > -1 && !checked) {
        isCheck.splice(existCusIndex, 1)
      }

      if (checked && existCusIndex <= -1) {
        isCheck.push(item.id)
      }
    })

    setIschekcAll(checked)
    dispatch({type: ActionType.IS_CHECK, payload: isCheck})
  }

  useEffect(() => {
    if (isCheck.length <= 0) { 
      setIschekcAll(false)
      return
    }

    let checkFullPage = true
    list.forEach(item => {
      const findItem = isCheck.find(find => find === item.id)
      if (!findItem) checkFullPage = false
    })
    setIschekcAll(checkFullPage)
  }, [isCheck.length, list])
  
  const is_check = id => {
    let isCheck = state.isCheck
    let check = isCheck.find(item => item === id)
    if (check !== undefined) {
      dispatch({
        type: ActionType.IS_CHECK,
        payload: isCheck.filter(item => item !== id),
      })
      dispatch({type: ActionType.COUNT, payload: state.count - 1})
    } else {
      dispatch({type: ActionType.COUNT, payload: state.count + 1})
      setIschekcAll(true)
      dispatch({type: ActionType.IS_CHECK, payload: [...isCheck, id]})
    }
  }
  const changeStatus = e => {
    setDisabled(true)
    let {checked, id} = e.target
    setIsActive({...isActive, [id]: checked})
    setActive({id: [id], status: checked ? 1 : -1})
    setDisabled(false)
  }
  const handleActive = async data => {
    let ArrTemp = []
    data?.id.map(item => {
      ArrTemp = {...ArrTemp, [item]: data.status}
    })
    
    try {
      const res = await postData(active_unit(), data)
      if (res.data.success) {
        if (data.status === 1) showAlert({content: ALERT_UNIT.ACTIVE_STATUS, type: 'success', duration: 2000})
        else showAlert({content: ALERT_UNIT.DEACTIVE_UNIT, type: 'success', duration: 2000})
        
        dispatch({type: ActionType.IS_CHECK, payload: []})
        dispatch({type: ActionType.IS_ACTIVE, payload: ArrTemp})
        
        fetchList()
      } 
    } catch (er) {
      console.log(er)
    }
  }
  return {
    changeStatus,
    isActive,
    isCheckAll,
    setIschekcAll,
    checkedLess,
    checkAll,
    count,
    is_check,
    handleActive,
    disable,
  }
}
