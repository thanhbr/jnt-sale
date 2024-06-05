import React, {useContext} from "react";
import {SupplierManagement} from "../../provider/_context";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
    const {name} = function_create
    const { onChangeNameSupplier,onBlurNameSupplier} = name
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Tên nhà cung cấp
                            <Text color={THEME_SEMANTICS.failed} className={'supplier-management-create_default'}>*</Text>
                    </>
                }
                maxLength={81}
                autoComplete={'false'}
                value={pageState.supplier.name}
                placeholder='Nhập tên nhà cung cấp'
                validateText={pageState.check_submit.name_check.status ? pageState.check_submit.name_check.message : null}
                validateType={!pageState.check_submit.name_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeNameSupplier(e)}
                onBlur={(e) => onBlurNameSupplier(e)}
            />
        </div>
    )
}
export default Index