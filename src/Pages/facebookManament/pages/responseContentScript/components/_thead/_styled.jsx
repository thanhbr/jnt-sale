import styled from 'styled-components'

export const StyledFacebookResponseContentScript_Thead = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;
  display: flex;
  align-items: center;

  background: #eff3fb;
  border-top: 1px solid #e2eaf8;

  .facebook-response-content-script-thead {
    &__th {
      height: 44px;
      padding: 12px 14px;

      font-size: 13px;
      font-weight: 600;
      line-height: 20px;

      @media screen and (max-width: 1599px) {
        padding: 12px 8px;
      }

      &:nth-child(1) {
        width: 54px;
        padding-left: 16px;
      }
      &:nth-child(2) {
        width: 178px;

        @media screen and (max-width: 1599px) {
          width: 128px;
        }
      }
      &:nth-child(3) {
        flex: 1;
      }
      &:nth-child(4) {
        width: 328px;

        @media screen and (max-width: 1599px) {
          width: 228px;
        }
      }
      &:nth-child(5) {
        width: 158px;

        @media screen and (max-width: 1599px) {
          width: 136px;
        }
      }
      &:nth-child(6) {
        width: 54px;
        padding-right: 16px;
      }

      @media screen and (max-width: 1599px) {
        padding: 8px;
      }
    }

    &__icon {
      width: 16px;
      height: 16px;
      margin-left: 4px;

      display: inline-block;

      transform: translateY(2px);

      cursor: pointer;

      &[data-icon-only='true'] {
        position: relative;

        width: 16px;
        height: 16px;
        margin-left: 0;

        transform: unset;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);
        }
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`
