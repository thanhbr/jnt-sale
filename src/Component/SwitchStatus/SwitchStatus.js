import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import "./SwitchStatus.scss"
import Switch, { SwitchProps } from '@mui/material/Switch';
  export function SwitchStatus({...props}){
    const {id,status,handleChange,checked,disabled,name}=props
    return(
      <label className="switch" data-disabled={disabled}>
      <input name={name} type="checkbox" id={id} checked={status==1?true:false}  disabled={disabled}  onChange={handleChange}/>
      <span  className="slider round"></span>
    </label>
    )
  }