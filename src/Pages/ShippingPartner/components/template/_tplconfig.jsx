import React, { useState} from 'react'
import {StyledRadioButton} from './_styled'
import {Checkbox} from 'common/form/checkbox'
import usePartnerContext from '../../hooks/partnerContext'
import { useTranslation } from "react-i18next";

export const CheckBoxButton =(props)=>{ 
    const cbk = props.disabled ? false : props.status == 1 ? true:false;
    const [checkbox, selected] = useState(cbk);
    const [infoState,infoDispatch] = usePartnerContext();
    const { t } = useTranslation();
    return (
        <div className='mgt-cbk'  onClick={e => {
          selected(checkbox == true ? false:true);
          infoDispatch({type: props.type, payload: (checkbox == true ? 0:1)})
          infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
        }}>
        <Checkbox
          checked={checkbox}
          {...props}
        /> <div className="cursor modal-config_lb_switch">{t(props.name)}</div>
        </div>
    )
}


export const RadioButton =(props)=>{
    const [infoState,infoDispatch] = usePartnerContext(); 
    const param = props.params;
    const { t } = useTranslation();
    return (
        <>
        <StyledRadioButton> 
          {(props.data.map((item, index) => ( 
            <div 
              key={index}
              className=""
            >
                <label className="radio-item"  value={item.value} >
                  <div className="radio-item-label">{t(item.label)}</div>
                  {
                      <input type="radio" name={props.params}  value={item.value}  key={item.value} 
                          checked={(infoState.setting[param] == item.value)}  
                          onChange={e => {
                            infoDispatch({type: props.type, payload: e.target.value});
                            infoDispatch({type: "SET_STATUS_CHANGE", payload:true});
                          }}
                      />
                  }
                <span className="checkmark"></span>
                </label>
            </div>
          )))}
          </StyledRadioButton>
        </>
      )
}