import React from 'react';
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../../../../layouts/tableLayout/_th";
import styled from "styled-components";
import { useTranslation } from 'react-i18next'

const THead = ({...props}) => {
  const {t} = useTranslation()
  return (
    <StyledTHead>
      <Tr {...props} type="tHead">
        <Th className="report-inventory-table__cell">STT</Th>
        <Th className="report-inventory-table__cell">{t('product')}</Th>
        <Th className="report-inventory-table__cell">{t('warehouse')}</Th>
        <Th className="report-inventory-table__cell">{t('general_inventory')}</Th>
        <Th className="report-inventory-table__cell">{t('minimum_threshold')}</Th>
      </Tr>
    </StyledTHead>
  )
}

export default THead

export const StyledTHead = styled.div`
  div[data-type="tHead"] {
    border: 1px solid #E2EAF8;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  .tr__container{
    height: 44px;
  }
  .report-inventory-table {
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
        width: 3rem;
        padding-left: 1rem;
      }
      &:nth-child(2) {
        width: 47.5rem;
        padding-left: 1.3rem;
        flex: 1;
      }
      &:nth-child(3) {
        width: 15.625rem;
        padding-left: 1rem;
      }
      &:nth-child(4) {
        width: 13.75rem;
        text-align: center;
      }
      &:nth-child(5) {
        width: 13.75rem;
        text-align: center;
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