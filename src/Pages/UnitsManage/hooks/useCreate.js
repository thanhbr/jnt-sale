import toast from "Component/Toast"
import { Unit } from "Pages/UnitsManage"
import { ActionType } from "Pages/UnitsManage/store/action"
import { useContext, useEffect, useState } from "react"
import { ALERT_UNIT, UNIT } from "../SCRIPT_UNIT"
import { checkEmptyNote } from "./useCheckTextNote"

export const usecreateUnit = () => {
    const { state, dispatch } = useContext(Unit)
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
    const onChangeTextNote = e => {
        let { value } = e.target
        let check = checkEmptyNote(value)

        if (check == 0) {
            dispatch({
                type: ActionType.ERROR_UNIT,
                payload: { valid: true, error: UNIT.VALID_NOTE },
            })
            dispatch({ type: ActionType.CONTENT, payload: '' })
        }
        else {
            dispatch({ type: ActionType.CHECK_CONFIRM, payload: true })
            dispatch({
                type: ActionType.ERROR_UNIT,
                payload: { valid: false, error: '' },
            })
            dispatch({ type: ActionType.DISABLE_SAVE, payload: false })
            dispatch({ type: ActionType.CONTENT, payload: value.trim() })
        }
    }
    const onChangePositionNote = e => {
        let { value } = e.target
        dispatch({ type: ActionType.CHECK_EMPTY, payload: false })
        dispatch({ type: ActionType.CHECK_CONFIRM, payload: true })
        dispatch({
            type: ActionType.ERROR_POSITION,
            payload: { field: value, valid: false, error: '' },
        })
        dispatch({
            type: ActionType.POSITION,
            payload: value != '' ? Number(value) : state.position,
        })
    }
    const changeDefault = () => {
        let check_default = info && info.is_default == 1
        if (isDefault) {
            if (check_default) {
                setDisable(true)
                setIsDefault(!isDefault)
                dispatch({ type: ActionType.IS_DEFAULT, payload: 0 })
                toast.warning({ title: ALERT_UNIT.CHECK_DEFAULT })
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
        changeActive
    }
}