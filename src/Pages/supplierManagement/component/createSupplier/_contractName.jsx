import React, {useContext} from "react";
import {SupplierManagement} from "../../provider/_context";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
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
                value={pageState.supplier.contact_name}
                placeholder='Nhập tên người liên hệ'
                validateText={pageState.check_submit.contract_name_check.status ? pageState.check_submit.contract_name_check.message : null}
                validateType={!pageState.check_submit.contract_name_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangePeopleContact(e)}
                onBlur={(e) => onBlurPeopleContact(e)}
            />
        </div>
    )
}
export default Index