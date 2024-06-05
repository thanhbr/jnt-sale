import React, {useContext} from "react";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../../common/text";
import {useCreateCapitalActionBtn} from "../../../hooks/useCreateCapitalActionBtn";
import "./index.scss"
const Index = _ =>{
    const {data, confirm} = useCreateCapitalActionBtn()
    const {modal} = data
    return(
        <ConfirmModal
            openModal={modal?.confirmCapital}
            body={<Confirm />}
            stylePopup={'capital-adjustment-create-modal_confirm'}
            footer={
                {
                    cancel: {
                        width: 56,
                        title: 'Hủy',

                    },
                    acceptance: {
                        width: 110,
                        title: 'Xác nhận'
                    },
                }
            }
            footerProps={
                {className:'capital-adjustment-create-modal_dismiss'}
            }
            closeModal={() => confirm.dismiss()}
            acceptance={() => confirm.accept(1,'modal')}
        />
    )
}
export default Index
const Confirm=()=>{
    return (
        <div className='capital-adjustment-create-modal_group'>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận điều chỉnh giá vốn</Text>
            <Text as='p' className='capital-adjustment-create-modal_txt'>
                Thao tác này sẽ thực hiện điều chỉnh giá vốn của các sản phẩm trong phiếu điều chỉnh đang chọn. Bạn có chắc chắn muốn thực hiện ?
            </Text>
        </div>

    )
}