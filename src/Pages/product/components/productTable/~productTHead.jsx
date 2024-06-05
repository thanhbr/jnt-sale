import React from 'react';
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Th} from "../../../../layouts/tableLayout/_th";
import {Checkbox} from "../../../../common/form/checkbox";
import styled from "styled-components";
import useProductTHead from "../../hooks/useProductTHead";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {Button} from "../../../../common/button";
import {Text} from "../../../../common/text";
import {PRODUCT_TABLE_HEADER_ROW_MENU_POPOVER} from "../../interfaces/~constants";
import {Tooltip} from "../../../../common/tooltip";
import useProductTbody from "../../hooks/useProductTbody";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ProductTHead  = ({...props}) => {
  const { t } = useTranslation()
  const {checkbox, selected, functions} = useProductTHead()
  const {displayList} = useProductTbody()

    const actions = PRODUCT_TABLE_HEADER_ROW_MENU_POPOVER
  return (
    <StyledProductTHead>
      <Tr {...props} type="tHead">
        <Th className="product-table__cell">
          <Checkbox
            checked={checkbox.checked}
            indeterminate={!checkbox.checkFullPageChecked()}
            onClick={e => {
              e.stopPropagation()
              !displayList?.loading && checkbox.onClick()
            }}
            disabled={displayList?.loading}
          />
        </Th>
        {checkbox?.checked ? (
          <Th className="product-table__cell" data-selected="true" data-type="th">
            <Text as="b">
              {selected.list.length > 9
                ? selected.list.length
                : `0${selected.list.length}`}{' '}
              {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SELECTED_PRODUCT)}
            </Text>
            <div className="product-table__selected-action-dropdown">
              <Button
                className="product-table__selected-action-toggle"
                size="xs"
                onClick={() => selected.actionMenu.onToggle(true)}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.OPERATION)} {ORDER_ICONS.caretRight}
              </Button>
              {selected.actionMenu.open && (
                <>
                  <div
                    className="product-table__selected-action-backdrop"
                    onClick={() => selected.actionMenu.onToggle(false)}
                  ></div>
                  <ul className="product-table__selected-action-menu common-popover">
                    {actions.map(item => (
                      <>
                        <Tooltip
                          placement="left"
                          title={!!item?.isDeveloping ? 'Tính năng đang phát triển' : ''}
                        >
                          <li
                            key={item.id}
                            className="product-table__selected-action-menu-item"
                            data-danger={item?.isDanger}
                            onClick={() => functions?.handleItemClick(item.action)}
                          >
                            {t(item.name)}
                          </li>
                        </Tooltip>
                      </>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Th>
        ) : (
          <>
            <Th className="product-table__cell product-table__cell--product">{t(DISPLAY_NAME_MENU.PRODUCT)}</Th>
            <Th className="product-table__cell product-table__cell--create">{t(DISPLAY_NAME_MENU.GENERAL.DATE_CREATED)}</Th>
            <Th className="product-table__cell product-table__cell--inventory">{t(DISPLAY_NAME_MENU.GENERAL.INVENTORY)}</Th>
            <Th className="product-table__cell product-table__cell--status">{t(DISPLAY_NAME_MENU.GENERAL.STATUS)}</Th>
            <Th
              className="product-table__cell"
              style={{display: 'flex'}}
            />
          </>
        )}
      </Tr>
    </StyledProductTHead>
  )
};

export default ProductTHead;


export const StyledProductTHead = styled.div`
.tr__container{
  height: 44px;
}
  .product-table {
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
        width: 70%;
        @media only screen and (max-width: 1440px){
             width: 72%;
             margin-left: 7px;
        }
        
      }
      &:nth-child(3) {
        width: 20%;
        @media only screen and (max-width: 1440px){
             width: 21%;
        }
      }
      &:nth-child(4) {
        width: 10%;
        @media only screen and (max-width: 1440px){
             width: 9%;
        }
      }
      &:nth-child(5) {
        width: 8%;
        text-align: center;
  
        @media screen and (max-width: 1599px) {
          width: 9%;
        }
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
        //width: 88px;
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
      color: rgb(229, 16, 29);
    }
  }
    }
  }
`