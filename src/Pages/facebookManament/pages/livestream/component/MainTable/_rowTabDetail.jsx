import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {
  ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST,
  ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST,
} from 'Pages/refactorOrder/interfaces/_constants'
import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from 'util/functionUtil'
import {useNavigate} from "react-router-dom";

export const RowTabDetail = ({data, rowData, ...props}) => {
  const {row, cell} = rowData
  const navigate = useNavigate()

  const [exportUrl, setExportUrl] = useState('#')

  const exportLink = useRef()

  const figureValueList = [
    {
      href: !!data?.sender_name
        ? `/setting/consignment?search=${data.sender_name}`
        : '#',
      value: data?.sender_name || '---',
    },
    {
      href: !!rowData?.row?.data?.customer_mobile
        ? `/partner-management/customer?keyword=${rowData.row.data.customer_mobile}`
        : '#',
      value: data?.customer_name || '---',
    },
    {
      replaceName: data?.order_code_of_shop
        ? 'Mã đơn hàng riêng:'
        : 'Ghi chú đơn hàng:',
      value: data?.order_code_of_shop || data?.order_note,
    },
    {value: data?.creator || '---'},
    {value: data?.customer_address || '---'},
    {value: !!data?.order_code_of_shop ? data?.order_note : null},
  ]

  const figureList = ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_FIGURE_LIST.map(
    (item, i) => ({...item, ...figureValueList[i]}),
  )

  const handleExportClick = () => {
    const exportURLData = row.onExportOrderExcel()
    exportURLData.then(res => {
      if (res && res !== '#') setExportUrl(res)
    })
  }

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return (
    <StyledRowTabDetail {...props}>
      <div className="row-tab-detail__content">
        {ORDER_TABLE_ROW_EXTRA_TAB_DETAIL_HEADING_LIST.map((item, i) => (
          <div
            key={i}
            className="row-tab-detail__content-group"
            // style={
            //   i === 2 && !data?.order_code_of_shop && !data?.order_note
            //     ? {opacity: 0, pointerEvents: 'none'}
            //     : undefined
            // }
          >
            <Text as="h4" fontSize={15} lineHeight={22}>
              {item}
            </Text>
          </div>
        ))}
        {figureList.map(item => (
          <div
            key={item.id}
            className="row-tab-detail__content-group"
            // style={
            //   !!!item?.value ? {opacity: 0, pointerEvents: 'none'} : undefined
            // }
          >
            <Text as="p" color="#7C88A6">
              {item?.replaceName || item.label}
            </Text>
            <Text
              as={item?.href ? 'a' : undefined}
              href={item?.href}
              target="_blank"
              color={item.color}
            >
              {item?.value?item?.value:'---'}
            </Text>
          </div>
        ))}
        <div style={{position: 'absolute', top: 0, right: 0}}>
          {((['1', '8'].includes(data?.shipping_status_id) && ['1'].includes(data?.partner_ship)) || (['21'].includes(data?.shipping_status_id))) && (
            // <Tooltip placement="bottom" title="Tính năng đang phát triển">
              <Button style={{width:'52px',padding: "0px 12px"}} appearance="secondary" size="sm" onClick={() => navigate(`/order/edit/${data.id}`)}>
                Sửa
              </Button>
            // </Tooltip>
          )}
          <Button
            appearance="primary"
            size="sm"
            style={{marginLeft: 8,width:'94px',padding: "0px 12px"}}
            onClick={handleExportClick}
          >
            <Text
              color={'#FFFFFF'}
            >Xuất Excel</Text>

          </Button>
          <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
        </div>
      </div>
      <div className="row-tab-detail__info-table">
        <div>
          <Text as="b" fontSize={15} lineHeight={22}>
            Thông tin sản phẩm{' '}
          </Text>
          {cell.codeOrder.haveInventory && (
            <Text>
              (Tổng số lượng:{' '}
              {Array.isArray(data?.order_details)
                ? data.order_details.length
                : '0'}
              )
            </Text>
          )}
        </div>
        {cell.codeOrder.haveInventory && (
          <div>
            <Text>Kho xuất hàng: </Text>
            <Text as="b" lineHeight={22}>
              {data?.warehouse_name || '---'}
            </Text>
          </div>
        )}
      </div>
      {!cell.codeOrder.haveInventory && (
        <div className="row-tab-detail__inventory">
          {data?.details || '---'}
        </div>
      )}
      {Array.isArray(data?.order_details) && data.order_details.length > 0 && (
        <div className="row-tab-detail__table">
          <div className="row-tab-detail__thead">
            <div className="row-tab-detail__tr">
              <div className="row-tab-detail__th">Mã sản phẩm/SKU</div>
              <div className="row-tab-detail__th">Tên sản phẩm</div>
              <div className="row-tab-detail__th">Đơn vị</div>
              <div className="row-tab-detail__th">Số lượng</div>
              <div className="row-tab-detail__th">Đơn giá</div>
              <div className="row-tab-detail__th">Giảm giá</div>
              <div className="row-tab-detail__th">Số tiền</div>
            </div>
          </div>
          <div className="row-tab-detail__tbody">
            {data.order_details.map(item => (
              <div key={item.product_id} className="row-tab-detail__tr">
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
                  {item?.quantity
                    ? Number(item.quantity) < 10
                      ? `0${item.quantity}`
                      : item.quantity
                    : '---'}
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
      <div className="row-tab-detail__result">
        {cell.codeOrder.haveInventory && (
          <>
            <div className="row-tab-detail__result-item">
              <div className="row-tab-detail__result-label">
                <b>Giảm giá theo đơn hàng</b>
              </div>
              <div className="row-tab-detail__result-value">
                {formatMoney(data?.order_discount)}
              </div>
            </div>
            <div className="row-tab-detail__result-item">
              <div className="row-tab-detail__result-label">
                <b>Tổng giảm giá</b>
              </div>
              <div className="row-tab-detail__result-value">
                {formatMoney(data?.total_discount)}
              </div>
            </div>
          </>
        )}
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

      margin-bottom: 12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__content-group {
      width: calc(100% / 3 - 12px);
      margin-bottom: 12px;
      margin-right: 12px;
    }

    &__info-table {
      margin-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__inventory {
      min-height: 40px;
      margin-bottom: 12px;
      padding: 10px 0;

      display: flex;
      align-items: center;

      border-bottom: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
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
      font-size: 13px;
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
      font-size: 13px;
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

    &__result-item {
      margin-bottom: 8px;

      display: flex;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
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
  }
`
