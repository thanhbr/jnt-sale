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
    const list = pageState.listControl.data
    const formatter=(val)=>{
        val = val.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(val))
            val = val.replace(pattern, "$1,$2");
        return val;
    }
    const list_total_bill = [
        {status_name:'Tổng vận đơn',total:formatter(pageState.listTotalDelivery.total_orders) + ` đơn`},
        {status_name: 'Tổng phí vận chuyển',total:formatMoney(pageState.listTotalDelivery.total_fee)},
        {status_name: 'Phí vận chuyển trung bình',total:formatMoney(pageState.listTotalDelivery.avg_fee) + `/đơn`},
        {status_name: 'Tổng tiền thu hộ',total: formatMoney(pageState.listTotalDelivery.total_cod)}
    ]
    const render_body = ()=>{
        if(list_total_bill){
            return list_total_bill.map((item,index)=>{
                return(
                    <Tr className={'over-view-control_body'}>
                        <Td className={'over-view-control_body_statistics'}>
                            <Text>{item.status_name}</Text>
                        </Td>
                        <Td className={'over-view-control_body_total'}>{item.total}</Td>
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
                    <Td className={'over-view-control_body_statistics'}>
                        <Skeleton variant="rectangular" width={15} height={15}/>
                    </Td>
                    <Td className={'over-view-control_body_total'}><Skeleton variant="rectangular" width={100} height={15}/></Td>

                </Tr>
            )
        })
    }
    const load = pageState.loading_date.bill_lading
    return(
        <StyledOverViewControlBody>
            {load ? render_body() : render_skeleton()}
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
      width: 565px;
       min-height: 64px !important;
      margin-left: 12px;
      margin-right:12px;
      flex: 0.95;
    }
    &_total{
      width:145px;
       min-height: 64px !important;
      justify-content: flex-end;
      margin-left:10px;
    }
  }
  .over-view-control_border{
      .tr__container{
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
      }
  }
`