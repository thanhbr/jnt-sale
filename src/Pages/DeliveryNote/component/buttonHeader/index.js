import React, { useContext } from 'react'
import "./index.scss"
import { Button } from 'common/button';
import { CONSIGNMENT } from 'Component/Icons';
import {SETTING} from 'Component/Icons';
import { Delivery } from 'Pages/DeliveryNote';
import { ActionType } from 'Pages/DeliveryNote/store/action';
export default function ButtonHeader({...props}) {
  const {state, dispatch} =useContext(Delivery)
  const clickModal=()=>{
    dispatch({type:ActionType.OPEN_MODAL,payload:true})
    dispatch({type:ActionType.DISABLE_SAVE,payload:false})
  }
  return (
    <div className='btn__main'>
        <Button appearance="secondary" icon={SETTING.reload} className="btn__main-reload"></Button>
        <Button appearance="primary" className="btn__main-create" onClick={clickModal}>{CONSIGNMENT.plus} <span className="btn__main-text">Thêm mới</span></Button>
    </div>
  )
}
