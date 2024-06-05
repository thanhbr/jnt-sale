import React from "react";
import {Input} from "../../../../common/form/input";
import {useCreateSupplier} from "../../hooks/useCreateSupplier";

const Index = ({...props})=>{
    const {supplier,function_create}=useCreateSupplier()
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
                value={supplier.email}
                placeholder='Nhập email'
                validateText={supplier.check_submit.email_check.status ? supplier.check_submit.email_check.message : null}
                validateType={!supplier.check_submit.email_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeEmail(e)}
                onBlur={(e) => onBlurEmail(e)}
            />
        </div>
    )
}
export default Index