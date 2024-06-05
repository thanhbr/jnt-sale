import styled from 'styled-components'

export const StyledCustomerInfor = styled.div`
.customerInfor_fb{
  padding: 24px;
  height: calc(100vh - 121px);
  overflow: auto;

  .group_title{
    display: flex;
  }
  
  .general {
    label {
      font-size: 13px;
      padding: 2px 0;
      span {
        color: red;
      }
    }
    input {
      padding: .5rem 1rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--background-border);
      font-size: 13px;
    }
    .input_large {
      width: 100%;
    }
    .lb_group_name {
      padding-right: 16px;
      &_total_report {
        float: right;
      }
    }
    .lb_group_phone .input__label {
      width: auto !important;
      
    }
  }
  .tt_customer {
    // width: 109px;
    height: 21px;

    font-family: 'SF Pro Display';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 140%;
    color: #151624;
    float: left;
  }
  .tt_save_customer{
    height: 20px;
    font-family: 'SF Pro Display';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 140%;
    color: #1A94FF;
    &:hover {
      cursor: pointer;
    }
    display: flex;
    svg {
      margin: 2px 3px;
    }
  }
  .group_name_phone{
    display: flex;
    padding: 16px 0 16px 0;
  }
  .lb_group_name, .lb_group_phone {
    width: 50%;
  }
  .lb_group_address {
    input {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-radius: 6px 0 0 6px;
    }
  }
  .lb_group_address_option {
    display: flex;
    padding: 12px 0px 0px 0px;
    .lb_group_address_item {
      padding-right:16px;
    }
    &_validate {
      color: rgb(255, 66, 78);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 17px;
      width: fit-content;
    }
  }
  .lb_group_notes_item {
    textarea {
      resize: none;
    }
    margin-top: 16px;
  }

  @media screen and (max-width: 1566px) {
    .lb_group_address_option {
      display: block;
      .lb_group_address_item {
        padding-right: 0px;
        margin-bottom: 15px;
      }
    }
  }

  .group_title {
    margin-top: 24px
  }
  .tt_phone_address, .tt_history_order{
    width: 543px;
    height: 21px;

    font-family: 'SF Pro Display';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 140%;
    color: #151624;
  }
  .tt_history_order {
    margin-bottom: 16px;
  }

  .tt_phone_address, .tt_history_order {
    &__header {
      position: relative;
  
      padding-left: 24px;
  
      display: inline-block;
    }

    
    &_empty {
      font-weight: 400;
      font-size: 13px;
      line-height: 140%;
      color: #7C88A6;
      width: 579px;
      height: 20px;

    }

  
    &__header-status {
      top: 0;
      left: -1px;
  
      width: 24px;
      height: 24px;
  
      background: #fff;
      border-radius: 50%;
  
      transform: translateX(-50%);
  
      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  
    &__header-toggle {
      top: 0;
      right: -28px;
  
      width: 24px;
      height: 24px;
      margin-left: 4px;
  
      display: inline-block;
  
      transform: rotate(180deg);
      transition: transform 0.25s;
  
      cursor: pointer;
  
      &[data-expand='true'] {
        transform: rotate(0deg);
      }
  
      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  
    &__body {
      transition: all 0.25s;
  
      &[data-collapse='false'] {
        * {
          opacity: 0;
          pointer-events: none;
        }
      }
      .line_pn_phone {
        
        margin-top: 16px;
        .slick-next {
          top: 48%;
          right: -1px;
          width: auto;
          height: auto;
          background: #fff;
          border-radius: 0px 4px 4px 0px;
          box-shadow: -16px 0px 9px 1px #fff;
        }
        .slick-slide {
          margin-right: 7px;
          // width: 135px;
        }
        .slick-prev {
          background: #fff;
          border-radius: 0px 4px 4px 0px;
          box-shadow: -16px 0px 9px 1px #fff;
          border-radius: 0px 4px 4px 0px;
          width: auto;
          height: auto;
          left: 0px;
          transform: rotate(180deg);
          top: 0%;
          z-index: 1000;
        }
        .slick-disabled {
            display: none!important;
        }
      }
      .line_pn_address{
        max-height: 150px;
        overflow: auto;
        &_tooltip {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .line_pn_phone {
        .slick-track {
          display: flex;
          width: auto !important;
        }
      }
      .pn_phone {
        box-sizing: border-box;
        display: flex !important;
        flex-direction: row;
        align-items: center;
        padding: 6px 16px;

        
        font-weight: 500;
        font-size: 13px;
        line-height: 150%;

        width: 135px;
        height: 32px;

        border-radius: 60px;
        float: left;
        &:hover {
          cursor: pointer;
        }
        svg {
          margin-right: 6px;
          margin-top: 5px;
        }
        &_active {
          color: #1A94FF;
          background: rgba(26, 148, 255, 0.1);
          border: 1px solid #1A94FF;
          display: flex;
        }
        &_deactive {
          color: #7C88A6;
          background: rgba(239, 243, 251, 0.6);
          border: 1px solid #EBEEF5;
          display: flex;

        }
      }

      .pn_address{
        flex-direction: row;
        align-items: center;
        padding: 0px 16px;
        gap: 8px;

        // width: 579px;
        height: 32px;
        border-radius: 60px;
        margin-top: 16px;

        font-weight: 500;
        font-size: 13px;
        line-height: 150%;
        display: flex;

        span {
          margin-top:3px;
        }

        &:hover {
          cursor: pointer;
        }

        &_active {
          color: #1A94FF;
          background: rgba(26, 148, 255, 0.1);
          border: 1px solid #1A94FF;
           @media screen and (max-width: 1366px){
            padding: 20px;
          }
        }
        &_deactive {
          color: #7C88A6;
          background: rgba(239, 243, 251, 0.6);
          border: 1px solid #EBEEF5;

        }

      }
    }
  }
  .tt_history_order__body {
    max-height: 216px;
    overflow: auto;
    .row_history_order {
      padding-bottom: 18px;
      // margin-bottom: 18px;
      display: flex;
       @media screen and (max-width: 1440px){
        width: 500px;
      }
    }
    svg {
      margin-right: 6px;
      float: left;
    }
    .tt_history_order_text {

        &__status_name {
          font-weight: 500;
          font-size: 10px;
          line-height: 150%;
          width: 123px;
          // height: 17px;
          margin-right: 15px;
          float: left;
          text-align: center;
            @media screen and (max-width: 1440px){
            text-align: right;
            width: 141px;
          }
        }
      
        &__date{
          width: 67px;
          height: 18px;
          font-weight: 400;
          font-size: 13px;
          line-height: 140%;
          color: #7C88A6;
          margin-right: 8px;
          float: left;
        }
        &__orderid {
          height: 18px;
          font-weight: 400;
          font-size: 13px;
          line-height: 140%;
          color: #00081D;
          margin-right: 18px;
          width: 137px;
          height: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba(26,148,255,1);
          span {
            color: #00081D;
          }
          b {
            color: rgba(26, 148, 255, 1);
            font-weight: 400;
          }
          float: left;
          a {
            color: rgba(26,148,255,1);
          }
        }
        &__printr {
          float: right;
           width: 20px;
          &:hover{
            cursor: pointer;
          }
        }
    }

  }
}
`
