import styled from 'styled-components'

export const StyledBulkOrderCreateActionCards = styled.div`
  width: calc(100% + 24px);
  margin: 0 -12px;

  display: flex;
  flex-wrap: wrap;
`

export const StyledBulkOrderCreateActionCardItem = styled.div`
  width: calc(50% - 24px);
  margin: 16px 12px 0 12px;
  padding: 16px;

  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 4px;

  .bulk-order-create-action-card-item {
    &__content {
      padding-right: 16px;

      flex: 1;
    }

    &__banner {
      margin-right: 16px;

      img {
        width: 62px;
        height: 62px;

        object-fit: contain;
        object-position: center;
      }
    }
  }
`
