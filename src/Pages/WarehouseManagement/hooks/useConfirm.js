import { useContext } from "react"
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { ActionType } from "../store/action"

export const useConfirm = () => {
    const { state, dispatch } = useContext(WarehouseManager)
    const handleCancel = () => {
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
    }
    const handleConfirm = () => {
        dispatch({ type: ActionType.OPEN_CONFIRM, payload: false })
        dispatch({ type: ActionType.OPEN_MODAL, payload: false })
        dispatch({ type: ActionType.DISABLE_SAVE, payload: false })
        dispatch({ type: ActionType.RESET_FORM })
        dispatch({ type: ActionType.SET_ERROR, payload: [] })
    }
    return {
        handleCloseConfirm: handleCancel,
        handleClosePopup: handleConfirm
    }

}