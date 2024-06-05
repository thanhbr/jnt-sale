import { sendRequestAuth } from 'api/api'
import {Button} from 'common/button'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltipv2'
import config from 'config'
import useOrderRow from 'Pages/purchases/hooks/useRow'
import {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {formatMoney} from '../../../../util/functionUtil'

export const RowTabDetailPurchases = ({
  data,
  onActionCancelPurchases,
  status,
  ...props
}) => {
  const navigate = useNavigate()
  const {print} = useOrderRow()
  const exportRef = useRef()

  const handleExportExcel = async () => {
    if (!data?.id) return

    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/export/${data?.id}`,
    )

    if (response?.data?.success) {
      exportRef.current.href = response?.data?.data?.url
      exportRef.current.click()
    }
  }

  return (
    <StyledRowTabDetail {...props}>
      <a ref={exportRef} href='#' style={{display: 'none'}}></a>
      <div className="row-tab-detail__content">
        <div style={{width: '32.5%'}}>
          <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12}}
          >
            Thông tin nhà cung cấp
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
                Nhà cung cấp:
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
                  to={`/partner/suppliers?search=${data?.supplier_code}`}
                  target="_blank"
                  className="row-tab-detail__link-hover"
                >
                  {data?.supplier_name || '---'}
                </Link>
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
              Thông tin khác
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
                Ngày mua hàng:
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
                {formatDatetime(data?.purchase_date) || '---'}
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                Ghi chú:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                }}
              >
                {data?.note || '--'}
              </Text>
            </div>
          </div>
        </div>
        <div style={{position: 'absolute', top: 0, right: 0}}>
          {data?.warehouse_status === '1' && <Button appearance="secondary" size="sm" style={{marginRight: 8}} onClick={() => navigate(`/purchase/edit/${data.id}`)}>
            Sửa
          </Button>}
          <Button appearance="secondary" size="sm" style={{marginRight: 8}} onClick={handleExportExcel}>
            Xuất Excel
          </Button>
          <Button appearance="primary" size="sm" onClick={()=>print.onClick(data.id)}>
            In phiếu nhập hàng
          </Button>
        </div>
      </div>
      <div className="row-tab-detail__info-table">
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
            {Array.isArray(data?.purchase_details)
              ? data.purchase_details.reduce((curr, next) => Number(curr) + Number(next.quantity), 0)
              : '0'}
            )
          </Text>
        </div>
      </div>

      <div className="row-tab-detail__table">
        <div className="row-tab-detail__thead">
          <div className="row-tab-detail__tr">
            <div className="row-tab-detail__th">Mã sản phẩm/SKU</div>
            <div className="row-tab-detail__th">Tên sản phẩm</div>
            <div className="row-tab-detail__th">Đơn vị</div>
            <div className="row-tab-detail__th">Số lượng</div>
            <div className="row-tab-detail__th">Giá nhập</div>
            <div className="row-tab-detail__th">Số tiền</div>
          </div>
        </div>
        <div className="row-tab-detail__tbody">
          {data.purchase_details.map(data => (
            <div key={data.id} className="row-tab-detail__tr">
              <div className="row-tab-detail__td">
                {' '}
                <Tooltip className="tooltipv2" title={data?.sku} baseOn="width">
                  {data?.sku || '---'}
                </Tooltip>
              </div>
              <div className="row-tab-detail__td">
                <Tooltip
                  className="tooltipv2"
                  title={data?.product_name}
                  baseOn="width"
                >
                  <Link to={`/products?search=${data?.sku || ''}`} target={'_blank'}>
                    <Text
                      color={THEME_SEMANTICS.delivering}
                      style={{cursor: 'pointer'}}
                    >
                      {data?.product_name || '---'}
                    </Text>
                  </Link>
                </Tooltip>
              </div>
              <div className="row-tab-detail__td">
                <Tooltip
                  className="tooltipv2"
                  title={data?.unit_name}
                  baseOn="width"
                >
                  <Text>{data?.unit_name || '---'}</Text>
                </Tooltip>
              </div>
              <div className="row-tab-detail__td">
              {data?.quantity
                    ? Number(data.quantity) < 10
                      ? `0${data.quantity}`
                      : data.quantity
                    : '---'}
              </div>
              <div className="row-tab-detail__td">
                {formatMoney(data?.price || 0)}
              </div>
              <div className="row-tab-detail__td">
                {formatMoney(data?.total_amount || 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row-tab-detail__result">
        <div className="row-tab-detail__result-item">
          <div className="row-tab-detail__result-label">
            <Text color="#7C88A6" fontWeight={400}>
              VAT (VNĐ)
            </Text>
          </div>
          <div className="row-tab-detail__result-value">
            <Text fontWeight={400}>{formatMoney(data?.price_vat)}</Text>
          </div>
        </div>
        <div className="row-tab-detail__result-item">
          <div className="row-tab-detail__result-label">
            <b>Tổng tiền</b>
          </div>
          <div className="row-tab-detail__result-value">
            <b>{formatMoney(data?.total_amount)}</b>
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
      align-datas: center;
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
        width: 35%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 15%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 15%;

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
        width: 35%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 7%;
      }
      &:nth-child(5) {
        width: 15%;

        text-align: right;
      }
      &:nth-child(6) {
        width: 15%;

        text-align: right;
      }
      &:nth-child(7) {
        width: 13%;

        text-align: right;
      }
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
      width: 15%;
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
  .tooltipv2 {
    width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
