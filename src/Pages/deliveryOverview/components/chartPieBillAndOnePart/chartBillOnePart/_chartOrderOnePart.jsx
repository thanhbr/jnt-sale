import React, {useContext} from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {DeliveryOverviewContext} from "../../../provider/~context";
import {chartOptions} from "../_chartOption";
import merge from "lodash/merge";
import {BaseOptionChart} from "../../../../../Component/chart";
const Index = ()=>{
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const {sign_part} = chartOptions(pageState)
    const {orderSignPart} = sign_part


    const chartLabels = pageState.listControl.data.map((i, index) => {
        return `<img src="/img/overview/cirle` + (index + 1) + `.svg" />`

    })

    const orderTotal = pageState.listSignOnePart.arr_total_cod
    const chartSeries = pageState.listSignOnePart.arr_total_orders

    const chart = merge(BaseOptionChart(), {
        labels: chartLabels,
        orderTotal: orderTotal,
        ...orderSignPart
        // stroke: { colors: [theme.palette.background.paper] },
    })
    return(
        <StyledChartOrderOnePart>
            <ReactApexChart type="donut" series={chartSeries} options={chart} height={'100%'}/>
        </StyledChartOrderOnePart>
    )
}
export default Index;
const StyledChartOrderOnePart = styled.div`
    height: 177px;
   .apexcharts-canvas{
        margin-top: 35px;
        margin-bottom: 14px;
        svg{
            height: 250px !important;
        foreignObject{
        height: 250px !important;
          .apexcharts-legend {
            .apexcharts-legend-series{
            display: none !important;
          }
        }
        }
        .apexcharts-inner{
           transform: translate(22px, 16px);
            @media screen and (max-width: 1440px){
            transform: translate(-12%, 16px);
          }
        
        }
         .apexcharts-subtitle-text{
          @media screen and (max-width: 1440px){
            transform: translate(-75px,10px);
          }
      }
    }
     .arrow_box{
    width: fit-content;
    .img-tooltip{
      margin-right: 8px;
    }
  }

`