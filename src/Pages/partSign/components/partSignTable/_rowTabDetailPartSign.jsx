import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {TooltipV2} from 'common/tooltipv2'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import usePartSignRow from 'Pages/partSign/hooks/useRow'
import {
  DELIVERY_DETAILS_LIST_TIME,
  DELIVERY_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS,
  DELIVERY_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS,
} from 'Pages/partSign/interfaces/_constants'
import {DELIVERY_ICONS} from 'Pages/partSign/interfaces/_icons'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { fDateTimeSuffix } from 'util/formatTime'
import {formatMoney} from '../../../../util/functionUtil'
import {useTranslation} from "react-i18next";

export const RowTabDetailDelivery = ({
  data,
  onActionCancelDelivery,
  ...props
}) => {
  const {row} = usePartSignRow(data)
  const { t } = useTranslation()

  return (
    <StyledRowTabDetail {...props}>
      <div className="row-tab-detail__content">
        <div style={{width: '32.5%'}}>
          <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12}}
          >
            {t("infor_reference")}
          </Text>
          <div style={{display: 'flex'}}>
            <div style={{marginRight: 50}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t("billcode")} :
              </Text>
              <Text
                color={THEME_SEMANTICS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                }}
              >
                {data?.billcode || '---'}
                <Tooltip title={t("copy_billcode_n")}>
                  <i
                    style={{cursor: 'pointer', marginLeft: '0.2rem'}}
                    onClick={row.onCopyOrderCode}
                  >
                    {ORDER_ICONS.copy03_x}
                  </i>
                </Tooltip>
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t("code_refund")} :
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{textTransform: 'capitalize'}}
              >
                {data?.billcode_return || '---'}
              </Text>
            </div>
          </div>
        </div>
        <div style={{width: '40%'}}>
          <div style={{marginBottom: 12}}>
            <Text
              as="h4"
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
            >
              {t("client-infomation")}
            </Text>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{marginRight: 50}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t("customer_name_n")} :
              </Text>
              <Text
                color={THEME_SEMANTICS.delivering}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                }}
              >
                <Link
                  to={`/partner-management/customer?keyword=${data?.customer_mobile}&group=&city=&district=&ward=&per_page=20&start=0`}
                  target="_blank"
                  className="row-tab-detail__link-hover"
                >
                  {data?.customer_name || '---'} -{' '}
                  {data?.customer_mobile || '--'}
                </Link>
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t("Address")} :
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                {data?.customer_address || '--'}
              </Text>
            </div>
          </div>
        </div>
        <div style={{width: '40%'}}>
          <div style={{marginBottom: 12}}>
            <Text
              as="h4"
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
            >
              {t("product_description")}
            </Text>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{marginRight: 50}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t("product_page_product_name")} :
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                }}
              >
                {data?.order_detail?.length > 0 &&
                  data?.order_detail?.map(item => {
                    return <p>{item}</p>
                  })}
                {data?.order_detail?.length <= 0 && '---'}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="row-tab-detail__info-table">
        <div>
          <Text as="b" fontSize={16} lineHeight={22}>
            {t("infor_billcode")}
          </Text>
        </div>
      </div>
      <div className="row-tab-detail__table">
        <div className="row-tab-detail__thead">
          <div className="row-tab-detail__tr">
            {/*<div className="row-tab-detail__th">Đơn vị vận chuyển</div>*/}
            <div className="row-tab-detail__th">{t("order_sent_date")}</div>
            <div className="row-tab-detail__th">{t("order_signed_date")}</div>
            <div className="row-tab-detail__th">{t("cod_fee")} (COD)</div>
            <div className="row-tab-detail__th">{t("order_shipping")}</div>
            <div className="row-tab-detail__th">{t("cod-signed")}</div>
          </div>
        </div>
        <div className="row-tab-detail__tbody">
          {/* data.item_details.map(item => ( */}
          <div key={data.order_id} className="row-tab-detail__tr">
            {/*<div*/}
            {/*  className="row-tab-detail__td"*/}
            {/*  title={data?.partner_name}*/}
            {/*  style={{*/}
            {/*    overflow: 'hidden',*/}
            {/*    whiteSpace: 'nowrap',*/}
            {/*    textOverflow: 'ellipsis',*/}
            {/*    color: '#00081D',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {data?.partner_name || '---'}*/}
            {/*</div>*/}
            <div className="row-tab-detail__td">
              <span style={{cursor: 'pointer'}}>
                {fDateTimeSuffix(data?.ship_created || '---')}
              </span>
            </div>
            <div className="row-tab-detail__td">
              {fDateTimeSuffix(data?.ship_delivered || '---')}
            </div>
            <div className="row-tab-detail__td">
              {data.cod ? formatMoney(data.cod) : formatMoney(0)}
            </div>
            <div className="row-tab-detail__td">
              {data.ship_fee ? formatMoney(data.ship_fee) : formatMoney(0)}
            </div>
            <div className="row-tab-detail__td">
              {data.cod_partsign
                ? formatMoney(data.cod_partsign)
                : formatMoney(0)}
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </StyledRowTabDetail>
  )
}

const StyledRowTabDetail = styled.div`
  .row-tab-detail {
    &__content {
      position: relative;

      margin-bottom: 24px;

      display: flex;
    }

    &__info-table {
      margin-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__table {
      margin-bottom: 12px;

      overflow: hidden;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      .row-tab-detail__tr {
        background: #f7f9fd;
      }
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
        width: 233px;
      }
      &:nth-child(2) {
        width: 233px;
      }
      &:nth-child(3) {
        width: 233px;
      }
      &:nth-child(4) {
        width: 233px;

        text-align: right;
      }
      &:nth-child(5) {
        width: 233px;

        text-align: right;
      }
      &:nth-child(6) {
        width: 233px;
        text-align: right;
      }
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      &:nth-child(1) {
        width: 233px;

        // color: ${THEME_SEMANTICS.delivering};
      }
      &:nth-child(2) {
        width: 233px;
      }
      &:nth-child(3) {
        width: 233px;
      }
      &:nth-child(4) {
        width: 233px;

        text-align: right;
      }
      &:nth-child(5) {
        width: 233px;

        text-align: right;
      }
      &:nth-child(6) {
        width: 233px;

        text-align: right;
      }
    }

    &__result {
      margin: 0.75rem 0 1.5rem;
    }

    &__result-item {
      margin-bottom: 8px;

      display: flex;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__result-label {
      padding: 0 12px;

      flex: 1;

      text-align: right;
    }

    &__result-value {
      width: 13%;
      padding: 0 12px;

      text-align: right;
    }

    &__note {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;

      margin-top: 2.25rem;
      span {
        font-weight: 600;
      }
    }

    &__link-hover {
      color: #1a94ff;
      &:hover {
        color: #1373db;
      }
    }
  }
`
