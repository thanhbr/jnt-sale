import React, {useState} from 'react';
import {Tooltip} from "../../../../../common/tooltip";
import {Tooltip as Tooltipv2} from "../../../../../common/tooltipv2";
import {Tr} from "../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../layouts/tableLayout/_td";
import {Text} from "../../../../../common/text";
import styled from "styled-components";
import {Input} from "../../../../../common/form/input";
import {GIVEBACK_PRODUCT_ICONS} from "../../../interfaces/icon";
import {formatMoney} from "../../../../../util/functionUtil";
import useCreateGiveBackProduct from "../../../hooks/useCreateGiveBackProduct";
import {fNumber} from "../../../../../util/formatNumber";
import {Popover} from "@mui/material";
import PopoverDetail from "../_popoverDetail";
import {CurrencyInput} from "./~currencyInput";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";
import {useTranslation} from "react-i18next";

const BodyRefundProduct = () => {
  const {t} = useTranslation()
  const {formData, functions, checkHasQuantity, totalValueOfGoods} = useCreateGiveBackProduct()
  const products = formData?.orderReturnDetail?.products

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = num => fNumber(num.toString().replace(/[^0-9]/g, ''))

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [dataPopover, setDataPopover] = useState('')
  const idPopover = open ? 'simple-popover' : undefined
  const handleClickPopover = (e, data) => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
    setDataPopover(data)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <StyledBodyRefundProduct>
      <div className={'giveback-product-table-header'}>
        <Tr type="tHead">
          <Td className={'giveback-product-table-header--name'}>{products?.length === 0 ? t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CONTENT_RETURNED_GOODS) : t(DISPLAY_NAME_MENU.GENERAL.PRODUCT_NAME_SKU)}</Td>
          {products?.length !== 0 && (
            <>
              <Td className={'giveback-product-table-header--quantity'}>
                <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.RETURN_AMOUNT)}</Text>
                {!!!checkHasQuantity && (
                  <Tooltip
                    className="--danger giveback-product-table-thead__tooltip"
                    placement="bottom-start"
                    title={t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.RETURN_AMOUNT)}
                  >
                    <span>{GIVEBACK_PRODUCT_ICONS.exclamation}</span>
                  </Tooltip>
                )}
              </Td>
              <Td className={'giveback-product-table-header--price-sale'}>
                <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.GENERAL.UNIT_PRICE)}</Text>
                {products?.length !== 0 && (
                  <Tooltip
                    className="giveback-product-table-thead__tooltip"
                    placement="bottom"
                    title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE_PAGE_UNIT_TOOLTIP)}
                    style={{display: 'flex', marginTop: 5}}
                  >
                    <span>{GIVEBACK_PRODUCT_ICONS.question}</span>
                  </Tooltip>
                )}
              </Td>
            </>
          )}
          <Td className={`${products?.length !== 0 ? 'giveback-product-table-header--price-sale' : 'giveback-product-table-header--price-sale-not-inventory'}`}>
            <Text fontWeight={600} style={{marginRight: 4}}>{products?.length === 0 ? t(DISPLAY_NAME_MENU.GENERAL.SALES_VALUE) : t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE_PAGE_UNIT_PRICE_PAID)} </Text>
            {products?.length !== 0 && (
              <Tooltip
                className="giveback-product-table-thead__tooltip"
                placement="bottom-start"
                title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE_PAGE_UNIT_PRICE_PAID_TOOLTIP)}
                style={{display: 'flex', marginTop: 5}}
              >
                <span>{GIVEBACK_PRODUCT_ICONS.question}</span>
              </Tooltip>
            )}
          </Td>
          <Td className={'giveback-product-table-header--price-order'}>
            <Text fontWeight={600} style={{marginRight: 4}}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.VALUE_PAID)}</Text>
            {products?.length !== 0 && (
              <Tooltip
                className="giveback-product-table-thead__tooltip"
                placement="bottom"
                title={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.VALUE_PAID_TOOLTIP)}
                style={{display: 'flex', marginTop: 5}}
              >
                <span>{GIVEBACK_PRODUCT_ICONS.question}</span>
              </Tooltip>
            )}
          </Td>
        </Tr>
      </div>
      <div className={'giveback-product-table-body'}>
        {open && (
          <Popover
            id={idPopover}
            className="common-popover"
            open={true}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{marginTop: 2}}
          >
            <PopoverDetail data={dataPopover}/>
          </Popover>
        )}
        {products?.map(item => (
          <Tr type="tBody" style={{fontWeight: 600}} key={item.product_id_details}>
            <Td className={'giveback-product-table-body--name'}>
              <div style={{display: 'flex'}}>
                <img src={!!!item?.image_thumb ? '/img/product/default-product-thumbnail.png' : item?.image_thumb} alt={'prd-img'} />
                <div className={'giveback-product-table-body--name-detail'}>
                  <Tooltipv2 className='tooltip_select' title={item?.product_name} baseOn='height' placement='top-center'>
                    <p className={'giveback-product-table-body--name-detail-title'}>{item?.product_name}</p>
                  </Tooltipv2>
                  <Tooltipv2 className='tooltip_select' title={item?.product_model} baseOn='height' placement='top-center'>
                    <p className={'giveback-product-table-body--name-detail-sku'}>SKU: {item?.product_model}</p>
                  </Tooltipv2>
                </div>
              </div>
            </Td>
            <Td className={'giveback-product-table-body--quantity'}>
              <div>
                <Tooltip
                  className="--danger"
                  placement="bottom"
                  title={+item?.original_number > +item?.amount_paid ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.AMOUNT_PAY_THAN_AMOUNT) : ''}
                >
                  <Input
                    icon={
                      <div className="giveback-product-table-body--quantity__number-arrow">
                        <i
                          data-disabled={+item?.original_number >= +item?.amount_paid}
                          onClick={() => (+item?.original_number < +item?.amount_paid) && functions?.handleInputChangeAmount(+item?.original_number, item, {type: 'increase'})}
                        >
                          {GIVEBACK_PRODUCT_ICONS.caretUp}
                        </i>
                        <i
                          data-disabled={+item?.original_number === 0}
                          onClick={() => functions?.handleInputChangeAmount(+item?.original_number, item, {type: 'decrease'})}
                        >
                          {GIVEBACK_PRODUCT_ICONS.caretUp}
                        </i>
                      </div>
                    }
                    // min={0}
                    type="number"
                    validateText={+item?.original_number > +item?.amount_paid ? ` ` : undefined}
                    validateType={+item?.original_number > +item?.amount_paid ? 'danger' : 'default'}
                    value={addCommas(removeNonNumeric(+item?.original_number))|| 0}
                    onChange={e => functions?.handleInputChangeAmount(e?.target?.value, item, {type: 'quantity'})}
                    onIconClick={() => {}}
                    style={{width: 100}}
                    onWheel={() => document.activeElement.blur()}
                  />
                </Tooltip>
              </div>
              <p style={{marginLeft: 4}}>/{+item?.amount_paid}</p>
            </Td>
            <Td className={'giveback-product-table-body--price-sale'}>
              <p className={`giveback-product-table-body--price-sale--discount-single`}>
                {formatMoney(+item?.price)}
              </p>
            </Td>
            <Td className={'giveback-product-table-body--price-sale'}>
              {(+item?.discount !== 0 || +item?.total_discount_per_product !== 0) ? (
                <>
                  <p className={`giveback-product-table-body--price-sale--discount-single`}>
                    {formatMoney(+item?.unit_price_paid)}
                  </p>
                  <p className={'giveback-product-table-body--price-sale--origin'}
                     aria-describedby={idPopover}
                     onClick={e => handleClickPopover(e, item)}
                  >
                    {t(DISPLAY_NAME_MENU.GENERAL.DECREASED)}: {formatMoney(+item?.discount_price_paid + +item?.product_discount_total_order)}
                  </p>
                </>
              ) : (
                <>
                  <p className={`giveback-product-table-body--price-sale--discount-single`}>
                    {formatMoney(+item?.price)}
                  </p>
                  <p className={'giveback-product-table-body--price-sale--origin'} style={{color: '#7C88A6'}}>{t(DISPLAY_NAME_MENU.GENERAL.NO_DISCOUNT)}</p>
                </>
              )}
            </Td>
            <Td className={'giveback-product-table-body--price-order'}>
              <Text fontWeight={600} style={{marginRight: 4}}>
                <Tooltip
                  className="--danger"
                  placement="bottom"
                  title={(+item?.return_value === 0 && +addCommas(removeNonNumeric(+item?.original_number)) !== 0) ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_0) : '' }
                >
                  <CurrencyInput
                    defaultValue={item?.return_value}
                    triggerDefault={item?.return_value}
                    icon={
                      <Text as="u" style={{color: '#7C88A6'}}>
                        ₫
                      </Text>
                    }
                    iconProps={{style: {textAlign: 'right'}}}
                    label=""
                    onChange={value => functions?.handleInputChangeAmount(value, item, {type: 'value'})}
                    validateText={(+item?.return_value === 0 && +addCommas(removeNonNumeric(+item?.original_number)) !== 0) ? ' ': ''}
                    validateType='danger'
                    maxLength={10}
                    disabled={+addCommas(removeNonNumeric(+item?.original_number)) === 0}
                  />
                  <p className={'giveback-product-table-body--price-order--origin'}>
                    {t(DISPLAY_NAME_MENU.GENERAL.SUGGESTED_PRICE)}: {formatMoney(item?.suggested_return_value)}
                  </p>
                </Tooltip>
              </Text>
            </Td>
        </Tr>
        ))}
        {products?.length === 0 && (
          <Tr type="tBody" style={{fontWeight: 600}}>
            <Td className={'giveback-product-table-body--name'}>
              <div style={{display: 'flex'}}>
                <Input
                  className="survey_infor_name"
                  placeholder={t(DISPLAY_NAME_MENU.GENERAL.ENTER_PRODUCT_NAME_SKU)}
                  // validateText={state.dataUpdate.shopname == '' ? "Vui lòng nhập tên cửa hàng" :""}
                  // validateType="danger"
                  value={formData?.orderReturnDetail?.details}
                  // onBlur={e => {
                  //   dispatch({type: 'SET_SHOPNAME_UPDATE', payload: e.target.value})
                  // }}
                  onChange={e => functions.handleChangeProductName(e.target.value)}
                  style={{width: '29.8125rem'}}
                  maxLength={255}
                />
              </div>
            </Td>
            <Td className={'giveback-product-table-body--price-sale'}>
              <p className={`giveback-product-table-body--price-sale--discount`}
                style={{margin: '7px 12px 0 0'}}>
                {formatMoney(formData?.orderReturnDetail?.total_amount)}
              </p>
            </Td>
            <Td className={'giveback-product-table-body--price-order'}>
              <Text fontWeight={600} style={{marginRight: 4}}>
                <Tooltip
                  className="--danger"
                  placement="bottom"
                  title={+formData?.orderReturnDetail?.value_paid === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_0) :
                      (+formData?.orderReturnDetail?.value_paid > +formData?.orderReturnDetail?.total_amount ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_AMOUNT) : '') }
                >
                  <CurrencyInput
                    // labelTooltip={'Giá trị mà bạn cần đơn vị vận chuyển thu của khách hàng khi giao hàng.'}
                    defaultValue={formData?.orderReturnDetail?.value_paid}
                    triggerDefault={formData?.orderReturnDetail?.value_paid}
                    icon={
                      <Text as="u" style={{color: '#7C88A6'}}>
                        ₫
                      </Text>
                    }
                    iconProps={{style: {textAlign: 'right'}}}
                    label=""
                    onChange={value => functions?.handleInputChangeAmount(value, formData?.orderReturnDetail, {type: 'valueNotInventory'})}
                    validateText={+formData?.orderReturnDetail?.value_paid === 0 ? ' ' : (+formData?.orderReturnDetail?.value_paid > +formData?.orderReturnDetail?.total_amount ? ' ': '')}
                    validateType='danger'
                    maxLength={10}
                  />
                </Tooltip>
              </Text>
            </Td>
          </Tr>
        )}
        <div className={'giveback-product-table-footer'}>
          {products?.length !== 0 && (
            <div className={'giveback-product-table-footer--quantity'}>
              <p>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NUMBER_GOOD_PAID)}</p>
              <p>{checkHasQuantity}</p>
            </div>
          )}
          <div className={'giveback-product-table-footer--total'}>
            <p>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.TOTAL_GOOD_PAID)}</p>
            <p>{products?.length !== 0 ? formatMoney(totalValueOfGoods) : formatMoney(formData?.orderReturnDetail?.value_paid)}</p>
          </div>
        </div>
      </div>
    </StyledBodyRefundProduct>
  )
}

