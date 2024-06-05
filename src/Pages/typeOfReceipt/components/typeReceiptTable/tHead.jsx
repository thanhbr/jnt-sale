import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import {Checkbox} from "../../../../common/form/checkbox";
import styled from "styled-components";
import useTHeadTypeReceipt from "../../hooks/useTHeadTypeReceipt";
import {TYPE_RECEIPT_TABLE_THEAD_SELECTED_ACTIONS} from "../../interfaces/_contants";
import {ICONS_TYPE_OF_RECEIPT} from "../../interfaces/_icons";
import {Button} from "../../../../common/button";
import {Tooltip} from "../../../../common/tooltip";
import {Text} from "../../../../common/text";

const TypeReceiptTHead = ({...props}) => {
  const {table, checkbox, selected} = useTHeadTypeReceipt()
  const displayList = table.display.list

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(find => find.id === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  return (
    <StyledTypeReceiptTHead>
      <Tr {...props} type="tHead">
        <Th className="type-receipt-table__cell">
          <Checkbox
            checked={checkbox.checked}
            indeterminate={!checkFullPageChecked()}
            onClick={e => {
              e.stopPropagation()
              !displayList?.loading && checkbox.onClick()
            }}
            // disabled={displayList?.loading}
          />
        </Th>
        {checkbox?.checked ? (
          <Th className="type-receipt-table__cell" data-selected="true" data-type="th">
            <Text as="b">
              {selected.list.length > 9
                ? selected.list.length
                : `0${selected.list.length}`}{' '}
              loại phiếu thu được chọn
            </Text>
            <div className="type-receipt-table__selected-action-dropdown">
              <Button
                className="type-receipt-table__selected-action-toggle"
                size="xs"
                onClick={() => selected.actionMenu.onToggle(true)}
              >
                Thao tác {ICONS_TYPE_OF_RECEIPT.caretRight}
              </Button>
              {selected.actionMenu.open && (
                <>
                  <div
                    className="type-receipt-table__selected-action-backdrop"
                    onClick={() => selected.actionMenu.onToggle(false)}
                  ></div>
                  <ul className="type-receipt-table__selected-action-menu common-popover">
                    {TYPE_RECEIPT_TABLE_THEAD_SELECTED_ACTIONS.map(item => (
                      <div key={item?.id}>
                        <Tooltip
                          placement="left"
                          title={!!item?.isDeveloping ? 'Tính năng đang phát triển' : ''}
                        >
                          <li
                            key={item.id}
                            className="type-receipt-table__selected-action-menu-item"
                            data-danger={item?.isDanger}
                            onClick={() => selected?.handleSwitchStatus(item)}
                          >
                            {item.name}
                          </li>
                        </Tooltip>
                      </div>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Th>
        ) : (
          <>
            <Th className="type-receipt-table__cell type-receipt-table__cell--product">Mã loại phiếu thu</Th>
            <Th className="type-receipt-table__cell type-receipt-table__cell--create">Tên loại phiếu thu</Th>
            <Th className="type-receipt-table__cell type-receipt-table__cell--inventory">Mô tả</Th>
            <Th className="type-receipt-table__cell type-receipt-table__cell--status">Trạng thái</Th>
            <Th
              className="type-receipt-table__cell"
              style={{display: 'flex'}}
            />
          </>
        )}
      </Tr>
    </StyledTypeReceiptTHead>
  )
}

export default TypeReceiptTHead

export const StyledTypeReceiptTHead = styled.div`
.tr__container{
  height: 44px;
}
  .type-receipt-table {
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
        width: 53px;
        padding-left: 17px;
      }
      &:nth-child(2) {
        width: 12.25%;
      }
      &:nth-child(3) {
        width: 18.35%;
      }
      &:nth-child(4) {
        flex: 1;
        width: 50%;
      }
      &:nth-child(5) {
        width: 8%;
        text-align: center;
      }
      &:nth-child(6) {
        width: 53px;
        text-align: right;
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
    left: 15%;
    z-index: 12;

    width: 201px;
    padding: 4px;

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