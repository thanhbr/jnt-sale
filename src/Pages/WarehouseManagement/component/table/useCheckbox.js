import { postData } from 'api/api'
import { active_unit, getUrlWarehouseManagerActive } from 'api/url'
import toast from 'Component/Toast'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { ALERT_WAREHOUSE_MANAGER } from '../../SCRIPT_WAREHOUSE'
import { ActionType } from '../../store/action'
import { useContext, useEffect, useState } from 'react'
import useAlert from 'hook/useAlert'
import { useWarehouse } from 'Pages/WarehouseManagement/hooks/useUnit'

export const useCheckBox = () => {
  const { state, dispatch } = useContext(WarehouseManager)
  const { fetchList } = useWarehouse()
  const list = state.list
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIschekcAll] = useState(false)
  const [disable,setDisabled] = useState(false)
  const {showAlert} = useAlert()

  useEffect(()=>{
    setIschekcAll(false)
    dispatch({type:ActionType.IS_CHECK,payload:[]})
  },[state.isCheckAll])

  const setActive = async data => {
    try {
      const res = await postData(getUrlWarehouseManagerActive(), data)
      toast.success({ title: res.data?.message })
      fetchList()
    } catch (er) {
      showAlert({type: 'danger', content: er.message})
      console.log(er)
    }
    dispatch({type: ActionType.IS_LOADING, payload: true})
  }
  const checkAll = () => {
    setIschekcAll(!isCheckAll)
    let arrayId=[]
    let findDefault = list.find(item => {
      if (item.is_default == 1 ) {
        return item
      }
    })
    if(findDefault !== undefined){
     arrayId = list.filter(item => {
        if (item.id !== findDefault.id && findDefault !== undefined) {
          return item
        }
      })
    }else{
      arrayId = list.filter(item => {
          return item.id
      })
    }
    dispatch({type:ActionType.IS_CHECK,payload:arrayId.map(item=>item.id)})
    if (isCheckAll) {
      dispatch({type:ActionType.IS_CHECK,payload:[]})
      dispatch({type:ActionType.COUNT,payload:0})
    } else {
      dispatch({type:ActionType.COUNT,payload:arrayId.length})
    }
  }
  const is_check=(id)=>{
    let isCheck=state.isCheck
    let check = isCheck.find(item => item === id)
    if (check !== undefined) {
      dispatch({type:ActionType.IS_CHECK,payload:isCheck.filter(item=>item !== id)})
      dispatch({type:ActionType.COUNT,payload:state.count-1})
      
    } else {
      dispatch({type:ActionType.COUNT,payload:state.count+1})
      setIschekcAll(true)
      dispatch({type:ActionType.IS_CHECK,payload:[...isCheck, id]})
    }
  }
  const changeStatus = data => {
    const { checked, id } = data
    setIsActive({ ...isActive, [id]: checked })
    setActive({ id: [id], status: checked ? 1 : 0 })
    setTimeout(()=>{
      setDisabled(false)
    },2000)
  }
  const handleActive=async(data)=>{
    let ArrTemp = []
    data?.id.map(item => {
      ArrTemp = { ...ArrTemp, [item]: data.status }
    })
    try{
      const res = await postData(active_unit(),data)
      if(res.data.code === 6042) {
        toast.success({title:ALERT_WAREHOUSE_MANAGER.ACTIVE_STATUS})
        dispatch({type:ActionType.IS_CHECK,payload:[]})
        dispatch({type:ActionType.IS_ACTIVE,payload:ArrTemp})
      }else {
        toast.success({title:ALERT_WAREHOUSE_MANAGER.DEACTIVE_UNIT})
        dispatch({type:ActionType.IS_CHECK,payload:[]})
        dispatch({type:ActionType.IS_ACTIVE,payload:ArrTemp})
      }
     
    }catch (er){
      console.log(er);
    }
  }
  return {
    changeStatus,
    isActive,
    isCheckAll,
    checkAll,
    count,
    is_check,
    handleActive,
    disable
  }
}
