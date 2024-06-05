import React from "react";
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltip";
import {formatMoney} from "../../../../util/functionUtil";

const Index = ({...props}) => {
    const {
        image,
        content_delivery,
        tooltip_content,
        total_order,
        total_cod,
        data_width,
        cod
    } = props
    const formatter=(val)=>{
        val = val.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(val))
            val = val.replace(pattern, "$1,$2");
        return val;
    }
    return (
        <StyledChartpieSeries>
            <div className={'delivery-over-view_chart-pie-series'} style={{width:data_width? data_width +'px' :'250px'}} >
                <div className={'delivery-over-view_chart-pie-series_icon-series'}>
                    <img src={`/img/overview/cirle${image}.svg`}/>
                </div>
                <div className={'delivery-over-view_chart-pie-series_content'}>
                    <div className={'delivery-over-view_chart-pie-series_tooltip'}>
                        <Text
                            className={'delivery-over-view_chart-pie-series_tooltip-content'}>{content_delivery}</Text>
                        <Tooltip placement={'right-start'} title={tooltip_content}>
                            <img src='/img/overview/question.svg'/>
                        </Tooltip>
                    </div>
                    <Text as={'p'}
                          fontSize={18}
                          fontWeight={600}
                    >{formatter(total_order)} <span style={{fontSize:'14px',fontWeight:"400"}}>đơn</span></Text>
                    <Text as={'p'}
                          color={'#717483'}
                    >{cod && 'COD: '}{formatMoney(total_cod)}</Text>
                </div>
            </div>
        </StyledChartpieSeries>
    )
}

export default Index;
const StyledChartpieSeries = styled.div`
  .delivery-over-view_chart-pie-series{
    width: 250px;
    height: 88px;
    padding: 8px;
    background: rgba(239,242,248,0.9);
    border-radius: 6px;
    display: flex;
    margin-right: 3px;
    @media screen and (max-width: 1440px){
      margin-right: 16px;
      width: 265px !important;
    }
    &_icon-series{
      margin-right: 12px;
    }
    &_tooltip{
    display: flex;
    align-items: center;
    }
    &_tooltip-content{
      margin-right: 5px;
    }
  }
  .delivery-over-view_chart-pie-series[data-width = true]{
    width: 187px;
  }
`