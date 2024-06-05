import React from "react";
import {Td} from "../../../../../../../layouts/tableLayout/_td";
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import styled from "styled-components";

const Index = ()=>{
    return(
        <StyleOtherLiveStreamTBody>
            <Tr className={'other-live-stream-thead'} type={'tHead'}>
                <Td>Bài viết</Td>
                <Td  className={'other-live-stream-tbody'}></Td>
                <Td></Td>
            </Tr>
        </StyleOtherLiveStreamTBody>

    )
}
export default Index;
const StyleOtherLiveStreamTBody = styled.div`
    height: 44px;
    .other-live-stream{
    &-thead{
      border-top: 0;
      background: white !important;
       .tr__container{
       height:44px;
       background: rgb(239,243,251) !important;
        background: #F7F9FD;
        border-width: 1px 1px 0px 1px;
        border-style: solid;
        border-color: #E2EAF8;
        border-radius: 8px 8px 0px 0px;
        font-weight: 600;
       div{
        min-height: 44px;
       }
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