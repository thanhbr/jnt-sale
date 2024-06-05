import React, {useContext} from "react";
import {SupplierManagement} from "../../provider/_context";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
    const {email} = function_create
    const {  onChangeEmail,onBlurEmail} = email
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Email
                    </>
                }
                maxLength={80}
                autoComplete={'false'}
                value={pageState.supplier.email}
                placeholder='Nhập email'
                validateText={pageState.check_submit.email_check.status ? pageState.check_submit.email_check.message : null}
                validateType={!pageState.check_submit.email_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeEmail(e)}
                onBlur={(e) => onBlurEmail(e)}
            />
        </div>
    )
}
export default Index