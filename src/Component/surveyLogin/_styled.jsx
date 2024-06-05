import styled from 'styled-components'

export const StyledSurveyLogin = styled.div`
  .survery-conf{
    padding-right: 220px;
    font-family: 'SF Pro Display' !important;
  }
  .survey_login {
    margin: 28px auto;
    background: white;
    // position: absolute;
    // top: 31%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    -webkit-transition: .3s;
    transition: .3s;
    padding: 40px;
    width: 616px;
    border-radius: 4px;
    height:490px;
    font-size: 14px;
    line-height: 140%;
    &_header {
      width: 536px;
      height: 70px;
      &_ln1{
        width: 325px;
        height: 20px;
        margin: 1px auto;
      }
      &_ln2{
        font-weight: 700;
        font-size: 24px;
        line-height: 140%;
        color: #000000;
        text-align: center;
        width: 421px;
        height: 34px;
        margin: 16px auto;
        font-family: 'SF Pro Display' !important;
      }
      &_ln3{
        font-weight: 700;
        font-size: 24px;
        line-height: 140%;
        color: #000000;
        text-align: center;
        width: 366px;
        height: 68px;
        margin: 16px auto;
        font-family: 'SF Pro Display' !important;
      }
      &_ln_w1 {
        width: 160px;
        height: 20px;
        float:left;
      }
      &_ln_w2 {
        width: 133px;
        height: 20px;
        float:left;
      }
      &_bg_number_1{
        text-align: center;
        width: 16px;
        height: 16px;
        background: rgba(255, 66, 78, 1);
        border-radius: 60px;
        color: white;
        float:left;
        font-size: 12px;
        font-family: 'SF Pro Display' !important;
      }
      &_text_1{
        height: 20px;
        width: 140px;
        margin-left: 20px;    
        font-family: 'SF Pro Display' !important;
      }
      &_bg_number_2{
        text-align: center;
        width: 16px;
        height: 16px;
        background: #7C88A6;
        border-radius: 60px;
        color: white;
        float:left;
        font-size: 12px;
        font-family: 'SF Pro Display' !important;
      }
      &_text_2{
        height: 20px;
        width: 113px;
        margin-left: 20px;
        font-family: 'SF Pro Display' !important;
      }
    }
    &_footer {
      &_button {
        padding: 0px 16px;
        width: 536px;
        height: 36px;
      }
    }
    
  }
  .rectag {
    width: 16px;
    height: 1px;
    background: #7C88A6;
    float: left;
    margin: 8px;
  }
  .color_txt_gr {
    color: rgba(255, 66, 78, 1);
  }
  .color_bg_gr {
    background: rgba(255, 66, 78, 1);
  }
  .color_txt_xa {
    color: #7C88A6
  }
  .survey_fl {
    float:left;
    margin-right: 10px;
  }
  .info_form {
    height:672px;
    top: 42%;
  }
  .info_hd_form {
    height: 104px;
  }
  .survey_login_body_item [data-checked='true'] {
      background: rgba(255, 66, 78, 1);
      border-color: rgba(255, 66, 78, 1)!important;
  }
`

export const StyledTypeBussiness = styled.div`

.survey_login_body {
  margin: 44px auto;
  width: 516px;
  height: 216px;
  .checkbox__input {
    width: 18px;
    height: 18px;
  }

  &_phone{
    width: 516px;
    height: 216px;
  }

  &_item {
    padding: 10px;
    background: #F3F6FC;
    border-radius: 60px;
    float: left;
    margin-right: 10px;
    margin-top: 24px;
    height: 36px;
  }
  .fl_checked{
    background:  #FFEBEC !important;
  }
  &_item_text {
    font-weight: 400;
    font-size: 15px;
    float: right;
    font-family: 'SF Pro Display' !important;
  }
  &_item_text:hover {
    cursor: pointer;
  }
  .item_1 {
    width: 109px;
    margin-top: 0px;
    margin-left: 42px;
  }
  .text_1 {
    width: 59px;
    height: 21px;
  }
  .item_2 {
    width: 114px;
    margin-top: 0px;
  }
  .text_2 {
    width: 64px;
    height: 21px;
  }
  .item_3 {
    width: 189px;
    margin-top: 0px;
  }
  .text_3 {
    width: 139px;
    height: 21px;
  }
  .item_4 {
    width: 116px;
    margin-left: 20px;
  }
  .text_4 {
    width: 66px;
    height: 21px;
  }
  .item_5 {
    width: 126px;
  }
  .text_5 {
    width: 76px;
    height: 21px;
  }
  .item_6 {
    width: 100px;
  }
  .text_6 {
    width: 50px;
    height: 21px;
  }
  .item_7 {
    width: 103px;
  }
  .text_7 {
    width: 53px;
    height: 21px;
  }
  .item_8 {
    width: 204px;
    margin-left: 47px;
  }
  .text_8 {
    width: 154px;
    height: 21px;
  }
  .item_9 {
    width: 198px;
  }
  .text_9 {
    width: 148px;
    height: 21px;
  }
  .item_10 {
    width: 150px;
  }
  .text_10 {
    width: 100px;
    height: 21px;
  }
  .item_11 {
    width: 173px;
  }
  .text_11 {
    width: 123px;
    height: 21px;
  }
  .item_12 {
    width: 161px;
  }
  .text_12 {
    width: 111px;
    height: 21px;
  }
}
`

export const StyledInforShop = styled.div`

.survey_infor {
  margin: 40px 0px 52px 0px;
  width: 536px;
  height: 364px;

  &_phone{
    width: 260px;
    margin-top: 24px;
  }
  &_email{
    width: 260px;
    margin-top: 24px;
    margin-left: 16px;
  }
  &_address {
    margin-top: 24px;
  }
  &_group_pe{
    display: flex;
  }
  &_district {
    width: 260px;
    margin-top: 54px;
    margin-left: 16px;
  }
  &_cbx_default{
    margin-top:24px
  }
  .survey_input_validate {
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    width: fit-content;
  }
  .survey_input_validate_err input{
    border-color: #FF424E
  }
  .auto-complete {
    &__option {
      &[data-hover='true'] {
        color: unset !important;
      }
      &[data-hover='true']:hover {
        color: rgba(255, 66, 78, 1) !important;
      }
    }
  }
}
`

