import React, {useContext} from "react";
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {SUPPLIER_MODAL_HEADER_TITLE} from "../../interfaces/_const";
import CreateSupplier from "../createSupplier/index"
import {Text} from "../../../../common/text";
import { useModalSupplier } from '../../hooks/useModalSupplier'
const Index = ()=>{
    const { animate,supplier, confirm, modal, submit } = useModalSupplier()
    return(
        <>
            <RightSightPopup
                openModal={supplier.open_modal}
                confirmBeforeClose={true}
                clickClose={modal.handleClose}
                disableSubmit={submit.checkBeforeSubmit}
                animationClose={animate}
                header={SUPPLIER_MODAL_HEADER_TITLE}
                body={[
                    {
                        item:<CreateSupplier/>,
                    }
                ]}
                footer={
                    {
                        cancel: {
                            width: 74,
                            title: 'Huỷ'
                        },
                        save: {
                            width: 110,
                            title: 'Lưu'
                        },
                    }
                }
                acceptance={() => modal.handleAccept()}
            />
            <ConfirmModal
                openModal={supplier.open_modal_confirm}
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
                closeModal={() => confirm.handleCancelConfirm()}
                acceptance={() => confirm.handleAcceptConfirm()}
            />
        </>
    )
}
export default Index;
const Confirm = () => {
    return (
        <>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='supplier-management-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
        </>

    )
}
