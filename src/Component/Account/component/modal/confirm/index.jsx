import React, {useContext} from "react";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../../common/text";
import {StoreAccountContext} from "../../../reducer/context";
import {useAccountAction} from "../../../reducer/reducer";
const Index = ({confirm,isUpdate,setEdit,setValueC,value,...props}) =>{
    const {pageDispatch} = useContext(StoreAccountContext)
    const handleAccept = ()=>{
        isUpdate(false)
        pageDispatch({type:useAccountAction.OPEN_MODAL_COFIRM_SWITCH_TAB,payload:false})
        pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:true})
        pageDispatch({type:useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG,payload:false})
        pageDispatch({type:useAccountAction.ACCEPT_LEAVE_PAGE})
        setEdit(true)
        value = value === 'store'?'store config' : 'store'
        setValueC(value )
    }
    const handleDismiss = ()=>{
        pageDispatch({type:useAccountAction.OPEN_MODAL_COFIRM_SWITCH_TAB,payload:false})
    }
    return(
        <ConfirmModal
            openModal={confirm}
            body={<Confirm />}
            stylePopup={'store-config-modal_confirm'}
            footer={
                {
                    cancel: {
                        width: 110,
                        title: 'Huỷ',

                    },
                    acceptance: {
                        width: 110,
                        title: 'Xác nhận'
                    },
                }
            }
            footerProps={
                {className:'store-config-modal_dismiss'}
            }
            closeModal={handleDismiss}
            acceptance={handleAccept}
        />
    )
}
export default Index;
const Confirm = ()=>{
    return (
        <>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='store-config-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
        </>

    )
}
