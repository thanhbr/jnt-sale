import React, {useContext} from "react";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import styled from "styled-components";
import {DeliveryOverviewContext} from "../../../provider/~context";
import {formatMoney} from "../../../../../util/functionUtil";
import {Text} from "../../../../../common/text";
import {Skeleton} from "@mui/material";
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(DeliveryOverviewContext)
    const list = pageState.listSignOnePart.data
    const formatter=(val)=>{
        val = val.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(val))
            val = val.replace(pattern, "$1,$2");
        return val;
    }
    const newList = [
        {status_name:'Đơn đang giao 1 phần' ,total_orders:list[0].total_orders ,total_cod:list[0].total_cod},
        {status_name:'Đơn ký nhận 1 phần\t' ,total_orders:list[1].total_orders ,total_cod:list[1].total_cod},
        {status_name:'Đơn ký nhận toàn phần\t' ,total_orders:list[2].total_orders ,total_cod:list[2].total_cod},
        {status_name:'Đơn chuyển hoàn\t' ,total_orders:list[3].total_orders ,total_cod:list[3].total_cod},
    ]
    const render_body = ()=>{
        if(newList){
            return newList.map((item,index)=>{
                return(
                    <Tr className={'over-view-control_body'}>
                        <Td className={'over-view-control_body_statistics'}>
                            <img src={`/img/overview/cirle${index+1}.svg`} />
                            <Text>{item.status_name}</Text>
                        </Td>
                        <Td className={'over-view-control_body_total'}>{formatter(item.total_orders)} đơn</Td>
                        <Td className={'over-view-control_body_total-cod'}>{formatMoney(item.total_cod)}</Td>
                    </Tr>
                )
            })
        }
    }
    let totalCod = pageState.listSignOnePart?.arr_total_cod.reduce((a,b)=> a+b,0)
    const numb = Array.from(Array(5).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <Tr className={'over-view-control_body'}>
                    <Td className={'over-view-control_body_statistics'}>
                        <Skeleton variant="rectangular" width={15} height={15}/>
                    </Td>
                    <Td className={'over-view-control_body_total'}><Skeleton variant="rectangular" width={100} height={15}/></Td>
                    <Td className={'over-view-control_body_total-cod'}><Skeleton variant="rectangular" width={100} height={15}/></Td>

                </Tr>
            )
        })
    }
    const load = pageState.loading_date.one_sign
    return(
        <StyledOverViewControlBody>
            {load ? <>
                {render_body()}
                <Tr className={'over-view-control_body over-view-control_border'}>
                    <Td className={'over-view-control_body_statistics'}><Text fontWeight={600} fontSize={14}>Tổng đơn đăng ký giao 1 phần</Text></Td>
                    <Td className={'over-view-control_body_total'}><Text fontWeight={600} fontSize={14}>{formatter(pageState.listSignOnePart.total_orders)} đơn</Text></Td>
                    <Td className={'over-view-control_body_total-cod'}><Text fontWeight={600} fontSize={14}>{formatMoney(totalCod)}</Text></Td>
                </Tr>
            </>
            :
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
    &_statistics{
      width: 258px;
      min-height: 64px !important;
      margin-left: 12px;
       flex: 0.95;
      img{
      margin-right: 10px;
      }
    }
    &_total{
      width:258px;
      min-height: 64px !important;
      justify-content: flex-end;
    }
    &_total-cod{
       width: 189px;
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