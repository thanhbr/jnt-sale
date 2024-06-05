import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltipv2'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {fDateTimeCustom} from 'util/formatTime'

export const RowTabDetailWarehouseTransfer = ({
  data,
  onActionCancelDelivery,
  setOpenEditCODModal,
  status,
  ...props
}) => {
  const currData = data || []
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
            Thông tin kho
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
                Kho xuất hàng:
              </Text>
              <Text
                color={THEME_SEMANTICS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{
                  marginBottom: 12,
                  display: 'block',
                }}
              >
                {currData[0]?.warehouse_import || '---'}
              </Text>
              <Text
                color="#7C88A6"
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                style={{display: 'block'}}
              >
                Kho nhập hàng:
              </Text>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
              >
                {currData[0]?.warehouse_export || '---'}
              </Text>
            </div>
          </div>
        </div>
        <div style={{width: '60%'}}>
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
            <div style={{display: 'flex', width: '54%'}}>
              <div style={{marginRight: 50}}>
                <Text
                  color="#7C88A6"
                  fontSize={14}
                  fontWeight={400}
                  lineHeight={20}
                  style={{display: 'block'}}
                >
                  Ngày chuyển kho:
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
                  {fDateTimeCustom(currData[0]?.date_time)}
                </Text>
                <Text
                  color="#7C88A6"
                  fontSize={14}
                  fontWeight={400}
                  lineHeight={20}
                  style={{display: 'block'}}
                >
                  Nhân viên thực hiện:
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
                  {currData[0]?.fullname || '--'}
                </Text>
              </div>
            </div>
            <div style={{display: 'flex', width: '522px'}}>
              <div style={{marginRight: 50}}>
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
                  style={{textTransform: 'capitalize'}}
                >
                  {currData[0].note || '---'}
                </Text>
              </div>
            </div>
          </div>
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
            Thông tin sản phẩm {''}
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            lineHeight={20}
          >
            (Tổng số lượng chuyển kho: {currData.reduce((prev, curr) => prev + Number(curr.quantity), 0) || '0'})
          </Text>
        </div>
      </div>
      {/* {Array.isArray(data[0]?.delivery_details) &&
        data.delivery_details.length > 0 && ( */}
      <div className="row-tab-detail__table">
        <div className="row-tab-detail__thead">
          <div className="row-tab-detail__tr">
            <div className="row-tab-detail__th">Mã sản phẩm/SKU</div>
            <div className="row-tab-detail__th">Tên sản phẩm</div>
            <div className="row-tab-detail__th">Đơn vị</div>
            <div className="row-tab-detail__th">Số lượng chuyển kho</div>
          </div>
        </div>
        <div className="row-tab-detail__tbody">
          {currData.map(data => (
            <div key={data.id} className="row-tab-detail__tr">
              <div
                className="row-tab-detail__td"
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip
                  className="row-tab-detail__tooltipV2"
                  title={data?.sku}
                  baseOn="width"
                >
                  {data?.sku}
                </Tooltip>
              </div>

              <div className="row-tab-detail__td">
                <Tooltip
                  className="row-tab-detail__tooltipV2-name-pd"
                  title={data?.product_name_version}
                  baseOn="width"
                >
                  <Link
                    to={`/products?search=${data?.sku}`}
                    target="_blank"
                    className="row-tab-detail__link-hover"
                  >
                    {data?.product_name_version || '---'}
                  </Link>
                </Tooltip>
              </div>
              <div className="row-tab-detail__td">
                <Tooltip
                  className="row-tab-detail__tooltipV2-name-pd"
                  title={data?.unit_name}
                  baseOn="width"
                >
                  {data?.unit_name || '---'}
                </Tooltip>
              </div>
              <div className="row-tab-detail__td">
                {data?.quantity || '---'}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* )} */}
    </StyledRowTabDetail>
  )
}

const StyledRowTabDetail = styled.div`
  cursor: initial;
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
        flex: 1;
      }
      &:nth-child(3) {
        width: 15%;
        text-align: center;
      }
      &:nth-child(4) {
        width: 12%;
        text-align: center;
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
        width: 15%;
        text-align: center;
      }
      &:nth-child(4) {
        width: 12%;
        text-align: center;
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

    &__result-data {
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

    &__tooltipV2 {
      max-width: 180px;
      padding: 0;
      overflow: hidden;
      position: relative;
      display: inline-block;
      margin: 0 5px 0 5px;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__tooltipV2-name-pd {
      width: 40%;
      padding: 0;
      overflow: hidden;
      position: relative;
      display: inline-block;
      margin: 0 5px 0 5px;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__link-hover {
      color: #1a94ff;

      &:hover {
        color: #1373db;
      }
    }
  }
`
