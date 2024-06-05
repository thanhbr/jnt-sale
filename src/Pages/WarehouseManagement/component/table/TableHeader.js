import React, { useContext, useReducer, useState } from 'react'
import { listDrop, tableHeader } from '../../interFace'
import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { useCheckBox } from './useCheckbox'
import Dropdown from 'Component/PureDropdown/Dropdown'
import { ActionType } from '../../store/action'
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import { Button } from 'common/button'
export default function TableHeader() {
    const { state, dispatch } = useContext(WarehouseManager)
    const { checkAll, isCheckAll, handleActive } = useCheckBox()
    const [open, setOpen] = useState(false)
    const count = state.count
    const show = () => {
        if (tableHeader) {
            return tableHeader.map((item, index) => {
                return (
                    <Td key={index} className={'table__warehouse-manager' + item.class}>
                        <div>
                            <Text
                                color={THEME_COLORS.secondary_100}
                                fontSize={14}
                                fontWeight={600}
                                lineHeight={20}
                            >{item.title}</Text>
                        </div>
                    </Td>
                )
            })
        }
    }
    const selectOption = action => {
        let value = action.value;
        let ids = state.isCheck
        if (value == 1) {
            handleActive({ id: ids, status: 1 })
        } else handleActive({ id: ids, status: -1 })
    }
    const showActive = () => {
        return (
            <Td className="warehouse-manager__td">
                <Text as="b">
                    {count > 9
                        ? count
                        : `0${count}`}{' '}
                    ghi chú được chọn
                </Text>
                <div className="warehouse-manager__td__selected-action-dropdown">
                    <Button
                        className="warehouse-manager__td__selected-action-toggle"
                        size="xs"
                        onClick={() => setOpen(true)}
                    >
                        Thao tác {ORDER_ICONS.caretRight}
                    </Button>
                    {open && (
                        <>
                            <div
                                className="warehouse-manager__td__selected-action-backdrop"
                                onClick={() => setOpen(false)}
                            ></div>
                            <ul className="warehouse-manager__td__selected-action-menu common-popover">
                                <li
                                    className="warehouse-manager__td__selected-action-menu-item"
                                    onClick={() => {
                                        setOpen(false)
                                        handleActive({ id: state.isCheck, status: 1 })
                                    }}
                                >
                                    <Text>Kích hoạt</Text>
                                </li>
                                <li
                                    className="warehouse-manager__td__selected-action-menu-item"
                                    onClick={() => {
                                        setOpen(false)
                                        handleActive({ id: state.isCheck, status: -1 })
                                    }}
                                >
                                    <Text>
                                        Ngưng kích hoạt
                                    </Text>
                                </li>
                            </ul>
                        </>
                    )}
                </div>

            </Td>
        )
    }
    return (
        <Tr
            type="tHead"
            className='table__warehouse-manager-header'
        >
            {/* <Td className='table__warehouse-manager-checkbox' >
                <CheckBoxConsignment isChecked={isCheckAll} handleClick={checkAll} />
            </Td> */}
            {count == 0 ? show() : showActive()}
            <Td className='table__warehouse-manager-option'>

            </Td>
        </Tr>
    )
}
