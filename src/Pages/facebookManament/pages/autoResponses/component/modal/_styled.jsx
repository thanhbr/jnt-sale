import {THEME_COLORS} from "common/theme/_colors";
import styled from "styled-components";

export const StyledConversationStickerModal = styled.div`
    .sticker-group-content{
      margin-bottom: 24px;
      .input__label{
          margin-bottom: 8px;
          padding: 0;
          display: block;
          cursor: default
        }
      .input-content{
         &[data-validate='true'] {
            border-color: #FF424E !important;
          }
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        height: 34px;
        padding: 0 21px 0 16px;
        background: #fff;
        border: 1px solid #ebeef5;
        border-radius: 6px;
        color: #00081D;
        font-size: 13px;
        font-weight: 400;
        text-overflow: ellipsis;
        -webkit-transition: all 0.25s;
        transition: all 0.25s;
        width: 100%;
        .color-span{
          width: 24px;
          height: 24px;
          margin-right: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .color-value{
          display: inline-block;
        }
        .input-picker{
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          z-index: 2;
          input:hover{
            cursor: pointer;
          }
        }
        .icon-brush{
          position: absolute;
          right: 11px;
          z-index: 1;
        }
      }
    }
   @media screen and ( max-width: 1366px){
   .product-group-content{
            &_group{
                margin-top: 20px;
                .alternative-auto-complete__menu{
                   padding-bottom: 5rem;
                }
            } 
   }
   
    }
`