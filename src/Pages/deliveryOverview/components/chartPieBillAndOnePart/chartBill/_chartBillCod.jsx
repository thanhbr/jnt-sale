import React, {useContext, useState} from 'react';
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {returnTrue} from "react-currency-format/lib/utils";
import {DeliveryOverviewContext} from "../../../provider/~context";
import {formatMoney} from "../../../../../util/functionUtil";
import merge from "lodash/merge";
import {BaseOptionChart} from "../../../../../Component/chart";
import {chartOptions} from "../_chartOption";
import {Text} from "../../../../../common/text";
const Index = () =>{
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const {pie} = chartOptions(pageState)
    const {pieCodOption} = pie


    const chartLabels = pageState.listControl.data.map((i, index) => {
        return `<img src="/img/overview/cirle` + (index + 1) + `.svg" />`

    })

    const orderTotal =  pageState.listTotalDelivery.arr_total_orders
    const chartSeries = pageState.listTotalDelivery.arr_total_cod
    const chart = merge(BaseOptionChart(), {
        labels: chartLabels,
        orderTotal: orderTotal,
        ...pieCodOption
        // stroke: { colors: [theme.palette.background.paper] },
    })

    return(
        <StyledBillChart>
            <ReactApexChart type="donut" series={chartSeries} options={chart} height={'100%'}/>

        </StyledBillChart>
    )

}

export default Index;

const StyledBillChart = styled.div`
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
          
           transform: translate(29px, 16px);
          @media screen and (max-width: 1440px){
            transform: translate(13%, 16px);
          }
        }
        .apexcharts-subtitle-text{
          @media screen and (max-width: 1440px){
            transform: translate(18px,10px);
          }
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
