import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";

export const StyledPartner = styled.div`
    .part-item {
        background-color: white;
        margin-right: 24px;
        margin-bottom: 24px;
        padding: 16px 0px 24px;
        min-height: 200px;
        padding-left: 20px;
        padding-right: 19px;
        position: relative;
    }
    input {
        border: 1px solid var(--background-border);
            border-radius: var(--border-radius-component);
            margin-top: .5rem;
            padding: .5rem 1rem;
            width: 100%;
    }
    input:focus {
            border-color: var(--bg-pr-large-hover);
        }
   
    .part-item {
        &-ln-1, &-ln-3{
            display: flow-root;
        }
        &-ln-3{
            position: absolute;
            bottom:24px;
            width:90%
        }
        &-detail {
            min-height: 500px;
            z-index: 1000;
            position: absolute;
            width: 20%;
        }
        &-errors{
            color: #FF424E;
            font-weight: 400;
            font-size: 0.75rem;
            line-height: 140%;
        }
        &_select_option {
            padding:5px;
            cursor: pointer
        }
        &_select_option:hover{
            color: var(--color-text-active);
        }
        
    }
    .part-icon-1{
        float: right;
        margin-top: 23px;
    }
    .grid-xs-30 {
        width:25%;
        float:left
    }
    .modal-connect{
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transition: .3s;
        transition: .3s;
        padding: 24px;
        width: 600px;
    }
    .modal-header{
        font-weight: 600;
        font-size: 17px;
        line-height: 140%;
        color: #00081D;
    }
    .modal-header {
        &-uppercase {
            text-transform: uppercase;
        }
    }
    .modal-hd-body{
        font-weight: 600;
        font-size: 17px;
        line-height: 140%;
        color: #00081D;
        padding-top: 32px;
    }
    .modal-content-body{
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        padding-top: 8px;
        color: #151624;

    }
    .pt-32 {
        padding-top: 32px;
    }
    .mgl-16 {
        margin-left: 16px;
    }
    .mgt-8 {
        margin-top: 8px;
    }
    .mgb-18 {
        margin-bottom:18px
    }
    .mgl-7 {
        margin-left: 7px;
        width: 100%;
    }
    .text-al-center {
        text-align:center;
    }
    .input-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 7px 8px 7px 16px;
        height: 34px;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        width: 552px;
        border-radius: 4px;
        margin-top: 8px;
    }
    .list-note-connect{
        list-style-type: disc;
        font-weight: 400;
        font-size: 13px;
        line-height: 140%;
        color: #7C88A6;
        padding-left: 14px;
    }
    .cancel {
        background: var(--white-color) !important;
        margin-right: 12px !important;
        width: 110px !important;
        border: 1px solid #EBEEF5 !important;
        color: #151624 !important;
        font-weight: normal !important;
    }
    .cancel:hover {
        border: 1px solid var(--color-package-up2022-7) !important;
        
    }
    .save {
        font-weight: normal !important;
        width: 110px !important;
    }
    .modal-footer {
        float: right;
    }

    .part-img-partner {
        float: left;
    }
    .label-btn-connect {
        width: 96px !important;
        height: 24px !important;
        background: #EBFFF5 !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        color: #00AB56 !important;
        text-transform: none !important;
        padding: 4px 12px !important;
    }
    .label-btn-disconnect {
        width: 96px !important;
        height: 24px !important;
        background: #EFF3FB !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        color: #7C88A6 !important;
        text-transform: none !important;
        padding: 4px 12px !important;
    }
    .part-btn-1{
        float: right;
    }
    .part-description {
        min-height: 127px;
        font-size: 14px;
        line-height: 18px;
        text-align: justify;
        letter-spacing: -0.004em;
        margin-top: 18px;
        color: #223E62;
    }
    .part-btn-2{
        float: left;
        margin-top: 23px;
    }
    .part-img-conf{
        margin: 10px 0px 0px 14px;
        float: right;
        cursor: pointer
    }
    .loadmore{
        color: rgba(26, 148, 255, 1);
        font-size: 14px;
        cursor: pointer;
    }
    .dp-none{
        display: none;
    }
    .part-text-default{
        font-weight: 400;
        font-size: 12px;
        color: #00AB56;
        padding: 10px 0px 0px 8px;
        height: 20px;
    }
    .error-form-submit {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 40px;
        background: rgba(255, 85, 85, 0.1);
        border: 1px solid #ff5555;
        border-radius: 4px;
        font-size: 14px;
        padding: 8px 12px 8px 13px;
        margin: 10px 0px 10px 0px;
    }
    .des-text-color {
        color: #7c88a6;
    }
    .note-warning-dis{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 56px;
        background: rgba(255, 159, 65, 0.1);
        border: 1px solid #FF9F41;
        border-radius: 4px;
        font-size: 14px;
        padding: 8px 12px 8px 13px;
        margin: 10px 0px 10px 0px;
        font-size: 14px;
        line-height: 140%;
        color: #000028;
    }
    .error-form-submit {
        &_close {
            cursor: pointer;
            float:right;
        }
    }
    .mgb-10{
        margin-bottom:10px;
    }
    .noti-token-ghn{
        font-weight: 400;
        font-size: 13px;
        color: #1A94FF;
        float:right
    }
`

