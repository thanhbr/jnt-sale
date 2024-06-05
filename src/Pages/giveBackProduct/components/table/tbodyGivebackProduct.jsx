import React from 'react';
import SkelentonGivebackProduct from "./_skelentonGivebackProduct";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {Tr} from "../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Text} from "../../../../common/text";
import {formatMoney} from "../../../../util/functionUtil";
import {GIVEBACK_PRODUCT_ICONS} from "../../interfaces/icon";
import styled from "styled-components";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {CellPayment} from "./_cellPayment";
import RowExtra from "./_rowExtra";
import EmptyGivebackProduct from "./empty";
import {Tooltip} from "../../../../common/tooltip";
import {Tooltip as Tooltipv2} from "../../../../common/tooltipv2";
import {RowMenuPopover} from "./_rowMenuPopover";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const TbodyGivebackProduct = () => {
  const {table} = useTableGiveBackProduct()
  const displayList = table?.display?.list
  return (
    <>
      {table?.display?.loading ? (
        <SkelentonGivebackProduct numb={20} />
      ) : displayList?.length > 0 ?
          (<>
            {displayList?.map(item =>  <GivebackProductTr key={item.id} data={item} />)}
            </>) : <EmptyGivebackProduct /> }
    </>
  )
}

export default TbodyGivebackProduct

const GivebackProductTr = ({data, ...props}) => {
  const {t} = useTranslation()
  const {functions, detail, shouldOpenDetail} = useTableGiveBackProduct(data)

  const handleActionApply = action => {
    switch (action) {
      case 'refund' :
        functions?.handleSelectPayment(data)
        break
      case 'confirm' :
        functions?.toggleConfirmRefund(data)
        break
      default: break
    }
  }

  return (
    <StyledTBodyGivebackProduct>
      <Tr
        {...props}
        className="giveback-product-table__row"
        extra={
          <RowExtra
            id={detail?.id}
            active={shouldOpenDetail}
            data={detail?.active}
            // rowData={orderRow}
          />
        }
        // data-active={row.shouldOpenDetail}
        onClick={functions.handleToggleDetail}
      >
        <Td className="giveback-product-table__cell" data-type="td" style={{display: 'block'}}>
          <div>
            <Text fontWeight={500} color={'#00081D'}>{data?.order_code}</Text>
          </div>
          <div style={{position: 'relative'}}>

            <Tooltip title={t('order_date_created')} placement={'bottom'}>
              <span>{GIVEBACK_PRODUCT_ICONS.clock}</span>
            </Tooltip>
            <Text color={'#7C88A6'}
                  fontSize={13}
                  style={{position: 'absolute', top: -2}}
            >{!!data?.create_date ? fDateTimeSuffix(data?.create_date) : ''}</Text>
          </div>
        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          <a href={`/orders?search=${data?.order_id}`}
             target={'blank'}>{data?.order_id}</a>
        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          {!!data?.customer_mobile ? (
            <a href={`/partner-management/customer?keyword=${data?.customer_mobile}&group=&city=&district=&ward=&per_page=20&start=0`}
               target={'blank'}>{data?.customer_name}</a>
          ) : (<Text>{data?.customer_name}</Text>)}

        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          <Text>{formatMoney(data?.total_price)}</Text>
        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          {+data.status === 1 ? (
            <div style={{background: '#E6FFF2', borderRadius: 4, height: 24, lineHeight: '150%'}}>
              <Text color={'#00AB56'} fontSize={12} fontWeight={500} style={{margin: '3px 12px'}}>{t(DISPLAY_NAME_MENU.GENERAL.RECEIVED)}</Text>
            </div>
          ) : (
            <div style={{background: '#FFEBEC', borderRadius: 4, height: 24, lineHeight: '150%'}}>
              <Text color={'#FF424E'} fontSize={12} fontWeight={500} style={{margin: '3px 12px'}}>{t(DISPLAY_NAME_MENU.GENERAL.NOT_RECEIVED)}</Text>
            </div>
          )}
        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          <CellPayment money={data?.payment_money} status={data?.payment_status}/>
        </Td>
        <Td className="giveback-product-table__cell" data-type="td">
          <Tooltipv2 className='tooltip_select' title={data?.note} baseOn='height' placement='top-center'>
            <Text>{data?.note}</Text>
          </Tooltipv2>
        </Td>
        <Td
          className="giveback-product-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="giveback-product-table__detail-toggle"
            data-active={shouldOpenDetail}
            // onClick={row.onToggleDetail}
          >
            {GIVEBACK_PRODUCT_ICONS.up}
          </button>
          {(+data?.status === 1 && +data?.payment_status === 1) ? null : (
            <RowMenuPopover
              id={data.id}
              dataOrder={data}
              onActionClick={handleActionApply}
            />
          )}
        </Td>
      </Tr>
    </StyledTBodyGivebackProduct>
  )
}


export const StyledTBodyGivebackProduct = styled.div`
.tooltip_select {
  display: -webkit-box;
  height: 100%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.giveback-product-table {
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
      .giveback-product-table__detail-toggle {
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
      width: 10rem;
      margin-left: 24px;
      padding-right: 0;
    }

    &:nth-child(2) {
      width: 10rem;
      margin-left: 24px;
      a {
        color: #1A94FF;
      }
    }

    &:nth-child(3) {
      width: 12.5rem;
      margin-left: 24px;
      a {
        color: #1A94FF;
      }
    }

    &:nth-child(4) {
      width: 8.75rem;
      margin-left: 24px;
      justify-content: right;
    }

    &:nth-child(5) {
      width: 9.75rem;
      margin-left: 24px;
      justify-content: center;
    }

    &:nth-child(6) {
      width: 9.5rem;
      margin-left: 24px;
      justify-content: end;
      padding: 12px 0;
    }

    &:nth-child(7) {
      width: 29.5rem;
      margin-left: 24px;
      flex: 1;
    }

    &:nth-child(8) {
      text-align: center;
    }
  }

  &__detail-toggle {
    position: absolute;
    top: 50%;
    right: 24px;

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

    //@media screen and (max-width: 1599px) {
    //  display: none !important;
    //}
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
