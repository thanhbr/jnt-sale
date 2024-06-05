import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledFacebookLivestreamScript_Tbody = styled.div`
  min-height: 72px;

  display: flex;

  background: #fff;
  border-top: 1px solid #e2eaf8;

  .facebook-livestream-script-tbody {
    &__td {
      padding: 12px;

      display: flex;
      flex-wrap: wrap;
      align-items: center;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      line-height: 20px;

      @media screen and (max-width: 1599px) {
        padding: 12px 8px;
      }

      &:nth-child(1) {
        padding-left: 24px;

        flex: 1;
        overflow: hidden;

        @media screen and (max-width: 1599px) {
          padding: 12px 8px 12px 24px;
        }
      }
      &:nth-child(2) {
        width: 324px;

        @media screen and (max-width: 1599px) {
          width: 200px;
        }
      }
      &:nth-child(3) {
        width: 154px;

        @media screen and (max-width: 1599px) {
          width: 146px;
        }
      }
      &:nth-child(4) {
        width: 144px;

        justify-content: center;

        @media screen and (max-width: 1599px) {
          width: 140px;
        }

        & > img {
          width: 100%;
          height: auto;
        }
      }
      &:nth-child(5) {
        width: 144px;

        justify-content: center;

        @media screen and (max-width: 1599px) {
          width: 140px;
        }
      }
      &:nth-child(6) {
        width: 60px;
        padding-right: 24px;

        @media screen and (max-width: 1599px) {
          width: 56px;
          padding: 12px 24px 12px 8px;
        }
      }
      .popper__container {
        top: -32px;
      }
    }
  }
`
