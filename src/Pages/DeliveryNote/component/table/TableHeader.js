import React, { useContext, useReducer, useState } from 'react'
import { listDrop, tableHeader } from 'Pages/DeliveryNote/interFace'
import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { Delivery } from 'Pages/DeliveryNote'
import { useCheckBox } from './useCheckbox'
import Dropdown from 'Component/PureDropdown/Dropdown'
import { ActionType } from 'Pages/DeliveryNote/store/action'
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import { Button } from 'common/button'
import { useEffect } from 'react'
export default function TableHeader() {
    const { state, dispatch } = useContext(Delivery)
    const { checkAll, isCheckAll, handleActive, shouldActiveCheckbox } = useCheckBox()
    const [open, setOpen] = useState(false)
    const count = state.count
    const show = () => {
        if (tableHeader) {
            return tableHeader.map((item, index) => {
                return (
                    <Td key={index} className={'table__delivery' + item.class}>
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
    const defaultNote = state.listNote?.find(item => item.is_default == 1)
    
    const checkFullPageChecked = () => {
        let checkFullPage = true
        state.listNote?.forEach(item => {
            const findItem = state.isCheck?.find(find => find === item.id)
            if (!!!findItem) checkFullPage = false
        })
        return checkFullPage
    }
    const showActive = () => {
        return (
            <Td className="delivery__td">
                <Text as="b">
                    {state.isCheck?.length < 10 ?
                       `0${state.isCheck?.length}`
                    : defaultNote?.is_default == 1?
                        state.isCheck?.length - 1
                    : state.isCheck?.length} {' '}
                     ghi chú được chọn
                </Text>
                <div className="delivery__td__selected-action-dropdown">
                    <Button
                        className="delivery__td__selected-action-toggle"
                        size="xs"
                        onClick={() => setOpen(true)}
                    >
                        Thao tác {ORDER_ICONS.caretRight}
                    </Button>
                    {open && (
                        <>
                            <div
                                className="delivery__td__selected-action-backdrop"
                                onClick={() => setOpen(false)}
                            ></div>
                            <ul className="delivery__td__selected-action-menu common-popover">
                                <li
                                    className="delivery__td__selected-action-menu-item"
                                    onClick={() => {
                                        setOpen(false)
                                        handleActive({ id: state.isCheck, status: 1 })
                                    }}
                                >
                                    <Text>Kích hoạt</Text>
                                </li>
                                <li
                                    className="delivery__td__selected-action-menu-item"
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
            className='table__delivery-header'
        >
            <Td className='table__delivery-checkbox' >
                <CheckBoxConsignment
                    isChecked={shouldActiveCheckbox}
                    handleClick={checkAll}
                    minus={!checkFullPageChecked()}
                />
            </Td>
            {state.isCheck?.length == 0 ? show() : showActive()}
            <Td className='table__delivery-option'>

            </Td>
        </Tr>
    )
}
