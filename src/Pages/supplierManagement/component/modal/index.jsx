import React, {useContext} from "react";
import {RightSightPopup} from "../../../../layouts/rightSightPopup";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {SupplierManagement} from "../../provider/_context";
import {useModal} from "../../hook/useModal";
import {SUPPLIER_MODAL_HEADER_TITLE} from "../../interfaces/_const";
import CreateSupplier from "../createSupplier/index"
import {Text} from "../../../../common/text";
import "./index.scss"
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const { animate, confirm, modal, submit } = useModal()
    return(
        <>
            <RightSightPopup
                openModal={pageState.open_modal}
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
                footerProps={{
                    className:'supplier-management-footer'
                }}
                acceptance={() => modal.handleAccept()}
            />
            <ConfirmModal
                openModal={pageState.open_modal_confirm}
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
