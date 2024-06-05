import { set } from 'lodash'
import React, { useState} from 'react'
import {StyledRadioButton} from './_styled'
export const CheckboxRadio = ({...props}) => {
  
    const {
      list = [],
      customClass = null,
      selected = "",
      params =""
    } = props
    const [checkedState,setChecked] = useState(selected)
    const handleChange = (e) => {
      console.log(e.target.value);
      setChecked(e.target.value)
      if (props?.onChange) props.onChange()
    }
    console.log(selected);

  
    return (
      <>
      <StyledRadioButton>
        {list.map((item, index) => (
          <div 
            key={index}
            className="radio-item"
          >
              <label className="radio-item"><span className="radio-item-label">{item.label}</span>
              <input type="radio" name={params}  value={item.value} checked={checkedState == item.value} onChange={handleChange}/>
              <span className="checkmark"></span>
              </label>
          </div>
        ))}
        </StyledRadioButton>
      </>
    )
}