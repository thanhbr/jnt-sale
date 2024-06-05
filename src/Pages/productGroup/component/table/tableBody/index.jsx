import React, { useContext, useEffect, useReducer } from "react";
import { ProductGroup } from "Pages/productGroup/provider/_context";
import "./index.scss"
import { Tr } from "layouts/tableLayout/_tr";
import { Td } from "layouts/tableLayout/_td";
import CheckBoxConsignment from "Component/CheckBoxConsignment/CheckBoxConsignment";
import { Text } from "common/text";
import { RowMenuPopover } from "./_dropdownMenu";
import { SwitchStatus } from "Component/SwitchStatus/SwitchStatus";
import Skeleton from "../../skeleton/index"
import { useProductCheckbox } from "Pages/productGroup/hook/useProductCheckbox";
import { useProductAction, useProductInitialState, useProductReducer } from "Pages/productGroup/provider/_reducer";
import { PRODUCT_GROUP_ICON } from "Pages/productGroup/interface/icon";
import EmptyProduct from "../../empty/index"
import { useModal } from "../../../hook/useModal";
import { Tooltip } from "common/tooltipv2";
const Index = () => {
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const list = pageState.listCategory
    const load = pageState.loading
    const check = pageState.is_check
    const { is_check, handleStatus, isActive, disable } = useProductCheckbox()
    const { getDetailProduct } = useModal()
    const handleActionApply = (action) => {
        switch (action) {
            case 1:
                getDetailProduct()
                setTimeout(() => {
                    pageDispatch({ type: useProductAction.OPEN_MODAL, payload: true })
                }, 300)

                break;

            case 2:
                pageDispatch({ type: useProductAction.CHECK_CONFIRM_DELETE, payload: !pageState.check_confirm_delete })
                break;

            default:
                break;
        }
    }
    const show = () => {
        if (list) {
            return list.map((item, index) => {
                return (
                    <>
                        <Tr key={index} className='product-group-table-body'>
                            <Td className='product-group-table-body-checkbox'>
                                <CheckBoxConsignment
                                    isChecked={check.includes(item.id)}
                                    handleClick={() => is_check(item.id)}
                                />
                            </Td>
                            <Td className='product-group-table-body-code'>
                                <Tooltip className="product-group-table-body_tooltip-code" baseOn="width" placement='top-center' title={item.category_code}>
                                    <Text>{item.category_code}</Text>
                                </Tooltip>
                            </Td>
                            <Td className='product-group-table-body-name'>
                                <Tooltip className="product-group-table-body_tooltip" baseOn="height" placement='top-center' title={item.category_name}>
                                    <Text>{item.category_name}</Text>
                                </Tooltip>
                            </Td>
                            <Td className='product-group-table-body-note'>
                                <Tooltip className="product-group-table-body_note-tooltip" baseOn="height" placement='top-center' title={item.category_note}>
                                    <Text>{item.category_note}</Text>
                                </Tooltip>
                            </Td>
                            <Td className='product-group-table-body-status'>
                                <SwitchStatus
                                    id={item.id}
                                    status={isActive[item.id] == undefined ? item.status : isActive[item.id]}
                                    handleChange={handleStatus}
                                    disabled={disable}
                                />
                            </Td>
                            <Td className='product-group-table-body-setting'>
                                <RowMenuPopover
                                    dataRow={item}
                                    index={item.id}
                                    onActionClick={handleActionApply}
                                />
                            </Td>
                        </Tr>
                        {item.category_childs && item.category_childs.map((conent, index) => {
                            return <Tr key={index} className='product-group-table-body'>
                                <Td className='product-group-table-body-checkbox'>
                                    <CheckBoxConsignment
                                        isChecked={check.includes(conent.id)}
                                        handleClick={() => is_check(conent.id)}
                                    />
                                </Td>
                                <Td className='product-group-table-body-code'>
                                    <Tooltip className="product-group-table-body_tooltip-code" baseOn="width" placement='top-center' title={conent.category_code}>
                                        <Text>{conent.category_code}</Text>
                                    </Tooltip>
                                </Td>
                                <Td className='product-group-table-body-name'>
                                    <Tooltip className="product-group-table-body_tooltip" baseOn="height" placement='top-center' title={conent.category_name}>
                                        <Text style={{ paddingTop: "5px" }}>{PRODUCT_GROUP_ICON.group}</Text>
                                        <Text>{conent.category_name}</Text>
                                    </Tooltip>
                                </Td>
                                <Td className='product-group-table-body-note'>
                                    <Tooltip className="product-group-table-body_note-tooltip" baseOn="height" placement='bottom' title={conent.category_note}>
                                        <Text>{conent.category_note}</Text>
                                    </Tooltip>
                                </Td>
                                <Td className='product-group-table-body-status'>
                                    <SwitchStatus
                                        id={conent.id}
                                        status={isActive[conent.id] == undefined ? item.status : isActive[conent.id]}
                                        handleChange={handleStatus}
                                        disabled={disable}
                                    />
                                </Td>
                                <Td className='product-group-table-body-setting'>
                                    <RowMenuPopover
                                        dataRow={conent}
                                        index={conent.id}
                                        onActionClick={handleActionApply}
                                    />
                                </Td>
                            </Tr>
                        })}
                    </>

                )
            })
        }
    }
    const showBody = () => {
        if (list.length > 0 && load) return (<>{show()}</>)
        else if (!load) return <Skeleton numb={list?list.length:20} />
        else return <EmptyProduct />
    }
    return (
        <>
            {showBody()}
        </>
    )
}
export default Index