import React, {useContext} from 'react';
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Text} from "../../../../common/text";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Checkbox} from "../../../../common/form/checkbox";
import {Switch} from "../../../customer/components/switch";
import {Th} from "../../../../layouts/tableLayout/_th";
import {fNumber} from "../../../../util/formatNumber";
import {ProductContext} from "../../provider/~context";
import useProductRow from "../../hooks/useProductRow";
import {Tooltip} from "../../../../common/tooltipv2";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RowProductExtra = ({id, active, data, rowData, ...props}) => {
  const { t } = useTranslation()
  return (
    <StyledRowProductExtra {...props} data-active={active}>
      {active && (
        <div className="row-product-extra__container">
          <div style={{margin: '8px 32px'}}>
            <div className="row-product-extra__tabs">
              <Text>
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION__LIST)} ({data?.arr_product_details?.filter(item => +item.status === 1)?.length}
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.AVAILABLE_VERSION)}
                {(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.AVAILABLE_VERSION) === ' available version' && data?.arr_product_details?.filter(item => +item.status === 1)?.length > 1) && 's'})
              </Text>
            </div>

            <ProductTHead />
            <div className="row-product-extra__container--body">
              {data?.arr_product_details?.map(item => {
                return (
                  <>
                    <div className="row-product-extra__extra-tr"
                         key={item?.id}
                    >
                      <ProductTrExtra
                        data={item}
                        row={rowData.row}
                        id={id}
                      />
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </StyledRowProductExtra>
  )
}
export default RowProductExtra;

const ProductTrExtra = ({data, ...props}) => {
  const {pageState,pageDispatch} = useContext(ProductContext)
  const {row} = props
  let list = pageState.tab?.list_id
  const {handleCheckBoxTabDetail,functions} = useProductRow()
  return (
    <>
      <div
        className="product-table__row"
        // onClick={row.onToggleDetail}
        style={{display: 'flex',height:'72px',alignItems:'center',background:'#ffffff',border:'1px solid #E2EAF8',justifyContent:'space-between'}}
      >
        <div className="product-table__cell" data-type="td" style={{width: 30, margin: 17}}>
          <Checkbox
            checked={row?.isSelected || list.includes(data.id)}
            onClick={e => {
              e.stopPropagation()
              handleCheckBoxTabDetail(data.id)
            }}
          />
        </div>
        <div className="product-table__cell" data-type="td" style={{width: '14%', display: 'flex',alignItems:'center'}} >
          <div style={{height: 44, width: 44, textAlign: 'center', borderRadius: 4}}>
            <img src={!!data?.image_thumb ? data?.image_thumb : '/img/product/default-product-thumbnail.png'}
                 alt={'image'}
                 style={{height: '100%'}}
            />
          </div>
          {/*<Text style={{marginLeft: 12}}>{data?.product_name}</Text>*/}
          <div style={{display: 'block', marginLeft: 12, width: '70%'}}>
            <Tooltip className={'tooltip_select'}
                     title={data?.sku}
                     baseOn={'width'}>
              <Text>{data?.sku}</Text>
            </Tooltip>
            {/*<Tooltip className={'tooltip_select'}*/}
            {/*         title={`${data?.name_attr_value_1}${data?.name_attr_value_2}${data?.name_attr_value_3}`}*/}
            {/*         baseOn={'width'}>*/}
              <Text color={'#7C88A6'} fontSize={13}>{`${data?.name_attr_value_1 || ''}${!!data?.name_attr_value_2 ? '-'+data?.name_attr_value_2 : ''}${!!data?.name_attr_value_3 ? '-'+data?.name_attr_value_3 : ''}`}</Text>
            {/*</Tooltip>*/}
          </div>
        </div>
        <div className="product-table__cell" data-type="td" style={{width: '44.3%'}} >
          <Text>{data?.product_name}</Text>
        </div>
        <div className="product-table__cell" data-type="td" style={{width: '6.15%',textAlign:'center'}} >
          <Text style={{marginLeft: 12}}>{data?.warehouse_quantity || 0}</Text>
        </div>
        <div className="product-table__cell" data-type="td" style={{width: '9%'}} >
          <Text style={{marginLeft: 12}}>{fNumber(data?.price.toString().replace(/[^0-9]/g, ''))}</Text>
        </div>
        <div className="product-table__cell" data-type="td" style={{width: '10%'}} >
          <Text style={{marginLeft: 12}}>{fNumber(data?.wholesale_price.toString().replace(/[^0-9]/g, ''))}</Text>
        </div>
        <div className="product-table__cell" data-type="td"  style={{width: '7.5%',textAlign:'center',paddingLeft:'2.2rem'}}>
          <Switch checked={+data?.status === 1}
            onChange={e=>{
              functions.handleChangeProductDetailStatus(data)
            }}
          />
        </div>
      </div>
    </>
  )
}
const ProductTHead  = ({...props}) => {
  const { t } = useTranslation()
  return (
    <StyledProductTHead>
      <Tr {...props} type="tHead" style={{borderRadius:'8px 8px 0px 0px'}}>
        <Th className="product-table__cell">
          <Checkbox
            // checked={checkbox.checked}
            // indeterminate={!checkFullPageChecked()}
            onClick={e => {
              e.stopPropagation()
              // checkbox.onClick()
            }}
            style={{opacity:0,cursor:'context-menu'}}
          />
        </Th>
        <>
          <Th className="product-table__cell product-table__cell--code">{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SKU)}</Th>
          <Th className="product-table__cell product-table__cell--sku">{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_NAME)}</Th>
          <Th className="product-table__cell product-table__cell--inventory">{t(DISPLAY_NAME_MENU.GENERAL.INVENTORY)}</Th>
          <Th className="product-table__cell product-table__cell--price">{t(DISPLAY_NAME_MENU.GENERAL.RETAIL_PRICE)}</Th>
          <Th className="product-table__cell product-table__cell--wholesale">{t(DISPLAY_NAME_MENU.GENERAL.WHOLESALE_PRICE)}</Th>
          <Th className="product-table__cell product-table__cell--status">{t(DISPLAY_NAME_MENU.GENERAL.STATUS)}</Th>
        </>
        {/*)}*/}
      </Tr>
    </StyledProductTHead>
  )
}


export const StyledProductTHead = styled.div`
.tr__container{
  border-radius: 8px 8px 0px 0px;
  justify-content: space-between;
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
      &--code {
        width: 14%;
      }
      &--sku {
        width: 44.3%;
      }
      &--inventory {
        width: 6.15%;
        text-align: center;
        @media only screen and (max-width: 1440px){
          width: 6.15%;
        }
      }
      &--price {
        width: 9%;
      }
      &--wholesale {
        width: 10%;
      }
      &--status{
        width: 7.5%;
        text-align: center;
      }
    }
  }
`

const StyledRowProductExtra = styled.div`

  .tooltip_select {
    width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  max-height: 0;

  overflow: hidden;

  transition: all 0.25s;
  
  .tr__container {
    background: white !important;
  }

  &[data-active='true'] {
    max-height: 75vh;
    padding: 4px 0 7px 0;
  }

  .row-product-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0 8px 8px 8px;
      
      &--body {
        max-height: 360px;
        overflow: scroll;
      }
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0 0;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0 0;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      max-height: 60vh;
      padding: 24px 36px 32px 36px;

      overflow: auto;

      background: #fff;
      border-radius: 0 8px 0 0;
    }

    &__loading {
      width: 100%;
      height: 200px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
