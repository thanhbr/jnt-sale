import React from 'react';
import PlaceholderTable from "./placeholderTable";
import EmptyPage from "./emptyPage";
import useTBoyTypeOfReceipt from "../../hooks/useTBoyTypeOfReceipt";
import ReceiptTr from "./receiptTr";

const TypeReceiptTBody = () => {
  const {table} = useTBoyTypeOfReceipt()
  const displayList = table?.display

  return (
    <>
      {displayList?.loading ? (
        <PlaceholderTable />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map(item => <ReceiptTr key={item.id} data={item}/> )}
        </>
      ) : <EmptyPage />}
    </>
  )
}

export default TypeReceiptTBody;