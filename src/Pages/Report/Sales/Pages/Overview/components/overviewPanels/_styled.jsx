import styled from 'styled-components'

export const StyledOrderPanels = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;

  .order-panels {
    &__item {
      width: calc(25% - 6px);
      margin-right: 8px;
      padding: 12px;
      border: 1px solid #EBEEF5;
      border-radius: 4px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  
  .total-revenue {
    .total-order p {
      color: #168AFF;
    }
  }

  .total-revenue.active {
    .content-chart-tab {
      border-right: none;
    }
    h4{
      color: #2276FC!important;
    }
  }
  .total-orders.active {
    h4{
      color: #FF4040!important;
    }
  }
  .total-products.active {
    h4{
      color: #FF9D0B!important;
    }
  }

  .total-profits.active {
    .content-chart-tab {
      border-right: none;
    }
    h4{
      color: #33CC91!important;
    }
  }
`
