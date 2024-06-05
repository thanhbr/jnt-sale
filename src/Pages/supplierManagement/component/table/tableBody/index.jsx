import React, {useContext, useEffect, useState} from "react";
import {StyledSupplierTableBody} from "./_styled";
import {SupplierManagement} from "../../../provider/_context";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import CheckBoxConsignment from "../../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {Text} from "../../../../../common/text";
import {SwitchStatus} from "../../../../../Component/SwitchStatus/SwitchStatus";
import {ICON} from "../../../interfaces/_icon";
import Row from "./dropDown";
import {useSupplierManagementAction} from "../../../provider/_reducer";
import RowOrderExtra from "./TabDetail";
import {useDetailRow} from "../../../hook/useDetailRow";
import {useModal} from "../../../hook/useModal";
import {useCheckStatusSupplier} from "../../../hook/useCheckStatusSupplier";
import {Tooltip} from "../../../../../common/tooltipv2";
import { useSearchParams } from "react-router-dom";
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search') || ''
    const {list} = pageState
    const [isTableHover, setIsTableHover] = useState(-1)
    const [supplierId, setSupplierId] = useState()
    const detailRow = useDetailRow(supplierId)
    const { detailActive, shouldOpenDetail, rowDetailToggle } = detailRow
    const {detail} = useModal()
    const check = pageState.is_check
    const { is_check, handleStatus, isActive, disable } = useCheckStatusSupplier()
    useEffect(() => {
        if (list.length === 1){
            setSupplierId(list[0].supplier_id)
            rowDetailToggle(list[0].supplier_id)
        }
    }, [list])
    const handleActionApply = (action,id) => {
        switch (action) {
            case 1:
                    detail.fetchDetailSupplier()
                    setTimeout(()=>{
                        pageDispatch({ type: useSupplierManagementAction.OPEN_MODAL, payload: true })
                    },300)

                break
            case 2:
                pageDispatch({ type: useSupplierManagementAction.OPEN_CONFIRM_DELETE, payload: true })
                break
            default:
                break
        }
    }
    const render_table = ()=>{
        if(list){
            return list.map((item,index)=>{
                return (
                    <Tr key={item.supplier_id}
                        onMouseEnter={() => setIsTableHover(item.supplier_id)}
                        onMouseLeave={() => setIsTableHover()}
                        extra={
                            shouldOpenDetail && <RowOrderExtra
                                active={shouldOpenDetail && item.supplier_id === supplierId}
                                data={detailActive}
                                history={pageState.purchase_list}
                                rowData={detailRow}
                            />
                        }
                        data-active={shouldOpenDetail && item.supplier_id === supplierId}
                        onClick={() => {
                            setSupplierId(item.supplier_id)
                            rowDetailToggle(item.supplier_id)
                        }}
                        className={'supplier-management-table_body'}>
                        <Td className={'supplier-management-table_checkbox'} onClick={e => e.stopPropagation()}>
                            <CheckBoxConsignment
                                isChecked={check.includes(item.supplier_id)}
                                handleClick={() =>{
                                    e => e.stopPropagation()
                                    is_check(item.supplier_id)
                                }}
                            />
                        </Td>
                        <Td className={'supplier-management-table_code-supplier'}>
                            <Tooltip baseOn={'height'} className={'supplier-management-table_supplier_name-tooltip_code'} title={item.supplier_code}>
                                <Text fontWeight={600}>{item.supplier_code}</Text>
                            </Tooltip>
                        </Td>
                        <Td className={'supplier-management-table_name-supplier'}>
                            <Tooltip baseOn={'height'} title={item.supplier_name} className={'supplier-management-table_supplier_name-tooltip'} >
                                <Text>{item.supplier_name}</Text>
                            </Tooltip>

                        </Td>
                        <Td className={'supplier-management-table_address-supplier'}>
                            <Tooltip baseOn={'height'} placement='top-center' title={item.address} className={'supplier-management-table_address-supplier-tooltip'}>
                                    <Text>
                                        {item.address}
                                    </Text>

                            </Tooltip>

                        </Td>
                        <Td className={'supplier-management-table_phone-supplier'}>
                            <Text>
                                {item.mobile}
                            </Text>
                        </Td>
                        <Td className={'supplier-management-table_note-supplier'}>
                            <Tooltip baseOn={'height'} title={item.details} className={'supplier-management-table_note-supplier-tooltip'}>
                            <Text>
                                {item.details}
                            </Text>
                            </Tooltip>
                        </Td>
                        <Td className={'supplier-management-table_status-supplier'}>
                                <div  onClick={e=>e.stopPropagation()}>
                                    <SwitchStatus
                                        id={item.supplier_id}
                                        status={isActive[item.supplier_id] == undefined ? item.status : isActive[item.supplier_id]}
                                        handleChange={handleStatus}
                                        disabled={disable}
                                    />
                                </div>
                        </Td>
                        <Td className={'supplier-management-table_setting'} onClick={(e)=>e.stopPropagation()}>
                            {item.supplier_id === isTableHover && <Text  onClick={() => {
                                setSupplierId(item.supplier_id)
                                rowDetailToggle(item.supplier_id)
                            }} onMouseEnter={() => setIsTableHover(item.supplier_id)} data-active={shouldOpenDetail && item.supplier_id === supplierId} className={'supplier-management-table_setting-down'}>{ICON.down}</Text>
                            }
                            <Row
                                dataRow={item}
                                onActionClick={handleActionApply}
                                isTableHover={isTableHover}
                            />
                        </Td>
                    </Tr>
                )
            })
        }
    }
    return(
        <StyledSupplierTableBody>
            {render_table()}
        </StyledSupplierTableBody>
    )
}
export default Index;