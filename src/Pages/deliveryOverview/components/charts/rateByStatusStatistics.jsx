import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {Text} from "../../../../common/text";
import ChartPieStatistic from "./_chartPieStatistic"
import TableLayoutDeliveryOverView from "../tableDelivery/tableControl";
import {DeliveryOverviewContext} from "../../provider/~context";
import {useDateDeliveryOverView} from "../../hooks/useDateDeliveryOverView";
import Chart_pie_series from "../chartPie_series/index"
import {TOOLTIP_FOR_CONTROL} from "../../interfaces/~scripts";
import donutChart from "../../interfaces/image/donutchart.png"
import optionDonutChart from "../../interfaces/image/optiondonutchart.png"
import DatePickerOverView from "../pickTime";
const RateByStatusStatistics = () => {
    const {pageState} = useContext(DeliveryOverviewContext)
    const date = pageState.date?.for_control?.date
    const {for_control} = useDateDeliveryOverView()
    const {pick_date} = for_control
    const render_series = () => {
        if (pageState.listControl.data) {
            return pageState.listControl.data.map((item, index) => {
                return (
                    <Chart_pie_series
                        image={index + 1}
                        content_delivery={item.status_name}
                        tooltip_content={TOOLTIP_FOR_CONTROL(index)}
                        total_order={item.total_orders}
                        total_cod={item.total_cod}
                        data_width={204}
                        cod={true}
                    />
                )
            })
        }
    }
    const numb = Array.from(Array(3).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <img key={item} src={optionDonutChart} />
            )
        })
    }
    const loading = pageState.loading_date.for_control
    return (
        <StyledRateByStatusStatistics>
                    <div className="delivery-over-view__title-date">
                        <Text as={'p'} fontWeight={600} fontSize={18}>Tỷ lệ đơn theo trạng thái đối soát</Text>
                        <div className={'delivery-over-view__group'}>
                            <DatePickerOverView date={date} pickDate={pick_date} />
                        </div>

                    </div>
                    <div className="delivery-over-view__chart-pie">
                        {loading ? <ChartPieStatistic data={pageState.listControl.data}/> : <img className={'skeleton_image'} src={donutChart}/>}

                    </div>
                    <div className={"delivery-over-view__chart-series"}>
                        {loading ?render_series() :render_skeleton()}
                    </div>
                    <Text className={'delivery-over-view_txt-detail'} as={'p'} fontWeight={600} fontSize={18}>Báo cáo
                        chi tiết</Text>
                    <div className={'delivery-over-view__table-pie'}>
                        <TableLayoutDeliveryOverView/>
                    </div>
        </StyledRateByStatusStatistics>
    );
};

export default RateByStatusStatistics;

export const StyledRateByStatusStatistics = styled.div`
  // background: white;
  // width: 41.75rem;
  .skeleton_image{
     width: 31%;
     margin-left: 12rem;
     margin-top: 2rem;
     max-width: unset;
    @media screen and (max-width: 1440px){
                width: 16%;
              margin-left: 31rem;
                margin-top: 2rem;
       }
       @media screen and (max-width: 1366px){
                width: 16%;
                margin-left: 35rem;
                margin-top: 2.5rem;
       }
  }
  height: auto;
  .delivery-over-view{
    &__title-date{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__chart-pie{
      height:250px;
      margin-bottom: 24px;
    }
    &__chart-series{
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    }
    &__group{
      position: relative;
    }
    &__icon{
      position: absolute;
        top: 7px;
         right: 12px;
        z-index: 2;
    }
    &__rate-status-statistic{
      width: 284px;
      height: 34px;
      
      div{
          border: 1px solid #e5e5ea !important;
        &:hover{
        border: 1px solid #2BB8A9 !important;
          box-shadow: 0px 0px 0px 2.5px rgba(43, 184, 169, 0.2);
        }
        
      }
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
    &__table-pie{
      margin-top: 20px;
      .table-layout__table{
        border-radius: 8px;
      }
    }
  }
`