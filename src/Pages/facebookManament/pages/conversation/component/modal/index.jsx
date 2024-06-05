import { RightSightPopup } from 'layouts/rightSightPopup';
import React from 'react';
import ModalContent from "./contentModal"
import { Text } from 'common/text';
import "./index.scss"
import useFacebookConversationTags from "../../hooks/useFacebookConversationTags";
import {ConfirmModal} from "../../../../common/confirm";
const Index = ({...props}) => {
    const { data , methods, validate} = useFacebookConversationTags()
    return (
        <>
            <RightSightPopup
                openModal={data.tags.active}
                confirmBeforeClose={true}
                clickClose={methods?.onClose}
                disableSubmit={validate}
                animationClose={data.tags.animate}
                className={'fb-right-sight__popup'}
                header={
                  {title:'Thông tin nhãn khách hàng', subTitle:'“Hãy tận dụng tên & màu sắc nhãn để chăm sóc khách hiệu quả hơn”'}
                }
                body={[
                    {
                        item: (<ModalContent/>)
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
                acceptance={() => methods?.onSubmitCreateSticker()}
            />
            <ConfirmModal
                openModal={data.tags.status ? data.tags.status.confirm : data.tags.confirm}
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
                closeModal={methods?.onCancelConfirm}
                acceptance={methods?.onAcceptConfirm}
            />
        </>

    )
}
export default Index;
const Confirm = () => {
    return (
        <div>
            <Text
                fontSize={19}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='product-group-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
        </div>

    )
}