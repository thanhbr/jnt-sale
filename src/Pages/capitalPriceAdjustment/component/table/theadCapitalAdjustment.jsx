import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import styled from "styled-components";
import {StatusFilterPopover} from "./~statusFilterPopover";

const TheadCapitalAdjustment = () => {
  return (
    <StyledTHeadCapitalAdjustment>
      <Tr type="tHead">
        <Th className="capital-adjustment-table__cell--code">Mã phiếu điều chỉnh</Th>
        <Th className="capital-adjustment-table__cell--date">Ngày cập nhật</Th>
        <Th className="capital-adjustment-table__cell--employee">Người tạo phiếu</Th>
        <Th className="capital-adjustment-table__cell--status"
          icon={<StatusFilterPopover />}
        >
          Trạng thái
        </Th>
        <Th className="capital-adjustment-table__cell--date-price">Ngày điều chỉnh giá</Th>
        <Th className="capital-adjustment-table__cell--note">Ghi chú</Th>
        <Th
          className="capital-adjustment-table__cell--popover"
          style={{display: 'flex'}}
        />
      </Tr>
    </StyledTHeadCapitalAdjustment>
  )
}

export default TheadCapitalAdjustment

export const StyledTHeadCapitalAdjustment = styled.div`
  .capital-adjustment-table__cell {
    &--code {
      width: 10.625rem;
       @media screen and (max-width: 1440px){
        width: 11.625rem;
      }
    }
    &--date {
      width: 9.375rem;
    }
    &--employee {
      width: 15.625rem;
      @media screen and (max-width: 1440px){
        width: 12.625rem;
      }
    }
    &--status {
      width: 9rem;
      text-align: center;
      @media screen and (max-width: 1440px){
          width: 10rem;
      }
    }
    &--date-price {
      width: 9.375rem;
       @media screen and (max-width: 1440px){
          width: 11.375rem;
      }
    }
    &--note {
      width: 35.75rem;
      flex: 1;
    }
    &--popover{
      width: 3rem;
    }
  }
`
