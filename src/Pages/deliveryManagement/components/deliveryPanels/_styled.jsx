import styled from 'styled-components'

export const StyledDeliveryPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .order-panels {
    &__item {
      width: calc(33.33% - 16px);
      margin: 0 8px;
    }
  }
`
