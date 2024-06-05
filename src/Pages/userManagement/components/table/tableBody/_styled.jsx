import styled from "styled-components";

export const StyledUserTableBody = styled.div`
  .tr__container {
    cursor: pointer;
  }
    .user-management-table_body{
        border-bottom: 1px solid #e2eaf8;
        &-checkbox{
           
        }
        .checkbox_hover{
            cursor: not-allowed;
        }
        &-fullname{
          width: 18.75rem;
         margin-left:24px;
          .tooltipv2 {
            display: -webkit-box;
            max-width: 100%;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &-phone{
            width: 10rem;
           margin-left:24px;
        }
        &-email{
            width: 18.75rem;
         margin-left:24px;
            .tooltip_email {
                max-width: 100%;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
        }
        &-managment{
            width: 28.5rem;
           margin-left:24px;
            flex:1;
            .tooltipv2-text {
                display: flex;
                align-items: center;
                max-width: 100%;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
    
            .tooltipv2 {
                display: -webkit-box;
                max-width: 100%;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        &-status{
            width: 12.5rem;
           margin-left:24px;
            .switch-status{
                width: fit-content;
                margin: 0 auto;
            }
            .switch-opacity{
                opacity:0.5;
            }
            // .switch{
            //     margin-left: 44%;
            // }
        }
        &-setting{
            width: 4.75rem;
           margin-left:24px;
            position: relative;
            justify-content: flex-end;
            span{
                width:100% !important;
            }
           
        }
        &-toggle{
            position: absolute;
            top: 54%;
            right: 42px;
            transform: translateY(-50%) rotate(0deg);
            cursor: pointer;
            &[data-active='true'] {
                position: absolute;
                
                top: 45%;
                right: 42px;
                transform: translateY(-50%) rotate(180deg);
            }
        }
    }
    @media screen and (max-width : 1559px){
        .user-management-table_body{
            &-fullname{
                width: 12.52rem;
            }
            &-phone{
                width: 9.27rem;
            }
            &-email{
                width: 15.39rem;
            }
            &-managment{
                width: 22.64rem;
            }
            &-status{
                width: 10.52rem;
            }
            &-setting{
                width: 3.75rem;
            }
        }
    }
    @media only screen and (max-width : 1366px){
        .user-management-table_body{
            &-fullname{
                width: 19.52rem;
            }
            &-phone{
                width: 9.27rem;
            }
            &-email{
                width: 15.39rem;
            }
            &-managment{
                width: 22.64rem;
            }
            &-status{
                width: 8.52rem;
            }
            &-setting{
                width: 4.75rem;
            }
        }
    }
`