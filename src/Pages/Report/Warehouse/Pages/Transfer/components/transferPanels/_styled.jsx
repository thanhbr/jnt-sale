import styled from 'styled-components'

export const StyledTransferPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .import-panels {
    &__item {
      width: calc(50% - 16px);
      margin: 0 8px;
      border: 1px solid #EBEEF5;
      border-radius: 6px;
    }
  }
`
