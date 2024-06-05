import styled from 'styled-components'

export const StyledOrderPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .order-panels {
    &__item {
      width: calc(25% - 16px);
      margin: 0 8px;
    }
  }
`
