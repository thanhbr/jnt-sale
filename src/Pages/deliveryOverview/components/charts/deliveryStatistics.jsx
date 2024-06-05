import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import Chart from "react-apexcharts";
import {Text} from "../../../../common/text";
import OptionsDelivery from "./_optionStatistic"
import {DeliveryOverviewContext} from "../../provider/~context";
import {chartOptions} from "./_chartOptions";
import {useDateDeliveryOverView} from "../../hooks/useDateDeliveryOverView";
import barchart from "../../interfaces/image/barchart.png"
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {fNumber} from "../../../../util/formatNumber";
import DatePickerOverView from "../pickTime";

const DeliveryStatistics = () => {
    const {pageState} = useContext(DeliveryOverviewContext)
    const date = pageState.date?.delivery?.date
    const {labels, series} = chartOptions(pageState)
    const {delivery} = useDateDeliveryOverView()
    const {pick_date} = delivery
    const loading = pageState.loading_date.delivery
    return (
        <StyledDeliveryStatistics>

            <div className="row">
                <div className={'delivery-statistic'}>
                    <Text fontWeight={600} fontSize={18}>Thống kê tình hình giao hàng</Text>
                    <div className={'delivery-over-view__group'}>
                        <DatePickerOverView date={date} pickDate={pick_date} />
                    </div>

                </div>
                {loading && <div className={'mixed-chart_series'}>
                    <div className={'mixed-chart_series-legend'}>
                        <div className={'mixed-chart_series-legend-box'} style={{background: '#1A94FF'}}></div>
                        <Text fontSize={12} className={'txt_order'}>Số lượng đơn</Text>
                    </div>
                    <div className={'mixed-chart_series-legend'}>
                        <div className={'mixed-chart_series-legend-box'} style={{background: '#5FCC28'}}></div>
                        <Text fontSize={12} className={'txt_order'}>Giá trị đơn (đ)</Text>
                    </div>
                </div>}

                {loading ? <div className="mixed-chart">
                        <Text fontSize={12} className={'txt_order'}>Số lượng đơn</Text>
                        <Text fontSize={12} className={'txt_cod'}>
                            Giá trị đơn (đ)
                        </Text>
                        <Chart
                            options={
                                labels
                            }
                            series={series}
                            height={436}
                            type="bar"
                            // width="500"
                        />
                    </div>
                    : <img src={barchart}/>
                }
                {/*<img src={barchart} />*/}

            </div>
            <div>
                <div style={{marginTop:'40px'}}>
                    <Text fontSize={16}>Tổng đơn:  </Text>
                    <Text
                        fontSize={18}
                        fontWeight={600}
                        color={THEME_COLORS.green_500}
                    >{fNumber(pageState.listDelivery.total_order_delivery)}</Text>
                </div>
                <OptionsDelivery/>
            </div>
        </StyledDeliveryStatistics>
    );
};

export default DeliveryStatistics;

export const StyledDeliveryStatistics = styled.div`
  height: auto;
  img{
       width: 93%;
    max-width: unset;
    margin-left: 2rem;
    margin-top: 1.4rem;
    @media screen and (max-width: 1440px){
                 width: 86%;
               height: 100%;
              margin-left: 4rem;
             margin-top: 2rem;
             object-fit: contain;
     }
  }
  .mixed-chart_series{
          position: absolute;
          left: 356px;
          top: 130px;
          display: flex;
          @media screen and (max-width: 1440px){
            left: 41%;
              top: 7.5%;
          }
      .mixed-chart_series-legend{
        width: fit-content;
        display: flex;
        align-items: center;
        margin-right: 24px;
        .mixed-chart_series-legend-box{
          width: 24px;
          height: 12px;
          margin-right: 8px;
        }
      }
    }
  .mixed-chart{
    height: 436px;
    position: relative;
    
    .txt_order{
      position: absolute;
      top: 0px;
      left: 32px;
    }
    .txt_cod{
      position: absolute;
      top: 0px;
      right: 63px;
    }
    svg{
      transform: translate(0,6px);
      height: 436px;
    }
    foreignObject{
    height: 436px;
    }
    .apexcharts-canvas{
      margin-top: 22px;
      height: 436px !important;
    }
    .apx-legend-position-bottom{
        max-height: 34px !important;
        transform: translate(0px, -420px);
        display: flex !important;
        flex: unset;
    }
    .apexcharts-legend-series{
      display: none !important;
    }
    
    .apexcharts-yaxis{
        position:relative;
        height: 436px;
        .apexcharts-yaxis-title{
            position:absolute;
            top:0;
            left:5rem;
        }
        line{
        stroke-dasharray:8;
        }
   }
   .apexcharts-xaxis{
    .apexcharts-xaxis-texts-g{
      //  text{
      //    transform: rotate(0deg);
      //}
    }
    
   }
   .apexcharts-toolbar{
   display: none;
   }
  
  }
  //.mixed-chart > div{
  //  min-height: 436px !important;
  //}
 .delivery-statistic{
     display: flex;
    justify-content: space-between;
    //div{
    //    &:hover{
    //    border: 1px solid #2BB8A9 !important;
    //      box-shadow: 0px 0px 0px 2.5px rgba(43, 184, 169, 0.2);
    //    }
    //    
    // }
    .delivery-over-view__group{
      position: relative;
      .delivery-over-view__icon{
        position: absolute;
        top: 7px;
         right: 12px;
        z-index: 2;
      }
      .delivery-over-view__rate-status-statistic{
      width: 284px;
      height: 34px;
      .rs-picker-toggle{
            z-index: 1;
      height: 34px;
         &:hover{
       border: 1px solid #1A94FF !important;
         box-shadow:  0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
       }
    }
      .rs-picker-toggle-active{
            border: 1px solid #1A94FF !important;
            box-shadow: none !important;
            input{
              border: none !important;
              &:focus{
                border-color:unset !important;
              }
            }
        }
        .rs-picker-toggle-value{
          color: #00081D;
        }
        .rs-btn-close{
          display: none;
        }
        .rs-picker-toggle-caret.rs-icon {
          display: none;
        }
    }
    }
   
    
 }
 
   
`