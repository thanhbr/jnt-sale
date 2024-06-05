import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {SupplierManagement} from "../../provider/_context";
import {useConfirmDeleteAndCancelStatus} from "../../hook/useConfirmDeleteAndCancelStatus";
import "./index.scss"
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {handleConfirmDeActive,handleConfirmCancelDeActive} = useConfirmDeleteAndCancelStatus()
    return(
        <ConfirmModal
            openModal={pageState.open_confirm_cancel?.open}
            body={<Confirm />}
            stylePopup={'supplier-management-modal_confirm'}
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
                {className:'supplier-management-modal_dismiss'}
            }
            closeModal={() => handleConfirmCancelDeActive()}
            acceptance={() => handleConfirmDeActive()}
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
            >Ngưng sử dụng nhà cung cấp</Text>
            <Text as='p' className='supplier-management-modal_txt'>Nhà cung cấp bị ngưng sử dụng sẽ không thể được chọn để nhập hàng nữa. Bạn có chắc chắn muốn ngưng sử dụng nhà cung cấp đã chọn?</Text>
        </div>

    )
}
