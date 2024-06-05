import { postData, sendRequestAuth } from "api/api"
import { deleteProductGroup } from "api/url"
import toast from "Component/Toast"
import { useContext } from "react"
import { SCRIPT_NOTE_PRODUCT } from "../interface/script"
import { ProductGroup } from "../provider/_context"
import { useProductAction } from "../provider/_reducer"

export const useDeleteproduct = ()=>{
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const handleDelete = async() =>{
        const id =pageState.id_product
        try{
            const res = await sendRequestAuth('delete',deleteProductGroup(id))
            if(res.data.success){
                toast.success({title:SCRIPT_NOTE_PRODUCT.DELETE_SUCESS})
                pageDispatch({ type: useProductAction.MODAL_CONFIRM, payload: false })
                pageDispatch({ type: useProductAction.CHECK_CONFIRM_DELETE, payload: !pageState.check_confirm_delete })
                pageDispatch({ type: useProductAction.IS_LOADING, payload: false })

            }
            else toast.error({title:SCRIPT_NOTE_PRODUCT.DELETE_ERROR})
            pageDispatch({ type: useProductAction.CHECK_CONFIRM_DELETE, payload: !pageState.check_confirm_delete })
            pageDispatch({type:useProductAction.GET_ID,payload:''})
        }catch(er){
            console.log(er);
        }
    }
    return{
        handleDelete
    }
}