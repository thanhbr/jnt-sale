import React from 'react';
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import styled from "styled-components";
import {Text} from "../../../../../common/text";
const Index = ()=>{
    return(
        <StyleOverViewControl>
            <Tr type='tHead' className={'over-view-control_head'}>
                <Td className={'over-view-control_statistics'}>
                    <Text fontWeight={600}>Trạng thái</Text>
                </Td>
                <Td className={'over-view-control_total'}>
                    <Text fontWeight={600}>Số đơn</Text>
                </Td>
                <Td className={'over-view-control_total-cod'}>
                    <Text fontWeight={600}>COD ký nhận</Text>
                </Td>
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
    &_statistics{
      width: 258px;
      margin-left: 12px;
      min-height: 44px;
      flex: 0.95;
    }
    &_total{
      width:258px;
      justify-content: flex-end;
      min-height: 44px;
    }
    &_total-cod{
      width:194px;
      justify-content: flex-end;
      min-height: 44px;
    }
  }

`