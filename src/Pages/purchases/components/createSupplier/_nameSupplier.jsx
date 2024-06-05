import React from "react";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import { useCreateSupplier } from '../../hooks/useCreateSupplier'

const Index = ({...props})=>{
    const {supplier, pageDispatch,function_create}=useCreateSupplier()
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
                value={supplier.name}
                placeholder='Nhập tên nhà cung cấp'
                validateText={supplier.check_submit.name_check.status ? supplier.check_submit.name_check.message : null}
                validateType={!supplier.check_submit.name_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeNameSupplier(e)}
                onBlur={(e) => onBlurNameSupplier(e)}
            />
        </div>
    )
}
export default Index