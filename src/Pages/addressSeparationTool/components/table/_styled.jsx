import styled from 'styled-components'

export const StyledAddressTable = styled.div`
  max-width: 100%;

  overflow: auto;

  .address-table {
    &__thead {
      background: #eff3fb;
    }

    &__tbody {
      .address-table__tr {
        border-bottom: 1px solid #e2eaf8;

        transition: background 0.25s;

        &:last-child {
          border: none;
        }

        &:hover {
          background: #f3f6fc;

          .address-table__action {
            display: block;
          }
        }
      }
    }

    &__tr {
      display: flex;

      &:hover {
        .address-table__action {
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

      &:nth-child(1) {
        width: 33%;

        @media only screen and (max-width: 1599px) {
          width: 28%;
        }

        @media only screen and (max-width: 1399px) {
          width: 18%;
        }
      }
      &:nth-child(2) {
        width: 10%;

        justify-content: center;

        @media only screen and (max-width: 1599px) {
          width: 15%;
        }
      }
      &:nth-child(3) {
        width: 24%;
      }
      &:nth-child(4) {
        width: 14%;

        @media only screen and (max-width: 1399px) {
          width: 20%;
        }
      }
      &:nth-child(5) {
        width: 10%;

        justify-content: center;

        @media only screen and (max-width: 1399px) {
          width: 15%;
        }
      }
      &:nth-child(6) {
        width: 9%;

        justify-content: flex-end;
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

      &:nth-child(1) {
        width: 33%;

        @media only screen and (max-width: 1599px) {
          width: 28%;
        }

        @media only screen and (max-width: 1399px) {
          width: 18%;
        }
      }
      &:nth-child(2) {
        width: 10%;

        justify-content: center;

        @media only screen and (max-width: 1599px) {
          width: 15%;
        }
      }
      &:nth-child(3) {
        width: 24%;
      }
      &:nth-child(4) {
        width: 14%;

        @media only screen and (max-width: 1399px) {
          width: 20%;
        }
      }
      &:nth-child(5) {
        width: 10%;

        justify-content: center;

        @media only screen and (max-width: 1399px) {
          width: 15%;
        }
      }
      &:nth-child(6) {
        width: 9%;

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

      &:hover {
        svg {
          color: #1e9a98;

          path[stroke] {
            stroke: #1e9a98;
          }

          path[fill]:not(.--nofill) {
            fill: #1e9a98;
          }
        }
      }

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
  }
`
