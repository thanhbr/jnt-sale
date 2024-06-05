import React from 'react';
import {ReportPanel} from "./_reportPanel";
import styled from "styled-components";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import { useTranslation } from 'react-i18next'

const Panel = ({...props}) => {
  const {panels} = useFilterReportInventory()
  const {t} = useTranslation()
  return (
    <StyledPanels {...props}>
      <ReportPanel
        className="report-inventory-panels__item"
        title={t('warehouse_product_page_quantity')}
        value={panels.totalQuantity}
      />
      <ReportPanel
        className="report-inventory-panels__item"
        currency="₫"
        title={t('inventory_val')}
        value={panels.totalAmount}
      />
    </StyledPanels>
  )
}

export default Panel

const StyledPanels = styled.div`
  margin: 0 -8px;

  display: flex;
  flex-wrap: wrap;

  .report-inventory-panels {
    &__item {
      width: calc(50% - 14px);
      margin: 0 6px;
      padding: 7px;
    }
  }
`
