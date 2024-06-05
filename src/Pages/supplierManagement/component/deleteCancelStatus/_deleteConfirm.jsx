import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {SupplierManagement} from "../../provider/_context";
import {useConfirmDeleteAndCancelStatus} from "../../hook/useConfirmDeleteAndCancelStatus";
import "./index.scss"
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {handleConfirmDelete, handleConfirmDeleteCancel} = useConfirmDeleteAndCancelStatus()
    return(
        <ConfirmModal
            openModal={pageState.open_confirm_delete}
            body={<Confirm />}
            stylePopup={'supplier-management-delete-modal_confirm'}
            footer={
                {
                    cancel: {
                        width: 110,
                        title: 'Huỷ',

                    },
                    acceptance: {
                        width: 110,
                        title: 'Xóa'
                    },
                }
            }
            footerProps={
                {className:'supplier-management-delete-modal_dismiss'}
            }
            closeModal={() => handleConfirmDeleteCancel()}
            acceptance={() => handleConfirmDelete()}
        />
    )
}

export default Index
const Confirm=()=>{
    return (
        <div>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xóa nhà cung cấp</Text>
            <Text as='p' className='supplier-management-delete-modal_txt'>Bạn có chắc chắn muốn xoá nhà cung cấp đã chọn?</Text>
        </div>

    )
}