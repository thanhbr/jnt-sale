import styled from 'styled-components'

export const StyledPartner = styled.div`
    .set-position-parent{
        position: relative;
    }
    .part-item {
        background-color: white;
        margin-right: 17.75px;
        margin-bottom: 24px;
        padding: 16px 0px 24px;
        min-height: 200px;
        padding-left: 20px;
        padding-right: 19px;
        position: relative;
        border-radius: 4px;
        // max-width: 391px;
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
        &:hover {
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1)
        }
        &-ln-1, &-ln-3{
            display: flow-root;
        }
        &-ln-3{
            position: absolute;
            bottom:20px;
            width:90%
        }
        &-detail {
            min-height: 424px;
            z-index: 1000;
            position: absolute;
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
        &_cancel{
            background: #FFFFFF;
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            height: 36px;
            padding: 0 16px;
            color: #000C23;
            font-weight: normal;
            font-size: 15px;
            line-height: 0px;
            -webkit-transition: all 0.25s;
            transition: all 0.25s;
            cursor: pointer;
            width:110px;
            margin-right: 12px !important;
        }
        &_cancel:hover{
            color: #E5101D;
        }
        &_hidetext{
            width: 48px;
            height: 18px;
            margin-left: 20px;
        }
        
    }
    .part-icon-1{
        float: right;
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
        border-radius: 4px;
        height:445px
    }
    .modal-header{
        font-weight: 600;
        font-size: 20px;
        line-height: 140%;
        color: #00081D;
        width: 374px;
        height: 28px;
    }
    .modal-header {
        &-uppercase {
            text-transform: uppercase;
            height: 28px
        }
    }
    .modal-hd-body{
        font-weight: 600;
        font-size: 20px;
        line-height: 140%;
        color: #00081D;
        padding-top: 32px;
    }
    .modal-content-body{
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        padding-top: 24px;
        color: #151624;

    }
    .pt-32 {
        padding-top: 32px;
    }
    .pt-18 {
        padding-top: 18px;
    }
    .pt-24 {
        padding-top:24px;
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
    .form-text-input {
        padding-bottom:24px;
        height:88px
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
        line-height: 0px;
    }
    .cancel:hover {
        border: 1px solid var(--color-package-up2022-7) !important;
        
    }
    .save {
        font-weight: normal !important;
        width: 110px !important;
        line-height: 0px;
    }
    .modal-footer {
        float: right;
    }

    .part-img-partner {
        float: left;
    }
    .label-btn-connect {
        width: fit-content !important;
        height: 24px !important;
        background: #EBFFF5 !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        color: #00AB56 !important;
        text-transform: none !important;
        padding: 5px 12px !important;
    }
    .label-btn-disconnect {
        width: 89px !important;
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
        min-height: 36px;
        font-size: 14px;
        line-height: 18px;
        text-align: justify;
        letter-spacing: -0.004em;
        margin-top: 18px;
        color: #223E62;
    }
    .part-btn-2{
        float: left;
    }
    .part-img-conf{
        margin: 10px 0px 0px 0px;
        float: right;
        cursor: pointer
    }
    .part-img-conf svg:hover path{
        fill: #E5101D;
    }
    .loadmore{
        color: rgba(26, 148, 255, 1);
        font-size: 14px;
        cursor: pointer;
    }
    .loadmore svg{
        float:left
    }
    .dp-none{
        display: none;
    }
    .part-text-default{
        font-weight: 400;
        font-size: 12px;
        color: #00AB56;
        padding: 5px 0px 0px 8px;
        height: 17px;
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
        font-size: 13px
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
        float:right;
        height: 18px;
        padding-top: 2px;
    }
    .modal-content-body label {
        cursor:default
    }
    .part_toggle_eye {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 40%;
    }
    .part_pst_pass {
        position: relative;
    }
    @media only screen and (max-width: 1440px) {
        .part-item {
            min-height: 243px;
        }
        .part-item-detail {
            min-height: 510px;
        }
    }
    
`

export const StyledConfig = styled.div`
    // Modal config
    @keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(300px);
    }
    to {
        opacity: 1;
    }
    }
    @keyframes fadeInLeft {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(300px);
    }
    }
    .modal-config{
        background: white;
        position: absolute;
        top: 3.5rem;
        right: 0;
        width: 31.25rem;
        height: 100%;
        overflow-y: scroll;
        padding: 1.5rem;
        transition: 0.3s;
        animation: fadeInRight .3s ease-in-out;
    }
    .mgt-cbk{
        margin-top: 5.5px;
        display: flex;
        align-items: center;
    }
    .pgt-lb {
        // padding-top: 15px;
    }
    .mgt-footer {
        margin-bottom: 100px;
    }
    .pdt-21 {
        padding-top:21px !important
    }
    .pdt-11{
        padding-bottom: 11px;
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
            animation: fadeInRight .3s ease-in-out;
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
            cursor: default;
            margin-bottom: 17.5px;
            
        }
        &_mgl_lb {
            margin-left: 9.43px;
        }
        &_lb_switch {
            font-weight: 400;
            font-size: 14px;
            line-height: 140%;
            color: #191D32;
            margin-left: 9.43px;
            cursor: pointer;
            height: 20px;
        }
        &_gr{
            padding-top: 32px;
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
        &_mgt-16{
            margin-top:16px
        }
        &_height_32 {
            height: 32px
        }
        
        
    }
    .input-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 7px 8px 7px 16px;
        height: 34px;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        width: 55px;
        border-radius: 4px;
        margin-top: 8px;
    }
    .modal-config_gr .MuiInputBase-root {
        width: 134.9px;
        height: 34px;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        border-radius: 4px;
    }
    .modal-config_gr .MuiOutlinedInput-adornedStart {
        padding-left: 3px;
        margin-right: 15px
    }
    .modal-config_gr .MuiInputBase-inputAdornedStart {
        font-size: 14px !important;;
    }
    .modal-config_gr .MuiTypography-root {
        font-style: normal;
        font-weight: 400 !important;
        font-size: 14px !important;;
        line-height: 140%;
        color: #151624;
        border-right: 1px solid #EBEEF5;
        padding: 0px 6px;
    }
    .modal_custom {
        animation: fadeInLeft .3s ease-in-out;
        height: 100%;
    }
`