export const StyledConfig = styled.div`
    // Modal config
    .modal-config{
        animation: 0.3s ease-in-out;
        background: white;
        position: absolute;
        top: 3.5rem;
        right: 0;
        width: 31.25rem;
        height: 100%;
        overflow-y: scroll;
        padding: 1.5rem;
        transition: 0.3s;
    }
    .mgt-cbk{
        margin-top:2.5px;
        display: flex;
        align-items: center;
    }
    .pgt-lb {
        padding-top: 15px;
    }

    .modal-config {
        &_dismiss {
            width: 1.5rem;
            height: 1.5rem;
            animation:  0.3s ease-in-out;
            position: fixed;
            top: 3.5rem;
            right: 31.25rem;
            cursor: pointer;
            background: rgb(124, 142, 160);
            padding: 0.1rem 0.25rem;
        }
        &_dismiss svg {
            height: 1rem;
            width: 1rem;
        }
        &_header {
            font-weight: 600;
            font-size: 20px;
            line-height: 140%;
            color: #151624;
        }
        &_hd_body{
            font-weight: 600;
            font-size: 18px;
            line-height: 140%;
            color: #151624;
            padding-top: 33.5px;
        }
        &_lb{
            font-weight: 400;
            font-size: 15px;
            line-height: 140%;
        }
        &_lb_switch {
            font-weight: 400;
            font-size: 14px;
            line-height: 140%;
            color: #191D32;
            margin-left: 9.43px;
        }
        &_gr{
            padding-top: 20.5px;
        }
        &_footer {
            position: fixed;
            bottom: 0;
            display: flex;
            width: 31.25rem;
            right:0;
            background: white;
            padding: 14px;
            border-top: 1px solid #EBEEF5;
            justify-content: right;
        }
        &_cancel{
            background: #FFFFFF;
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            font-size: 15px;
            line-height: 140%;
            color: #000C23;
            font-weight: normal;
            padding: 0 16px;
            width: 74px;
            height: 36px;
            margin-right: 12px;
        }
        &_cancel:hover{
            color: #E5101D;
        }
        &_save{
            width: 110px;
        }
        
    }
    
    
`

export const StyledRadioButton = styled.div`
.radio-item {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 11px;
  padding: 0px
}
.radio-item-label{
  padding-left:28px;
  font-size:14px;
//   padding-top: 1px;
}

.radio-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.radio-item .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #F5F5FA;
  border-radius: 50%;
  border: 1px solid #DDDDE3;
  margin-top: 0px;
}
.radio-item:hover input ~ .checkmark {
  background-color: #F5F5FA;
}

.radio-item input:checked ~ .checkmark {
  border: 1px solid  ${THEME_COLORS.green_500};
border-radius: 24px;
margin-top: 0px;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.radio-item input:checked ~ .checkmark:after {
  display: block;
}
.radio-item .checkmark:after {
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
	border: 2px solid ${THEME_COLORS.green_500};
  border-radius: 24px;
	background: ${THEME_COLORS.green_500};
  
}
`

