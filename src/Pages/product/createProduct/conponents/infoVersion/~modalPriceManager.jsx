import React from 'react';
import {Text} from "../../../../../common/text";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import {Input} from "../../../../../common/form/input";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import useCreateInfoVersion from "../../../hooks/useCreateInfoVersion";
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Button} from "../../../../../common/button";
import ZoomIn from "../modal/zoomIn";
import {Tooltip} from "../../../../../common/tooltipv2";
import {Tooltip as Tooltipv1} from "../../../../../common/tooltip";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";


const ModalPriceManager = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateInfoVersion()
  return (
    <Modal
      open={value?.modalPrice?.open}
    >
      <Box>
        <StyledProductTable>
          {value.attrVersion.length > 0 ? (
            <>
              <div className={"product-info-version-page__table--title"}>
                <p className={"product-info-version-page__table--ptitle"}>{`${t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_MANAGEMENT_VERSION)} (${value.dataVersion.length})`}</p>
              </div>
              <div
                className={"product-info-version-page__table"}
                // data-inventory={inventory}
              >
                <div className="product-info-version-page__thead">
                  <div className="product-info-version-page__tr">
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.IMAGE)}</div>
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_NAME)}</div>
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.ORIGIN_PRICE)}</div>
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.COST_PRICE)}</div>
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.RETAIL_PRICE)}</div>
                    <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.WHOLESALE_PRICE)}</div>
                  </div>
                </div>
                <div className="product-info-version-page__tbody">
                  {value?.dataVersion?.map((item, index) => (
                    <Row
                      key={index}
                      rawData={item}
                      onQuantityChange={(val, type) => functions.onChangeRowDetail(val, type, item)}
                      openZoomInImage={() => functions.onZoomInImage(true, item.image)}
                      initInventory={value?.formCreate?.inventory?.statusInit}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Empty />
          )}
          <div className={"product-info-version-page__table--btn-group"}>
            <Button
              appearance={'ghost'}
              size={'sm'}
              style={{width: 110, marginRight: 8}}
              onClick={() => functions.onTogglePopupPrice(false)}
            >
              {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
            </Button>
            <Button
              size={'sm'}
              style={{width: 110}}
              onClick={() => functions.onTogglePopupPrice(false)}
              disabled={value?.validatePrice}
            >
              {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
            </Button>
          </div>
          {value?.zoomInImage?.open && (
            <ZoomIn
              closeModal={() => functions.onZoomInImage(false, '')}
              linkActive={value?.zoomInImage?.linkActive}
            />
          )}
        </StyledProductTable>
      </Box>
    </Modal>
  )
}

const Row = ({
               rawData,
               onQuantityChange,
               openZoomInImage,
               initInventory,
               ...props
             }) => {
  const { t } = useTranslation()
  const {value} = useCreateInfoVersion()
  const listEditVersion = value?.formCreate?.version?.valueEditVersion

  return (
    <StyledProductTableDetail>
      <div
        {...props}
        className={`product-info-version-table__tr ${props?.className || ''}`}
      >
        <div className="product-info-version-table__td" style={{display: 'flex'}}>
          {!!rawData?.image ? (
            <div style={{position: 'relative'}}>
              <div className={'product-info-version-table__td-product-image'}

                   onClick={openZoomInImage}
              >
                <img src={rawData?.image}
                     style={{width: 54, height: 54, borderRadius: 6, margin: 16}}
                     alt={'product-image'}
                />
              </div>
              <span style={{position: 'absolute', top: 4, right: 4, cursor: 'pointer'}}
                    onClick={e => onQuantityChange(e, 'removeProductImg')}
              >{PRODUCT_ICONS.closeCircle}</span>
            </div>
          ) : (
            <div className={'product-info-version-table__img-placeholder'} >
              <input title=" " type='file'
                     accept="image/png, image/jpeg"
                     className={'product-info-version-table__img-src'}
                     onChange={e => onQuantityChange(e, 'image')}
              />
              <span>{PRODUCT_ICONS.addImage}</span>
            </div>
          )}
          <div style={{marginTop: 20, width: '15.5rem'}}>
            <Tooltip className='tooltip_select' title={`${rawData?.name}
                                                            ${!!!rawData?.attr_size ? '' : ' - '+rawData?.attr_size}
                                                            ${!!!rawData?.attr_color ? '' : ' - '+rawData?.attr_color}
                                                            ${!!!rawData?.attr_type ? '' : ' - '+rawData?.attr_type}`} baseOn='height' placement='top-center'>
              <Text fontWeight={400} fontSize={13}>
                {(`${rawData?.name}
                  ${!!!rawData?.attr_size ? '' : ' - '+rawData?.attr_size}
                  ${!!!rawData?.attr_color ? '' : ' - '+rawData?.attr_color}
                  ${!!!rawData?.attr_type ? '' : ' - '+rawData?.attr_type}`  || '---')}
              </Text>
            </Tooltip>
            {+rawData?.status === 1
              ? <p className={'product-info-version-table__td-product-status--active'}>{t(DISPLAY_NAME_MENU.GENERAL.ACTIVE)}</p>
              : <p className={'product-info-version-table__td-product-status--inactive'}>{t(DISPLAY_NAME_MENU.GENERAL.DEACTIVATION)}</p>}
          </div>
          <div style={{marginTop: 26, marginLeft: 8, width: 150}}>
            <Tooltipv1
              className="--danger"
              placement="bottom"
              title={!!!rawData?.supplier_price ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.ORIGIN_PRICE) :
                        +rawData?.supplier_price === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.LAST_ENTRY_PRICE) : ''}
            >
              <Input
                value={rawData?.supplier_price}
                onChange={e => onQuantityChange(e.target?.value, 'supplierPrice')}
                validateText={+rawData?.supplier_price === 0 ? `  ` : undefined}
                validateType={+rawData?.supplier_price === 0 ? "danger" : 'success'}
                placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_PRICE)}
                disabled={rawData?.verOldStatus === 'edit'}
                maxLength={11}
                icon={
                  <Text as="u"
                        style={{color: '#7C88A6', position: 'absolute', right: -4}}>
                    ₫
                  </Text>
                }
              />
            </Tooltipv1>
          </div>
          <div style={{marginTop: 26, marginLeft: 8, width: 150}}>
            <Tooltipv1
              className="--danger"
              placement="bottom"
              title={initInventory && !!!rawData?.cost_price ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.COST_PRICE_IN) :
                    initInventory &&+rawData?.cost_price === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.COST_PRICE) : ''}
            >
              <Input
                value={(!!listEditVersion?.find(item => item.sku === rawData?.sku) || value?.formCreate?.statusForm === 'create') ? rawData?.cost_price : ''}
                onChange={e => onQuantityChange(e.target?.value, 'costPrice')}
                validateText={initInventory && +rawData?.cost_price === 0 ? `  ` : undefined}
                validateType={initInventory && +rawData?.cost_price === 0 ? "danger" : 'success'}
                placeholder={(!!listEditVersion?.find(item => item.sku === rawData?.sku) || value?.formCreate?.statusForm === 'create')
                                ? t(DISPLAY_NAME_MENU.GENERAL.ENTER_PRICE) : '---'}
                disabled={rawData?.verOldStatus === 'edit' || listEditVersion?.length > 0}
                maxLength={11}
                icon={
                  <Text as="u"
                        style={{color: '#7C88A6', position: 'absolute', right: -4}}>
                    ₫
                  </Text>
                }
              />
            </Tooltipv1>
          </div>
          <div style={{marginTop: 26, marginLeft: 8, width: 150}}>
            <Tooltipv1
              className="--danger"
              placement="bottom"
              title={!!!rawData?.price ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.RETAIL_PRICE) :
                +rawData?.price === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.RETAIL_PRICE) : ''}
            >
              <Input
                value={rawData?.price}
                onChange={e => onQuantityChange(e.target?.value, 'price')}
                validateText={+rawData?.price === 0 ? `  ` : undefined}
                validateType={+rawData?.price === 0 ? "danger" : 'success'}
                placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_PRICE)}
                maxLength={11}
                icon={
                  <Text as="u"
                        style={{color: '#7C88A6', position: 'absolute', right: -4}}>
                    ₫
                  </Text>
                }
              />
            </Tooltipv1>
          </div>
          <div style={{marginTop: 26, marginLeft: 8, width: 150}}>
            <Tooltipv1
              className="--danger"
              placement="bottom"
              title={!!!rawData?.wholesale_price ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.WHOLESALE_PRICE) :
                +rawData?.wholesale_price === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.WHOLESALE_PRICE) : ''}
            >
              <Input
                value={rawData?.wholesale_price}
                onChange={e => onQuantityChange(e.target?.value, 'wholesalePrice')}
                validateText={+rawData?.wholesale_price === 0 ? `  ` : undefined}
                validateType={+rawData?.wholesale_price === 0 ? "danger" : 'success'}
                placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_PRICE)}
                maxLength={11}
                icon={
                  <Text as="u"
                        style={{color: '#7C88A6', position: 'absolute', right: -4}}>
                    ₫
                  </Text>
                }
              />
            </Tooltipv1>
          </div>
        </div>
      </div>
    </StyledProductTableDetail>
  )
}

