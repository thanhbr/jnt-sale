import React from 'react';
import useCreateInfoVersion from "../../../hooks/useCreateInfoVersion";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {Text} from "../../../../../common/text";
import {PRODUCT_ICONS} from "../../../interfaces/~icon";
import {Button} from "../../../../../common/button";
import {Input} from "../../../../../common/form/input";
import {Popper} from "../../../../../common/popper";
import {Switch} from "../../../../customer/components/switch";
import {CategoryInput} from "../../../../../common/form/input/_categoryInput";
import ModalPriceManager from "./~modalPriceManager";
import ZoomIn from "../modal/zoomIn";
import {Tooltip} from "../../../../../common/tooltip";
import {Tooltip as Tooltipv2} from "../../../../../common/tooltipv2";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const TableInventory = () => {
  const { t } = useTranslation()
  const {value, functions} = useCreateInfoVersion()

  return (
    <StyledProductTable>
      {value.attrVersion.length > 0 ? (
        <>
          <div className={"product-info-version-page__table--title"}>
            <p className={"product-info-version-page__table--ptitle"}>{`${t(DISPLAY_NAME_MENU.GENERAL.VERSION)} (${value.dataVersion.length})`}</p>

            <Tooltip
              className="--danger"
              placement="top-end"
              title={value?.validatePrice ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_MANAGEMENT_TOOLTIP) : ''}
            >
              {value?.validatePrice ? (
                <div>
                  <Button
                    appearance={'ghost'}
                    size={'xxs'}
                    className={"product-info-version-page__table--btn-manager"}
                    onClick={() => functions.onTogglePopupPrice(true)}
                    style={{border: '1px solid red', position: 'relative', padding: '0 23px 0 10px'}}
                  >
                    <Text style={{color: 'red'}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_MANAGEMENT)}</Text> <Text style={{position: 'absolute', top: 2, right: 5}}>{PRODUCT_ICONS?.errorPriceManager}</Text>
                  </Button>

                </div>
              ) : (
                <Button
                  appearance={'ghost'}
                  size={'xxs'}
                  className={"product-info-version-page__table--btn-manager"}
                  onClick={() => functions.onTogglePopupPrice(true)}
                  style={{color: 'rgb(229, 16, 29)'}}
                >
                  {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_MANAGEMENT)}
                </Button>
              )}
            </Tooltip>
          </div>
          <div
            className={"product-info-version-page__table"}
            // data-inventory={inventory}
          >
            <div className="product-info-version-page__thead">
              <div className="product-info-version-page__tr">
                <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.IMAGE)}</div>
                <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_NAME)}</div>
                <div className="product-info-version-page__th">
                  {t(DISPLAY_NAME_MENU.GENERAL.BARCODE)}
                  <Tooltip
                    title={<div style={{fontSize: 13, margin: '0 5px'}}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.BARCODE_TOOLTIP)}</div>}
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
                <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.WEIGHT)}</div>
                <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.INVENTORY)}</div>
                <div className="product-info-version-page__th">{t(DISPLAY_NAME_MENU.GENERAL.STATUS)}</div>
              </div>
            </div>
            <div className="product-info-version-page__tbody">
              {value?.dataVersion?.map((item, index) => (
                <Row
                  key={index}
                  indexRow={index + 1}
                  rawData={item}
                  onQuantityChange={(val, type) => functions.onChangeRowDetail(val, type, item, index)}
                  openZoomInImage={() => functions.onZoomInImage(true, item.image)}
                />
              ))}
            </div>
          </div>
          {value?.modalPrice?.open ? <ModalPriceManager /> : null}
          {value?.zoomInImage?.open && (
            <ZoomIn
              closeModal={() => functions.onZoomInImage(false, '')}
              linkActive={value?.zoomInImage?.linkActive}
            />
          )}
        </>
      ) : (
        <Empty />
      )}
    </StyledProductTable>
  );
};

export default TableInventory;

