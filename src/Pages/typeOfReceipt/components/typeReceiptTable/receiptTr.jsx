import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tooltip} from "../../../../common/tooltipv2";
import ReceiptRow from "./receiptRow";
import {Text} from "../../../../common/text";
import {Checkbox} from "../../../../common/form/checkbox";
import {Switch} from "../../../customer/components/switch";
import styled from "styled-components";
import useRowTypeReceipt from "../../hooks/useRowTypeReceipt";
import useCreateTypeOrReceipt from "../../hooks/useCreateTypeOrReceipt";

const ReceiptTr = ({key, data, ...props}) => {
  const {row} = useRowTypeReceipt(data)
  const {method} = useCreateTypeOrReceipt()

  const handleActionApply = action => {
    switch (action) {
      case 1:
        method.handleToggleModalEdit(data)
        break
      case 2:
        method.handleRemoveReceipt(data)
        break
      default:
        break
    }
  }
  return (
    <StyledReceiptTr>
      <Tr
        key={key}
        className='type-receipt-table_body-row'
      >
        <Td className='type-receipt-table_body-checkbox' onClick={e => e.stopPropagation()}>
          <Checkbox
            checked={row.isSelected}
            disabled={+data?.is_default === 1}
            onClick={e => {
              e.stopPropagation()
              if (+data?.is_default === 1) return
              row.handleCheckbox()
            }}
          />
        </Td>
        <Td className='type-receipt-table_body-code'>
          <Tooltip className={'type-receipt-table_tooltip'}
                   title={data?.code || ''}
                   baseOn={'width'}>
            <Text>{data?.code || ''}</Text>
          </Tooltip>
        </Td>
        <Td className='type-receipt-table_body-type'>
          <Tooltip className={'type-receipt-table_tooltip'}
                   title={data?.name || ''}
                   baseOn={'width'}>
            <Text>{data?.name || ''}</Text>
          </Tooltip>
        </Td>
        <Td className='type-receipt-table_body-description'>
          <Tooltip className={'type-receipt-table_tooltip--2line'}
                   title={data?.description || ''}
                   baseOn={'height'}>
            <Text>{data?.description || ''}</Text>
          </Tooltip>
        </Td>
        <Td className='type-receipt-table_body-status'>
          <div
            onClick={e=>e.stopPropagation()}
          >
            <Switch
              checked={+data?.status === 1}
              disabled={+data?.is_default === 1}
              onChange={e => {
                e.stopPropagation()
                row.handleSwitchStatus(data)
              }}
            />
          </div>

        </Td>
        <Td className='type-receipt-table_body-setting' onClick={e => {
          e.stopPropagation()
        }}>
          <ReceiptRow
            dataRow={data}
            onActionClick={handleActionApply}
          />
        </Td>
      </Tr>
    </StyledReceiptTr>
  )
}

export default ReceiptTr;


const StyledReceiptTr = styled.div`
  .type-receipt-table_tooltip {
      width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 5px;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    &--2line {
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .type-receipt-table_body {
    &-checkbox {
      width: 53px;
      padding-left: 17px;
    }
    &-code {
      width: 12%;
    }
    &-type {
      width: 18.35%;
    }
    &-description {
      flex: 1;
      width: 50%;
    }
    &-status {
      width: 8%;
      display: flex;
      justify-content: center;
    }
  }
`
