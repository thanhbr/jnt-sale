import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tooltip} from "../../../../common/tooltip";
import {Tooltip as TooltipV2} from "../../../../common/tooltipv2";
import {Text} from "../../../../common/text";
import {formatMoney} from "../../../../util/functionUtil";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {RECEIPT_ICONS} from "../../interfaces/icon";
import styled from "styled-components";
import {OBJECT_TYPE_RECEIPT} from "../../interfaces/config";
import {RowMenuPopover} from "./rowMenuPopover";
import useReceiptRow from "../../hooks/useReceiptRow";
import RowOrderExtra from "./rowOrderExtra";

const ReceiptTr = ({data, ...props}) => {
  const receiptRow = useReceiptRow(data)

  const { row, detail } = receiptRow

  const handleActionApply = action => {
    switch (action) {
      case 'print':
        row.onPrint()
        break
      case 'cancel':
        row.onCancelReceipt()
        break

      default:
        break
    }
  }

  return (
    <StyledTBodyReceipt>
      <Tr
        {...props}
        className="receipt-table__row"
        extra={
          <RowOrderExtra
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={receiptRow}
            onPrint={row.onPrint}
            onEditDesc={row.onEditDesc}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="receipt-table__cell receipt-table__cell-code" data-type="td">
          <TooltipV2 baseOn={'height'} className={'tooltipV2-code'} title={data?.code}>
            <div>
              <Text fontWeight={500} color={'#00081D'}>{data?.code}</Text>
            </div>
          </TooltipV2>
          <div style={{position: 'relative'}}>

            <Tooltip title={'Ngày tạo phiếu'} placement={'bottom'}>
              <span>{RECEIPT_ICONS.clock}</span>
            </Tooltip>
            <Text color={'#7C88A6'}
                  fontSize={13}
                  style={{position: 'absolute', top: -2, left: 18}}
            >{!!data?.dt_created ? fDateTimeSuffix(data?.dt_created) : '---'}</Text>
          </div>
        </Td>
        <Td className="receipt-table__cell" data-type="td">
          <TooltipV2 baseOn={'height'} className={'tooltipV2'} title={data?.receipt_type_name}>
            <Text>{data?.receipt_type_name || '---'}</Text>
          </TooltipV2>
        </Td>
        <Td className="receipt-table__cell" data-type="td">
          <Text>{OBJECT_TYPE_RECEIPT(data?.object_type || '---')}</Text>
        </Td>
        <Td className="receipt-table__cell" data-type="td">
          <TooltipV2 baseOn={'height'} className={'tooltipV2'} title={data?.fullname}>
            <Text>{data?.fullname || '---'}</Text>
          </TooltipV2>
        </Td>
        <Td className="receipt-table__cell" data-type="td">
          <Text>{formatMoney(data?.amount || 0)}</Text>
        </Td>
        <Td className="receipt-table__cell" data-type="td">
          <TooltipV2 baseOn={'height'} className={'tooltipV2'} title={data?.payment_method_name}>
            <Text>{data?.payment_method_name || '---'}</Text>
          </TooltipV2>

        </Td>
        <Td className="receipt-table__cell" data-type="td">
          {+data?.status === 1 ? (
            <div style={{background: '#E6FFF2', padding: '0 12px', borderRadius: 4, height: 24}}>
              <Text color={'#00AB56'} fontSize={12}>Hoàn thành</Text>
            </div>
          ) : (
            <div style={{background: '#EFF3FB', padding: '0 12px', borderRadius: 4, height: 24}}>
              <Text color={'#7C88A6'} fontSize={12}>Hủy</Text>
            </div>
          )}
        </Td>
        <Td
          className="receipt-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="receipt-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {RECEIPT_ICONS.up}
          </button>
          <RowMenuPopover
            id={data.id}
            dataOrder={data}
            onActionClick={handleActionApply}
          />
        </Td>
      </Tr>
    </StyledTBodyReceipt>
  )
}


export default ReceiptTr


export const StyledTBodyReceipt = styled.div`
.tooltip_select {
  display: -webkit-box;
  height: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.receipt-table {
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
  background: transparent !important;
    &:hover {
      .receipt-table__detail-toggle {
        display: block;
      }
    }
  }
  
  &__cell {
  .tooltipV2{
     display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  .tooltipV2-code{
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
    cursor: pointer;
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
      width: 10.75rem;
      @media only screen and (max-width: 1440px){
             width: 18rem;
        }
    }

    &:nth-child(2) {
      width: 10.375rem;
       @media only screen and (max-width: 1440px){
             width: 12.375rem;
        }
      a {
        color: #1A94FF;
      }
    }

    &:nth-child(3) {
      width: 15.375rem;
      a {
        color: #1A94FF;
      }
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
      justify-content: end;
    }

    &:nth-child(6) {
      width: 12.25rem;
      text-align: end;
      @media only screen and (max-width: 1440px){
             width: 20.25rem;
        }
    }

    &:nth-child(7) {
      width: 10.375rem;
      justify-content: center;
     @media only screen and (max-width: 1440px){
             width: 13.375rem;
        }
    }

    &:nth-child(8) {
      display: flex;
      justify-content: end;
      margin-right: 6px;
      width: 7rem ;
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
