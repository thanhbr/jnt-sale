import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { useContext } from 'react'
import { EmployeeContext } from '../../provider/_context'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { div } from '../../../../../../../layouts/tableLayout/_td'
import { fNumber } from '../../../../../../../util/formatNumber'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const EmployeeFooter = ({ ...props }) => {

  const { pageState } = useContext(EmployeeContext)
  const panels = pageState.panels
  const {t} = useTranslation()

  let orderDetail = panels?.arr_status
  let preOrderDetail = orderDetail?.length > 0 ? orderDetail.slice(0, 6) : []
  let postOrderDetail = orderDetail?.length > 5 ? orderDetail.slice(6, 8) : []

  return (
    <StyledFooter>
      <Tr {...props} type="tHead"
          className={'report-table__employee-row'}
          style={{
            borderLeft: '1px solid #e2eaf8',
            borderRight: '1px solid #e2eaf8',
            overflow: 'hidden',
            height: '58px',
            width: '1604px'
          }}>
        <div className="employee-management-table-footer__cell" style={{ borderRight: 'none!important' }}>
          <Text as={'p'} fontWeight={600} style={{textTransform: 'uppercase'}}>{t('total')}</Text>
          <Text as={'p'}>({t('average_order_value')}: {formatMoney(panels?.totals?.total_avg)})</Text>
        </div>
        {preOrderDetail.map(order => (
          <div className="employee-management-table-footer__cell" data-type="td">
            <Text as={'p'}>{formatMoney(!!order?.total_cod ? order?.total_cod : 0)}</Text>
            <Text as={'p'} fontSize={13}>{fNumber(order?.total_order)} {t('orders')}</Text>
          </div>
        ))}
        <div className="employee-management-table-footer__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>{formatMoney(panels?.totals?.total_cod || 0)}</Text>
          <Text as={'p'} fontSize={13} fontWeight={600}>{panels?.totals?.total_order || 0} <Text
            fontSize={13}>{t('orders')}</Text> &nbsp;
            <Text
              color={panels?.totals?.total_rate >= 80 ? '#00AB56' : panels?.totals?.total_rate >= 50 ? '#FF9F41' : '#FF424E'}
              fontWeight={600}
              fontSize={11}>({fNumber(panels?.totals?.total_rate)}%)</Text>
          </Text>
        </div>
        {postOrderDetail.map(order => (
          <div className="employee-management-table-footer__cell" data-type="td">
            <Text as={'p'}>{formatMoney(!!order?.total_cod ? order?.total_cod : 0)}</Text>
            <Text as={'p'} fontSize={13}>{fNumber(order?.total_order)} {t('orders')}</Text>
          </div>
        ))}
      </Tr>
    </StyledFooter>
  )
}

const StyledFooter = styled.div`

.employee-management-table-footer {

  &__cell {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    &[data-menu="true"] {
      position: relative;
    }

    &[data-type="td"] {
      display: block!important;
      text-align: right;
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
      width: 130px;
    }

    &:nth-child(3) {
      width: 154px;
    }

    &:nth-child(4) {
      width: 154px;
      text-align: right;
    }

    &:nth-child(5) {
      width: 154px;
      text-align: right;
    }

    &:nth-child(6) {
      width: 154px;
      text-align: right;
    }

    &:nth-child(7) {
      width: 154px;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:nth-child(8) {
      width: 154px;
      display: flex;
      align-items: center;
    }

    &:nth-child(9) {
      width: 154px;
      display: flex;
      align-items: center;
    }

    &:nth-child(10) {
      width: 144px;
      display: flex;
      align-items: center;
    }
  }

}

`