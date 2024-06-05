import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingle_ProductSearchList = styled.div`
  .facebook-livestream-script-single-product-search-list {
    &__footer {
      position: sticky;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      background: #fff;

      transform: translateY(12px);
    }

    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__item {
      margin-bottom: 16px;

      display: flex;
      align-items: center;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__banner {
      width: 48px;
      height: 48px;
      margin: 0 16px;

      overflow: hidden;

      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__info {
      flex: 1;
    }

    &__name {
      display: flex;
      justify-content: space-between;
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
