import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { useContext } from 'react'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { div, Td } from '../../../../../../../layouts/tableLayout/_td'
import { fNumber } from '../../../../../../../util/formatNumber'
import styled from 'styled-components'
import { ShippingDifferenceContext } from '../../provider/_context'
import { useTranslation } from 'react-i18next'

export const ShippingDifferenceFooter = ({ ...props }) => {
  const {t} = useTranslation()
  const { pageState } = useContext(ShippingDifferenceContext)
  const panels = pageState.panels
  let orderDetail = panels?.arr_status
  let preOrderDetail = orderDetail?.length > 0 ? orderDetail.slice(0, 6) : []
  const displayList = pageState.table.display.list
  const viewType = pageState.view
  return (
    <StyledFooter>
      {
        viewType.value == 1
          ?
          <Tr {...props} type="tHead"
              className={'shipping-fee-management-table-footer__overview'}
              style={{
                borderLeft: '1px solid #e2eaf8',
                borderRight: '1px solid #e2eaf8',
                overflow: 'hidden',
                height: '58px',
                width: '100%',
                display: displayList.length > 0 ? '' : 'none'
              }}>
            <div className="shipping-fee-management-table-footer__cell" style={{ borderRight: 'none!important' }}>
              <Text as={'p'} fontWeight={600}>{t('totals')}</Text>
              <Text as={'p'} fontSize={13}>({t('report__shipping_cost_difference_avg')}: {formatMoney(((+panels?.total_ship_fee_custom - +panels?.total_ship_fee)) / panels?.total_orders || 0)})</Text>
            </div>
            <Td className="shipping-fee-management-table-footer__cell shipping-fee-management-table__overview-cell"
                data-type="td">
              <Text as={'p'} fontSize={14}>{formatMoney(panels?.total_ship_fee_custom || 0)}</Text>
            </Td>
            <Td className="shipping-fee-management-table-footer__cell shipping-fee-management-table__overview-cell"
                data-type="td">
              <Text as={'p'}>{formatMoney(panels?.total_ship_fee || 0)}</Text>
            </Td>
            <Td className="shipping-fee-management-table-footer__cell shipping-fee-management-table__overview-cell"
                data-type="td">
              <Text as={'p'}
                    fontWeight={600}>{formatMoney((+panels?.total_ship_fee_custom - +panels?.total_ship_fee) || 0)}</Text>
            </Td>
          </Tr>
          :
          <Tr {...props} type="tHead"
              className={'report-table__employee-row'}
              style={{
                borderLeft: '1px solid #e2eaf8',
                borderRight: '1px solid #e2eaf8',
                overflow: 'hidden',
                height: '58px',
                width: '1604px'
              }}>
            <div className="shipping-fee-management-table-footer__cell" style={{ borderRight: 'none!important' }}>
              <Text as={'p'} fontWeight={600}>{t('totals')}</Text>
              <Text as={'p'} fontSize={13}>({t('report__shipping_cost_difference_avg')}: {formatMoney(((+panels?.total_ship_fee_custom - +panels?.total_ship_fee)) / panels?.total_orders || 0)})</Text>
            </div>
            {preOrderDetail.map(order => (
              <div className="shipping-fee-management-table-footer__cell" data-type="td" style={{display: 'block'}}>
                <Text as={'p'}>{formatMoney(+order?.total_ship_fee_custom - +order?.total_ship_fee)}</Text>
                <Text as={'p'} fontSize={13} color={'#7C88A6'}>{fNumber(order?.total_orders)} {t('orders')}</Text>
              </div>
            ))}
            <div className="shipping-fee-management-table-footer__cell" data-type="td">
              <Text as={'p'}
                    fontWeight={600}>{formatMoney((+panels?.total_ship_fee_custom - +panels?.total_ship_fee) || 0)}</Text>
            </div>
          </Tr>
      }
    </StyledFooter>
  )
}

const StyledFooter = styled.div`

  .shipping-fee-management-table__overview-cell{
    width: 23%!important;
    &:nth-child(4) {
      border-right: none;
    }
  }
.shipping-fee-management-table-footer {

  &__cell {
    padding: 8px 16px;
    padding-right: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    
    min-height: auto;
    &[data-menu="true"] {
      position: relative;
    }

    &[data-type="td"] {
      text-align: right;
      padding-right: 24px;
      p{
        width: 100%!important;
      }
      &:nth-child(2) {
        text-align: right;
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
      display: block;
      flex: 1;
    }

    &:nth-child(2) {
      width: 10%;
    }

    &:nth-child(3) {
      width: 10%;
    }

    &:nth-child(4) {
      width: 10%;
      text-align: right;
    }

    &:nth-child(5) {
      width: 10%;
      text-align: right;
    }

    &:nth-child(6) {
      width: 10%;
      text-align: right;
    }

    &:nth-child(7) {
      width: 10%;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:nth-child(8) {
      width: 12%;
      display: flex;
      align-items: center;
    }
  }

}

`