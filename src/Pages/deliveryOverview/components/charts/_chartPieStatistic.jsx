import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import {fNumber} from "../../../../util/formatNumber";
import {formatMoney} from "../../../../util/functionUtil";
import merge from "lodash/merge";
import {BaseOptionChart} from "../../../../Component/chart";
import {chartOptions} from "./_chartOptions";
import {DeliveryOverviewContext} from "../../provider/~context";

const Index = ({data}) => {
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const [chartData, setChartData] = useState(() => window.localStorage.getItem('chart_data') ? JSON.parse(window.localStorage.getItem('chart_data')) : [])
    const {pie} = chartOptions(pageState)
    const {pieDonutOption} = pie
    const [hover,sethover] = useState(-1)
    const handleHover = (index)=>{
        sethover(index)
    }
    const chartLabels = data.map((i, index) => {
        return `<div style="padding: 8px 8px 16px 16px;" className="over-view_for-control">
            <div className="over-view_for-control-img"  style="padding-top: 5px;margin-right: 12px;">
               <img src="/img/overview/cirle` + (index + 1) + `.svg" />
            </div>
            <div className="over-view_for-control-text">
            <div  className="over-view_for-control-group">
                 <span  class="over-view_for-control-label-order">
                    ${i.status_name}
                </span>
            </div>
                <p  class="over-view_for-control-label-orders">${i.total_orders} <span>đơn</span></p>
                <p  class="over-view_for-control-label-cod">${formatMoney(i.total_cod)}</p>
                
            </div>
            <div style="padding-top: 2px;">
                <img src="/img/overView/question.svg" />
                 
            </div>
            
        </div>`

    })

    const orderTotal = pageState.listControl.data.map((i) => i.total_cod)
    const chartSeries = pageState.listControl.data.map((i) => i.total_orders)

    const chart = merge(BaseOptionChart(), {
        // labels: chartLabels,
        orderTotal: orderTotal,
        ...pieDonutOption
        // stroke: { colors: [theme.palette.background.paper] },
    })
    return (
        <StyledChartPieStatistic>
            <ReactApexChart type="donut" series={chartSeries} options={chart} height={'100%'}/>
        </StyledChartPieStatistic>

    )
}

export default Index;
const StyledChartPieStatistic = styled.div`
  height: 167px;
  .apexcharts-canvas{
    //height: 320px !important;
     svg{
    height:250px;
    foreignObject{
      height: 100%;
      .apexcharts-legend{
          top: 300px !important;
          display: flex !important;
          flex-direction: unset; 
          width: 100%;
         
        .apexcharts-legend-series{
            width: 204.67px;
            height: 88px;
            background: rgba(244, 247, 252, 0.4);
            border-radius: 6px 0px 0px 6px;
            margin:0 0 0 8px!important;
            @media screen and (max-width : 1440px){
             width: 355px;
            }
            display: none !important;
            .apexcharts-legend-text{
                width: 100%;
                 .over-view_for-control{
                     padding: 8px 16px 8px 16px !important;
                      &-text{
                        margin-top: 8px;
                      }
                      &-label-order{
                      font-size: 14px;
                    font-weight: 400;
                    color: #00081D;
                        margin-right: 8px;
                    }
                    &-label-orders{
                      font-weight: 600;
                      font-size: 18px;
                      line-height: 140%;
                       color: #00081D;
                    span{
                     font-size: 14px;
                      font-weight: 400;
                    }
                }
                &-label-cod{
                    font-size: 14px;
                    font-weight: 400;
                    color: #00081D;
                }
              }
             }
             .apexcharts-legend-text > div{
                  display: flex;
                  
             }
             
            }
        }
    }
    .apexcharts-graphical{
    transform: translate(4%,19%);
       @media screen and (max-width : 1440px){
            transform: translate(-1%,54px);
        } 
          @media screen and (max-width : 1366px){
            transform: translate(-1%,54px);
        }
    }
  }
  }
 
 

`