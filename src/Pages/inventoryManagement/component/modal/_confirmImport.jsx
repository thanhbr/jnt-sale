import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {InventoryContext} from "../../provider/_context";
import useInventoryRow from "../../hook/useInventoryRow";

const Index = ()=>{
    const {pageState} = useContext(InventoryContext)
    const {modal} = pageState
    const {confirm} = useInventoryRow()
    return(
        <ConfirmModal
            openModal={modal?.import_excel?.show}
            body={<Confirm />}
            stylePopup={'inventory-management-modal_confirm-import'}
            footer={
                {
                    cancel: {
                        width: 110,
                        title: 'Trở về danh sách phiếu kiểm kho',

                    },
                    acceptance: {
                        width: 110,
                        title: 'Xác nhận cân bằng kho'
                    },
                }
            }
            footerProps={
                {className:'inventory-management-modal_dismiss inventory-management_action-button inventory-management_action-import-confirm'}
            }
            closeModal={() => confirm.deActiveBalance()}
            acceptance={() => confirm.activeBalance()}
        />
    )
}
export default Index;
const Confirm=()=>{
    return(
        <>
            <Text fontWeight={600} lineHeight={28} fontSize={20} as={'p'}>Tạo phiếu kiểm kho thành công</Text>
            <Text lineHeight={19} style={{margin:'24px 0 0 0'}} as={'p'}>
                Hệ thống đã thực hiện import danh sách sản phẩm kiểm kho thành công. Hãy chọn <b>Xác nhận cân bằng kho</b> nếu bạn muốn cập nhật tồn kho các sản phẩm này theo tồn kho thực tế đã khai báo.
            </Text>
        </>
    )
}