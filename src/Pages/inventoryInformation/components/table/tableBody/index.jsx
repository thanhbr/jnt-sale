import React from 'react';
import styled from "styled-components";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import {Text} from "../../../../../common/text";
import {ORDER_ICONS} from "../../../../refactorOrder/interfaces/_icons";
import {fNumber} from "../../../../../util/formatNumber";
import RowInventoryExtra from "./~rowInventoryExtra";
import useTableInventoryInformation from "../../../hooks/useTableInventoryInformation";
import EmptyInventory from "./empty";
import InventoryInfoSkeleton from "./skeleton";
import {Tooltip} from "../../../../../common/tooltip";
import {Tooltip as TooltipV2} from "../../../../../common/tooltipv2";
import ReactImageFallback from "react-image-fallback";

const TableBody = () => {
  const {dataTable} = useTableInventoryInformation()
  const products = dataTable?.table?.display

  return (
    <StyledUserTableBody>
      <div className={'user-management-table_body'}>
        {products?.loading ? <InventoryInfoSkeleton numb={20}/>
        : products?.list?.length > 0 ? (
            <>
              {products?.list?.map(item => (
                <InventoryInfoTr
                  data={item}
                />
              ))}
            </>
          ) : <EmptyInventory />
        }

      </div>
    </StyledUserTableBody>
  );
};

export default TableBody;

const InventoryInfoTr = ({data, ...props}) => {
  const {functions, shouldOpenDetail} = useTableInventoryInformation(data)
  const productName = `${data?.name_attr_value_1 || ''} ${!!data?.name_attr_value_2 ? '- '+data?.name_attr_value_2 : ''} ${!!data?.name_attr_value_3 ? '- '+data?.name_attr_value_3 : ''}`


  return (
    <>
      {/*{isLoading && (*/}
      {/*  <div className="inventory-information-table__loading">*/}
      {/*    <img src="/img/loading.gif" />*/}
      {/*  </div>*/}
      {/*)}*/}
      <Tr
        {...props}
        className="inventory-information-table__row"
        extra={
          <RowInventoryExtra
            id={data?.pid}
            active={shouldOpenDetail}
            // data={detail?.active}
            // rowData={orderRow}
          />
        }
        data-active={shouldOpenDetail}
        onClick={() => functions?.onShowTableDetail()}
      >
        <Td className="inventory-information-table__cell"
            data-type="td"
        >

          <ReactImageFallback
            className="order-single-product-table__thumbnail"
            src={data?.image_thumb}
            fallbackImage='/img/product/default-product-thumbnail.png'
            alt={data?.name || 'thumbnail'}
          />
          <div style={{width: '80%'}}>
            <div>
              <TooltipV2
                className="tooltip_select_2"
                placement="top-center"
                title={data?.sku}
                baseOn="width"
              >
                <Text
                  fontSize={13}
                  fontWeight={400}
                  lineHeight={20}
                >
                  {data?.sku || '---'}
                </Text>
              </TooltipV2>
            </div>
            <div>
              <TooltipV2
                className="tooltip_select_2"
                placement="top-center"
                title={productName}
                baseOn="width"
              >
                <Text
                  color={'#7C88A6'}
                  fontSize={13}
                  fontWeight={400}
                  lineHeight={20}
                >
                  {productName || '---'}
                </Text>
              </TooltipV2>
              {/*{productName?.length > 20 ? (*/}
              {/*  <Tooltip className='tooltip_select'*/}
              {/*           title={productName}*/}
              {/*           baseOn='width' placement='top-center'>*/}
              {/*    <Text className={'inventory-information-table__cell--nth1-sku'}*/}
              {/*          fontSize={13}*/}
              {/*          color={'#7C88A6'}*/}
              {/*    >{productName}</Text>*/}
              {/*  </Tooltip>*/}
              {/*) : (*/}
              {/*  <Text className={'inventory-information-table__cell--nth1-sku'}*/}
              {/*        fontSize={13}*/}
              {/*        color={'#7C88A6'}*/}
              {/*  >{productName}</Text>*/}
              {/*)}*/}
            </div>
          </div>
        </Td>
        <Td className="inventory-information-table__cell"
            data-type="td"
        >
          {data?.product_name_version?.length > 100 ? (
            <Tooltip className='tooltip_select' title={data?.product_name_version} baseOn='width' placement='top-center'>
              <Text>{data?.product_name_version}</Text>
            </Tooltip>
            ) : (
              <Text>{data?.product_name_version}</Text>
            )}
        </Td>
        <Td className="inventory-information-table__cell"
            data-type="td"
        >
          <Text>{fNumber(data?.warehouse_quantity)}</Text>
        </Td>
        <Td className="inventory-information-table__cell"
            data-type="td"
        >
          <Text>{fNumber(data?.order_quantity)}</Text>
        </Td>
        <Td className="inventory-information-table__cell"
            data-type="td"
        >
          <Text>{fNumber(data?.purchase_quantity)}</Text>
        </Td>
        <Td
          className="inventory-information-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="inventory-information-table__detail-toggle"
            data-active={shouldOpenDetail}
            // onClick={() => functions.onToggleDetail()}
          >
            {ORDER_ICONS.up}
          </button>
        </Td>
      </Tr>
    </>
  )
}


export const StyledUserTableBody = styled.div`
  .tooltip_select {
    width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .tooltip_select_2 {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  .inventory-information-table {
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
        .inventory-information-table__detail-toggle {
          display: block;
        }
      }
    }
  
    &__cell {
      cursor: pointer;
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
        width: 14.375rem;
        margin-left: 1.5rem;
        
        img {
          width: 44px;
          max-width: 44px;
          height: 44px;
          border-radius: 4px;
          margin-right: 16px;
        }
        
        @media screen and (max-width: 1520px) {
          width: 17.375rem;
        }
      }
      &--nth1-sku {
        font-weight: 400;
        font-size: 13px;
        line-height: 140%;
        color: #7C88A6;
      }
  
      &:nth-child(2) {
        width: 41.375rem;
        margin-left: 1.5rem;
        @media screen and (max-width: 1366px) {
          width: 38.375rem;
        }
      }
  
      &:nth-child(3) {
        width: 12.5rem;
        margin-left: 1.5rem;
        display: flex;
        justify-content: center;
      }
  
      &:nth-child(4) {
        width: 12.5rem;
        margin-left: 1.5rem;
        display: flex;
        justify-content: center;
      }
  
      &:nth-child(5) {
        width: 12.5rem;
        margin-left: 1.5rem;
        display: flex;
        justify-content: center;
      }
    }
  
    &__detail-toggle {
      position: absolute;
      top: 50%;
      right: 42px;
  
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
  
      @media screen and (max-width: 1599px) {
        display: none !important;
      }
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
