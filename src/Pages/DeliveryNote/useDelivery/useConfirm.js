import { useContext } from "react"
import { Delivery } from ".."
import { ActionType } from "../store/action"

export const useConfirm=()=>{
    const {state,dispatch} = useContext(Delivery)
    const handleCloseConfirm=()=>{
        dispatch({type:ActionType.OPEN_CONFIRM,payload:false})
    }
    const handleClosePopup=()=>{
        dispatch({type:ActionType.OPEN_CONFIRM,payload:false})
        dispatch({type:ActionType.OPEN_MODAL,payload:false})
        dispatch({type:ActionType.DISABLE_SAVE,payload:false})
        dispatch({type:ActionType.INFO_NOTE,payload:''})
        dispatch({type:ActionType.ERROR_NOTE,payload:{valid:false,error:''}})
        dispatch({ type: ActionType.ERROR_POSITION, payload: { valid: false, error: '' } })
        dispatch({ type: ActionType.CHECK_EMPTY_PROSITION, payload: false })
        dispatch({type:ActionType.CHANGE_MODAL,payload:false})
        dispatch({type:ActionType.CONTENT,payload:''})
        dispatch({type:ActionType.POSITION,payload:''})
    }
    return{
        handleCloseConfirm,
        handleClosePopup
    }

}