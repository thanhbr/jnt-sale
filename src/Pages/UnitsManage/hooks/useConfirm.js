import { useContext } from "react"
import { Unit } from "Pages/UnitsManage"
import { ActionType } from "../store/action"

export const useConfirm=()=>{
    const {state,dispatch} = useContext(Unit)
    const handleCloseConfirm=()=>{
        dispatch({type:ActionType.OPEN_CONFIRM,payload:false})
        dispatch({type:ActionType.CHECK_CONFIRM,payload:true})
    }
    const handleClosePopup=()=>{
        dispatch({type:ActionType.OPEN_CONFIRM,payload:false})
        dispatch({type:ActionType.OPEN_MODAL,payload:false})
        dispatch({type:ActionType.DISABLE_SAVE,payload:false})
        dispatch({type:ActionType.INFO_UNIT,payload:''})
        dispatch({type:ActionType.CHECK_CONFIRM,payload:false})
        dispatch({type:ActionType.ERROR_UNIT,payload:{valid:false,error:''}})
        dispatch({type: ActionType.SET_EDIT_ID, payload: ''})
    }
    return{
        handleCloseConfirm,
        handleClosePopup
    }

}