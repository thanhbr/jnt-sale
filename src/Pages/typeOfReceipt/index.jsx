import React, {useEffect} from 'react';
import useTypeOfReceipt from "./hooks/useTypeOfReceipt";
import HeaderTypeReceipt from "./components/headerList";
import {TableLayout} from "../../layouts/tableLayout";
import TypeReceiptTHead from "./components/typeReceiptTable/tHead";
import TypeReceiptTBody from "./components/typeReceiptTable/tBody";
import CreateReceipt from "./components/modal/createReceipt";
import {TypeReceiptProvider} from "./provider"
import SearchHeader from "./components/typeReceiptTable/searchHeader";
import RemoveTypeReceipt from "./components/modal/removeTypeReceipt";
import InactiveStatus from "./components/modal/inactiveStatus";

const TypeOfReceipt = () => {
  const {provider, pagination, fetch} = useTypeOfReceipt()
  const {state, dispatch} = provider
  const {table} = state

  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <>
      <TypeReceiptProvider value={{pageState: state, pageDispatch: dispatch}}>
        <HeaderTypeReceipt />
        <TableLayout
          header={<SearchHeader />}
          table={{
            tHead: <TypeReceiptTHead />,
            tBody: <TypeReceiptTBody />,
          }}
          pagination={{
            ...table.pagination,
            onAmountChange: pagination.onAmountChange,
            onPageChange: pagination.onPageChange,
          }}
        />
        <CreateReceipt />
        <RemoveTypeReceipt />
        <InactiveStatus />
      </TypeReceiptProvider>
    </>
  );
};

export default TypeOfReceipt;