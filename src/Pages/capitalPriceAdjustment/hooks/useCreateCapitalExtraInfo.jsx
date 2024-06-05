import {CapitalAdjustmentContext} from "../provider/context";
import {useContext} from "react";
import {CapitalAdjustmentActions} from "../provider/action";
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";

export const useCreateCapitalExtraInfo = () =>{
    const {pageState, pageDispatch} = useContext(CapitalAdjustmentContext)
    const {formCreate} = pageState;
    const {validate, extraInfo} = formCreate;
    const handleChangeCode = e =>{
        const {value} = e.target
        pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
            code:{
                status:false,
                message:''
            },
                submitFormExtra:false,
            }})
        pageDispatch({type:CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT,payload:{
            code: value.trim()
            }})
    }
    const handleBlurCode = e =>{
        const {value} = e.target
        const regex = REGEX_CUSTOMER_CODE;
        if( value !== '' && !regex.test(value) ){
            if(value.length > 50)
                pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                        code:{
                            status:true,
                            message:'Mã phiếu điều chỉnh chỉ được phép nhập tối đa 50 ký tự'
                        },
                        submitFormExtra:true,
                    }})
            else pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                    code:{
                        status:true,
                        message:'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt!'
                    },
                    submitFormExtra:true,
                }})

        }
        else {
            pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                    code:{
                        status:false,
                        message:''
                    },
                    submitFormExtra:false,
                }})
            pageDispatch({
                type: CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT, payload: {
                    code: value.trim()
                }
            })
        }
    }
    const handleNoteChange = e =>{
        const {value} = e.target
        pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                note:{
                    status:false,
                    message:''
                },
                submitFormExtra:false,
            }})
        pageDispatch({type:CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT,payload: {note: value}})
    }
    const handleNoteBlur = e =>{
        const {value} = e.target
        if(value.length > 255)  pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                note:{
                    status:true,
                    message:'Ghi chú chỉ được phếp nhập tối đa 255 ký tự'
                },
                submitFormExtra:true,
            }})
        else{
            pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                    note:{
                        status:false,
                        message:''
                    },
                    submitFormExtra:false,
                }})
            pageDispatch({type:CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT,payload:  {note: value.trim()}})
        }
    }
    return{
        extraInfo,
        validate,
        method:{
            onChangeCode: handleChangeCode,
            onBlurCode: handleBlurCode,
            onChangeNote: handleNoteChange,
            onBlurNote: handleNoteBlur,
        }
    }
}