import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {InventoryContext} from "../../provider/_context";
import {Text} from "../../../../common/text";
import styled from "styled-components";
import "./index.scss"
import useInventoryRow from "../../hook/useInventoryRow";
const Index = ()=>{
    const {pageState} = useContext(InventoryContext)
    const {modal} = pageState
    const {confirm} = useInventoryRow()
    return(

        <ConfirmModal
            openModal={modal?.cancel?.show}
            body={<Confirm />}
            stylePopup={'inventory-management-modal_confirm-cancel'}
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
                {className:'inventory-management-modal_dismiss'}
            }
            closeModal={() => confirm.dismiss()}
            acceptance={() => confirm.confirm()}
        />
    )
}
export default Index;

const Confirm=()=>{
    return(
        <StyleConfirm>
            <Text fontWeight={600} lineHeight={28} fontSize={20} as={'p'}>Hủy phiếu kiểm kho</Text>
            <Text lineHeight={19} style={{margin:'24px 0 0 0'}} as={'p'}>
                Thao tác này sẽ không thể khôi phục. Bạn có chắc chắn muốn hủy phiếu kiểm kho đã chọn?
            </Text>
        </StyleConfirm>
    )
}
const StyleConfirm = styled.div`
  

`