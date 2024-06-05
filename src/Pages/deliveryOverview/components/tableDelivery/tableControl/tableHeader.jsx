import React from 'react';
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import styled from "styled-components";
import {Text} from "../../../../../common/text";
const Index = ()=>{
    return(
        <StyleOverViewControl>
            <Tr type='tHead' className={'over-view-control_head'}>
                <Td className={'over-view-control_status'}><Text fontWeight={600}>Trạng thái</Text></Td>
                <Td className={'over-view-control_order'}><Text fontWeight={600}>Số đơn</Text></Td>
                <Td className={'over-view-control_cod'}><Text fontWeight={600}>Tiền thu hộ</Text></Td>
                <Td className={'over-view-control_cod'}><Text fontWeight={600}>Phí trả ĐVVC</Text></Td>
            </Tr>
        </StyleOverViewControl>

    )
}
export default Index;
const StyleOverViewControl = styled.div`
    
  .over-view-control{
    &_head{
      height: 44px;
      border-top: 1px solid #E2EAF8;
      border-left: 1px solid #E2EAF8;
      border-right: 1px solid #E2EAF8;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      .tr__container{
        height: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }
    &_status{
      width: 172px;
      margin-left: 12px;
      min-height: 44px;
      flex: 0.95;
    }
    &_order{
      width: 130px;
      justify-content: flex-end;
      margin-left: 12px;
      min-height: 44px;
    }
    &_cod{
      width:140px;
      justify-content: flex-end;
      min-height: 44px;
    }
  }

`