const Row = ({
               indexRow,
               rawData,
               onQuantityChange,
               openZoomInImage,
               ...props
             }) => {

  const { t } = useTranslation()
  const {value} = useCreateInfoVersion()
  const listVersion = value?.formCreate?.version?.valueVersion
  const listEditVersion = value?.formCreate?.version?.valueEditVersion
  const checkSKU = listVersion?.filter(item => item?.sku === rawData?.sku)
  const checkBarcode = listVersion?.filter(item => item?.barcode === rawData?.barcode)
  const validateSku = value?.validateSku
  const validateBarcode = +value?.validateBarcode - 2

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
          <div className={'product-info-version-table__name-version'} style={{marginTop: 14, width: '13rem'}}>
            <Tooltipv2 className='tooltip_select' title={`${rawData?.name}
                                                            ${!!!rawData?.attr_size ? '' : ' - '+rawData?.attr_size}
                                                            ${!!!rawData?.attr_color ? '' : ' - '+rawData?.attr_color}
                                                            ${!!!rawData?.attr_type ? '' : ' - '+rawData?.attr_type}`} baseOn='height' placement='top-center'>
              <Text fontWeight={400} fontSize={13}>
                {(`${rawData?.name}
                  ${!!!rawData?.attr_size ? '' : ' - '+rawData?.attr_size}
                  ${!!!rawData?.attr_color ? '' : ' - '+rawData?.attr_color}
                  ${!!!rawData?.attr_type ? '' : ' - '+rawData?.attr_type}`  || '---')}
              </Text>
            </Tooltipv2>
            <Tooltip
              className="--danger"
              placement="bottom-end"
              title={(checkSKU?.length > 1 && !!rawData?.sku)
                                      ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.PRODUCT_SKU)
                                        : (!!!rawData?.sku
                                          ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_SKU)
                                            : !!validateSku.find(it => +it === +indexRow)
                                                ? t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.PRODUCT_SKU) : '')}
            >
              <CategoryInput
                categoryList={[]}
                categoryValue={{name: 'SKU', value: ''}}
                categoryWidth={52}
                value={rawData?.sku}
                onChange={e => onQuantityChange(e, 'sku')}
                validateText={` `}
                validateType={(checkSKU?.length > 1 || !!!rawData?.sku || !!validateSku.find(it => +it === +indexRow)) ? 'danger' : 'default'}
                style={{width: '13rem', marginTop: '-1px'}}
                placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_PRODUCT_SKU)}
                maxLength={50}
              />
            </Tooltip>
          </div>
          <div style={{marginTop: 34, marginLeft: 8, width: 150}}>
            <Tooltip
              className="--danger"
              placement="bottom-end"
              title={((checkBarcode?.length > 1 && !!rawData?.barcode) ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.PRODUCT_BARCODE_DUPLICATE) : (+validateBarcode === +indexRow ? t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.PRODUCT_BARCODE) : ''))}
            >
              <Input
                value={rawData?.barcode}
                onChange={e => onQuantityChange(e.target?.value, 'barcode')}
                validateText={' '}
                validateType={(checkBarcode?.length > 1 && !!rawData?.barcode || +validateBarcode === +indexRow) ? 'danger' : 'default'}
                placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_PRODUCT_BARCODE)}
                maxLength={13}
              />
            </Tooltip>
          </div>
          <div style={{marginTop: 34, marginLeft: 8, width: 150}}>
            <Input
              value={rawData?.weight}
              onChange={e => onQuantityChange(e.target?.value, 'weight')}
              // validateText={state.validate?.weight}
              validateType="danger"
              placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_WEIGHT)}
              maxLength={5}
              icon={
                <Popper
                  renderPopper={({onClose}) => (
                    <div className="product-info-version-table__discount-type-dropdown-menu">
                      {
                        rawData?.list_type?.map((item) => {
                          if(!item.active) return (
                            <div
                              className="product-info-version-table__discount-type-dropdown-menu-item"
                              style={{
                                color: THEME_COLORS.secondary_100,
                                padding: '0 8px'
                              }}
                              onClick={_ => {
                                onClose()
                                onQuantityChange(item, 'changeTypeWeight')
                              }}
                            >
                              <Text>{item.name}</Text>
                            </div>
                          )
                        })
                      }
                    </div>
                  )}
                  renderToggle={({open}) => (
                    <div className="product-info-version-table__weight-dropdown-toggle">
                      <Text as="b" color={THEME_COLORS.primary_300} style={{display: 'flex', width: 50}}>
                        {rawData?.type_weight}
                        <i data-active={open}>{PRODUCT_ICONS.dropdown}</i>
                      </Text>
                    </div>
                  )}
                  popperProps={{style: {padding: '4px 0'}}}
                />
              }
              onIconClick={() => console.log('onIconClick')}
            />
          </div>
          <div style={{marginTop: 34, marginLeft: 8, width: 150}}>
            <Input
              // value={!!listEditVersion?.find(item => item.sku === rawData?.sku) ? (rawData.inventory || 0) : ''}
              value={(listEditVersion?.length > 0 && indexRow !== value?.dataVersion?.length) ? 0 : rawData.inventory || 0}
              onChange={e => onQuantityChange(e.target?.value, 'inventory')}
              // validateText={state.validate?.weight}
              validateType="danger"
              placeholder={!!listEditVersion?.find(item => item.sku === rawData?.sku) ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ENTER_INITIAL_INVENTORY) : '---'}
              className={"product-info-version-page__form-input-attr--version"}
              maxLength={6}
              // disabled={rawData?.verOldStatus === 'edit' || listEditVersion?.length === 1}
              disabled={listEditVersion?.length > 0}
            />
          </div>
          <div style={{marginTop: 34, width: '7rem', textAlign: 'center'}}>
            <Switch checked={+rawData.status === 1} style={{marginTop: '.3rem', marginLeft: '2rem'}}
                    onChange={_ => onQuantityChange(+rawData.status, 'statusVersion')}
            ></Switch>
          </div>
        </div>
      </div>
    </StyledProductTableDetail>
  )
}


export const StyledProductTable = styled.div`
  margin-top: 24px;

  user-select: none;

  .product-info-version-page {
    &__table {
      position: relative;
      z-index: 0;

      max-height: 384px;
      width: 56.0625rem;

      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
       @media only screen and (max-width: 1440px){
          width: 54.4rem;
       }
       @media only screen and (max-width: 1366px){
          width: 64.0625rem;
       }
       @media only screen and (max-width: 1280px){
          width: 59.4rem;
       }
      &--title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      
      &--ptitle {
        font-weight: 600;
        font-size: 14px;
      }
      &--ptitle:first-letter {
        text-transform: uppercase;
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
      &__name-version{
        @media screen and (max-width:1440px){
          margin-left: 8px;
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
      @media only screen and (max-width : 1440px ){
        &:nth-child(1) {
          width: 5rem;
        }
      }

      &:nth-child(2) {
        width: 13.625rem;
      }

      &:nth-child(3) {
        width: 9.5rem;
        padding-right: 16px;
      }
      &:nth-child(4) {
        width: 10rem;
        padding-right: 16px;
      }
      &:nth-child(5) {
        width: 10rem;
        padding-right: 16px;
      }
      &:nth-child(6) {
        text-align: center;
        width: 7rem;
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
  .popper__container {
    padding: 0 !important;
  }
  .product-info-version-table {
    &__td {
      border-top: 1px solid #EBEEF5;
      min-height: 86px;
      
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
            padding-top: 12px;
            
            font-weight: 400;
            top: 16px;
            left: 16px;
            font-size: 12px;
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
  }
`
