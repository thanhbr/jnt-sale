import React from "react";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hooks/useCreateSupplier";

const Index =({...props})=>{
    const {supplier, function_create}=useCreateSupplier()
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
                value={supplier.address}
                placeholder='Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,..'
                validateText={supplier.check_submit.address_check.status ? supplier.check_submit.address_check.message : null}
                validateType={!supplier.check_submit.address_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeAddressSupplier(e)}
                onBlur={(e) => onBlurAddressSupplier(e)}
            />
        </div>
    )
}
export default Index