export default BodyRefundProduct

export const StyledBodyRefundProduct = styled.div`
  .tooltip_select {
    display: -webkit-box;
    height: 20px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .giveback-product-table {
    &-header {
      & [data-type='tHead'] {
        font-weight: 600;
        border: 1px solid #e2eaf8;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        background: #F7F9FD !important;
      }
      
      & .tr__container {
        height: 44px;
      }
      &--name {
        width: 17.125rem; 
        margin-left: 0.5rem; 
        flex: 1
      }
      &--quantity {
        width: 8.8125rem; 
        margin-left: 0.5rem;
      }
      &--price-sale {
        width: 7.5rem; 
        margin-left: 1.5rem;
        display: flex;
        justify-content: center;
        text-align: end;
        
        &-not-inventory {
          width: 8.5rem;
        }
      }
      &--price-order {
        width: 8.125rem; 
        margin-left: 1.5rem;
        justify-content: end;
        padding-right: 18px;
        text-align: end;
      }
    }
    &-body {
      & [data-type='tBody'] {
        font-weight: 600;
        border: 1px solid #e2eaf8;
        border-top: none;
        overflow: hidden;
      }
      & [data-type='tBody']:nth-last-child(2) {
        border-radius: 0 0 8px 8px;
      }
      
      & .tr__container {
        height: 88px;
      }
      &--name {
        width: 17.125rem; 
        margin-left: 0.5rem; 
        flex: 1;
        img {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          margin-right: 12px;
          border: 1px solid #d5dfea;
        }
        &-detail {
          margin-top: 4px;
          &-title {
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            color: #00081D;
          }
          &-sku {
            font-weight: 400;
            font-size: 14px;
            line-height: 140%;
            color: #7C88A6;
          }
        }
      }
      &--quantity {
        width: 7.8125rem; 
        margin-left: 1.5rem;
        margin-top: -14px;
        display: flex;
        
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
      }
      &--price-sale {
        width: 7.5rem; 
        display: block;
        text-align: right;
        margin: 1rem .5rem auto 1.5rem;
        position: relative;
        
        &--discount {
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          margin-top: 8px;
          &-single {
            margin-top: 0;
          }
        }
        &--origin {
          font-weight: 600;
          font-size: 12px;
          line-height: 140%;
          //text-decoration-line: line-through;
          color: #1A94FF;
          width: 200%;
          
          position: absolute;
          bottom: 32px;
          right: 12px;
          cursor: pointer ;
        }
      }
      &--price-order {
        width: 8.125rem; 
        margin: 0 .75rem;
        padding: 12px 0;
        
        &--origin {
          font-weight: 500;
          font-size: 12px;
          line-height: 100%;
          color: #00AB56;
          margin-top: 5px;
          width: 200%;
        }
      }
    }
    &-footer {
      margin-top: 16px;
      &--quantity {
        display: flex;
        justify-content: end;
        margin-right: 18px;
        
        & p:first-child {
          font-weight: 400;
          font-size: 14px;
          line-height: 140%;
          color: #7C88A6;
        }
        
        & p:nth-child(2) {
          font-weight: 400;
          font-size: 14px;
          line-height: 140%;
          width: 140px;
          text-align: right;
        }
      }
      &--total {
        display: flex;
        justify-content: end;
        margin-right: 18px;
        
        & p:first-child {
          font-weight: 600;
          font-size: 14px;
          line-height: 140%;
        }
        
        & p:nth-child(2) {
          font-weight: 600;
          font-size: 14px;
          line-height: 140%;
          width: 140px;
          text-align: right;
        }
      }
    }
  }
`
