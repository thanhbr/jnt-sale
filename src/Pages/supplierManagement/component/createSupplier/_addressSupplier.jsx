import React, {useContext} from "react";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {ICON} from "../../interfaces/_icon";
import {SupplierManagement} from "../../provider/_context";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index =({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
    const {address} = function_create
    const {onChangeAddressSupplier, onBlurAddressSupplier} = address
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Địa chỉ liên hệ
                        <Text color={THEME_SEMANTICS.failed} className={'supplier-management-create_default'}>*</Text>
                    </>
                }
                maxLength={255}
                autoComplete={'false'}
                value={pageState.supplier.address}
                placeholder='Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,..'
                validateText={pageState.check_submit.address_check.status ? pageState.check_submit.address_check.message : null}
                validateType={!pageState.check_submit.address_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeAddressSupplier(e)}
                onBlur={(e) => onBlurAddressSupplier(e)}
            />
        </div>
    )
}
export default Index