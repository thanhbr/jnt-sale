import styled from 'styled-components'

export const StyledPageHeader = styled.div`
  margin: 0 0 14px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-header {
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__action-item {
      margin: 0 12px 0 0;

      span{
        font-size: 14px;
      }

      &:last-child {
        margin: 0;
      }
    }

    &__none-actions {
      text-align: right;
      font-weight: 400;
        font-size: 13px;
        line-height: 140%;
        color: #00081D;
      
      .txt-green{
        color: #00AB56;
      }
    }
  }
  .breadcrumb {
    &__title {
      display: flex;
      align-items: baseline;
    }

    &__links {
      display: flex;
      align-items: center;

      svg {
        width: 17px;
        height: 17px;
        margin: 0 2px;
      }
    }
  }
`
