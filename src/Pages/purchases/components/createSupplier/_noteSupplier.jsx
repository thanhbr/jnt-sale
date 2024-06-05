import React from "react";
import {Textarea} from "../../../../common/form/textarea";
import { useCreateSupplier } from '../../hooks/useCreateSupplier'

const Index = ({...props})=>{
    const {supplier, pageDispatch,function_create}=useCreateSupplier()
    const {detail} = function_create
    const {  onChangeNote,onBlurNote} = detail
    return(
        <div className={'supplier-management-create_group supplier-management-create_textarea'}>
            <Textarea
                {...props}
                label={
                    <>
                        Ghi chú
                    </>
                }
                className={'supplier-management-create_note'}
                maxLength={256}
                autoComplete={'false'}
                value={supplier.details}
                placeholder='Nhập ghi chú nhà cung cấp'
                validateText={supplier.check_submit.note_check.status ? supplier.check_submit.note_check.message : null}
                validateType={!supplier.check_submit.note_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeNote(e)}
                onBlur={(e) => onBlurNote(e)}
            />
        </div>
    )
}
export default Index