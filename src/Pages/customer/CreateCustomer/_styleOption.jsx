import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledSingleAddressTable = styled.div`
  max-width: 100%;

  background: #fff;

  .single-address-table {
    &__thead {
      background: #eff3fb;
    }

    &__tbody {
      .single-address-table__tr {
        border-bottom: 1px solid #e2eaf8;

        transition: background 0.25s;

        &:last-child {
          border: none;
        }

        &:hover {
          background: #f3f6fc;

          .single-address-table__action {
            display: block;
          }
        }
      }
    }

    &__tr {
      display: flex;

      &[data-edit='true'] {
        background: #fff !important;

        .single-address-table__td {
          &:nth-child(1) {
            width: 3%;

            justify-content: center;
          }
          &:nth-child(2) {
            width: 38%;
          }
          &:nth-child(3) {
            width: 17%;
          }
          &:nth-child(4) {
            width: 17%;
          }
          &:nth-child(5) {
            width: 17%;
          }
          &:nth-child(6) {
            @media only screen and (max-width: 1599px) {
              display: none;
            }
          }
          &:nth-child(7) {
            @media only screen and (max-width: 1599px) {
              display: none;
            }
          }
          &:nth-child(8) {
            width: 8%;
          }
        }
      }

      &:hover {
        .single-address-table__action {
          display: block;

          &[data-reverse='true'] {
            display: none;
          }
        }
      }
    }

    &__th {
      min-height: 44px;
      padding: 12px 16px;

      display: flex;
      align-items: center;

      list-style: none;

      @media only screen and (max-width: 1599px) {
        padding: 12px 8px;
      }

      @media only screen and (max-width: 1399px) {
        padding: 12px 6px;
      }

      &:nth-child(1) {
        width: 3%;

        justify-content: center;
      }
      &:nth-child(2) {
        width: 32%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 12%;
      }
      &:nth-child(5) {
        width: 12%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:nth-child(7) {
        width: 10%;
      }
      &:nth-child(8) {
        width: 7%;
      }
    }

    &__td {
      min-height: 66px;
      padding: 13px 16px;

      display: flex;
      align-items: center;

      list-style: none;

      font-size: 14px;
      font-weight: 500;
      line-height: 20px;

      @media only screen and (max-width: 1599px) {
        padding: 13px 8px;
      }

      @media only screen and (max-width: 1399px) {
        padding: 12px 6px;
      }

      &:nth-child(1) {
        width: 3%;

        justify-content: center;
      }
      &:nth-child(2) {
        width: 32%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 12%;
      }
      &:nth-child(5) {
        width: 12%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:nth-child(7) {
        width: 10%;
      }
      &:nth-child(8) {
        width: 7%;

        justify-content: flex-end;
      }
    }

    &__action {
      width: 24px;
      height: 24px;
      margin: 0 0 0 16px;
      padding: 0;

      display: none;

      background: transparent;
      border: none;

      cursor: pointer;

      &:first-child {
        margin: 0;
      }

      &[data-reverse='true'] {
        display: block;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }

    &__autocomplete {
      width: 100%;

      &[aria-owns] {
        .MuiOutlinedInput-root {
          border-color: ${THEME_COLORS.primary_300};
        }
      }

      &[data-disabled='true'] {
        .MuiOutlinedInput-root {
          cursor: no-drop;

          input {
            cursor: no-drop;
          }
        }
      }

      &[data-warning='true'] {
        .MuiOutlinedInput-root {
          border-color: ${THEME_SEMANTICS.failed};

          input {
            &::placeholder {
              color: ${THEME_SEMANTICS.failed}!important;
            }
          }
        }
      }

      .MuiOutlinedInput-root {
        padding: 0;

        background: #fff;
        border: 1px solid #e2eaf8;
        border-radius: 6px;
      }

      input {
        height: 34px;
        padding: 0 12px !important;

        color: ${THEME_COLORS.secondary_100};
        font-size: 14px;
        font-weight: 400;
      }
    }

    &__special-field-text {
      position: relative;
      z-index: 1;

      width: 100%;
    }

    &__special-input {
      width: 100%;
      height: 34px;
      padding: 0 82px 0 12px;

      background: #fff;
      border: 1px solid #e2eaf8;
      border-radius: 6px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: border 0.25s;

      &:focus {
        border-color: ${THEME_COLORS.primary_300};
      }
    }

    &__special-toggle {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 4;

      width: 70px;
      height: 34px;
      padding: 0 12px 0 6px;

      background: ${THEME_COLORS.primary_300};
      border: none;
      border-radius: 0 4px 4px 0;

      svg {
        path {
          stroke: unset;
        }
      }
    }

    &__special-select {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;

      width: 100%;
      max-height: 196px;
      padding: 16px 14px;

      overflow: auto;

      background: #ffffff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__special-option {
      width: 100%;
      margin: 0 0 16px 0;

      overflow: hidden;
      white-space: nowrap;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-overflow: ellipsis;

      transition: color 0.25s;

      cursor: pointer;

      &:last-child {
        margin: 0;
      }

      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__report-marker {
      position: relative;
      top: 5px;
      left: 6px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__btn-edit {
      width: 32px;
      height: 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #f3f6fc;
      border: none;
      border-radius: 50%;

      cursor: pointer;

      &:disabled {
        cursor: no-drop;

        svg {
          color: #6e6d7a;

          path[stroke] {
            stroke: #6e6d7a;
          }
        }
      }
    }
  }
`

export const StyledOption = styled.div`
  min-width: 500px;
  height: 36px;

  background: #fff !important;

  color: ${THEME_COLORS.secondary_100};
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;

  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 52rem;
  white-space: nowrap;
  &:hover {
    color: ${THEME_COLORS.primary_300};
  }
`
