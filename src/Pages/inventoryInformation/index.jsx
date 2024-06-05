import React, {memo, useEffect} from 'react';
import useInventoryInformation from "./hooks/useInventoryInformation";
import {InventoryInformationProvider} from "./provider";
import styled from "styled-components";
import HeaderInventoryInfo from "./components/Header";
import {TableLayout} from "../../layouts/tableLayout";
import InventoryInfoFilter from "./components/Filter";
import TableHeader from "./components/table/tableHeader";
import TableBody from "./components/table/tableBody";

export const InventoryInformation = memo(() => {
  const {provider, fetch, handlePaginationAmountChange, handlePaginationPageChange} = useInventoryInformation()
  const {state, dispatch} = provider

  useEffect(() => {
    fetch.originData()
  }, [])
  return (
    <InventoryInformationProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <StyledInventoryInformation>
        <HeaderInventoryInfo />
        <TableLayout
          header={
            <InventoryInfoFilter />
          }
          table={{
            tHead: <TableHeader />,
            tBody: <TableBody />,
          }}
          pagination={{
            ...state.paginate,
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange
          }}
        />
      </StyledInventoryInformation>
    </InventoryInformationProvider>
  )
})


export const StyledInventoryInformation = styled.div`
  
`
