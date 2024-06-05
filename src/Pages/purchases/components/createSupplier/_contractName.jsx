import React from "react";
import {Input} from "../../../../common/form/input";
import {useCreateSupplier} from "../../hooks/useCreateSupplier";

const Index = ({...props})=>{
    const {supplier,function_create}=useCreateSupplier()
    const {contact} = function_create
    const {  onChangePeopleContact,onBlurPeopleContact} = contact
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Tên người liên hệ
                    </>
                }
                maxLength={81}
                autoComplete={'false'}
                value={supplier.contact_name}
                placeholder='Nhập tên người liên hệ'
                validateText={supplier.check_submit.contract_name_check.status ? supplier.check_submit.contract_name_check.message : null}
                validateType={!supplier.check_submit.contract_name_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangePeopleContact(e)}
                onBlur={(e) => onBlurPeopleContact(e)}
            />
        </div>
    )
}
export default Index