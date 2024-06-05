import { useContext } from "react"
import { UserManagementContext } from "../provider/_context"
import { userManagementActions } from "../provider/_reducer"

export const useCheckBoxTable = () =>{
    const { pageState, pageDispatch } = useContext(UserManagementContext)
    const list = pageState.listUser
    const is_check = (id) => {
        let isCheck = pageState.isCheck
        let check = isCheck.find(item => item === id)
        if (check !== undefined) {
            pageDispatch({ type: userManagementActions.IS_CHECK, payload: isCheck.filter(item => item !== id) })
            pageDispatch({ type: userManagementActions.COUNT, payload: isCheck.length - 1})
        } else {
            pageDispatch({ type: userManagementActions.IS_CHECK_ALL, payload: true })
            pageDispatch({ type: userManagementActions.IS_CHECK, payload: [...isCheck, id] })
            pageDispatch({ type: userManagementActions.COUNT, payload: isCheck.length + 1})
        }

    }
    return {
        is_check,
    }
}