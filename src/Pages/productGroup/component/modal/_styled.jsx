import {THEME_COLORS} from "common/theme/_colors";
import styled from "styled-components";

export const StyledProductGroupContentModal = styled.div`
    .product-group-content{
   
        &_group{
            margin-top: 24px;
          &:nth-child(4){
            div{
                height: 96px;
            }
          }
            .tooltip_select{
                display: -webkit-box;
                height: 100%;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .product-group-content_alternative{
                input{
                    cursor: not-allowed !important;
                }
                
            }
           .product-group-content_alternative-option{
                // cursor: not-allowed;
                // color: #7c88a6 !important;
                display: none;
            }
        }
        &_select{
            margin-top: 8px;
            
        }
        &_unSelect{
            input{
                color : #7C88A6;
            }
            
        }
        &_switch{
            display: flex;
            align-item: center;
            margin-top: 32px;
            p{
                margin-left: 8px;
            }
        }
        &_option{
            margin-top:8px;
            cursor: pointer;
            &:hover{
                color:${THEME_COLORS.primary_300};
            }
            &[data-active='true'] {
                color: ${THEME_COLORS.primary_300};
                font-weight: 600;
                cursor: default;
              }
        }
         &_group-textArea{
            height:auto;
            div{
            height:auto !important;
            }
            textarea{
            resize: none;
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