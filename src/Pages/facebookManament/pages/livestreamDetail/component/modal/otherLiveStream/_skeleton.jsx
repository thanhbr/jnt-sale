import React from "react";
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../../../layouts/tableLayout/_td";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
const Index = ()=>{
    const SkelentonRows =Array.from(Array(5).keys())
    const render = ()=>{
            return SkelentonRows?.map(item=>{
                return(
                    <Tr className={'other-live-stream-tr'}>
                        <Td className={'other-live-stream-tbody'}>
                            <Skeleton   width={44} style={{ marginRight: '12px' }}/>
                        </Td>
                        <Td className={'other-live-stream-tbody'}>
                            <Skeleton   width={589} style={{ marginRight: '12px' }}/>
                        </Td>
                        <Td className={'other-live-stream-tbody'}>
                            <Skeleton   width={44} style={{ marginRight: '12px' }}/>
                        </Td>
                    </Tr>
                )
            })
    }
    return(
        <StyleOtherLiveStreamTBody>{render()}</StyleOtherLiveStreamTBody>
    )
};
export default Index;
const StyleOtherLiveStreamTBody = styled.div`
    height: 386px;
     overflow: auto;
    .other-live-stream{
    &-tr{
       height: 78px;
       .tr__container{
       height: 100%;
       }
    }
      &-tbody{
          width: 79px;
        height: 54px;
        border-radius: 4px; 
        &:nth-child(1){
          width:79px;
        }  
        &:nth-child(2){
          width: 589px;
        }      
      }
      &-image{
        width: 79px;
        height: 100%;
        border-radius: 4px;
      }
    }

`