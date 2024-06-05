import React from 'react';
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import {Text} from "../../../../../common/text";
import {Tooltip} from "../../../../../common/tooltip";
import {ICONS} from "../../../interfaces/~icon";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const TableHeader = () => {
  const {t} = useTranslation()
  return (
    <StyledUserTableHeader>
      <div className={'inventory-info-table_header'}>
        <Tr type="tHead" style={{fontWeight: 600}}>
          <Td className={'inventory-info-table_header--code'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SKU)}</Td>
          <Td className={'inventory-info-table_header--name'}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_NAME)}</Td>
          <Td className={'inventory-info-table_header--warehouse'}>
            <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.QUANTITY)}</Text>
            <Tooltip
              className="bulk-order-table-thead__tooltip"
              placement="bottom"
              title={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.QUANTITY_TOOLTIP1)}
              style={{marginTop: 5}}
            >
              <span>{ICONS.question}</span>
            </Tooltip>
          </Td>
          <Td className={'inventory-info-table_header--order'}>
            <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_EXPORT)}</Text>
            <Tooltip
              className="bulk-order-table-thead__tooltip"
              placement="top"
              title={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_EXPORT_TOOLTIP1)}
              style={{marginTop: 5}}
            >
              <span>{ICONS.question}</span>
            </Tooltip>
          </Td>
          <Td className={'inventory-info-table_header--purchase'}>
            <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_IMPORT)}</Text>
            <Tooltip
              className="bulk-order-table-thead__tooltip"
              placement="bottom"
              title={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_IMPORT_TOOLTIP1)}
              style={{marginTop: 5}}
            >
              <span>{ICONS.question}</span>
            </Tooltip>
          </Td>
        </Tr>
      </div>
    </StyledUserTableHeader>
  )
}

export default TableHeader;

export const StyledUserTableHeader = styled.div `
  .inventory-info-table_header{
    height : 44px;
    .tr__container{
        height: 44px;
    }
    &__cell{
        &[data-menu='true'] {
            position: relative;
          }
      
          &[data-type='td'] {
            &:nth-child(5) {
              justify-content: center;
            }
            &:nth-child(6) {
              justify-content: flex-end;
            }
            &:nth-child(7) {
              justify-content: flex-end;
            }
            &:nth-child(8) {
              justify-content: center;
            }
          }
      
          &[data-type='th'] {
            &[data-selected='true'] {
              display: flex;
              flex: 1;
              align-items: center;
            }
          }
      
          &:nth-child(1) {
            width: 47px;
            margin-left: 1.5rem;
          }
          &:nth-child(2) {
            width: 13%;
      
            @media screen and (max-width: 1599px) {
              width: 18%;
            }
          }
          &:nth-child(3) {
            flex: 1;
          }
          &:nth-child(4) {
            width: 11%;
          }
          &:nth-child(5) {
            width: 7%;
      
            text-align: center;
      
            @media screen and (max-width: 1599px) {
              width: 10%;
            }
          }
          &:nth-child(6) {
            width: 12%;
      
            text-align: right;
          }
          &:nth-child(7) {
            width: 12%;
      
            text-align: right;
          }
          &:nth-child(8) {
            width: 16%;
      
            text-align: center;
          }
          &:nth-child(9) {
            width: 68px;
      
            justify-content: flex-end;
      
            @media screen and (max-width: 1599px) {
              width: 38px;
            }
          }
        }
      
    &--code {
      width: 14.375rem; 
      margin-left: 1.5rem;
      @media screen and (max-width: 1520px) {
        width: 17.375rem;
      }
    }
    &--name {
      width: 41.375rem; 
      margin-left: 1.5rem;
      @media screen and (max-width: 1366px) {
        width: 38.375rem; 
      }
    }
    &--warehouse {
      width: 12.5rem; 
      margin-left: 1.5rem;
      display: flex;
      justify-content: center;
    }
    &--order {
      width: 12.5rem; 
      margin-left: 1.5rem;
      display: flex;
      justify-content: center;
    }
    &--purchase {
      width: 12.5rem; 
      margin-left: 1.5rem;
      display: flex;
      justify-content: center;
    }
         
   }
`