import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {ICON} from "../../interfaces/~contants";
import {Text} from "../../../../common/text";
import {DeliveryOverviewContext} from "../../provider/~context";
import {formatMoney} from "../../../../util/functionUtil";
import optionBar from "../../interfaces/image/optionbarchart.png"
const Index = () => {
    const {pageState,pageDispatch} = useContext(DeliveryOverviewContext)
    const list = pageState.listDelivery?.list_option_delivery
    const formatter=(val)=>{
        val = val.toString();
        let pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(val))
            val = val.replace(pattern, "$1,$2");
        return val;
    }
    const render_option = () => {
        if (list) {
            return list?.map((item, index) => {
                return (
                    <div key={index} className={'delivery-over-view_option-statistic'}>
                        <div className={'delivery-over-view_option-text'}>
                            <Text
                                as={'p'}
                                color={'#717483'}
                                fontSize={13}
                                fontWeight={400}
                            >{item.status_name}
                            </Text>
                            <Text
                                as={'p'}
                                fontSize={18}
                                fontWeight={600}
                            >{formatter(item.total_orders)} <Text  fontSize={14} fontWeight={400}>đơn</Text>
                            </Text>
                            <Text
                                as={'p'}
                                color={'#717483'}
                                fontSize={14}
                                fontWeight={400}
                            >{formatMoney(item.total_cod)}
                            </Text>
                        </div>
                        <div className={'delivery-over-view_option-icon'}>
                            <Text>{ICON(index)}</Text>
                        </div>
                    </div>
                )
            })
        }
    }
    const numb = Array.from(Array(8).keys())
    const render_skeleton = ()=>{
        return numb?.map(item=>{
            return (
                <div key={item} className={'delivery-over-view_option-statistic'}>
                   <img src={optionBar} />
                </div>
            )
        })
    }
    const load = pageState.loading_date.delivery
    return (
        <StyledOptionStatistic>
            {load ? render_option():render_skeleton()}
        </StyledOptionStatistic>
    )
}

export default Index;

const StyledOptionStatistic = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    margin-top: 44px;
    gap:16px;
    .delivery-over-view{
      &_option-statistic{
        width: 212px;
        height: 86px;
        display: flex;
        justify-content: space-between;
        background: rgba(239, 242, 248, 0.9);
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 16px;
      }
    }
    @media screen and (max-width : 1440px){
    .delivery-over-view{
      &_option-statistic{
         width: 265px;
      }
     }
    }  
    @media screen and (max-width : 1366px){
    .delivery-over-view{
      &_option-statistic{
         width: 265px;
      }
     }
    } 
    @media screen and (max-width : 1280px){
    .delivery-over-view{
      &_option-statistic{
         width: 265px;
      }
     }
    }
`