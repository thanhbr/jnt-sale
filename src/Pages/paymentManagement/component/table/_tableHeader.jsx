import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import styled from "styled-components";
import StatusFilterPopover from "./statusFilterPopover";
const Index =({...props}) =>{
    return(
        <StyledReceiptTHead>
            <Tr {...props} type="tHead">
                <Th className="payment-management-table__cell payment-management-table__cell--code">Mã phiếu chi</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--type">Loại phiếu chi</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--group-submitter">Nhóm người nhận</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--submitter">Người nhận</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--value">Giá trị chi</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--payment">Phương thức thanh toán</Th>
                <Th className="payment-management-table__cell payment-management-table__cell--status"
                    icon={<StatusFilterPopover />}
                >Trạng thái</Th>
                <Th
                    className="payment-management-table__cell"
                    style={{display: 'flex'}}
                />
            </Tr>
        </StyledReceiptTHead>
    )
}
export default Index;
export const StyledReceiptTHead = styled.div`
.tr__container{
  height: 44px;
}
  .payment-management-table {
    &__cell {
      &[data-menu='true'] {
        position: relative;
      }

  
      &[data-type='th'] {
        &[data-selected='true'] {
          display: flex;
          flex: 1;
          align-items: center;
        }
      }
  
      &:nth-child(1) {
        width: 11rem;
        @media only screen and (max-width: 1440px){
             width: 18rem;
        }
      }
      &:nth-child(2) {
        width: 10.375rem;
        @media only screen and (max-width: 1440px){
             width: 12.375rem;
        }
      }
      &:nth-child(3) {
        width: 15.375rem;
      }
      &:nth-child(4) {
        width: 25.5rem;
        flex: 1;
         @media only screen and (max-width: 1440px){
             flex: unset;
        }
      }
      &:nth-child(5) {
        width: 10.375rem;
        text-align: end;
      }
      &:nth-child(6) {
        width: 12.25rem;
         @media only screen and (max-width: 1440px){
             width: 20.25rem;
        }
      }
      &:nth-child(7) {
        width: 10.375rem;
        text-align: center;
        @media only screen and (max-width: 1440px){
             width: 13.375rem;
        }
      } 
      &:nth-child(8) {
          width: 7rem;
      }
    }
    
    &__selected {
      &-action-dropdown {
        margin-left: 12px;
        border-radius: 60px;
      }
      &-action-toggle {
        border-radius: 60px;
        background: #2BB8A9;
        border: none;
        width: 88px;
        padding: 0 8px;
      }
      

  &-action-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;

    width: 100vw;
    height: 100vh;
  }

  &-action-menu {
    position: absolute;
    top: 40px;
    left: 13.6%;
    z-index: 12;

    width: 150px;
    padding: 8px;

    background: #ffffff;
    border-radius: 6px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &-action-menu-item {
    padding: 8px;

    color: #191d32;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    transition: color 0.25s;

    cursor: pointer;

    &:hover {
      color: #1e9a98;
    }
  }
    }
  }
`