import React from 'react'
import {StyledConsignMent} from "./_styled";

export default function CheckBoxConsignmento({...props}) {
    const {isChecked, name, id, handleClick, disable, minus} = props;
    return (
        <StyledConsignMent>
            <div className={'consignement__checkbox-main'} data-minus={minus} data-checked={isChecked}>
                <input type="checkbox" id={id}
                       className="consignement__checkbox"
                       name={name}
                       onChange={handleClick}
                       checked={isChecked}
                       disabled={disable}
                />
            </div>
        </StyledConsignMent>

    )
}
