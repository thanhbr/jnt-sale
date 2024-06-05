import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import RenderNote from 'Component/TextArea/TextArea'
import {Checkbox} from 'common/form/checkbox'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import {UNIT_ICON} from 'Pages/UnitsManage/icon/_icon'
import React, {useContext, useRef, useState} from 'react'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'
import {Unit} from 'Pages/UnitsManage'
import {ActionType} from 'Pages/UnitsManage/store/action'
import { Switch } from 'common/switch'
import { usecreateUnit } from 'Pages/UnitsManage/useUnit/useCreate'

export default function InfoUnit() {
  const {state, dispatch} = useContext(Unit)
  let info = state.infoNote
  const {onChangeTextNote, onChangePositionNote} = usecreateUnit()
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
    <div className="units-manage">
      <div className="units-manage-header">
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
      <div className="units-manage-body">
        <div className="units-manage-note">
          <Text
            className="units-manage-title"
            as={'p'}
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Nội dung ghi chú <span className="units-manage-icon">*</span>
          </Text>
          <textarea
            onChange={e => onChangeTextNote(e)}
            placeholder="Nhập nội dung ghi chú"
            defaultValue={info && info.content}
            className={state.valid_note.valid==true?"units-manage-textArea error_border":'units-manage-textArea'}
            onBlur={e=>{
              let {value}=e.target
              if(value !='') dispatch({type:ActionType.ERROR_UNIT,payload:{valid:false,error:''}})
              else onChangeTextNote(e)
            }}
          />
          {state.valid_note.valid==true && <p className='units-manage-error'>{state.valid_note.error}</p>}
        </div>
        <div className="units-manage-position">
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
              <span className="units-manage-icon">
                {UNIT_ICON.question}
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
            className={state.valid_position.valid==true?"units-manage-positionInput error_border":'units-manage-positionInput'}
          />
          {state.valid_position.valid==true && <p className='units-manage-error'>{state.valid_position.error}</p>}
        </div>
        <div className="units-manage-checkbox">
          <Checkbox
            onChange={changeCheckboxnote}
            checked={info?.is_default == 1 ? true : isDefault}
            disabled={isDisable}
          />
          <Text
            className="units-manage-checkboxText"
            color={THEME_COLORS.gray_300}
            fontSize={14}
            fontWeight={400}
          >
            Sử dụng làm mẫu ghi chú giao hàng mặc định
          </Text>
        </div>
        {isDefault == false && <div className="units-manage-status">
          <SwitchStatus
            status={isStatus}
            handleChange={changeStatusNote}
          />
          <Text
            className="units-manage-statusText"
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
