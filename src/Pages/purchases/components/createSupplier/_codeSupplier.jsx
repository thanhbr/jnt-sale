import React from "react";
import {Input} from "../../../../common/form/input";
import {Tooltip} from "../../../../common/tooltip";
import {Text} from "../../../../common/text";
import {ICON} from "../../interfaces/_icons";
import {useCreateSupplier} from "../../hooks/useCreateSupplier";

const Index =({...props})=>{
    const {supplier,function_create}=useCreateSupplier()
    const {code_supplier} = function_create
    const { onChangeCodeSupplier,onBlurCodeSupplier} = code_supplier
    return(
        <div className={'supplier-management-create_group'}>
            <Input
                {...props}
                label={
                    <>
                        Mã nhà cung cấp
                        <Tooltip  placement={'right'} title={'Trường hợp bạn không nhập mã nhà cung cấp, UPOS sẽ tự động sinh theo mã hệ thống'}>
                            <Text className={'supplier-management-create_question'}>{ICON.question}</Text>
                        </Tooltip>
                    </>
                }
                maxLength={21}
                autoComplete={'false'}
                value={supplier.code}
                placeholder='Nhập mã nhà cung cấp (ví dụ: NCC0001...)'
                validateText={supplier.check_submit.code_check.status ? supplier.check_submit.code_check.message : null}
                validateType={!supplier.check_submit.code_check.status ? 'success' : 'danger'}
                onChange={(e) => onChangeCodeSupplier(e)}
                onBlur={(e) => onBlurCodeSupplier(e)}
            />
        </div>
    )
}
export default Index