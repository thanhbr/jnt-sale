import React from 'react';
import styled from "styled-components";
import {Grid} from "@material-ui/core";
import {Text} from "../../../../common/text";
import {formatMoney} from "../../../../util/functionUtil";
import RowExtraTable from "./_rowExtraTable";
import {CellPayment} from "./_cellPayment";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import {Button} from "../../../../common/button";
import {Tooltip as Tooltipv2} from "../../../../common/tooltip";
import useTableGiveBackProduct from "../../hooks/useTableGiveBackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const RowTabDetail = ({data}) => {
  const {t} = useTranslation()
  const {functions} = useTableGiveBackProduct()
  return (
    <StyledRowTabDetail>
      <Grid container>
        <Grid item xs={4} sm={4} md={4}>
          <div className={'giveback-product-row-table-title'}>
            <Text fontWeight={600} fontSize={16}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CUSTOMER_REFUND)}</Text>
          </div>
          <div className={'giveback-product-row-table-label'}>
            <div>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.GENERAL.CUSTOMER_NAME)}:</Text>
            </div>
            {!!data?.customer_mobile ? (
              <a href={`/partner-management/customer?keyword=${data?.customer_mobile}&group=&city=&district=&ward=&per_page=20&start=0`}
                 target={'blank'}>{data?.customer_name}</a>
            ) : <Text>{data?.customer_name}</Text>}
          </div>
          <div className={'giveback-product-row-table-label'}>
            <div>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.GENERAL.PHONE)}:</Text>
            </div>
            <Text>{data?.customer_mobile}</Text>
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <div className={'giveback-product-row-table-title'}>
            <Text fontWeight={600} fontSize={16}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_INFO)}</Text>
          </div>
          <div className={'giveback-product-row-table-label'}>
            <div>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_ORDER)}:</Text>
            </div>
            <a href={`/orders?search=${data?.order_id}`} target={'blank'}>{data?.order_id}</a>
          </div>
          <div className={'giveback-product-row-table-label'}>
            <div>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_REASON)}:</Text>
            </div>
            <div>
              {data?.note?.length > 100 ? (
                <Tooltipv2 className='tooltip_select_2row' title={data?.note} baseOn='height' placement='top-center'>
                  <Text>{data?.note}</Text>
                </Tooltipv2>
              ) : (<Text>{data?.note}</Text>)}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          {(+data?.status !== 1 && !!data?.status) ? (
            <div className={'giveback-product-row-table-refund'}>
              <Button size={'sm'}
                      style={{padding: '.375rem .9375rem', lineHeight: '140%'}}
                      onClick={() => functions?.toggleConfirmRefund(data)}
              >{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CONFIRM_RECEIPT)}</Button>
            </div>) : null }
            <div className={`${+data?.status === 1 ? 'giveback-product-row-table-refund--inventory': ''}`}>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.GET_REFUNDS)}:</Text>
              <div>
                {+data?.status === 1 ? (
                  <>
                    <Text fontWeight={500} fontSize={12}
                          style={{background: '#E6FFF2', color: '#00AB56', padding: '3px 12px', borderRadius: 4}}
                    >{t(DISPLAY_NAME_MENU.GENERAL.RECEIVED)}</Text>
                    <Text style={{fontStyle: 'italic'}}> ({t(DISPLAY_NAME_MENU.GENERAL.ADMISSION)} {!!data?.create_date ? fDateTimeSuffix(data?.receive_date) : ''})</Text>
                  </>
                ) : (<Text fontWeight={500} fontSize={12}
                           style={{background: '#FFEBEC', color: '#FF424E', padding: '3px 12px', borderRadius: 4}}
                      >{t(DISPLAY_NAME_MENU.GENERAL.NOT_RECEIVED)}</Text>)}
              </div>
            </div>
            <div style={{marginTop: 8}}>
              <Text color={'#7C88A6'}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_MONEY_STATUS)}:</Text>
              <div>
                <CellPayment money={data?.payment_money} status={data?.payment_status}/>
              </div>
            </div>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <>
            {data?.order_details?.length !== 0 ? (
              <>
                <div className={'giveback-product-row-extra-table-title'}>
                  <div>
                    <Text fontWeight={600} fontSize={16}>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_PRODUCT)}</Text><Text> ({t(DISPLAY_NAME_MENU.GENERAL.TOTAL)}: {data?.total_quantity})</Text>
                  </div>
                  <div>
                    <Text>{t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.WAREHOUSE_RECEIVE_GOODS)}: </Text><Text fontWeight={600}> {data?.warehouse_name}</Text>
                  </div>
                </div>
                <RowExtraTable data={data?.order_details} />
                <div className={'giveback-product-row-extra-table-body--total-money'}>
                  <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.TOTAL_AMOUNT)}</Text>
                  <div className={'giveback-product-row-extra-table-body--total-money-vnd'}>
                    <Text fontWeight={600}>{formatMoney(data?.total_price)}</Text>
                  </div>
                </div>
              </>
            ) : (
              <div style={{marginTop: 28}}>
                <div>
                  <Text fontWeight={600} fontSize={16}>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INFO)}</Text>
                </div>
                <div style={{marginTop: 12, padding: '10px 0', borderBottom: '1px solid #E2EAF8'}}>
                  <Text>{data?.product_name}</Text>
                </div>
                <div className={'giveback-product-row-extra-table-body--total-money'}>
                  <Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.TOTAL_AMOUNT)}</Text>
                  <div className={'giveback-product-row-extra-table-body--total-money-vnd'}>
                    <Text fontWeight={600}>{formatMoney(data?.total_price)}</Text>
                  </div>
                </div>
              </div>
            )}
          </>
        </Grid>
      </Grid>
    </StyledRowTabDetail>
  )
}

export default RowTabDetail


const StyledRowTabDetail = styled.div`
  .tooltip_select_2row {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .giveback-product-row-table-label {
    margin-top: 12px;
    a {
      font-weight: 400;
      font-size: 14px;
      color: #1A94FF;
    }
  }
  .giveback-product-row-table-refund {
    text-align: right;
    &--inventory {
      margin-top: 32px;
    }
  }
  .giveback-product-row-extra-table-title {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
  }
  .giveback-product-row-extra-table-body {
    
    &--total {
      width: 15.625rem;
      text-align: right;
      margin-left: 1.5rem;
      
      &-money {
        margin: 12px 24px 0 0;
        display: flex;
        justify-content: end;
        
        &-vnd {
          width: 12rem;
          text-align: right;
        }
      }
    }
  }
`
