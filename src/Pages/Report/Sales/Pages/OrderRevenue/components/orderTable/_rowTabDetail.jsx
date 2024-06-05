import styled from 'styled-components'
import { formatMoney } from 'util/functionUtil'
import { Td } from '../../../../../../../layouts/tableLayout/_td'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import React from 'react'

export const RowTabDetail = ({ data, ...props }) => {
  return (
    <StyledRowTabDetail {...props}>
      {Array.isArray(data?.order_details) && data.order_details.length > 0 && (
        <div className="row-tab-detail__table">
          <div className="row-tab-detail__tbody" style={{ background: '#ffffff!important' }}>
            {data.order_details.map(item => (
              <div key={item.product_id} className="order-revenue-detail-table__row">
                <Td
                  className="order-revenue-detail-table__cell" data-type="td"
                >
                  <Text as={'p'} fontWeight={600}>
                    <Tooltip baseOn={'height'} className={'order-revenue-detail-table__tooltipV2'}
                             title={item?.product_name_version}>
                      {item?.product_name_version}
                    </Tooltip>
                  </Text>
                  <Text as={'p'} fontWeight={400} fontSize={13} color={'#7C88A6'}>
                    <Tooltip baseOn={'height'} className={'order-revenue-detail-table__tooltipV2'}
                             title={`SKU: ${item?.sku}`}>
                      SKU:&nbsp;{item?.sku}
                    </Tooltip>
                  </Text>
                </Td>

                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(item?.cost_price)}
                </Td>

                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(item?.price)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {!!item?.quantity
                    ? item.quantity
                    : '---'}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(item?.discount_product)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(+item?.price * +item.quantity - +item?.discount_product)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(+item?.cost_price * +item.quantity)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  ---
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(+item?.order_discount || 0)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(+item?.price * +item.quantity - +item?.discount_product - +item?.order_discount)}
                </Td>
                <Td className="order-revenue-detail-table__cell" data-type="td">
                  {formatMoney(+item?.price * +item.quantity - +item?.discount_product - +item?.order_discount - +item?.cost_price * +item.quantity)}
                </Td>
              </div>
            ))}
          </div>
        </div>
      )}
    </StyledRowTabDetail>
  )
}

const StyledRowTabDetail = styled.div`
.tr__container{
    background: #fff!important;
  }
.order-revenue-detail-table {
  &__row{
    display: flex;
    align-items: center;
    border-top: 1px solid #e2eaf8;
    border-bottom: 1px solid transparent;
  }
  &__cell {
    &[data-menu="true"] {
      position: relative;
    }

    &[data-type="td"] {
      justify-content: flex-end;
      &:nth-child(1) {
        display: block!important;
        text-align: left;
      }
    }

    &[data-type="th"] {
      padding: 0;

      &[data-selected="true"] {
        display: flex;
        flex: 1;
        align-items: center;
      }
    }

    &:nth-child(1) {
      width: 10%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &:nth-child(2) {
      width: 9%;
      display: flex;
      justify-content: flex-end;
    }

    &:nth-child(3) {
      width: 9%;
      text-align: right;
      justify-content: flex-end;
    }

    &:nth-child(4) {
      width: 6%;
      text-align: right;
      justify-content: flex-end;
    }

    &:nth-child(5) {
      width: 8%;
      text-align: right;
      justify-content: flex-end;
    }

    &:nth-child(6) {
      width: 9%;
      text-align: right;
      justify-content: flex-end;
    }

    &:nth-child(7) {
      width: 9%;
      text-align: right;
      justify-content: flex-end;
    }


    &:nth-child(8) {
      width: 9%;
      text-align: right;
      justify-content: flex-end;
    }


    &:nth-child(9) {
      width: 12%;
      text-align: right;
      justify-content: flex-end;
    }


    &:nth-child(10) {
      width: 11%;
      text-align: right;
      justify-content: flex-end;
    }

    &:nth-child(11) {
      width: 10%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 600;
      flex: 1;
      padding-right: 32px;
    }
  }

  &__tooltipV2 {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
}
`
