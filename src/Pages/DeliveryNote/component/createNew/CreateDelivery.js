import { Checkbox } from "common/form/checkbox";
import './CreateDelivery.scss';
import { Text } from "common/text";
import { THEME_COLORS } from "common/theme/_colors";
import CheckBoxConsignment from "Component/CheckBoxConsignment/CheckBoxConsignment";
import { SwitchStatus } from "Component/SwitchStatus/SwitchStatus";
import { CustomToolTip } from "Component/tooltip/CustomTooltip";
import { Delivery } from "Pages/DeliveryNote";
import { DELIVERY_ICON } from "Pages/DeliveryNote/icon/_icon";
import { ActionType } from "Pages/DeliveryNote/store/action";
import React, { useContext, useState } from "react";
import { useCreateNote } from "../../useDelivery/useCreate";
import { Tooltip } from "common/tooltip";
import { useEffect } from "react";
import {Textarea} from "../../../../common/form/textarea";

export default function CreateDelivery({...props}) {
  const { state, dispatch } = useContext(Delivery)
  const info = state.infoNote
  const { onChangeTextNote, onChangePositionNote, } = useCreateNote()
  const [positionForm,setPositionForm] = useState('')
  const {
    isDefault,
    isActive,
    changeDefault,
    changeActive, isDisable
  } = useCreateNote()
  const [checkEmpty,setCheckEmpty] = useState(true)
  useEffect(()=>{
    if(info){
      setPositionForm(info?.position)
    }
  },[info])

  return (
    <div className="delivery_info">
      <div className="delivery_info-header">
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={20}
          fontWeight={600}
          lineHeight={28}
        >
          Thông tin mẫu ghi chú giao hàng
        </Text>
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={15}
          fontWeight={400}
          lineHeight={21}
          className='delivery__create-p'
        >
          “Giúp chủ shop ghi chú nhanh khi thực hiện nhập thông tin giao hàng”
        </Text>
      </div>
      <div className="delivery_info-body">
        <div className="delivery_info-note">

          <Textarea
              {...props}
              label={
                <>
                  Nội dung ghi chú <span className="delivery_info-icon">*</span>
                </>
              }
              placeholder={'Nhập nội dung ghi chú'}
              value={state.content}
              validateText={state.valid_note.valid ? state.valid_note.error : null}
              validateType={!state.valid_note.valid ? 'success' : 'danger'}
              onChange={e =>onChangeTextNote(e)}
              onBlur={e => onChangeTextNote(e)}
          />
        </div>
        <div className="delivery_info-position">
          <div className="delivery_info-question">
            <Text
              as={'p'}
              color={THEME_COLORS.gray_300}
              fontSize={14}
              fontWeight={400}
              lineHeight={19.6}
            >
              Vị trí hiển thị

            </Text>
            <Tooltip placement='right' title={'Vị trí 0 sẽ xuất hiện đầu tiên, số càng lớn, vị trí càng thấp'}>{DELIVERY_ICON.question}</Tooltip>
          </div>
          <input
            onChange={e => {
              let {value} = e.target
              if(value !=='') dispatch({type:ActionType.CHECK_CONFIRM,payload:false})
              const re = /^[0-9\b]+$/;
              if (value === '' || re.test(value)) {
                setPositionForm(value)
                onChangePositionNote(e)
              }
            }}
            value={positionForm}
            onFocus={e => {
              let { value } = e.target;
              if (value == '') dispatch({ type: ActionType.ERROR_POSITION, payload: { valid: false, error: '' } })
              else onChangePositionNote(e)
            }}
            onBlur={e => {
              let { value } = e.target;
              if (value == '') dispatch({ type: ActionType.ERROR_POSITION, payload: { valid: false, error: '' } })
              else onChangePositionNote(e)
            }}
            maxLength={3}
            placeholder="Nhập vị trí hiển thị"
            className={state.valid_position.valid == true ? "delivery_info-positionInput error_border" : 'delivery_info-positionInput'}
          />
          {state.valid_position.valid == true && <p className='delivery_info-error'>{state.valid_position.error}</p>}
        </div>
        <div className="delivery_info-checkbox" data-disable={isDisable}>
          <CheckBoxConsignment
            isChecked={isDefault}
            disable={isActive==false?true:isDisable}
            handleClick={changeDefault}
          />
          <Text
            className="delivery_info-checkboxText"
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
            onClick={isDisable?'':changeDefault}
          >
            Sử dụng làm mẫu ghi chú giao hàng mặc định
          </Text>
        </div>
        {isDefault == false && <div className="delivery_info-status">
          <SwitchStatus
            status={isActive}
            handleChange={changeActive}
          />
          <Text
            className="delivery_info-statusText"
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Kích hoạt/Ngưng sử dụng
          </Text>
        </div>}

      </div>
    </div>
  )
}
