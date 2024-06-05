import React from "react";
import styled from "styled-components";
import {DateRangePicker} from "rsuite";
import {CalendarLocaleType} from "../../../Order/component/More/DateTimeRangePicker/locale";
import {isAfter} from "rsuite/cjs/utils/dateUtils";
import {CALENDAR} from "../../interfaces/~contants";
import {format} from "date-fns";
import {Text} from "../../../../common/text";
const Index = ({...props})=>{
    const {pickDate,date} = props
    const handleWrapperToggle = boo => {
        const wrapper = document.querySelector('#content-wrap')
        if (!wrapper) return

        wrapper.style.overflow = boo ? 'auto' : 'hidden'
    }
    return(
        <StyledTimePickerDeliveryOverView>
            <DateRangePicker format="dd/MM/yyyy"
                             placeholder="dd/mm/yy - dd/mm/yy"
                             onChange={pickDate}
                             locale={CalendarLocaleType}
                             value={date}
                             preventOverflow
                             placement={'bottomEnd'}
                             disabledDate={date => isAfter(date, new Date())}
                             className={'delivery-over-view__rate-status-statistic'}
                             onOpen={() => handleWrapperToggle(false)}
                             onClose={() => handleWrapperToggle(true)}
                             cleanable={false}
            />
            <div className={'delivery-over-view__icon'}>
                {CALENDAR}
            </div>
        </StyledTimePickerDeliveryOverView>
    )
}
export default Index;
const StyledTimePickerDeliveryOverView = styled.div`
  width: 284px;
  height: 34px;
  position: relative;
  .delivery-over-view{
    &__rate-status-statistic{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
       .rs-picker-toggle{
          border: 1px solid rgb(235, 238, 245) !important;
          box-shadow: none !important;
          border-radius: 8px;
           &:hover{
          border-color: rgb(43, 184, 169) !important;
            }
          svg{
            display: none;
          }
          .rs-picker-toggle-textbox{
            border: none !important;
            font-size: 14px;
            padding-left: 11px !important;
          }
          .rs-picker-toggle-value{
            color: #575757;
          }
       }
       .rs-picker-toggle-active{
         border-color: rgb(43,184,169) !important;
       }
    }
    &__icon{
      position: absolute;
      top: 7px;
      right: 9px;
      z-index: 2;
      pointer-events: none;
      cursor: pointer;
    }
  }
`