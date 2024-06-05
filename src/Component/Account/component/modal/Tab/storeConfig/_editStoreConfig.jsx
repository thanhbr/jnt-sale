import React from "react";
import {StyledStoreConfigDetail} from "./styles";
import {Text} from "../../../../../../common/text";
import {Input} from "../../../../../../common/form/input";
import {Button} from "../../../../../../common/button";
import {useUpdateStoreConfig} from "../../../../hook/useUpdateStoreConfig";
import ChoosePrintTemplate from "./_choosePrintTemplate"
import {ConfirmModal} from "../../../../../../layouts/rightSightPopup/confirm";
import './index.scss'
import {SwitchStatus} from "../../../../../SwitchStatus/SwitchStatus";

const Index = ({...props})=>{
    const {
        warningPhone,
        quantityLowRate,
        storeFunction,
        functions
    }=useUpdateStoreConfig()
    return(
        <StyledStoreConfigDetail>
            <div className={'store-config'}>
              <div className={'store-config-btn-update'}>
                <div className={'store-config-title'} >
                  <Text fontWeight={600}>Bán hàng</Text>
                  <div className={'store-config-switch-alert'}>
                    <SwitchStatus
                      status={warningPhone}
                      handleChange={() => functions?.handleToggleWarning(warningPhone, props.isUpdate)}
                    />
                    <Text style={{marginLeft:'8px'}} fontSize={15}>Cảnh báo SĐT khách hàng đã được tạo đơn trong ngày</Text>
                  </div>
                </div>
              </div>
                <div className={'store-config-order-inventory'}>
                    <Text fontWeight={600}>Kho hàng</Text>
                    <div className={'store-config-inventory store-config-inventory-edit'}>
                        <Text style={{marginRight:'16px',width:'144px'}} color={'#7A92A5'}>Số lượng tồn cảnh báo</Text>
                        <Input
                            className={'store-config-inventory-input'}
                            value={quantityLowRate?.activeValue}
                            onChange={e=>storeFunction.onChange(e,props.isUpdate)}
                        />
                    </div>
                </div>
                <div className={'store-config-order-inventory'}>
                    <Text fontWeight={600}>Lên đơn hàng loạt</Text>
                    <div className={'store-config-inventory store-config-inventory-edit'}>
                        <Text style={{marginRight:'16px',width:'144px'}} color={'#7A92A5'}>Cấu hình in vận đơn</Text>
                        <ChoosePrintTemplate isUpdate={props.isUpdate}/>
                        {/*<Text color={'#151624'} fontSize={15}>In mẫu đơn vị vận chuyển</Text>*/}
                    </div>
                </div>
            </div>
            <div className='store-config_action-btn'>
                <Button appearance={'ghost'} onClick={functions.cancelStore}>Hủy</Button>
                <Button className={'store-config_accept'} onClick={()=>functions.updateStore(props.isUpdate)}>Cập
                    nhật</Button>
            </div>
            {confirm && <ConfirmLeavePage setCloseAnchor={props.setCloseAnchor} />}
        </StyledStoreConfigDetail>
    )
};

export default Index;
const ConfirmLeavePage = ({...props})=>{
    const {
        confirm,
        storeFunction
    }=useUpdateStoreConfig()
    return(
            <ConfirmModal
                openModal={confirm}
                body={<Confirm />}
                stylePopup={'store-config-modal_confirm'}
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
                    {className:'store-config-modal_dismiss'}
                }
                closeModal={() => storeFunction.handleCancelConfirm()}
                acceptance={() =>{
                    props.setCloseAnchor()
                    storeFunction.handleAcceptConfirm()
                }}
            />
    )
}
const Confirm = ()=>{
    return (
        <>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='store-config-modal_txt'>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
        </>

    )
}
