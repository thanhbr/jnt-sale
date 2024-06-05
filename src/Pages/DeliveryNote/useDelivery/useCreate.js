import toast from "Component/Toast"
import { Delivery } from "Pages/DeliveryNote"
import { ActionType } from "Pages/DeliveryNote/store/action"
import { useContext, useEffect, useState } from "react"
import { ALERT_NOTE, NOTE } from "../SCRIPT_NOTE"
import { checkEmptyNote } from "./useCheckTextNote"

export const useCreateNote = () => {
    const { state, dispatch } = useContext(Delivery)
    const info = state.infoNote
    const check = info && info.status == -1 ? false : true
    const checkDefault = info && info.is_default == 1 ? true : false
    const [isDefault, setIsDefault] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [isDisable, setDisable] = useState(false)
    useEffect(() => {
        setIsDefault(checkDefault)
        setIsActive(check)
        dispatch({ type: ActionType.CONTENT, payload: info.content })
        dispatch({ type: ActionType.POSITION, payload: info.position })
        dispatch({ type: ActionType.IS_DEFAULT, payload: info.is_default })
        dispatch({ type: ActionType.STATUS, payload: info.status })
    }, [info])
    const changeSubmit =[
        state.valid_note?.valid,
        state.valid_position?.valid
    ].includes(true)
    const onChangeTextNote = e => {
        let { value } = e.target
        dispatch({type:ActionType.CHANGE_MODAL,payload:true})
        if(value.trim() == ''){
            dispatch({
                type: ActionType.ERROR_NOTE,
                payload: { valid: true, error: NOTE.VALID_NOTE },
            })
            dispatch({ type: ActionType.CONTENT, payload: value})
        }else if(value.length > 255){
            dispatch({
                type: ActionType.ERROR_NOTE,
                payload: { valid: true, error: NOTE.MAX_NOTE },
            })
            dispatch({ type: ActionType.CONTENT, payload: value})
        }else{
            dispatch({
                type: ActionType.ERROR_NOTE,
                payload: { valid: false, error: '' },
            })
            dispatch({ type: ActionType.CONTENT, payload: value })
        }

    }
    const onChangePositionNote = e => {
        let { value } = e.target
        dispatch({type:ActionType.CHANGE_MODAL,payload:true})
        let regex = /^[0-9]*$/
        if (!regex.test(value))
           {dispatch({
            type: ActionType.ERROR_POSITION,
            payload: { valid: true, error: NOTE.REGEX_POSITION },
        })
        dispatch({ type: ActionType.CHECK_EMPTY_PROSITION, payload: true })} 
        else if (value > 127) {
            dispatch({ type: ActionType.CHECK_EMPTY_PROSITION, payload: true })
            dispatch({
                type: ActionType.ERROR_POSITION,
                payload: { valid: true, error: NOTE.MAX_POSITION },
            })
        }
        else {
            dispatch({ type: ActionType.CHECK_EMPTY_PROSITION, payload: false })
            dispatch({
                type: ActionType.ERROR_POSITION,
                payload: { valid: false, error: '' },
            })
            dispatch({
                type: ActionType.POSITION,
                payload: value != '' ? Number(value) : 0,
            })
        }
    }
    const changeDefault = () => {
        let check_default = info && info.is_default == 1
        dispatch({type:ActionType.CHANGE_MODAL,payload:true})
        if (isDefault) {
            if (check_default) {
                setDisable(true)
                setIsDefault(!isDefault)
                dispatch({ type: ActionType.IS_DEFAULT, payload: 0 })
                toast.warning({ title: ALERT_NOTE.CHECK_DEFAULT })
                setTimeout(() => {
                    setDisable(false)
                }, 2000)
            }
            setIsDefault(!isDefault)
            dispatch({ type: ActionType.IS_DEFAULT, payload: 0 })
        } else {
            setIsDefault(!isDefault)
            dispatch({ type: ActionType.IS_DEFAULT, payload: 1 })
        }

    }
    const changeActive = () => {
        dispatch({type:ActionType.CHANGE_MODAL,payload:true})
        if (isActive) {
            setIsActive(!isActive)
            setDisable(true)
            dispatch({ type: ActionType.STATUS, payload: -1 })
        } else {
            setIsActive(!isActive)
            setDisable(false)
            dispatch({ type: ActionType.STATUS, payload: 1 })
        }
    }
    return {
        isDefault,
        isActive,
        isDisable,
        onChangeTextNote,
        onChangePositionNote,
        changeDefault,
        changeActive,
        changeSubmit
    }
}