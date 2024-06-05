import { getData } from "api/api";
import { setResetPasswordUserManagement } from "api/url";
import  { useContext } from "react";
import { UserManagementContext } from "../provider/_context";
import { userManagementActions } from "../provider/_reducer";

export const useConfirm = ()=>{
    const { pageState, pageDispatch } = useContext(UserManagementContext)
    const openConfirmResetPass = () =>{
        pageDispatch({type:userManagementActions.OPEN_CONFIRM,payload: {open:true,id_confirm:2}})
    }
    const handleResetPassword = async () =>{
        let id = pageState.id_user
        try{
            const res = await getData(setResetPasswordUserManagement(id))
            if(res.data.success) pageDispatch({type:userManagementActions.GET_DATA_RESET_PASSWORD,payload:res.data.meta})
        }catch(er){
            console.log(er);
        }

    }
    return{
        handleResetPassword,
        openConfirmResetPass
    }
}