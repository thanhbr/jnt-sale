import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Button} from 'common/button'
import styled from 'styled-components'
import useRow from 'Pages/purchases/hooks/useRow'
import {Tooltip} from 'common/tooltipv2'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {formatMoney} from 'util/functionUtil'
import {useState} from 'react'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {PURCHASES_ICONS} from 'Pages/purchases/interfaces/_icons'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {STATUS_WAREHOUSE} from 'Pages/purchases/interfaces/_constants'

export const RowTabReturn = ({data, ...props}) => {
  const {row, detail} = useRow(data)
  const nav = useNavigate()
  const {purchaseId} = useParams()

  return (
    <StyledRowTabReturn {...props}>
      {Array.isArray(data?.purchase_return) && (
        <div className="row-tab-return__list">
          <div className="row-tab-return__header">
            <Text
              as="h4"
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12, display: 'flex', alignItems: 'center'}}
            >
              Lịch sử hoàn trả
            </Text>
            <div className="row-tab-return__btn">
              <Button
                appearance="secondary"
                style={{minWidth: 120, marginRight: 8}}
                icon={PURCHASES_ICONS.repeat}
                onClick={() => {
                  row.refreshOrderDetails(true)
                }}
                className="btn-green"
              >
                Làm mới dữ liệu
              </Button>
              {data?.warehouse_status !=
                STATUS_WAREHOUSE.hoan_tra_toan_bo.status && (
                <Button
                  appearance="primary"
                  style={{minHeight: 36}}
                  className="btn-green"
                  onClick={() => nav(`/purchase/refund/${data.id}`)}
                >
                  Hoàn trả
                </Button>
              )}
            </div>
          </div>
          {!data?.purchase_return.length && (
            <div
              className="row-tab-return__journey"
              style={{opacity: detail.isLoading ? 0.5 : 1}}
            >
              <div className="row-tab-return__journey-no-data">
                <img
                  src={'/img/purchases/Empty state return.png'}
                  alt="Empty state"
                />
                <p>Chưa phát sinh giao dịch hoàn trả hàng nhập</p>
              </div>
            </div>
          )}
          <div style={{opacity: detail.isLoading ? 0.5 : 1}}>
            {data.purchase_return.map((item, i, arr) => (
              <div style={{marginTop: 24}}>
                <Collapser key={item.id} data={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </StyledRowTabReturn>
  )
}

const Collapser = ({data}) => {
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const returnStatus = [
    {id: 0, text: 'Hoàn trả tiền', color: '#FC820A', background: '#FFF5EB'},
    {id: 1, text: 'Hoàn trả hàng hóa', color: '#1A94FF', background: '#EBF5FF'},
    {
      id: 2,
      text: 'Hoàn trả hàng hóa và tiền',
      color: '#FF424E',
      background: '#FFEBEC',
    },
  ]

  // payment_status: 1: Chưa thanh toán; 2: Thanh toán 1 phần; 3: Đã thanh toán; 4: Hoàn 1 phần tiền; 5: Hoàn toàn bộ tiền
  // warehouse_status: 1: Chưa nhập kho; 2: Đã nhập kho; 3: Hoàn trả 1 phần hàng; 4: Hoàn trả toàn bộ hàng
  let status = -1
  if (
    data.arr_product_return?.length <= 0 &&
    Number(data.return_total_amount || '') > 0
  )
    status = 0 //'Hoàn trả tiền'
  if (
    data.arr_product_return?.length > 0 &&
    Number(data.return_total_amount || '') <= 0
  )
    status = 1 //'Hoàn trả hàng hóa'
  if (
    data.arr_product_return?.length > 0 &&
    Number(data.return_total_amount || '') > 0
  )
    status = 2 //'Hoàn trả hàng hóa và tiền'

  return (
    <div className="row-tab-return__list-item">
      <div
        className="row-tab-return__list-item-toggle"
        data-active={shouldCollapse}
        onClick={() => setShouldCollapse(!shouldCollapse)}
      >
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
        >
          Xác nhận
        </Text>
        <Text
          color={returnStatus[status]?.color || THEME_COLORS.secondary_100}
          style={{
            background: returnStatus[status]?.background || 'transparent',
            padding: '3px 12px',
            marginLeft: '8px',
            borderRadius: '4px',
          }}
          fontSize={12}
          fontWeight={500}
          lineHeight={18}
        >
          {returnStatus[status]?.text}
        </Text>
        {PURCHASES_ICONS.chevronLeft}
      </div>
      <div
        className="row-tab-return__list-item-content"
        data-active={shouldCollapse}
      >
        <div className="row-tab-return__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Thời gian thực hiện hoàn trả:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatDatetime(data?.dt_created) || '---'}
          </Text>
        </div>
        <div className="row-tab-return__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Nhân viên xác nhận:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.fullname || '---'}
          </Text>
        </div>
        <div className="row-tab-return__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Phương thức thanh toán:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.payment_method_name || '---'}
          </Text>
        </div>
        <div className="row-tab-return__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Số tiền nhận hoàn trả từ NCC:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatMoney(data?.return_total_amount)}
          </Text>
        </div>
        <div style={{ width: '100%' }}>
          {data.arr_product_return.length > 0 && (
            <>
              <div className="row-tab-return__table">
                <div className="row-tab-return__thead">
                  <div className="row-tab-return__tr">
                    <div className="row-tab-return__th">Mã sản phẩm/SKU</div>
                    <div className="row-tab-return__th">Tên sản phẩm</div>
                    <div className="row-tab-return__th">Số lượng hoàn trả</div>
                    <div className="row-tab-return__th">Giá nhập</div>
                    <div className="row-tab-return__th">Số tiền</div>
                  </div>
                </div>
                <div className="row-tab-return__tbody">
                  {data.arr_product_return.map(data => (
                    <div key={data.id} className="row-tab-return__tr">
                      <div className="row-tab-return__td">
                        <Tooltip
                          className="tooltipv2"
                          title={data?.sku}
                          baseOn="width"
                        >
                          {data?.sku || '---'}
                        </Tooltip>
                      </div>
                      <div className="row-tab-return__td">
                        <Tooltip
                          className="tooltipv2"
                          title={data?.product_name}
                          baseOn="width"
                        >
                          <Link
                            to={`/products?search=${data?.sku}`}
                            target="_blank"
                          >
                            <Text
                              color={THEME_COLORS.blue}
                              style={{cursor: 'pointer'}}
                            >
                              {data?.product_name || '---'}
                            </Text>
                          </Link>
                        </Tooltip>
                      </div>
                      <div className="row-tab-return__td">
                        <Tooltip
                          className="tooltipv2"
                          title={data?.quantity_return}
                          baseOn="width"
                        >
                          {data?.quantity_return
                            ? Number(data.quantity_return) < 10
                              ? `0${data.quantity_return}`
                              : data.quantity_return
                            : '---'}
                        </Tooltip>
                      </div>
                      <div className="row-tab-return__td">
                        {formatMoney(data?.price || 0)}
                      </div>
                      <div className="row-tab-return__td">
                        {formatMoney(data?.total_amount || 0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{display: 'block', marginTop: '14px'}}>
          <Text
            fontWeight={600}
            style={{marginRight: '6px', marginTop: '14px'}}
          >
            Lý do hoàn trả:
          </Text>
          <Text fontWeight={400} style={{marginTop: '14px'}}>
            {data?.reason_return || '---'}
          </Text>
        </div>
      </div>
    </div>
  )
}

const StyledRowTabReturn = styled.div`
  position: relative;

  .row-tab-return {
    &__list {
      position: relative;
      z-index: 0;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: unset;
    }

    .btn-green {
      background: #1e9a98;
      border-radius: 6px;
    }

    &__item {
      position: relative;
      z-index: 2;

      margin-bottom: 30px;

      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__last-child {
      &::before {
        display: none;
      }
    }

    &__bullet {
      width: 26px;
      height: 26px;
      margin-right: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        position: absolute;
        top: 40px;
        left: 12px;
        z-index: 1;

        width: 2px;
        // height: calc(100% - 46px);
        height: 41px;

        background: #f4f7fc;

        content: '';
      }

      &[data-active='true'] {
        &::before {
          background: #1e9a98;
          // border: 2px solid #d8fce7;
        }
      }

      background: linear-gradient(
          0deg,
          rgba(244, 247, 252, 0.98),
          rgba(244, 247, 252, 0.98)
        ),
        #00081d;
      border: 2px solid #fffeee;
      border-radius: 50%;

      &[data-active='true'] {
        background: #1e9a98;
        border: 2px solid #d8fce7;
      }

      & > div {
        width: 6px;
        height: 6px;

        background: #fff;
        border-radius: 50%;
      }
    }

    &__status {
      display: flex;
      p {
        font-weight: 600;
        margin-left: 0.2rem;
      }
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__journey {
    }

    &__journey-no-data {
      display: grid;
      justify-content: center;

      img {
        margin: auto;
      }

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        color: #7c88a6;
      }
    }
    &__list-item {
      margin-bottom: 12px;
      padding: 12px 24px;

      border-left: 3px solid ${THEME_SEMANTICS.delivered};

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__list-item-toggle {
      display: flex;
      align-items: center;

      cursor: pointer;

      &[data-active='true'] {
        svg {
          transform: rotate(0deg);
        }
      }

      svg {
        margin-left: 8px;

        transform: rotate(180deg);
        transition: transform 0.6s;
      }
    }

    &__list-item-content {
      max-height: 0;

      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      transition: max-height 0.5s;

      &[data-active='true'] {
        max-height: 75vh;
      }
    }

    &__list-item-figure {
      width: 250px;
      margin-top: 8px;
    }

    &__table {
      width: 100%;
      margin-top: 12px;

      overflow: hidden;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      .row-tab-return__tr {
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
        width: 15%;
      }
      &:nth-child(2) {
        width: 50%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
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
        width: 15%;
      }
      &:nth-child(2) {
        width: 50%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;

        text-align: right;
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
    }
  }
`
