import React from 'react';
import {Tooltip} from "../../../common/tooltip";
import {PRODUCT_ICONS} from "../interfaces/~icon";
import styled from "styled-components";
import {THEME_COLORS} from "../../../common/theme/_colors";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {Text} from "../../../common/text";
import {Input} from "../../../common/form/input";
import {fNumber} from "../../../util/formatNumber";
import {ORDER_SINGLE_ICONS} from "../../orderSingle/interface/_icons";
import TBodySkeleton from "./tBodySkeleton";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const ProductTable = ({...props}) => {
  const { t } = useTranslation()
  const {value, functions} = usePrintBarcode()
  const productList = value?.productList

  return (
    <StyledProductBarCodeTable {...props}>
      {!value?.loadingTable ? (
        <>
          <div
            className="product-barcode-table__table"
            // data-inventory={inventory}
          >
            <div className="product-barcode-table__thead">
              <div className="product-barcode-table__tr">
                <div className="product-barcode-table__th">
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_BARCODE)}
                </div>
                <div className="product-barcode-table__th">
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_NAME)}
                </div>
                <div className="product-barcode-table__th">
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.NUM_OF_STAMPS)}
                  <Tooltip
                    title={<div style={{fontSize: 13, margin: '0 5px'}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.NUM_OF_STAMPS_TOOLTIP)}</div>}
                    placement={'bottom-start'}
                  >
                    <i
                      style={{
                        marginLeft: 4,
                        display: 'inline-block',
                        transform: 'translateY(4px)',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '10px'
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      {PRODUCT_ICONS.question}
                    </i>
                  </Tooltip>
                </div>
                <div className="product-barcode-table__th">
                  {t(DISPLAY_NAME_MENU.GENERAL.SELL_PRICE)}
                </div>
                <div className="product-barcode-table__th"></div>
              </div>
            </div>
            <div className="product-barcode-table__tbody">
              {productList.map(item => (
                <Row
                  key={item?.data?.id}
                  data={item}
                  priceType={value?.priceType}
                  onQuantityChange={(data, type) => functions.onChangeItemTable(data, type)}
                />
              ))}
            </div>
          </div>
        </>
      ) : <TBodySkeleton />}
    </StyledProductBarCodeTable>
  )
}
export default ProductTable

const Row = ({
               data,
               rawData,
               priceType,
               onQuantityChange,
               ...props
             }) => {

  const { t } = useTranslation()
  const handleInputChange = e => {
    let currentValue = e.target.value.toString().replace(/[^0-9]/g, '')
    if (currentValue.startsWith('0')) currentValue = currentValue.substring(1)
    if (onQuantityChange) {
      onQuantityChange(data, {
        type: 'amount',
        amount: currentValue ? Number(currentValue) : '',
      })
    }
  }


  return (
    <div
      {...props}
      className={`product-barcode-table__tr ${props?.className || ''}`}
    >
      <div className="product-barcode-table__td">
        <Text as="h6" fontWeight={500}>
          {data?.barcode || '---'}
        </Text>
      </div>
      <div className="product-barcode-table__td">
        <div style={{flex: 1}}>
          <Text>
            {data?.product_name || '---'}
          </Text>
        </div>
      </div>
      <div className="product-barcode-table__td">
        <Tooltip
          className="--danger"
          placement="bottom"
          title={+data?.number_of_stamps > 1000 ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE_1000) :
                (+data?.number_of_stamps < 1 ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE_0) : '')}
        >
          <Input
            icon={
              <div className="product-barcode-table__number-arrow">
                <i
                  onClick={() =>
                    !!onQuantityChange &&
                    onQuantityChange(data, {type: 'increase'})
                  }
                >
                  {ORDER_SINGLE_ICONS.caretUp}
                </i>
                <i
                  data-disabled={data?.number_of_stamps <= 1}
                  onClick={() =>
                    data?.number_of_stamps > 1 &&
                    !!onQuantityChange &&
                    onQuantityChange(data, {type: 'decrease'})
                  }
                >
                  {ORDER_SINGLE_ICONS.caretUp}
                </i>
              </div>
            }
            // min={0}
            type="number"
            validateText={
              +data?.number_of_stamps > 1000 || +data?.number_of_stamps < 1 ? `  ` : undefined
            }
            validateType={
              +data?.number_of_stamps > 1000 || +data?.number_of_stamps < 1 ? 'danger' : 'default'
            }
            value={+data?.number_of_stamps || ''}
            onChange={handleInputChange}
            onIconClick={() => {}}
            style={{width: 110}}
          />
        </Tooltip>
      </div>
      <div className="product-barcode-table__td">
        <Text style={{width: '100%'}}>
          {+priceType?.value?.value === 2
            ? fNumber(data?.wholesale_price?.toString()?.replace(/[^0-9]/g, '')) || '---'
            : fNumber(data?.price?.toString()?.replace(/[^0-9]/g, '')) || '---'
          }
        </Text>
      </div>
      <div className="product-barcode-table__td">
        <Tooltip placement="bottom" title={t(DISPLAY_NAME_MENU.GENERAL.REMOVE)}>
          <i
            style={{cursor: 'pointer'}}
            onClick={() => onQuantityChange(data, {type: 'removeItem'})}
          >
            {ORDER_SINGLE_ICONS.trash}
          </i>
        </Tooltip>
      </div>
    </div>
  )
}


