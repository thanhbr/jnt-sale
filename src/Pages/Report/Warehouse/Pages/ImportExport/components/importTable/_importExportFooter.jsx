import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import React, { useContext } from 'react'
import { ImportExportContext } from '../../provider/_context'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { div, Td } from '../../../../../../../layouts/tableLayout/_td'
import { fNumber } from '../../../../../../../util/formatNumber'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const ImportExportFooter = ({ ...props }) => {
  const { t } = useTranslation()
  const { pageState } = useContext(ImportExportContext)
  const panels = pageState.panels

  return (
    <StyledFooter>
      <Tr {...props} type="tHead"
          className={'report-table__employee-row report-table__import-export-row '}
          style={{
            borderLeft: '1px solid #e2eaf8',
            borderRight: '1px solid #e2eaf8',
            overflow: 'hidden',
            height: '58px',
          }}>
        <div className="import-export-warehouse-management-table-footer__cell"></div>
        <div className="import-export-warehouse-management-table-footer__cell"
             style={{ borderRight: 'none!important' }}>
          <Text as={'p'} fontWeight={600} style={{ textTransform: 'uppercase' }}>{t('total_transactions')}</Text>
          <Text as={'p'}>{fNumber(panels?.totals)}</Text>
        </div>
        <div className="import-export-warehouse-management-table-footer__cell" data-type="td">
          <Text fontWeight={600} color={'#00081D'}>{formatMoney(panels?.total_value_purchase)}</Text>
          <Text
            fontSize={12}
            as={'p'}
            color={'#00AB56'}
            fontWeight={500}
            style={{ background: '#EBFFF5', padding: '0 6px', borderRadius: '50px' }}
          >
            {t('report_quantity_SL')}: {fNumber(panels?.total_quantity_purchase)}
          </Text>
        </div>
        <div className="import-export-warehouse-management-table-footer__cell" data-type="td">
          <Text fontWeight={600} color={'#00081D'}>{formatMoney(panels?.total_value_orders)}</Text>
          <Text
            fontSize={12}
            as={'p'}
            color={'#FC4C0A'}
            fontWeight={500}
            style={{ background: '#FFF0EB', padding: '0 6px', borderRadius: '50px' }}
          >
            {t('report_quantity_SL')}: {fNumber(panels?.total_quantity_orders)}
          </Text>
        </div>
        <div className="import-export-warehouse-management-table-footer__cell" data-type="td">
          <Text fontWeight={600} color={'#00081D'}>{formatMoney(panels?.total_value_warehouse)}</Text>
          <Text
            fontSize={12}
            as={'p'}
            color={'#1A94FF'}
            fontWeight={500}
            style={{ background: '#f7f7f7fc', padding: '0 6px', borderRadius: '50px' }}
          >
            {t('report_quantity_SL')}: {fNumber(panels?.total_quantity_warehouse)}
          </Text>

        </div>
      </Tr>
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
.report-table__import-export-row{
  @media screen and (max-width: 1440px){
    width: 1288px !important;
  }
}
.import-export-warehouse-management-table-footer {

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
      text-align: right;
      
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
      
    }

    &:nth-child(2) {
      width: 130px;
      flex: 1;
      display: block;
    }

    &:nth-child(3) {
      width: 12.5rem;
      flex-direction: column;
      align-items: flex-end;
    }

    &:nth-child(4) {
      width: 12.5rem;
      text-align: right;
       flex-direction: column;
       align-items: flex-end;
       @media screen and (max-width: 1366px){
        width: 14.5rem;
       }
    }

    &:nth-child(5) {
      width: 12.5rem;
      text-align: right;
       flex-direction: column;
       align-items: flex-end;
        @media screen and (max-width: 1366px){
        width: 14.5rem;
       }
    }

  }

}

`