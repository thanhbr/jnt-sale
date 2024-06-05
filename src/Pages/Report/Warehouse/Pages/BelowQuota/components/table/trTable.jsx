import React from 'react';
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../../../layouts/tableLayout/_td";
import {Text} from "../../../../../../../common/text";
import styled from "styled-components";

const TrTable = ({index, data, quantityLow, ...props}) => {
  return (
    <StyledTr>
      <Tr
        {...props}
        className="report-inventory-table__row"
        // onClick={row.onToggleDetail}
      >
        <Td className="report-inventory-table__cell report-inventory-table__cell-code" data-type="td">
          <div style={{marginTop: 8}}>
            <Text color={'#00081D'}>{index+1}</Text>
          </div>
        </Td>
        <Td className="report-inventory-table__cell" data-type="td">
          <div>
            <Text fontWeight={600} color={'#00081D'}>{data?.product_name || '---'}</Text>
          </div>
          <div>
            <Text color={'#7C88A6'}>SKU: {data?.sku || '---'}</Text>
          </div>
        </Td>
        <Td className="report-inventory-table__cell" data-type="td">
          <Text>{data?.warehouse_name || '---'}</Text>
        </Td>
        <Td className="report-inventory-table__cell" data-type="td">
          <Text>{data?.warehouse_quantity || '---'}</Text>
        </Td>
        <Td className="report-inventory-table__cell" data-type="td">
          <Text>{quantityLow || 0}</Text>
        </Td>
      </Tr>
    </StyledTr>
  )
}

export default TrTable

export const StyledTr = styled.div`
.report-inventory-table {
  &__loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.25);

    img {
      width: 80px;
      height: 80px;
    }
  }

  &__row {
    border-top: none;
    border-right: 1px solid #e2eaf8;
    border-bottom: 1px solid #e2eaf8;
    border-left: 1px solid #e2eaf8;
    
    &:hover {
      .report-inventory-table__detail-toggle {
        display: block;
      }
    }
  }

  &__cell {
    //cursor: pointer;
    &-code {
      display: block;
      margin-left: 6px;
    }
    
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
      padding-left: 1rem;
      flex: 1;
      display: block;
    }
    &:nth-child(3) {
      width: 15.625rem;
      padding-left: 1rem;
    }
    &:nth-child(4) {
      width: 13.75rem;
      display: flex;
      justify-content: center;
    }
    &:nth-child(5) {
      width: 13.75rem;
      display: flex;
      justify-content: center;
    }
  }

  &__detail-toggle {
    position: absolute;
    top: 50%;
    right: 24px;

    width: 20px;
    height: 20px !important;
    display: none;

    background: transparent;
    border: none;
    border-radius: 12px !important;

    font-size: 12px !important;
    line-height: 24px !important;

    transform: translateY(-50%) rotate(180deg);

    cursor: pointer;

    &[data-active='true'] {
      display: block !important;

      transform: translateY(-50%) rotate(0deg);
    }

    //@media screen and (max-width: 1599px) {
    //  display: none !important;
    //}
  }

  &__selected-action-dropdown {
    position: relative;

    margin-left: 12px;
  }

  &__selected-action-toggle {
    width: 88px;
    padding: 0 !important;

    border-radius: 14px !important;

    font-size: 14px !important;
    font-weight: 500 !important;
  }

  &__selected-action-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;

    width: 100vw;
    height: 100vh;
  }

  &__selected-action-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 12;

    width: 150px;
    padding: 8px;

    background: #ffffff;
    border-radius: 6px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  }

  &__selected-action-menu-item {
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

.tab-detail-order {
  &__link-hover {
    color: #1A94FF;

    &:hover {
      color: #1373DB;
    }
  }
}
`
