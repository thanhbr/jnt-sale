import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import RenderNote from 'Component/TextArea/TextArea'
import {Checkbox} from 'common/form/checkbox'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import {DELIVERY_ICON} from 'Pages/DeliveryNote/icon/_icon'
import React, {useContext, useRef, useState} from 'react'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'
import {Delivery} from 'Pages/DeliveryNote'
import {ActionType} from 'Pages/DeliveryNote/store/action'
import { Switch } from 'common/switch'
import { useCreateNote } from 'Pages/DeliveryNote/useDelivery/useCreate'

export default function InfoDelivery() {
  const {state, dispatch} = useContext(Delivery)
  let info = state.infoNote
  const {onChangeTextNote, onChangePositionNote} = useCreateNote()
  const [isStatus, setIsStatus] = useState(info?.status)
  const [isDefault, setIsDefault] = useState(false)
  const [isDisable,setIsDisable] = useState(false)
 
  const changeCheckboxnote = () => {
    setIsDefault(!isDefault)
    if (isDefault) dispatch({type: ActionType.IS_DEFAULT, payload: 1})
    else dispatch({type: ActionType.IS_DEFAULT, payload: 0})
  }
  const changeStatusNote = () => {
    if(isStatus){
      setIsStatus(false)
      setIsDisable(true)
      dispatch({type:ActionType.STATUS,payload:-1})
  }else{
    setIsStatus(true)
      setIsDisable(false)
      dispatch({type:ActionType.STATUS,payload:1})
  }

  }
  return (
    <div className="delivery_info">
      <div className="delivery_info-header">
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={20}
          fontWeight={600}
        >
          Thông tin mẫu ghi chú giao hàng
        </Text>
        <Text
          as={'p'}
          color={THEME_COLORS.gray_300}
          fontSize={15}
          fontWeight={400}
        >
          “Giúp chủ shop ghi chú nhanh khi thực hiện nhập thông tin giao hàng”
        </Text>
      </div>
      <div className="delivery_info-body">
        <div className="delivery_info-note">
          <Text
            className="delivery_info-title"
            as={'p'}
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Nội dung ghi chú <span className="delivery_info-icon">*</span>
          </Text>
          <textarea
            onChange={e => onChangeTextNote(e)}
            placeholder="Nhập nội dung ghi chú"
            defaultValue={info && info.content}
            className={state.valid_note.valid==true?"delivery_info-textArea error_border":'delivery_info-textArea'}
            onBlur={e=>{
              let {value}=e.target
              if(value !='') dispatch({type:ActionType.ERROR_NOTE,payload:{valid:false,error:''}})
              else onChangeTextNote(e)
            }}
          />
          {state.valid_note.valid==true && <p className='delivery_info-error'>{state.valid_note.error}</p>}
        </div>
        <div className="delivery_info-position">
          <Text
            as={'p'}
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Vị trí hiển thị
            <CustomToolTip
              placement="right"
              title={
                'Vị trí 0 sẽ xuất hiện đầu tiên, số càng lớn, vị trí càng thấp'
              }
            >
              <span className="delivery_info-icon">
                {DELIVERY_ICON.question}
              </span>
            </CustomToolTip>
          </Text>
          <input
            onChange={e => onChangePositionNote(e)}
            onFocus={e=>{
              let {value} =e.target;
              if(value == '') dispatch({type:ActionType.ERROR_POSITION,payload:{valid:false,error:''}})
              else onChangePositionNote(e)
            }}
            onBlur={e=>{
              let {value} =e.target;
              if(value == '') dispatch({type:ActionType.ERROR_POSITION,payload:{valid:false,error:''}})
              else onChangePositionNote(e)
            }}
            placeholder="Nhập vị trí hiển thị"
            defaultValue={info ? info.position : ''}
            className={state.valid_position.valid==true?"delivery_info-positionInput error_border":'delivery_info-positionInput'}
          />
          {state.valid_position.valid==true && <p className='delivery_info-error'>{state.valid_position.error}</p>}
        </div>
        <div className="delivery_info-checkbox">
          <Checkbox
            onChange={changeCheckboxnote}
            checked={info?.is_default == 1 ? true : isDefault}
            disabled={isDisable}
          />
          <Text
            className="delivery_info-checkboxText"
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Sử dụng làm mẫu ghi chú giao hàng mặc định
          </Text>
        </div>
        {isDefault == false && <div className="delivery_info-status">
          <SwitchStatus
            status={isStatus}
            handleChange={changeStatusNote}
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
