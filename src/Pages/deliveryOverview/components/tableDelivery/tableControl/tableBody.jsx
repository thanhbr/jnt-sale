import React, {useContext} from "react";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import styled from "styled-components";
import {DeliveryOverviewContext} from "../../../provider/~context";
import {formatMoney} from "../../../../../util/functionUtil";
import {Text} from "../../../../../common/text";
import optionDonutChart from "../../../interfaces/image/optiondonutchart.png";
import {Skeleton} from "@mui/material";
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(DeliveryOverviewContext)
    const list = pageState.listControl.data
    const {meta} = pageState.listControl
    const formatter=(val)=>{
        val = val.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(val))
            val = val.replace(pattern, "$1,$2");
        return val;
    }
    const render_body = ()=>{
        if(list){
            return list.map((item,index)=>{
                return(
                    <Tr className={'over-view-control_body'}>
                        <Td className={'over-view-control_body_status'}>
                            <img src={`/img/overview/cirle${index + 1}.svg`} />
                            <Text>{item.status_name}</Text>

                        </Td>
                        <Td className={'over-view-control_body_order'}>{formatter(item.total_orders)}</Td>
                        <Td className={'over-view-control_body_cod'}>{formatMoney(item.total_cod)}</Td>
                        <Td className={'over-view-control_body_cod'}>{formatMoney(item.total_fee)}</Td>
                    </Tr>
                )
            })
        }
    }
    const numb = Array.from(Array(4).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <Tr className={'over-view-control_body'}>
                    <Td className={'over-view-control_body_status'}>
                        <Skeleton variant="rectangular" width={15} height={15}/>
                    </Td>
                    <Td className={'over-view-control_body_order'}><Skeleton variant="rectangular" width={100} height={15}/></Td>
                    <Td className={'over-view-control_body_cod'}><Skeleton variant="rectangular" width={60} height={15}/></Td>
                    <Td className={'over-view-control_body_cod'}><Skeleton variant="rectangular" width={60} height={15}/></Td>
                </Tr>
            )
        })
    }
    const load = pageState.loading_date.for_control
    return(
        <StyledOverViewControlBody>
            {load ? <>
                {render_body()}
                <Tr className={'over-view-control_body over-view-control_border'}>
                    <Td className={'over-view-control_body_status'}><Text fontWeight={600} fontSize={14}>Tổng</Text></Td>
                    <Td className={'over-view-control_body_order'}><Text fontWeight={600} fontSize={14}>{formatter(meta?.total_order)}</Text></Td>
                    <Td className={'over-view-control_body_cod'}><Text fontWeight={600} fontSize={14}>{formatMoney(meta?.total_cod)}</Text></Td>
                    <Td className={'over-view-control_body_cod'}><Text fontWeight={600} fontSize={14}>{formatMoney(meta?.total_fee)}</Text></Td>
                </Tr>
            </>:
                render_skeleton()
            }

        </StyledOverViewControlBody>

    )
}
export default  Index;
const StyledOverViewControlBody = styled.div`
      border-bottom: 1px solid #E2EAF8;
      border-left: 1px solid #E2EAF8;
      border-right: 1px solid #E2EAF8;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
  .over-view-control_body{
     &_status{
      width: 172px;
      min-height: 64px !important;
      margin-left: 12px;
      flex: 0.95;
      img{
      margin-right:10px;
      }
    }
    &_order{
      width: 130px;
      min-height: 64px !important;
      justify-content: flex-end;
      margin-left: 12px;
    }
    &_cod{
      width:140px;
      min-height: 64px !important;
      justify-content: flex-end;
    }
  }
  .over-view-control_border{
      .tr__container{
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
      }
  }
`