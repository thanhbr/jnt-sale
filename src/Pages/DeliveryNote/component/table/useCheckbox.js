import { postData } from 'api/api'
import { active_note } from 'api/url'
import toast from 'Component/Toast'
import { Delivery } from 'Pages/DeliveryNote'
import { ALERT_NOTE } from 'Pages/DeliveryNote/SCRIPT_NOTE'
import { ActionType } from 'Pages/DeliveryNote/store/action'
import { useContext, useEffect, useState } from 'react'

export const useCheckBox = () => {
  const { state, dispatch } = useContext(Delivery)
  const list = state.listNote
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIschekcAll] = useState(false)
  const [disable,setDisabled] = useState(false)
  useEffect(()=>{
    setIsActive({...isActive,...state.is_active})
  },[state.is_active])
  const setActive = async data => {
    try {
      const res = await postData(active_note(), data)
      if (res.data.code === 6042) toast.success({ title: ALERT_NOTE.ACTIVE_STATUS })
      else toast.success({ title: ALERT_NOTE.DEACTIVE_NOTE })
    } catch (er) {
      console.log(er)
    }
  }
  const shouldActiveCheckbox = state.isCheck?.length > 0

  const isActiveAll =
      list.length <= 0
          ? false
          : state.isCheck?.length < list.length
          ? false
          : !!!list.find(
              item => !!!state.isCheck?.find(find => find === item?.id),
          )
  const checkAll = () => {
    let newSelectedList = []
    if (isActiveAll)
      newSelectedList = state.isCheck?.filter(
          item => !!!list.find(find => find?.id === item),
      )
    else {
      let addingList = []
      list.forEach(item => {
        if (!!!state.isCheck?.find(find => find === item?.id))
          addingList.push(item?.id)
      })
      newSelectedList = [...state.isCheck, ...addingList]
    }
    dispatch({
      type: ActionType.IS_CHECK,
      payload: newSelectedList ,
    })
    const id_default = newSelectedList.find(item=> item == state.id_default)
    if(id_default !== undefined){
      dispatch({type:ActionType.COUNT,payload:newSelectedList.length-1})
    }
    else {
      dispatch({type:ActionType.COUNT,payload:newSelectedList.length})
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
  const changeStatus = e => {
    setDisabled(true)
    let { checked, id } = e.target
    setIsActive({ ...isActive, [id]: checked })
    setActive({ id: [id], status: checked ? 1 : -1 })
    setTimeout(()=>{
      setDisabled(false)
    },2000)
  }
  const handleActive=async(data)=>{
    let ArrTemp = []
    const defaultCheck = list.find(item=>item.is_default == 1)
    data?.id.map(item => {
      if(item !== defaultCheck?.id)  ArrTemp = { ...ArrTemp, [item]: data.status }
    })
    try{
      const res = await postData(active_note(),data)
      if(res.data.code === 6042) {
        toast.success({title:ALERT_NOTE.ACTIVE_STATUS})
        dispatch({type:ActionType.IS_CHECK,payload:[]})
        dispatch({type:ActionType.IS_ACTIVE,payload:ArrTemp})
      }else {
        toast.success({title:ALERT_NOTE.DEACTIVE_NOTE})
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
    disable,
    shouldActiveCheckbox,
  }
}
