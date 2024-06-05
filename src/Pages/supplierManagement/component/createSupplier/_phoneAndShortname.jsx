import React, {useContext} from "react";
import {SupplierManagement} from "../../provider/_context";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
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
                    value={pageState.supplier.mobile}
                    placeholder='Nhập số điện thoại'
                    validateText={pageState.check_submit.phone_check.status ? pageState.check_submit.phone_check.message : null}
                    validateType={!pageState.check_submit.phone_check.status ? 'success' : 'danger'}
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
                    value={pageState.supplier.alias}
                    placeholder='Nhập tên viết tắt'
                    validateText={pageState.check_submit.short_name_check.status ? pageState.check_submit.short_name_check.message : null}
                    validateType={!pageState.check_submit.short_name_check.status ? 'success' : 'danger'}
                    onChange={(e) => onChangeNameAlias(e)}
                    onBlur={(e) => onBlurNameAlias(e)}
                />
            </div>

        </div>
    )
}
export default Index