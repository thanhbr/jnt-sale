import styled from 'styled-components'

export const StyledFacebookResponseContentScript_Tbody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background: #fff;
  border-top: 1px solid #e2eaf8;

  transition: background 0.25s;

  &:hover {
    background: #f3f6fc;
  }

  .facebook-response-content-script-tbody {
    &__td {
      height: 100%;
      min-height: 66px;
      padding: 12px;

      display: flex;
      align-items: center;

      font-size: 13px;
      line-height: 20px;

      &:nth-child(1) {
        width: 49px;
        padding-left: 16px;
      }
      &:nth-child(2) {
         width: 58%;
         text-align: left;
         justify-content: left;
      }
      &:nth-child(3) {
         width: 17%;
         text-align: center;
         justify-content: center;
      }
      &:nth-child(4) {
         width: 17%;
         text-align: center;
         justify-content: center;
      }
      &:nth-child(5) {
         width: 5%;
         text-align: left;
         justify-content: flex-end;
      }
      @media screen and (max-width: 1599px) {
        padding: 8px;
      }
    }

    &__menu {
      width: 164px;
    }

    &__menu-item {
      height: 36px;
      padding: 0 4px;

      display: flex;
      align-items: center;

      font-size: 13px;
      line-height: 20px;

      cursor: pointer;
    }

    &__menu-icon {
      margin-right: 10px;

      svg {
        transform: translateY(2px);
      }
    }
  }

  .common-ellipsis {
    max-width: 100%;

    overflow: hidden;
    white-space: nowrap;

    text-overflow: ellipsis;

    cursor: pointer;

    &.--multiple {
      display: -webkit-box;

      white-space: unset;

      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`
