import React, {useContext} from "react";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hooks/useCreateSupplier";

const Index = ({...props})=>{
    const {supplier,pageDispatch,function_create}=useCreateSupplier()
    const {phone,aliasName} = function_create
    const { onChangePhoneSupplier, onBlurPhoneSupplier} = phone
    const {   onChangeNameAlias, onBlurNameAlias} = aliasName
    return(
        <div className={'supplier-management-create_group supplier-management-create_phone-shortName'}>
            <div className={'supplier-management-create_abbreviations'}>
                <Input
                    {...props}
                    label={
                        <>
                            Điện thoại
                            <Text color={THEME_SEMANTICS.failed} className={'supplier-management-create_default'}>*</Text>
                        </>
                    }
                    maxLength={12}
                    autoComplete={'false'}
                    value={supplier.mobile}
                    placeholder='Nhập số điện thoại'
                    validateText={supplier.check_submit.phone_check.status ? supplier.check_submit.phone_check.message : null}
                    validateType={!supplier.check_submit.phone_check.status ? 'success' : 'danger'}
                    onChange={(e) => onChangePhoneSupplier(e)}
                    onBlur={(e) => onBlurPhoneSupplier(e)}
                />
            </div>
            <div className={'supplier-management-create_abbreviations'}>
                <Input
                    {...props}
                    label={
                        <>
                            Tên viết tắt
                        </>
                    }
                    maxLength={31}
                    autoComplete={'false'}
                    value={supplier.alias}
                    placeholder='Nhập tên viết tắt'
                    validateText={supplier.check_submit.short_name_check.status ? supplier.check_submit.short_name_check.message : null}
                    validateType={!supplier.check_submit.short_name_check.status ? 'success' : 'danger'}
                    onChange={(e) => onChangeNameAlias(e)}
                    onBlur={(e) => onBlurNameAlias(e)}
                />
            </div>

        </div>
    )
}
export default Index