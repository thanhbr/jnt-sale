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
            openModal={modal?.balance?.show}
            body={<Confirm />}
            stylePopup={'inventory-management-modal_confirm'}
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
            <Text fontWeight={600} lineHeight={28} fontSize={20} as={'p'}>Xác nhận cân bằng kho</Text>
            <Text lineHeight={19} style={{margin:'24px 0 0 0'}} as={'p'}>
                Thao tác này sẽ điều chỉnh lại tồn kho của các sản phẩm theo đúng số lượng tồn kho sau kiểm đã khai báo.
            </Text>
            <Text  style={{margin:'24px 0 0 0'}} as={'p'}>Bạn có chắc chắn muốn thực hiện?</Text>
        </StyleConfirm>
    )
}
const StyleConfirm = styled.div`
  

`