import React, {useContext} from "react";
import {Input} from "../../../../common/form/input";
import {Tooltip} from "../../../../common/tooltip";
import {Text} from "../../../../common/text";
import {ICON} from "../../interfaces/_icon";
import {SupplierManagement} from "../../provider/_context";
import {useCreateSupplier} from "../../hook/useCreateSupplier";

const Index =({...props})=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const {function_create}=useCreateSupplier()
    const {code_supplier} = function_create
    const { onChangeCodeSupplier,onBlurCodeSupplier} = code_supplier
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Mã nhà cung cấp
                        <Tooltip  placement={'right'} title={'Trường hợp bạn không nhập mã nhà cung cấp, evoshop sẽ tự động sinh theo mã hệ thống'}>
                            <Text className={'supplier-management-create_question'}>{ICON.question}</Text>
                        </Tooltip>
                    </>
                }
                maxLength={21}
                autoComplete={'false'}
                value={pageState.supplier.code}
                placeholder='Nhập mã nhà cung cấp (ví dụ: NCC0001...)'
                validateText={pageState.check_submit.code_check.status ? pageState.check_submit.code_check.message : null}
                validateType={!pageState.check_submit.code_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeCodeSupplier(e)}
                onBlur={(e) => onBlurCodeSupplier(e)}
            />
        </div>
    )
}
export default Index