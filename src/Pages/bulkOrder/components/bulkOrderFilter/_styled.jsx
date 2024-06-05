import styled from 'styled-components'

export const StyledBulkOrderFilter = styled.div`
  .bulk-order-filter {
    &__group {
      width: calc(100% - 24px);
      margin: 0 -6px;

      display: flex;
      flex-wrap: wrap;

      transition: max-height 0.25s;

      &[data-collapse='false'] {
        max-height: 0;

        overflow: hidden;
      }

      &[data-collapse='true'] {
        max-height: 50px;
      }
    }

    &__group-item {
      width: calc(25% - 12px);
      margin: 0 6px 16px 6px;

      @media screen and (max-width: 1599px) {
        width: calc(100% / 3 - 12px);
      }
    }

    &__action-btn {
      margin: 0 6px;
    }
  }
`
