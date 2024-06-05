import React from "react";
import styled from "styled-components";
import {Text} from "../../../../../../../common/text";
import { ICON_MINIGAME} from "../../../interface/icon";
import {THEME_COLORS} from "../../../../../../../common/theme/_colors";
import {format} from "date-fns";
import {DateRangePicker} from "rsuite";

const Index = ({categoryWidth,dateStart,dateEnd,onChange,...props})=>{
    const {  allowedRange } = DateRangePicker;
    const handleTimeChange = (val,type) =>{
        onChange(val,type)
    }
    const handleWrapperToggle = color => {
        const wrapper = document.querySelector('#category-time-range-picker__container')
        if (!wrapper) return

        wrapper.style.borderColor = color
    }

    const startDay = dateStart.split(' ')
    const endDay = dateEnd.split(' ')

    return(
        <StyleTimePicker>
            <div id='category-time-range-picker__container' className="category-time-range-picker__container">
                <div className="category-time-range-picker__category">
                    <Text style={{marginRight: '6px'}}>Bình luận trong khoảng thời gian từ </Text>
                    <Text color={'#EBEEF5'} >|</Text>
                </div>
                <div className="category-time-range-picker__date">
                    <DateRangePicker
                        format="dd/MM/yyyy HH:mm"
                        placement="topEnd"
                        ranges={[]}
                        className="category-time-range-picker__start-time"
                        defaultValue={[new Date(dateStart), new Date(dateEnd)]}
                        disabledDate={allowedRange(startDay[0], endDay[0])}
                        onOpen={() => handleWrapperToggle(THEME_COLORS.primary_400)}
                        onClose={() => handleWrapperToggle('#EBEEF5')}
                        onChange={val=>handleTimeChange(val,'start')}
                    />
                </div>

                <div className="category-time-range-picker__icon">
                    {ICON_MINIGAME.clock}
                </div>
                <div  className="category-time-range-picker__value-time">
                    <Text style={{textAlign:'center'}} fontSize={13} color={dateStart ? '#00081D' : '#7C88A6'}>
                        {dateStart ? format(new Date(dateStart), 'dd/MM/yyyy HH:mm')  : 'Từ'}
                    </Text>
                    <Text  color={'#151624'}>-</Text>
                    <Text style={{textAlign:'center'}} fontSize={13} color={dateEnd ? '#00081D' : '#7C88A6'}>
                        {dateEnd ?  format(new Date(dateEnd), 'dd/MM/yyyy HH:mm')   : 'Đến'}
                    </Text>
                </div>
            </div>
        </StyleTimePicker>

    )
};
export default Index;
const StyleTimePicker = styled.div`
   width: 30.125rem;
  height: 34px;
  border: 1px;
  @media screen and (max-width: 1366px){
        width: 37.7rem;
  }
  .category-time-range-picker{
       &__container {
        position: relative;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        transition: .5s;
     &:hover {
          border-color: ${THEME_COLORS.primary_400}!important;
       }
      }
     &__category {
      position: absolute;
      top: 7px;
      left: 7px;
      z-index: 2;
      pointer-events: none;
      cursor: pointer;
      &:hover {
        & ~ .category-time-range-picker__date-input {
          [role='combobox'] {
            border-color: ${THEME_COLORS.primary_400}!important;
          }
        }
      }
    
      input {
        opacity: 0;
        cursor: pointer;
      }
    }
      &__date {
      position: relative;
      z-index: 1;
      right: 0;
      width: 100%;
      height: 34px;
      [role='combobox'] {
        height: 34px;
        border: 1px solid #ebeef5 !important;
        border-radius: 8px;
        box-shadow: none !important;

        &.rs-picker-toggle-active,
        &:hover {
          border-color: ${THEME_COLORS.primary_400}!important;
        }
        input {
          height: 32px;
          padding-left: var(--input-padding-left);
          padding-right: 42px;

          overflow: hidden;
          white-space: nowrap;

          border: none;
          opacity: 0 !important;

          text-overflow: ellipsis;

          &::placeholder {
            color: #7c88a6;
            font-size: 14px;
            font-weight: 400 !important;
          }
        }

        .rs-picker-toggle-clean.rs-btn-close {
          top: 6px;

          svg {
            color: #7c88a6;
          }
        }

        .rs-picker-toggle-caret.rs-icon {
          display: none;
        }

        .rs-picker-toggle-placeholder {
          display: none;
        }
        .rs-picker-toggle-value{
          display: none;
        }
      }
    }
    &__start-time{
      position: absolute;
      top: 0;
       right: -2px;
      opacity: 0;
      width: 100%;
    }
    &__end-time{
      position: absolute;
      top: 0;
      right: 44px;
      opacity: 0;
    }
       &__icon {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 2;

      width: 20px;
      height: 20px;
      cursor: pointer;
      pointer-events: none;

      svg {
        width: 20px;
        height: 20px;
      }
    }
    &__value-time{
      position: absolute;
      top: 8px;
     right: 30px;
      z-index: 2;
      pointer-events: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 47%;
    }
  }
`