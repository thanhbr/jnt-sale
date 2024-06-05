import React from "react";
import styled from "styled-components";
import {Radio} from "../../../../../../../common/form/radio";
import {Text} from "../../../../../../../common/text";
const Index = ({label,content,type,chooseCondition,...props})=>{
    const handleChooseCondition = (type,val)=>{
        chooseCondition(type,val)
    }
    return(
        <StyledChooseCondition>
            <div style={{marginBottom:'16px'}} >
                <Text fontWeight={600} fontSize={15}>{label}</Text>
            </div>

            <div>
                {Array.isArray(content) && <>
                    {content?.map(item => {
                        return(
                            <div
                                {...props}
                                key={item?.id}
                                onClick={() => handleChooseCondition({type:item?.value, cond:item?.cond})}
                                style={{display:'flex',marginBottom:'14px'}}
                            >
                                <Radio
                                    checked={type === item?.value}
                                    // name="product-info"
                                    value={item?.value}
                                    style={{transform: 'translateY(2px)'}}
                                    className='check-condition-mini-game'
                                />
                                <Text fontWeight={400} style={{marginLeft:'10px',cursor:'pointer'}}>{item?.title}</Text>
                            </div>
                        )
                    })}
                </>}
            </div>
        </StyledChooseCondition>
    )
}
export default Index
const StyledChooseCondition = styled.div`
 margin-bottom: 24px;
 .check-condition-mini-game{
    &:hover{
      border-color: #00AB56 !important;
    }
     &[data-checked='true']{
          background: #fff;
        border-color: #00AB56!important;
    }
     
    &::before{
      border: 2px solid #00AB56;
      border-radius: 24px;
      background: #00AB56 !important;
    }
 }
 
`