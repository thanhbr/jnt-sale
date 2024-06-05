import {postData} from "../../../api/api";
import {updloadLogoShopInfo} from "../../../api/url";
import {useReducer} from "react";
import {useAccountAction, useAccountReducer, useAccountState} from "../reducer/reducer";
import toast from "../../../Pages/ShippingPartner/components/toast";
import {ERROR_STORE} from "../interface/_script";

export const useUpdateLogo = (info,fetchShopInfo,handleCheck) =>{
    const [state,dispatch] = useReducer(useAccountReducer,useAccountState)
    const handleUpdate = async (val) =>{
        let image = val.target.files[0]
        const formData= new FormData()
        formData.append('image',image)
        formData.get('image')
        try{
            const res= await postData(updloadLogoShopInfo(info?.shop_id),formData)
            if(res.data.success){
                handleCheck(false,'')
                fetchShopInfo()
            }
            else handleCheck(true,ERROR_STORE.IMAGE)
        }catch (e) {
            console.log(e)
        }

    }
    return{
        handleUpdate,
    }
}