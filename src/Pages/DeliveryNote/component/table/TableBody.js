import React, { useContext, useReducer, useState } from 'react'
import { Delivery } from 'Pages/DeliveryNote';
import { SwitchStatus } from 'Component/SwitchStatus/SwitchStatus';
import { CONSIGNMENT } from 'Component/Icons';
import { CustomToolTip } from 'Component/tooltip/CustomTooltip';
import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { useDelivery } from 'Pages/DeliveryNote/useDelivery/useDelivery';
import { ActionType } from 'Pages/DeliveryNote/store/action';
import { useCheckBox } from './useCheckbox';
import { DELIVERY_ICON } from 'Pages/DeliveryNote/icon/_icon';
import { changeDateTime } from 'Pages/DeliveryNote/changeDateTime';
import { Tooltip } from 'common/tooltipv2';
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment';
export default function TableBodyDelivery() {
    const { state, dispatch } = useContext(Delivery)
    const { getDetailDelivery } = useDelivery()
    const [isHover, setIsHover] = useState(-1)
    const {
        changeStatus,
        isActive,
        is_check,
        disable
    } = useCheckBox()
    const { formatTime } = changeDateTime()
    const list = state.listNote;
    const openDetail = (id) => {
        dispatch({ type: ActionType.OPEN_MODAL, payload: true })
        dispatch({type:ActionType.DISABLE_SAVE,payload:false})
        getDetailDelivery(id)

    }
    let check = state.isCheck
    const show = () => {
        if (list) {
            return list.map((item, index) => {

                return (
                    <Tr key={index} className='table__delivery-row' onMouseEnter={() => setIsHover(index)} onMouseLeave={() => setIsHover(-1)}>
                        <Td className='table__delivery-checkbox'>
                            <CheckBoxConsignment 
                            isChecked={item.is_default == 1? false :check.includes(item.id)} 
                            disable={item.is_default == 1? true : false} 
                            handleClick={() => is_check(item.id)} />
                        </Td>
                        <Td className='table__delivery-note'>
                                <Tooltip title={item.content} placement='top-center' baseOn='height' className='tooltipv2'>
                                    <Text className='tooltipv2-text'>{item.content}</Text>
                                </Tooltip>

                                    <CustomToolTip title={'Mẫu ghi chú giao hàng mặc định'}>
                                        <span   className="tooltipv2_icon">{item.is_default == 1 ? DELIVERY_ICON.tick:''}</span>
                                    </CustomToolTip>
                        </Td>
                        <Td className='table__delivery-date'>
                            <Text className='table__delivery-content'>{formatTime(item.dt_created)}</Text>
                        </Td>
                        <Td className='table__delivery-status'>
                            <div>
                                {item.is_default == 0 && <SwitchStatus disabled={disable} id={item.id} status={isActive[item.id] == undefined ? item.status : isActive[item.id]} handleChange={changeStatus} />}
                            </div>
                        </Td>
                        <Td className='table__delivery-option'> 
                            <CustomToolTip title={'Chỉnh sửa'}>
                                {
                                    isHover == index ? <span className='table__delivery-fix' onClick={() => openDetail(item.id)}>
                                        {CONSIGNMENT.iconFix}
                                    </span> : <span className='table__delivery-dots'>
                                        {CONSIGNMENT.iconDots}
                                    </span>
                                }
                            </CustomToolTip>
                        </Td>
                    </Tr >
                )
            })
        }
    }
    return (
        <>
            {show()}

        </>
    )
}
