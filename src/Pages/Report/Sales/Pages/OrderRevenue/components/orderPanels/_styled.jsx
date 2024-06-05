import styled from 'styled-components'

export const StyledOrderPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .order-panels {
    &__item {
      width: calc(33.3334% - 12px);
      margin: 0 6px;
    }
  }
`
