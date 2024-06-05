import styled from "styled-components";
import "../../../../../mixin/index.scss";
import {THEME_COLORS} from "../../../../../../common/theme/_colors";
export const StyledStoreAccountDetail = styled.div`
        height:100%;
    .store-detail{
        height:100%;
        
        &_group{
            display:flex;
            align-items: center;
            margin-bottom: 8px;
            height: 43px;
           
        }
        &_btn-update{
            background: none;
            color: ${THEME_COLORS.blue_500};
            border: 0;
            font-weight: 400;
            font-size: 15px;
            line-height: 140%;
            cursor: pointer;
            margin-left: 3rem;
            @media screen and (max-width: 1366px){
              width: 64px !important;
              margin-left: 2px;
            }
        }
        &_title{
            width: 113px !important;
             svg{
                margin-bottom: 4px;
                margin-left: 4px;
            }
        }
        &_input{
            margin-left: 14px;
            width : 20.31rem !important;
            input{
               border: none !important;
               
            }
        }
        &_action-btn{
            position: fixed;
            bottom: 0;
            right: 0;
            width: 38.25rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 24px;
            border-top: 1px solid #EBEEF5;
            background: #ffffff;
            z-index:999;
        }
        &_accept{
            margin-left: 12px;
        }
        &_input-edit{
            width: 26.62rem;
            margin-left: 14px;
            input{
                border:none !important;
                border-bottom: 1px solid #dde2f0 !important;
                border-radius:0 !important;
                padding:0 21px 0 0 !important;
                padding-left:0 !important;
            }
            
            .input__input:disabled{
                 background: none !important; 
            }
            .category-input__input{
                input{
                    padding-left:0 !important;
                }
            } 
            .input__button{
                display: flex;
                align-items: end;
            }
            button{
                border-radius: 8px !important;
                width: 73px!important;
                height:25.69px !important;
                padding-top: 2px;
            }
        }
    }
     .store-update{
        height:100%;
        &_group{
            display:flex;
            align-items: center;
            margin-bottom: 8px;
            height: 43px;
          
        }
        &_btn-update{
            background: none;
            color: ${THEME_COLORS.blue_500};
            border: 0;
            font-weight: 400;
            font-size: 15px;
            line-height: 140%;
            cursor: pointer;
          
        }
        &_title{
            width: 113px !important;
            @media screen and (max-width : 1366px){
              width: 122px !important;
            }
              svg{
                margin-bottom: 4px;
                margin-left: 4px;
            }
        }
        &_input{
            margin-left: 14px;
            width : 20.31rem !important;
            input{
               border: none !important;
               
            }
        }
        &_action-btn{
            position: fixed;
            bottom: 0;
            right: 0;
            width: 38.25rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 24px;
            border-top: 1px solid #EBEEF5;
            background: #ffffff;
            z-index:999;
        }
        &_accept{
            margin-left: 12px;
        }
        &_input-edit{
            width: 426.25px;
            margin-left: 14px;
            input{
                border:none !important;
                border-bottom: 1px solid #dde2f0 !important;
                border-radius:0 !important;
                padding:0 21px 0 0 !important;
                padding-left:0 !important;
            }
            .input__input{
                &:hover{
                    box-shadow:none !important;
                }
            }
            .input__input:disabled{
                 background: none !important; 
            }
            .category-input__input{
                input{
                    padding-left:0 !important;
                }
            } 
            .input__button{
                display: flex;
                align-items: end;
            }
            button{
                border-radius: 8px !important;
                width: 73px!important;
                height:25.69px !important;
                padding-top: 2px;
            }
            .alternative-auto-complete__menu{
                max-height: 205px !important;
            }
            
        }
        &_address{
            input{
               padding-right: 77px !important;
            }
        }
        &_slit-address{
            position:relative;
            .input__button{
                position: absolute;
                    bottom: 4px;
                    right: 0;
            }
        }
    }

`