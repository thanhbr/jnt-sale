import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {formatMoney} from '../../../../util/functionUtil'
import { CellStatusOrder } from './_cellStatusCodManagement'
import useRow from '../../hooks/useRow'
import {Tooltip} from 'common/tooltipv2'
import {COD_ICONS} from '../../interfaces/_icons'
import {useTranslation} from "react-i18next";

export const RowTabDetailCOD = ({
  data,
  onActionCancelDelivery,
  ...props
}) => {
  
  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }
  const {row} = useRow(data)
    const { t } = useTranslation()
  return (
    <StyledRowTabDetail {...props}>
      <div className="row-tab-detail__content">
        <div style={{width: '35%'}}>
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
                  {t("order_id")}
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
                  to={`/orders?search=${data.order_id}`}
                  target="_blank"
                  className="row-tab-detail__link-hover"
                >
                  {data?.order_id || '---'}
                </Link>
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                  {t("billcode")}
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
                  to={`/delivery/management?search=${data.billcode}`}
                  target="_blank"
                  className="row-tab-detail__link-hover"
                >
                  {data?.billcode || '---'}
                </Link>
                <Tooltip title={t("copy_billcode_n")} style={{float:'right'}}>
                  <i
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={row.onCopyOrderCode}
                  >
                    {COD_ICONS.copy03_x}
                  </i>
                </Tooltip>
              </Text>
            </div>
          </div>
        </div>
        <div style={{width: '30%'}}>
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
                  {t("cod_name_customer")}:
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
                  {t("Address")}:
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
        <div style={{width: '35%'}}>
          <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12}}
          >
              {t("infor_shipping")}
          </Text>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%'}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                  {t("shipping_company")}:
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
                }}
              >
                {data?.partner_name || '---'}
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                  {t("general_weight")}:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  textTransform: 'inherit',
                  display: 'block',
                }}
              >
                {data?.weight ? data?.weight + ' kg' : '---'}
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                  {t("status")}:
              </Text>
              <CellStatusOrder id={data.shipping_status_id}>
                {data.shipping_status_name}
              </CellStatusOrder>
            </div>
           
          </div>
        </div>
      </div>
      <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12}}
          >
          {t("infor_cod")}
      </Text>
      <div className="row-tab-detail__table">
        <div className="row-tab-detail__thead">
          <div className="row-tab-detail__tr">
            <div className="row-tab-detail__th">{t("order_date_created")}</div>
            <div className="row-tab-detail__th">{t("order_date_sended")}</div>
            <div className="row-tab-detail__th">{t("time_date_pickup")}</div>
            <div className="row-tab-detail__th">{t("cod-number")} (COD)</div>
            <div className="row-tab-detail__th">{t("shipping_fee")}</div>
          </div>
        </div>
        <div className="row-tab-detail__tbody">
            <div className="row-tab-detail__tr">
              <div
                className="row-tab-detail__td"
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                 {props.rowData?.date_created ? cellCodeOrderFormatDateTime(props.rowData?.date_created) : '---'}
               
              </div>
              <div className="row-tab-detail__td">
                <span style={{cursor: 'pointer'}}>
                {data?.dt_created ? cellCodeOrderFormatDateTime(data?.dt_created) : '---'}
                </span>
              </div>
              <div className="row-tab-detail__td">
                {data?.dt_got_products ? cellCodeOrderFormatDateTime(data?.dt_got_products) : '---'}
              </div>
              <div className="row-tab-detail__td">
                {formatMoney(data?.cod)}
              </div>
              <div className="row-tab-detail__td">
                {formatMoney(data?.ship_fee)}
              </div>
            </div>
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

      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(3) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(4) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(5) {
        width: 20%;
        text-align: center;
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
        width: 20%;
      }
      &:nth-child(2) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(3) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(4) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(5) {
        width: 20%;
        text-align: center;
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
