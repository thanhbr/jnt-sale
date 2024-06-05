import React, {useEffect} from 'react';
import {ReportQuotaProvider} from "./provider/index";
import {TableLayout} from "../../../../../layouts/tableLayout";
import styled from "styled-components";
import useBelowQuota from "./hooks/useBelowQuota";
import Header from "./components/header";
import Filter from "./components/filter";
import THead from "./components/table/tHead";
import TBody from "./components/table/tBody";

const ReportBelowQuota = () => {
  const {fetch, provider, pagination} = useBelowQuota()
  const {state, dispatch} = provider
  const {table} = state


  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <ReportQuotaProvider value={{pageState: state, pageDispatch: dispatch}}>
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
    </ReportQuotaProvider>
  )
}

export default ReportBelowQuota


export const StyledLayout = styled.div`
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
