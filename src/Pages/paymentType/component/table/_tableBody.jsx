import React, {useContext, useState} from 'react';
import {StyledPaymentTypeTable} from "./_styled";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {Text} from "../../../../common/text";
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus';
import {PaymentTypeContext} from "../../provider/context";
import {Tooltip} from "../../../../common/tooltipv2";
import {Skeleton} from "@mui/material";
import {OrderEmpty} from "../empty";
import {RowMenuPopover} from "./_rowMenuPopover";
import {PAYMENT_TYPE_ROW_MENU} from "../../interfaces/_const";
import {usePaymentTypeTable} from "../../hooks/usePaymentTypeTable";
import {PaymentTypeActions} from "../../provider/action";
import {usePaymentTypeCheck} from "../../hooks/usePaymentTypeCheck";

const Index = () => {
    const {pageState,pageDispatch} = useContext(PaymentTypeContext)
    const {paymentType} = pageState;
    const {list} = paymentType;
    const displayLoading = paymentType.loading
    const paginationAmount = paymentType.pagination.amount
    const paginationTotalItems = paymentType.pagination.totalItems
    return (
        <StyledPaymentTypeTable>
            { !displayLoading ? (
                Array.from(Array(paginationAmount), (e, i) => (
                    <PaymentTypeSkeleton key={i} />
                ))
            ) : paginationTotalItems > 0 ? (
                list.map(item => <PaymentTypeTd key={item.id} item={item} pageDispatch={pageDispatch} pageState={pageState} />)
            ) : (
                <OrderEmpty />
            )}

        </StyledPaymentTypeTable>

    )
}
export default Index;
const PaymentTypeSkeleton = ({...props}) => {
    return (
        <Tr className={'payment_type_table'} {...props}>
            {Array.from(Array(6), (e, i) => (
                <Td key={i} className="payment_type_table_td" data-type="td">
                    <Skeleton
                        sx={{
                            width: '100%',
                            height: 33,
                            background:
                                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                        }}
                    />
                </Td>
            ))}
        </Tr>
    )
}
const PaymentTypeTd = ({item, pageDispatch, pageState})=>{
    const {detail_payment} = usePaymentTypeTable()
    const check = pageState?.paymentType.is_check
    const { is_check, handleStatus, isActive, disable } = usePaymentTypeCheck()
    const handleActionApply = type => {
        switch (type?.name) {
            case PAYMENT_TYPE_ROW_MENU[0].name:
                detail_payment.fetch(type?.id)
                break
            case  PAYMENT_TYPE_ROW_MENU[1].name:
               pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                       delete_payment:true,
                   }})
                pageDispatch({type:PaymentTypeActions.GET_ID,payload:item.id})
                break

            default:
                break
        }
    }
    return(
        <Tr>
            <Td>
                <CheckBoxConsignment
                    isChecked={check.includes(item.id)}
                    disable={+item.is_default === 1? true : false}
                    handleClick={() =>{
                        is_check(item.id)
                    }}
                />
            </Td>
            <Td  className={'payment_type_table_td'}>
                <Tooltip baseOn={'width'} title={item.code} className={'tooltip_v2'} >
                    <Text>
                        {item.code}
                    </Text>
                </Tooltip>
            </Td>
            <Td  className={'payment_type_table_td'}>
                <Tooltip baseOn={'width'} title={item.name} className={'tooltip_v2'} >
                    <Text>
                        {item.name}
                    </Text>
                </Tooltip>
            </Td>
            <Td  className={'payment_type_table_td'}>
                <Tooltip baseOn={'height'} title={item.description} className={'tooltip'} >
                    <Text>
                        {item.description}
                    </Text>
                </Tooltip>
            </Td>
            <Td className={'payment_type_table_td'}>
                <SwitchStatus
                    id={item.id}
                    status={isActive[item.id] === undefined ? item.status : isActive[item.id]}
                    handleChange={handleStatus}
                    disabled={+item?.is_default === 1 ? true : disable}
                />
            </Td>
            <Td className={'payment_type_table_td'}>
                <RowMenuPopover
                    id={item.id}
                    onActionClick={handleActionApply}
                    isDefault={item.is_default}
                />
            </Td>
        </Tr>
    )
}
