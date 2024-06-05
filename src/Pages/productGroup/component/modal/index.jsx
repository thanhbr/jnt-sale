import { RightSightPopup } from 'layouts/rightSightPopup';
import { useModal } from 'Pages/productGroup/hook/useModal';
import { PRODUCT_MODAL_HEADER_TITLE } from 'Pages/productGroup/interface';
import { ProductGroup } from 'Pages/productGroup/provider/_context';
import { useProductAction } from 'Pages/productGroup/provider/_reducer';
import React from 'react';
import { useContext } from 'react';
import ModalContent from "./contentModal"
import { ConfirmModal } from "../../../../layouts/rightSightPopup/confirm";
import { Text } from 'common/text';
import "./index.scss"
const Index = () => {
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const { animate, confirm, modal } = useModal()
    return (
        <>
            <RightSightPopup
                className={'product-group-modal_right-side'}
                openModal={pageState.open_modal}
                confirmBeforeClose={true}
                clickClose={modal.handleClose}
                disableSubmit={modal.checkBeforeSubmit}
                animationClose={animate}
                header={PRODUCT_MODAL_HEADER_TITLE}
                body={[
                    {
                        item: <ModalContent />
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
                openModal={pageState.modal_confirm}
                body={<Confirm />}
                stylePopup={'product-group-modal_confirm'}
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
                   {className:'product-group-modal_dismiss'} 
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
        <div>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='product-group-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
        </div>

    )
}