export default ModalPriceManager;


export const StyledProductTable = styled.div`
  user-select: none;
  max-width: 64.375rem;
  height: 33.75rem;
  position: relative;
  
  background: #FFFFFF;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  //margin-top: 10.125rem;
  //margin-left: 27.8125rem;
  margin: 10rem auto;
  padding: 24px;

  .product-info-version-page {
    &__table {
      position: relative;
      z-index: 0;
      max-height: 24rem;
      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
      
      &--title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }
      
      &--ptitle {
        font-weight: 600;
        font-size: 20px;
      }
      
      &--btn-group {
        position: absolute;
        bottom: 24px;
        right: 24px;
      }
      
      &--btn-manager {
        padding: 0 13px;
        border-color: var(--button-color);
        color: var(--button-color);
        font-weight: 600;
        font-size: 12px;
      }

      &[data-inventory='true'] {
        .product-info-version-page__th,
        .product-info-version-page__td {
          &:nth-child(2) {
            width: 124px;

            text-align: right;
          }
          &:nth-child(3) {
            width: 144px;
            padding-right: 12px;

            text-align: right;
          }
          &:nth-child(4) {
            width: 144px;

            text-align: right;
          }
          &:nth-child(5) {
            width: 144px;

            justify-content: flex-end;

            text-align: right;
          }
          &:nth-child(6) {
            width: 48px;
            padding-right: 16px;
          }
        }
      }
    }

    &__thead {
      position: sticky;
      top: 0;
      z-index: 3;

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
        width: 4.75rem;
        text-align: center;
      }

      &:nth-child(2) {
        width: 16rem;
      }

      &:nth-child(3) {
        width: 9.75rem;
        padding-right: 16px;
      }
      &:nth-child(4) {
        width: 9.75rem;
        padding-right: 16px;
      }
      &:nth-child(5) {
        width: 9.75rem;
        padding-right: 16px;
      }
      &:nth-child(6) {
        width: 9.75rem;
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
        padding-left: 16px;

        display: flex;
        flex: 1;
        align-items: center;
      }

      &:nth-child(2) {
        width: 124px;

        justify-content: flex-end;

        text-align: right;
      }

      &:nth-child(3) {
        width: 48px;
        padding-right: 16px;
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



export const StyledProductTableDetail = styled.div`
  .tooltip_select {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-info-version-table {
    &__td {
      border-top: 1px solid #EBEEF5;
      max-height: 86px;
      
      &-product-image {
        &:hover {
          cursor: pointer;
          &::before {
            content: 'See photo';
            position: absolute;
            width: 54px;
            height: 54px;
            background: rgba(0,0,0,0.4);
            border-radius: 6px;
            color: white;
            text-align: center;
            font-weight: 400;
            top: 16px;
            left: 16px;
            font-size: 10px;
            padding: 14px 10px 0 10px;
          }
        }  
      }
    }
    &__img-placeholder {
      background: rgba(26, 148, 255, 0.05);
      width: 54px;
      height: 54px;
      padding: 14px;
      text-align: center;
      border-radius: 6px;
      cursor: pointer;
      margin: 16px;
    }
    &__img {
      display: flex;
      margin-bottom: 24px;
      position: relative;
      
      &--remove {
        position: absolute;
        left: 91px;
        top: -10px;
        cursor: pointer;
      }
      
      &-src {
        width: 54px;
        height: 54px;
        margin: -11px 0 0 -14px;
        border-radius: 6px;
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }
    }
    &__td-product-status {
      &--inactive {
        background: #EFF3FB;
        color: #7C88A6;
        width: fit-content;
        padding: 3px 12px;
        font-size: 13px;
        border-radius: 4px;
      } 
      &--active {
        background: #E6FFF2;
        color: #00AB56;
        width: fit-content;
        padding: 3px 12px;
        font-size: 13px;
        border-radius: 4px;
      }
    }
  }
`