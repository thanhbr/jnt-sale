import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {DeliveryOverviewContext} from "../../provider/~context";
import ChartOrderOnPart from "../chartPieBillAndOnePart/chartBillOnePart/_chartOrderOnePart";
import ChartSignOnePart from "../chartPieBillAndOnePart/chartBillOnePart/_chartSignOnePart"
import Chart_pie_series from "../chartPie_series";
import {TOOLTIP_ONE_PART} from "../../interfaces/~scripts";
import TableSignOnepart from "../tableDelivery/tableSignPart/index";
import {useDateDeliveryOverView} from "../../hooks/useDateDeliveryOverView";
import donutChart from "../../interfaces/image/donutchart.png"
import optionDonutChart from "../../interfaces/image/optiondonutchart.png";
import DatePickerOverView from "../pickTime";
const DeliveredOnePartStatistics = () => {
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const date = pageState.date?.one_part?.date
    const listSeries = pageState.listSignOnePart.data;
    const {sign_part} = useDateDeliveryOverView()
    const {pick_date} = sign_part
    const render_series = () => {
        if (listSeries) {
            return listSeries.map((item, index) => {
                return <Chart_pie_series
                    data_width={187}
                    image={index + 1}
                    content_delivery={item.status_name}
                    tooltip_content={TOOLTIP_ONE_PART(index)}
                    total_order={item.total_orders}
                    total_cod={item.total_cod}
                />
            })
        }
    }
    const loading = pageState.loading_date.one_sign
    const numb = Array.from(Array(4).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <img key={item} src={optionDonutChart} />
            )
        })
    }
    return (
        <StyledDeliveryOnePartStatistic>
                    <div className={'delivery-over-view-part-sign_header'}>
                        <Text
                            fontWeight={600}
                            fontSize={18}
                        >Tổng quan giao 1 phần</Text>
                        <div className={'delivery-over-view-part-sign__group'}>
                            <DatePickerOverView date={date} pickDate={pick_date} />
                        </div>
                    </div>
                    <div className={'delivery-over-view-part-sign_chart-donut'}>
                        <div>
                            {loading? <ChartOrderOnPart/> : <img className={'delivery-over-view-part-sign_donut-skeleton_1'} src={donutChart} />}
                        </div>
                        <div>
                            {loading ? <ChartSignOnePart/> :  <img className={'delivery-over-view-part-sign_donut-skeleton_2'} src={donutChart} />}
                        </div>
                    </div>
                    <div className={'delivery-over-view-part-sign_chart-series'}>
                        {loading ? render_series() : render_skeleton()}
                    </div>
                    <div className={'delivery-over-view-part-sign_chart-table'}>
                        <Text className={'delivery-over-view-part-sign_chart-table-detail'} as={'p'} fontWeight={600}
                              fontSize={18}>Báo cáo chi tiết</Text>
                        <TableSignOnepart/>
                    </div>
        </StyledDeliveryOnePartStatistic>
    );
};

export default DeliveredOnePartStatistics;
const StyledDeliveryOnePartStatistic = styled.div`
 .skeleton_image{
      width: 100%;
     max-width: unset;
    @media screen and (max-width: 1440px){
                width: 80%;
    margin-left: 7rem;
       }
  }
    .delivery-over-view-part-sign{
    &_donut-skeleton_1{
      transform: translate(-81px,30px);
       @media screen and (max-width: 1440px){
        transform: translate(-179px,30px);
       }
    }
     &_donut-skeleton_2{
      transform: translate(74px, 30px);
       @media screen and (max-width: 1440px){
        transform: translate(100px,30px);
       }
    }
      &_header{
        display: flex;
        justify-content: space-between;
        .delivery-over-view-part-sign__group{
          position: relative;
          .delivery-over-view-part-sign__icon{
              position: absolute;
               top: 7px;
                right: 12px;
                z-index: 2;
          }
          .delivery-over-view__rate-status-statistic{
      width: 284px;
      height: 34px;
      z-index: 1;
      .rs-picker-toggle{
      height: 34px;
      z-index: 1;
         &:hover{
       border: 1px solid #1A94FF !important;
         box-shadow: 0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
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
      &_chart-donut{
        display: flex;
        justify-content: center;
      }
      &-text_group{
        margin-top: 3rem;
      }
      &-text{
        margin-left:14.5%;
         @media screen and (max-width: 1440px){
          margin-left: 3rem;
        }
      }
      &-text_cod{
        margin-left: 31%;
         @media screen and (max-width: 1440px){
          margin-left: 8.5rem;
        }
      }
      &_chart-series{
        margin-top: 82px;
        display: flex;
        justify-content: center;
      }
       &_chart-table{
        margin-top: 28px;
      }
      &_chart-table-detail{
      margin-bottom: 16px;
      }
    }
  .apexcharts-canvas{
    width: 379px !important;
  }
`