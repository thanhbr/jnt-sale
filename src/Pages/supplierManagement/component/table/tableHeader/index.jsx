import React, {useContext, useState} from 'react';
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import {StyledSupplierTableHeader} from "./_styled";
import {SUPPLIER_TABLE_HEADER} from "../../../interfaces/_const";
import {Text} from "../../../../../common/text";
import CheckBoxConsignment from "../../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {useCheckStatusSupplier} from "../../../hook/useCheckStatusSupplier";
import {SupplierManagement} from "../../../provider/_context";
import {Button} from "../../../../../common/button";
import {ORDER_ICONS} from "../../../../refactorOrder/interfaces/_icons";

const Index = ()=>{
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const {checkAll, handleActive,shouldActiveCheckbox,is_check} = useCheckStatusSupplier()
    const [open, setOpen] = useState(false)
    const data = pageState.list
    const render_td = ()=>{
        if(SUPPLIER_TABLE_HEADER){
            return SUPPLIER_TABLE_HEADER.map((item,index)=>{
                return(
                    <Td key={item.id} className={item.class}>
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
    const checkFullPageChecked = () => {
        let checkFullPage = true;
        data.forEach(item => {
            const findItem = pageState.is_check?.find(find => find === item.id)
            if (!!!findItem) checkFullPage = false
        })
        return checkFullPage
    }
    return(
        <StyledSupplierTableHeader>
            <Tr type={'tHead'} className = {'supplier-management-table_header'}>
                <Td className = {'supplier-management-table_checkbox'}>
                    <CheckBoxConsignment
                        minus={!checkFullPageChecked()}
                        handleClick={checkAll}
                        isChecked={shouldActiveCheckbox}
                    />
                </Td>
                {pageState.is_check.length == 0 ? <>
                        {render_td()}
                        <Td className = {'supplier-management-table_setting'}></Td>
                </> :
                    <Td className="supplier-management-table-header__cell" data-selected="true">
                        <Text as="b">
                            {pageState.is_check.length > 9
                                ? pageState.is_check.length
                                : `0${pageState.is_check.length}`}{' '}
                            nhà cung cấp được chọn
                        </Text>
                        <div className="supplier-management-table-header__selected-action-dropdown">
                            <Button
                                className="supplier-management-table-header__selected-action-toggle"
                                size="xs"
                                onClick={() => setOpen(true)}
                            >
                                Thao tác {ORDER_ICONS.caretRight}
                            </Button>
                            {open && (
                                <>
                                    <div
                                        className="supplier-management-table-header__selected-action-backdrop"
                                        onClick={() => setOpen(false)}
                                    ></div>
                                    <ul className="supplier-management-table-header__selected-action-menu common-popover">
                                        <li
                                            className="supplier-management-table-header__selected-action-menu-item"
                                            onClick={() => {
                                                setOpen(false)
                                                handleActive({id: pageState.is_check, status: 1})
                                            }}
                                        >
                                            Kích hoạt
                                        </li>
                                        <li
                                            className="supplier-management-table-header__selected-action-menu-item"
                                            onClick={() => {
                                                setOpen(false)
                                                handleActive({id: pageState.is_check, status: 0})
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
        </StyledSupplierTableHeader>

    )
}
export default Index