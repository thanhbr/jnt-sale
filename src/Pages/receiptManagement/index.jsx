import React, {useEffect} from 'react';
import {TableLayout} from "../../layouts/tableLayout";
import useReceiptManagement from "./hooks/useReceiptManagement";
import {ReceiptManagementProvider} from './provider'
import HeaderReceipt from "./components/header";
import TheadReceipt from "./components/receiptTable/thead";
import TbodyReceipt from "./components/receiptTable/tbody";
import ReceiptFilterForm from "./components/receiptFilterForm";

const ReceiptManagement = () => {
  const {fetch, provider, pagination} = useReceiptManagement()
  const {state, dispatch} = provider
  const {table} = state


  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <ReceiptManagementProvider value={{pageState: state, pageDispatch: dispatch}}>
      <HeaderReceipt />
      <TableLayout
        header={
          <>
            <ReceiptFilterForm />
          </>
        }
        table={{
          tHead: <TheadReceipt />,
          tBody: <TbodyReceipt />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </ReceiptManagementProvider>
  )
}

export default ReceiptManagement;