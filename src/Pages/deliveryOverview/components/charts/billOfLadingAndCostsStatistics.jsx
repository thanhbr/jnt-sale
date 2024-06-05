import React, {useContext} from 'react';
import styled from "styled-components";
import {DeliveryOverviewContext} from "../../provider/~context";
import {Text} from "../../../../common/text";
import Chart_bill from "../chartPieBillAndOnePart/chartBill/_chartPieBill"
import Chart_bill_cod from "../chartPieBillAndOnePart/chartBill/_chartBillCod"
import Chart_pie_series from "../chartPie_series/index"
import {TOOLTIP_SERIES} from "../../interfaces/~scripts";
import Table_bill from "../tableDelivery/tableBill/index"
import {useDateDeliveryOverView} from "../../hooks/useDateDeliveryOverView";
import donutChart from "../../interfaces/image/donutchart.png"
import optionDonutChart from "../../interfaces/image/optiondonutchart.png";
import DatePickerOverView from "../pickTime";
const BillOfLadingAndCostsStatistics = () => {
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const date = pageState.date?.bill_lading?.date
    const listSeries = pageState.listTotalDelivery.data;
    const {bill_lading} = useDateDeliveryOverView()
    const {pick_date} = bill_lading
    const render_series = () => {
        if (listSeries) {
            return listSeries.map((item, index) => {
                return <Chart_pie_series
                    image={index + 1}
                    content_delivery={item.status_name}
                    tooltip_content={TOOLTIP_SERIES(index)}
                    total_order={item.total_orders}
                    total_cod={item.total_cod}
                />
            })
        }
    }
    const loading = pageState.loading_date.bill_lading
    const numb = Array.from(Array(3).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <img key={item} src={optionDonutChart} />
            )
        })
    }
    return (
        <StyleBillOfLadingAndCostStatistics>

                    <div className={'bill-lading-one-part_header'}>
                        <Text
                            fontWeight={600}
                            fontSize={18}
                        >Tổng quan vận đơn và chi phí</Text>
                        <div className={'delivery-over-view-part-sign__group'}>
                            <DatePickerOverView date={date} pickDate={pick_date} />
                        </div>
                    </div>
                    <div className={'bill-lading-one-part_chart'}>
                        <div className={'bill-lading-one-part_chart-pie'}>
                            {loading ? <Chart_bill/> : <img className={'bill-lading-one-part_donut-image_1'} src={donutChart} />}
                        </div>
                        <div className={'bill-lading-one-part_chart-pie'}>
                            {loading ? <Chart_bill_cod/> : <img className={'bill-lading-one-part_donut-image_2'} src={donutChart} />}
                        </div>
                    </div>
                    <div className={'bill-lading-one-part_chart-series'}>
                        {loading ?render_series() : render_skeleton()}
                    </div>
                    <div className={'bill-lading-one-part_chart-table'}>
                        <Text className={'bill-lading-one-part_chart-table-detail'} as={'p'} fontWeight={600}
                              fontSize={18}>Báo cáo chi tiết</Text>
                        <Table_bill/>
                    </div>

        </StyleBillOfLadingAndCostStatistics>
    );
};

export default BillOfLadingAndCostsStatistics;
const StyleBillOfLadingAndCostStatistics = styled.div`
 .skeleton_image{
    width: 100%;
     max-width: unset;
    @media screen and (max-width: 1440px){
                width: 80%;
    margin-left: 7rem;
       }
  }
    .bill-lading-one-part{
    &_donut-image_1{
       width: 47%;
       margin-left: 8rem;
       transform: translate(10px, 26px);
       @media screen and (max-width: 1440px){
        margin-left: 4rem;
       }
    }
      &_donut-image_2{
       width: 47%;
       margin-left: 4rem;
       transform: translate(10px, 26px);
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
      &_chart{
          display: flex;
          justify-content: center;
      }
      &_chart-pie{
        width: 379px;
      }
      &_text-group{
        margin-top: 3rem;
        position: relative;
      }
      &-text{
      position: absolute;
      left: 19.5%;
        @media screen and (max-width: 1440px){
          margin-left: 3.5rem;
        }
        
      }
      &-text_cod{
        margin-left: 32.2%;
         @media screen and (max-width: 1440px){
          margin-left: 9.5rem;
        }
      }
      &_chart-series{
        margin-top: 83px;
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
`