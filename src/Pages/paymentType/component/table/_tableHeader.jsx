import React, {useContext, useState} from 'react';
import {StyledPaymentTypeTable} from "./_styled";
import {PAYMENT_TYPE_TABLE_HEADER} from "../../interfaces/_const"
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {Text} from "../../../../common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeCheck} from "../../hooks/usePaymentTypeCheck";
import {Button} from "../../../../common/button";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(PaymentTypeContext)
    const {paymentType} = pageState
    const {checkAll, handleActive,shouldActiveCheckbox,is_check} = usePaymentTypeCheck()
    const [open, setOpen] = useState(false)
    const data = paymentType.list
    const checkFullPageChecked = () => {
        let checkFullPage = true;
        data.forEach(item => {
            const findItem = paymentType?.is_check?.find(find => find === item.id)
            if (!!!findItem) checkFullPage = false
        })
        return checkFullPage
    }
    const render_td = ()=>{
        if(PAYMENT_TYPE_TABLE_HEADER){
            return PAYMENT_TYPE_TABLE_HEADER.map((item,index)=>{
                return(
                    <Td key={item.id} className={'payment_type_table_td'}>
                        <Text
                            fontWeight={600}
                        >
                            {item.name}
                        </Text>
                    </Td>
                )
            })
        }
    }
    return(
        <StyledPaymentTypeTable>
            <Tr type={'tHead'} className = {'payment_type_table'}>
                <Td className = {'payment_type_table_td'}>
                    <CheckBoxConsignment
                        minus={!checkFullPageChecked()}
                        handleClick={checkAll}
                        isChecked={shouldActiveCheckbox}
                    />
                </Td>
                {paymentType?.is_check.length == 0 ?
                    <>
                        {render_td()}
                        <Td className = {'payment_type_table_td'}></Td>
                    </> :
                    <Td className="payment_type_table_td__cell" data-selected="true">
                        <Text as="b">
                            {paymentType.is_check.length > 9
                                ? paymentType.is_check.length
                                : `0${paymentType.is_check.length}`}{' '}
                            loại phiếu chi được chọn
                        </Text>
                        <div className="payment_type_table_td__selected-action-dropdown">
                            <Button
                                className="payment_type_table_td__selected-action-toggle"
                                size="xs"
                                onClick={() => setOpen(true)}
                            >
                                Thao tác {ORDER_ICONS
                                .caretRight}
                            </Button>
                            {open && (
                                <>
                                    <div
                                        className="payment_type_table_td__selected-action-backdrop"
                                        onClick={() => setOpen(false)}
                                    ></div>
                                    <ul className="payment_type_table_td__selected-action-menu common-popover">
                                        <li
                                            className="payment_type_table_td__selected-action-menu-item"
                                            onClick={() => {
                                                setOpen(false)
                                                handleActive({id: paymentType.is_check, status: 1})
                                            }}
                                        >
                                            Kích hoạt
                                        </li>
                                        <li
                                            className="payment_type_table_td__selected-action-menu-item"
                                            onClick={() => {
                                                setOpen(false)
                                                handleActive({id: paymentType.is_check, status: 0})
                                            }}
                                        >
                                            Ngưng sử dụng
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </Td>
                }


            </Tr>
        </StyledPaymentTypeTable>

    )
}
export default Index