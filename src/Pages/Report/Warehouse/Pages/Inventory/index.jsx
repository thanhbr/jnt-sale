import React, {useEffect} from 'react';
import useReportInventory from "./hooks/useReportInventory";
import {TableLayout} from "../../../../../layouts/tableLayout";
import {ReportInventoryProvider} from './provider/index'
import Header from "./components/header";
import Filter from "./components/filter";
import THead from "./components/table/tHead";
import TBody from "./components/table/tBody";
import styled from "styled-components";

const ReportInventory = () => {
  const {fetch, provider, pagination} = useReportInventory()
  const {state, dispatch} = provider
  const {table} = state


  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <ReportInventoryProvider value={{pageState: state, pageDispatch: dispatch}}>
      <StyledLayout>
        <Header />
        <TableLayout
          header={<Filter />}
          table={{
            tHead: <THead />,
            tBody: <TBody />,
          }}
          pagination={{
            ...table.pagination,
            onAmountChange: pagination.onAmountChange,
            onPageChange: pagination.onPageChange,
          }}
        />
      </StyledLayout>
    </ReportInventoryProvider>
  )
}

export default ReportInventory


export const StyledLayout = styled.div`
  .page-header__actions {
    .page-header__action-item:nth-child(2) button {
      width: 124px;
    }
  }
  .table-layout__table {
    min-height: 60vh;
    background: white;
    &-t-head {
      padding: 0 16px;
      background: white;
    }
    &-t-body {
      padding: 0 16px;
      background: white;
      padding-bottom: 24px;
    }
  }
`
