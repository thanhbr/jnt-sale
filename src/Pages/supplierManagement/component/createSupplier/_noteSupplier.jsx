import React, {useContext} from "react";
import {SupplierManagement} from "../../provider/_context";
import {Input} from "../../../../common/form/input";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useCreateSupplier} from "../../hook/useCreateSupplier";
import {Textarea} from "../../../../common/form/textarea";

const Index = ({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
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
                value={pageState.supplier.details}
                placeholder='Nhập ghi chú nhà cung cấp'
                validateText={pageState.check_submit.note_check.status ? pageState.check_submit.note_check.message : null}
                validateType={!pageState.check_submit.note_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeNote(e)}
                onBlur={(e) => onBlurNote(e)}
            />
        </div>
    )
}
export default Index