export const StyledProductBarCodeTable = styled.div`
  margin-top: 24px;

  user-select: none;

  .product-barcode-table {
    &__table {
      position: relative;
      z-index: 0;

      max-height: 400px;

      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;

      &[data-inventory='true'] {
        .product-barcode-table__th,
        .product-barcode-table__td {
          &:nth-child(2) {
            //width: 124px;

            text-align: right;
          }
          &:nth-child(3) {
            width: 110px;
            padding-right: 12px;

            text-align: right;
          }
          &:nth-child(4) {
            width: 110px;
          }
          &:nth-child(5) {
            //width: 144px;

            justify-content: flex-end;

            text-align: right;
          }
          &:nth-child(6) {
            //width: 48px;
            padding-right: 16px;
          }
        }
      }
    }

    &__thead {
      position: sticky;
      top: 0;
      z-index: 1;

      background: #f7f9fd;
    }

    &__tbody {
      display: flex;
      flex-direction: column-reverse;
    }

    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        width: 9.25rem;
        padding-left: 24px;
      }

      &:nth-child(2) {
        width: 124px;
        flex: 1;
      }

      &:nth-child(3) {
        width: 9.75rem;
      }
      
      &:nth-child(4) {
        width: 9.75rem;
        text-align: center;
      }
      
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      display: flex;
      align-items: center;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:nth-child(1) {
        padding-left: 24px;
        width: 9.25rem;
      }

      &:nth-child(2) {
        flex: 1;
        justify-content: flex-end;
      }

      &:nth-child(3) {
        width: 9.75rem;
        padding-right: 16px;
      }

      &:nth-child(4) {
        width: 8.75rem;
        text-align: center;
      }

      .--ellipsis {
        max-width: 100%;
        max-height: 40px;

        display: -webkit-box;
        overflow: hidden;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    &__thumbnail {
      width: 48px;
      height: 48px;
      margin-right: 13px;

      object-fit: cover;
      object-position: center;
      overflow: hidden;

      border-radius: 4px;
    }

    &__number-arrow {
      position: relative;

      i {
        position: absolute;
        right: 0;

        &:nth-child(1) {
          top: calc(50% - 6px);
        }
        &:nth-child(2) {
          top: calc(50% + 6px);

          transform: rotate(180deg);
        }

        &[data-disabled='true'] {
          cursor: default;

          svg {
            color: #ebeef5;

            path {
              stroke: #ebeef5;
            }
          }
        }

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }

    &__discount-type-dropdown-toggle {
      width: 32px;
      height: 20px;

      text-align: center;

      i {
        display: inline-block;

        transform: rotate(180deg);
        transform-origin: center;
        transition: transform 0.25s;

        &[data-active='true'] {
          transform: rotate(0);
        }
      }

      svg {
        width: 8px;
        height: 8px;

        path {
          stroke: ${THEME_COLORS.primary_300};
        }
      }
    }

    &__discount-type-dropdown-menu {
      width: 32px;
    }

    &__discount-type-dropdown-menu-item {
      margin-bottom: 8px;

      font-weight: 600;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__checkout {
      margin-top: 16px;
      margin-bottom: 24px;
    }

    &__checkout-group {
      margin-bottom: 8px;

      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__checkout-name {
      flex: 1;

      text-align: right;
    }

    &__checkout-value {
      width: 120px;
      margin-left: 73px;

      text-align: right;
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
