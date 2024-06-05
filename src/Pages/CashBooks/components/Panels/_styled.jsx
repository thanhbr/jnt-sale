import styled from 'styled-components'

export const StyledCashBooksPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  color: #7c88a6;

  .order-panels {
    &__item {
      width: calc(24.33% - 15px);
      margin: 0 8px;

      &:nth-child(2) {
        h4 {
          color: #00ab56 !important;
        }
      }
      &:nth-child(3) {
        h4 {
          color: #ff424e !important;
        }
      }
      &:nth-child(4) {
        h4 {
          color: #1a94ff !important;
        }
      }
    }
  }
`
