import styled from 'styled-components'
import { THEME_COLORS } from "common/theme/_colors";

export const StyledConsignMent = styled.div`
  .consignement__checkbox-main{
    width: 18px;
    height: 18px;
    position: relative;
    cursor: pointer;
    background: #f5f5fa;
    border: 1px solid #dddde3;
    border-radius: 4px;
    opacity: 1;
    input{
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
   &[data-checked='true']{
        background: ${THEME_COLORS.green};
        border: 1px solid ${THEME_COLORS.green};
        &::before {
            opacity: 1;
          }
   }
   &[data-minus='true'] {
    &::before {
      width: 10px;
      height: 2px;

      background: #fff;
      border: none;

      transform: translate(-50%, -50%);
    }
  }
   &::before{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 5px;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    opacity: 0;
    content: '';
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
    -webkit-transform: translate(-50%,-65%) rotate(-45deg);
    -ms-transform: translate(-50%,-65%) rotate(-45deg);
    transform: translate(-50%,-65%) rotate(-45deg);
    pointer-events: none;
   }
    &:hover {
        border: 1px solid ${THEME_COLORS.green};
        box-shadow:  0px 0px 0px 2px rgba(0, 171, 86, 0.15);
    }
   
    .consignement__checkbox {
    //    width: 16px;
    //    height: 16px;
       opacity: 0; 
    }
}


.selectAll:checked:after {
    content: "";
    display: block;
    width: 9.33px !important;
    height: 1.33px !important;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: none !important;
    position: absolute;
    top: 7.33px;
    left: 3.33px;
}

`
