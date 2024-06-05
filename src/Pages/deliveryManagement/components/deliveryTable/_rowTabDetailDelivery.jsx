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
import {Tooltip} from 'common/tooltipv2'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import {
  DELIVERY_DETAILS_LIST_TIME,
  DELIVERY_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS,
  DELIVERY_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS,
} from 'Pages/deliveryManagement/interfaces/_constants'
import {DELIVERY_ICONS} from 'Pages/deliveryManagement/interfaces/_icons'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {formatMoney} from '../../../../util/functionUtil'
import {useNavigate} from "react-router-dom";
import PopupDownCODDetail from '../popupDownCODDetail'
import { useTranslation } from 'react-i18next'

export const RowTabDetailDelivery = ({
  status,
  data,
  onActionCancelDelivery,
  setOpenEditCODModal,
  ...props
}) => {
  const {t, i18n} = useTranslation()
  const navigate = useNavigate()

  const [showDetailCOD, setShowDetailCOD] = useState(false)
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
            {t('sender_info')}
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
                {t('delivery_point')}:
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
                  to={`/setting/consignment`}
                  target="_blank"
                  className="row-tab-detail__link-hover"
                >
                  {data?.shipping_point_name || '---'}
                </Link>
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t('order_creator')}:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{textTransform: 'capitalize'}}
              >
                {data?.fullname || '---'}
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
              {t('receiver_info')}
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
                {t('customer_name')}:
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
               {t('address')}:
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

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                 {t('area')}:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{textTransform: 'capitalize'}}
              >
                {`${data?.city_name}/${data?.district_name}/${data?.ward_name}`.trim() ||
                  '--'}
              </Text>
            </div>
          </div>
        </div>
        <div style={{position: 'absolute', top: 0, right: 0}}>
        {status == 1 && (
            <Button
              appearance="secondary"
              size="sm"
              style={{marginRight: 8}}
              onClick={() => onActionCancelDelivery(2, data?.order_id)}
            >
              {t('cancel-tranport')}:
            </Button>
          )}
          {((['1', '8'].includes(status) && ['1'].includes(data?.partner_ship)) || (['21'].includes(status))) && (
            // <CustomToolTip placement="top" title="Tính năng đang phát triển">
              <Button appearance="primary" size="sm" onClick={() => navigate(`/order/edit/${data.order_id}`)}>
                {t('edit_order')}:
              </Button>
            // </CustomToolTip>
          )}
        </div>
      </div>
      {/* <div className="row-tab-detail__info-table">
        <div>
          <Text
            as="b"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
          >
            Thông tin vận chuyển
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            lineHeight={20}
          >
            (Tổng số lượng:{' '}
            {Array.isArray(data?.delivery_details)
              ? data.delivery_details.length
              : '0'}
            )
          </Text>
        </div>
      </div> */}
      <div className="row-tab-detail__content">
        <div style={{width: '100%'}}>
          <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12}}
          >
            {t('shipping_info')}
          </Text>
          <div style={{display: 'flex'}}>
            <div style={{width: '32.5%'}}>
              {/*<Text*/}
              {/*  color="#7C88A6"*/}
              {/*  fontSize={14}*/}
              {/*  fontWeight={400}*/}
              {/*  lineHeight={20}*/}
              {/*  style={{display: 'block'}}*/}
              {/*>*/}
              {/*  Đơn vị vận chuyển:*/}
              {/*</Text>*/}
              {/*<Text*/}
              {/*  color={THEME_SEMANTICS.secondary_100}*/}
              {/*  fontSize={14}*/}
              {/*  fontWeight={400}*/}
              {/*  lineHeight={20}*/}
              {/*  style={{*/}
              {/*    marginBottom: 12,*/}
              {/*    display: 'block',*/}
              {/*    textTransform: 'capitalize',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {data?.partner_name || '---'}*/}
              {/*</Text>*/}

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t('cargo_insurance')}:
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
                {formatMoney(data?.insurrance_value)}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                 {t('shipping_fee')}:
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
                {formatMoney(data?.ship_fee)}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'flex', alignItems: 'center'}}
              >
                {t('cod_fee')}:
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '0.3rem',
                  }}
                >
                  <CustomToolTip
                    placement="top-start"
                    title={t('collect_amount')}
                  >
                    {DELIVERY_ICONS.question}
                  </CustomToolTip>
                </span>
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{marginBottom: 12, textTransform: 'inherit', display: 'block'}}
              >
                {formatMoney(data?.cod)} {data.down_cod_status != '0' &&
                <>
                  <span style={{ color: 'red', fontSize: '12px', cursor: 'pointer' }} onClick={() => setShowDetailCOD(true)}>&darr; {t('code_reduced')}
                 
                  </span>
                  {
                    data?.down_cod_information.history && (
                      <span style={{padding: '2px 5px',width: '16px',height: '16px',background: '#FF424F',marginLeft:'6px',fontSize: '10px',borderRadius: '8px',color: '#FFFFFF'}}>{data?.down_cod_information.history.length}</span>
                    )
                  }
                  {showDetailCOD && <PopupDownCODDetail handleClose={() => setShowDetailCOD(false)} codDetail={data?.down_cod_information}  dataDetail={data}/>}
                </>
                }
              </Text>
            </div>
            <div style={{width: '32.5%'}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t('num_of_packages')}:
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
                {data?.number_pack || '---'}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
              {t('weight')}:
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
                {t('partial_delivery')}:
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
                {data.partsign === '1'
                  ? 'Có'
                  : data.partsign === '0'
                  ? 'Không'
                  : ''}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                 {t('cod_delivery')}:
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
                {formatMoney(data?.cod_delivered)}
              </Text>
            </div>
            <div style={{marginRight: 50}}>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                 {t('pickup_request')}:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                  textTransform: 'inherit',
                }}
              >
                {data?.request_goods
                  ? DELIVERY_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS
                      .requestGoods[`_${data.request_goods}`]
                  : '---'}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t('delivery_request')}:
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
                {data?.recipient_view
                  ? DELIVERY_MANAGER_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS
                      .recipientView[`_${data.recipient_view}`]
                  : '---'}
              </Text>

              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                {t('fee_payer')}:
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
                {data?.payment_method
                  ? DELIVERY_MANAGER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS[
                      data.payment_method
                    ]
                  : '---'}
              </Text>
            </div>
          </div>
        </div>
      </div>
      {Array.isArray(data?.delivery_details) &&
        data.delivery_details.length > 0 && (
          <div className="row-tab-detail__table">
            <div className="row-tab-detail__thead">
              <div className="row-tab-detail__tr">
                <div className="row-tab-detail__th">{t('product_sku')}</div>
                <div className="row-tab-detail__th">{t('product_name')}</div>
                <div className="row-tab-detail__th">{t('unit')}</div>
                <div className="row-tab-detail__th">{t('unit')}</div>
                <div className="row-tab-detail__th">{t('price')}</div>
                <div className="row-tab-detail__th">{t('discount')}</div>
                <div className="row-tab-detail__th">{t('money')}</div>
              </div>
            </div>
            <div className="row-tab-detail__tbody">
              {data.delivery_details.map(item => (
                <div key={item.id} className="row-tab-detail__tr">
                  <div
                    className="row-tab-detail__td"
                    title={item?.product_model}
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item?.product_model || '---'}
                  </div>
                  <div className="row-tab-detail__td">
                    <span style={{cursor: 'pointer'}}>
                      {item?.product_name || '---'}
                    </span>
                  </div>
                  <div className="row-tab-detail__td">
                    {item?.unit_name || '---'}
                  </div>
                  <div className="row-tab-detail__td">
                    {item?.quantity || '---'}
                  </div>
                  <div className="row-tab-detail__td">
                    {formatMoney(item?.price)}
                  </div>
                  <div className="row-tab-detail__td">
                    {formatMoney(item?.discount)}
                  </div>
                  <div className="row-tab-detail__td">
                    {formatMoney(
                      Number(item?.price || 0) * Number(item?.quantity || 0) -
                        Number(item?.discount || 0),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <div className="row-tab-detail__note">
        <span>{t('note')}: </span> {data.note}
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
        width: 13%;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        width: 7%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(7) {
        width: 13%;

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
        width: 13%;
      }
      &:nth-child(2) {
        flex: 1;

        color: ${THEME_SEMANTICS.delivering};
      }
      &:nth-child(3) {
        width: 7%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 13%;

        text-align: right;
      }
      &:nth-child(7) {
        width: 13%;

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
      color: #1A94FF;
      &:hover {
        color: #1373db;
      }
    }
  }
`
