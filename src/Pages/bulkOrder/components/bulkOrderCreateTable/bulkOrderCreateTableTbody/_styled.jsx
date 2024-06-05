import {Tr} from 'layouts/tableLayout/_tr'
import styled from 'styled-components'

export const StyledBulkOrderCreateTableTbodyTr = styled(Tr)`
  position: relative;

  &[data-status='failed'] {
    //.tr__container {
    //  background: linear-gradient(
    //      0deg,
    //      rgba(255, 66, 78, 0.05),
    //      rgba(255, 66, 78, 0.05)
    //    ),
    //    #ffffff !important;
    //}

    //.bulk-order-create-table-tbody-tr {
    //  &__td {
    //    &:nth-child(1),
    //    &:nth-child(19) {
    //      background: linear-gradient(
    //          0deg,
    //          rgba(255, 66, 78, 0.05),
    //          rgba(255, 66, 78, 0.05)
    //        ),
    //        #ffffff !important;
    //
    //      .__hover-container {
    //        background: linear-gradient(
    //            0deg,
    //            rgba(255, 66, 78, 0.1),
    //            rgba(255, 66, 78, 0.1)
    //          ),
    //          #ffffff;
    //      }
    //    }
    //  }
    //}

    //&:hover {
    //  .tr__container {
    //    background: linear-gradient(
    //        0deg,
    //        rgba(255, 66, 78, 0.1),
    //        rgba(255, 66, 78, 0.1)
    //      ),
    //      #ffffff !important;
    //  }
    //
    //  .bulk-order-create-table-tbody-tr {
    //    &__td {
    //      &:nth-child(1),
    //      &:nth-child(19) {
    //        background: linear-gradient(
    //            0deg,
    //            rgba(255, 66, 78, 0.1),
    //            rgba(255, 66, 78, 0.1)
    //          ),
    //          #ffffff !important;
    //
    //        .__hover-container {
    //          background: linear-gradient(
    //              0deg,
    //              rgba(255, 66, 78, 0.1),
    //              rgba(255, 66, 78, 0.1)
    //            ),
    //            #ffffff !important;
    //        }
    //      }
    //    }
    //  }
    //}
  }
  //&[data-status='failedApi'] {
  //  .tr__container {
  //    background: linear-gradient(0deg, rgba(255, 190, 56, 0.15), rgba(255, 190, 56, 0.15)), #FFFFFF;
  //  }
  //  .bulk-order-create-table-tbody-tr {
  //    &__td {
  //      &:nth-child(1),
  //      &:nth-child(19) {
  //        background: linear-gradient(0deg, rgba(255, 190, 56, 0.15), rgba(255, 190, 56, 0.15)), #FFFFFF !important;
  //
  //        .__hover-container {
  //          background: linear-gradient(0deg, rgba(255, 190, 56, 0.15), rgba(255, 190, 56, 0.15)), #FFFFFF;
  //        }
  //      }
  //    }
  //  }
  //
  //  &:hover {
  //    .tr__container {
  //      background: linear-gradient(0deg,rgb(235 165 21 / 15%),rgb(255 177 16 / 15%)),#fdf1db !important;
  //    }
  //
  //    .bulk-order-create-table-tbody-tr {
  //      &__td {
  //        &:nth-child(1),
  //        &:nth-child(19) {
  //          background: linear-gradient(0deg,rgb(235 165 21 / 15%),rgb(255 177 16 / 15%)),#fdf1db !important;
  //
  //          .__hover-container {
  //            background: linear-gradient(0deg,rgb(235 165 21 / 15%),rgb(255 177 16 / 15%)),#fdf1db !important;
  //          }
  //        }
  //      }
  //    }
  //  }
  //}

  &:hover {
    .bulk-order-create-table-tbody-tr {
      &__td {
        &:nth-child(1),
        &:nth-child(20) {
          background: #f3f6fc;

          .__hover-container {
            background: #f3f6fc;
            opacity: 1;

            pointer-events: all;
          }
        }
      }
    }
  }

  .bulk-order-create-table-tbody-tr {
    &__td {
      height: 66px;

      flex: 0 0 auto;

      &:nth-child(1) {
        position: sticky;
        left: 0;
        z-index: 0;

        width: 46px;
        padding-left: 16px;

        background: #fff;

        transition: background 0.25s;
      }
      &:nth-child(2) {
        width: 56px;
      }
      &:nth-child(3) {
        width: 166px;
        display: block;
        padding: 12px 0px;
      }
      &:nth-child(4) {
        width: 184px;
      }
      &:nth-child(5) {
        width: 164px;
      }
      &:nth-child(6) {
        flex: 1;
      }
      &:nth-child(7) {
        width: 164px;
      }
      &:nth-child(8) {
        width: 164px;
      }
      &:nth-child(9) {
        width: 164px;
      }
      &:nth-child(10) {
        width: 264px;
      }
      &:nth-child(11) {
        width: 164px;
      }
      &:nth-child(12) {
        width: 164px;
      }
      &:nth-child(13) {
        width: 134px;
      }
      &:nth-child(14) {
        width: 104px;
      }
      &:nth-child(15) {
        width: 104px;
      }
      &:nth-child(16) {
        width: 104px;
      }
      &:nth-child(17) {
        width: 104px;
      }
      &:nth-child(18) {
        width: 210px;
      }
      &:nth-child(19) {
        width: 210px;
      }
      &:nth-child(20) {
        position: sticky;
        right: 0;

        width: 56px;

        display: flex;
        justify-content: center;

        background: #fff;

        transition: background 0.25s;

        .__hover-container {
          position: absolute;
          top: 0;
          right: 0;

          width: 104px;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #fff;
          opacity: 0;

          transition: background 0.25s;

          pointer-events: none;
        }
      }
      div {
        &[data-error='true'] {
          background: rgba(255, 66, 79, 0.15);
          border-radius: 6px;
          width: 90%;
          height: 34px;
          display: flex;
          align-items: center;
          padding-left: 6px;
        }
      }
      .tooltipv2-note {
        display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
  }
`
