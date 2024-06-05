import {useReducer, useState} from "react";
import {useAccountAction, useAccountReducer, useAccountState} from "../reducer/reducer";

export const useEditStoreConfig = ()=>{
    const [state,dispatch] = useReducer(useAccountReducer,useAccountState)
    const [updateStoreConfig, setUpdateStoreConfig] = useState(true)
    const changeUpdateStoreConfig = ()=>{
        setUpdateStoreConfig(false)
    }
    const cancelEditStoreConfig = ()=>{
        setUpdateStoreConfig(true)
    }
    return{
        provider:{
            state,
            dispatch
        },
        functions:{
            changeEdit: changeUpdateStoreConfig,
            cancelStore: cancelEditStoreConfig,
        },
        data:{
            updateStoreConfig,
        }

    }
}