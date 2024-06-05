import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltip";
import {Tooltip as TooltipV2} from "../../../../common/tooltipv2";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {GIVEBACK_PRODUCT_ICONS} from "../../../giveBackProduct/interfaces/icon";
import styled from "styled-components";
import {PRICE_ADJUSTMENT_ICONS} from "../../interfaces/_icon";
import {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES} from "../../interfaces/_const";
import RowExtraCapitalAdjustment from "./~rowExtraCapitalAdjustment";
import useRowCapitalAdjustment from "../../hooks/useRowCapitalAdjustment";
import {RowMenuPopover} from "./~rowMenuPopover";

const TrCapitalAdjustment = ({data, ...props}) => {
  const {row, detail} = useRowCapitalAdjustment(data)

  const handleActionApply = action => {
    switch (action) {
      case 'edit':
        row.onEditDetail()
        break
      case 'cancel':
        row.onToggleCancelBill()
        break
      default: ''
    }
  }

  return (
    <StyledTrCapitalAdjustment>
      <Tr
        {...props}
        className="capital-adjustment-table__row"
        extra={
          <RowExtraCapitalAdjustment
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={data}
            onEdit={row.onEditDetail}
            onAdjust={row.onAdjust}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="capital-adjustment-table__cell" data-type="td" style={{display: 'block'}}>
          <TooltipV2 baseOn={'height'} className={'tooltip-v2-code-payment'} title={data?.code}>
            <div>
              <Text fontWeight={500} color={'#00081D'}>{data?.code}</Text>
            </div>
          </TooltipV2>
          <div style={{position: 'relative'}}>
            <Tooltip title={'Ngày tạo phiếu'} placement={'bottom'}>
              <span>{PRICE_ADJUSTMENT_ICONS.clock}</span>
            </Tooltip>
            <Text color={'#7C88A6'}
                  fontSize={13}
                  style={{position: 'absolute', top: -2, left: 18}}
            >{!!data?.dt_created ? fDateTimeSuffix(data?.dt_created) : '---'}</Text>
          </div>
        </Td>
        <Td className="capital-adjustment-table__cell" data-type="td">
          <Text>{!!data?.dt_updated ? fDateTimeSuffix(data?.dt_updated) : '---'}</Text>
        </Td>
        <Td className="capital-adjustment-table__cell" data-type="td">
          <TooltipV2 baseOn={'height'} className={'tooltip_select_capital_adjustment'} title={data?.fullname}>
            <Text>{data?.fullname || '---'}</Text>
          </TooltipV2>

        </Td>
        <Td className="capital-adjustment-table__cell" data-type="td">
          <Text
            fontSize={12}
            fontWeight={500}
            color={`${+data?.status === 1 ? '#FC820A' : +data?.status === 2 ? '#00AB56' : '#7C88A6'}`}
            style={{background: `${+data?.status === 1 ? '#FFF5EB' : +data?.status === 2 ? '#E5FFF2' : '#EFF3FB'}`, padding: '2px 13px', borderRadius: 4}}
          >
            {PRICE_ADJUSTMENT_TABLE_CELL_PAYMENT_TYPES?.find(item => +item.id === +data?.status)?.name  || '---'}
          </Text>
        </Td>
        <Td className="capital-adjustment-table__cell" data-type="td">
          <Text>{!!data?.dt_adjustment ? fDateTimeSuffix(data?.dt_adjustment) : '---'}</Text>
        </Td>
        <Td className="capital-adjustment-table__cell" data-type="td">
          <TooltipV2 className='tooltip_select_capital_adjustment'
                   title={data?.note}
                   baseOn='height'
                   placement='bottom'>
            <Text>{data?.note || ''}</Text>
          </TooltipV2>
        </Td>
        <Td
          className="capital-adjustment-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="capital-adjustment-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {GIVEBACK_PRODUCT_ICONS.up}
          </button>
          {+data?.status === 1 && (
            <RowMenuPopover
              id={data.id}
              dataOrder={data}
              onActionClick={handleActionApply}
            />
          )}
        </Td>
      </Tr>
    </StyledTrCapitalAdjustment>
  )
}

export default TrCapitalAdjustment


export const StyledTrCapitalAdjustment = styled.div`
.tooltip_select_capital_adjustment {
  display: -webkit-box;
  height: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tooltip-v2-code-payment{
    display: -webkit-box;
  height: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
} 


.capital-adjustment-table {
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
    &:hover {
      .capital-adjustment-table__detail-toggle {
        display: block;
      }
    }
  }

  &__cell {
    cursor: pointer;
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
      width: 10.625rem;
       @media screen and (max-width: 1440px){
        width: 11.625rem;
      }
    }

    &:nth-child(2) {
      width: 9.375rem;
      a {
        color: #1A94FF;
      }
    }

    &:nth-child(3) {
      width: 15.625rem;
       @media screen and (max-width: 1440px){
        width: 12.625rem;
      }
    }

    &:nth-child(4) {
      width: 9rem;
      justify-content: center;
      @media screen and (max-width: 1440px){
          width: 10rem;
      }
    }

    &:nth-child(5) {
      width: 9.375rem;
      @media screen and (max-width: 1440px){
          width: 11.375rem;
      }
      
    }

    &:nth-child(6) {
      width: 35.75rem;
      flex: 1;
    }

    &:nth-child(7) {
      width: 3rem;
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

