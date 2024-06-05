import styled from "styled-components";

export const StyledGridOverView = styled.div`
     
    .delivery-over-view{
           display:flex;
         &_grid-border{
            background: #FFFFFF;
            border-radius: 8px;
            height: auto;
            padding: 20px 24px 24px 24px;
         }
         &_grid-border[data-grid = 'true']{
            width: 50.375rem;
           
             @media only  screen and (max-width: 1440px)  and (max-width: 1919px){
              width: 100%;
            }
             @media only screen and (max-width: 1366px) and (max-width: 1439px){
              width: 100%;
            }
             @media only screen and (max-width: 1280px) and (max-width: 1365px){
              width: 100%;
            }
         }
        &_grid-left{
           width: 62.125rem;
           margin-right: 24px;
           flex: 1;
         }
         &_grid-right{
           width: 668px;
            flex: 1;
         }
    }
    
    @media only  screen and (max-width : 1440px) and (max-width: 1919px){
      .delivery-over-view{
        display: block;
        &_grid-left{
           width:100%;
           margin-right: 24px;
           flex: 1;
            margin-bottom: 3rem;
         }
         &_grid-right{
          width: 100%;
            flex: 1;
         }
      }
    }
    @media only  screen and (max-width : 1366px) and (max-width: 1439px){
      .delivery-over-view{
        display: block;
        &_grid-left{
           width: 100%;
           margin-right: 24px;
           flex: 1;
            margin-bottom: 3rem;
         }
         &_grid-right{
          width: 100%;
            flex: 1;
         }
      }
    }
    @media only  screen and (max-width : 1280px) and (max-width: 1365px){
      .delivery-over-view{
        display: block;
        &_grid-left{
           width: 100%;
           margin-right: 24px;
           flex: 1;
            margin-bottom: 3rem;
         }
         &_grid-right{
          width: 100%;
            flex: 1;
         }
      }
    }
`