import { isEmpty } from "lodash";
import { ERROR_TITLE } from "Pages/Consignment/ERROR_TITLE";
import { useCallback, useRef, useState } from "react";

export const handleError = (InitState, dispatch,handleCheckConfirm) => {
    const[confirm,setConfirm]=useState(false)
    const handleChangeName = (e) => {
        let { value } = e.target
        if (value == '') dispatch({ type: 'VALID_NAME', payload: { valid: true, error: ERROR_TITLE.EMPTY_NAME } })
        else if (value.length > 80) dispatch({ type: 'VALID_NAME', payload: { valid: true, error: ERROR_TITLE.MAX_NAME } })
        else dispatch({ type: 'VALID_NAME', payload: { valid: false, error: '' } })
        setConfirm(true);
        dispatch({type:'SET_CONFIRM',payload:true})
    }
    const handleChangePhone = (e) => {
        let { value } = e.target;
        let regex2=/^([^0-9]*)$/
        if(value=='') dispatch({ type: 'VALID_PHONE', payload: { valid: true, error: ERROR_TITLE.EMPTY_PHONE } })
        else if (value.length < 10) dispatch({ type: 'VALID_PHONE', payload: { valid: true, error: ERROR_TITLE.MAX_PHONE } })
        else if(value.length >= 12) dispatch({ type: 'VALID_PHONE', payload: { valid: true, error:ERROR_TITLE.MAX_PHONE } })
        else dispatch({ type: 'VALID_PHONE', payload: { valid: false, error:'' } })
        setConfirm(true);
    }
    const handleChangeEmail = (e) => {
        let { value } = e.target;
        let regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(value=='') dispatch({type:'VALID_EMAIL',payload:{valid:false,error:''}})
        else if(regex.test(value.trim())) dispatch({type:'VALID_EMAIL',payload:{valid:false,error:''}})
        else if(!regex.test(value.trim())) dispatch({type:'VALID_EMAIL',payload:{valid:true,error:ERROR_TITLE.REGEX_EMAIL}})
        else dispatch({type:'VALID_EMAIL',payload:{valid:true,error:ERROR_TITLE.MAX_EMAIL}})
        setConfirm(true);
    }
   const handleChangeAddress=(e)=>{
        let {value}= e.target;
        if(value=='') dispatch({type:'VALID_ADDRESS',payload:{valid:true,error:ERROR_TITLE.EMPTY_ADDRESS}})
        else if(value.length > 225) dispatch({type:'VALID_ADDRESS',payload:{valid:true,error:ERROR_TITLE.MAX_ADDRESS}})
        else dispatch({type:'VALID_ADDRESS',payload:{valid:false,error:''}})
        setConfirm(true);
    }
    
    return {
        handleChangeName,
        handleChangePhone,
        handleChangeEmail,
        handleChangeAddress,
        confirm,
    }
}