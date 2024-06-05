import React from 'react';
import useTBoyFeedback from "../../hooks/useTBoyFeedback";
import EmptyPage from "./emptyPage";
import PlaceholderTable from "./placeholderTable";
import TrFeedback from "./trFeedback";

const TBody = () => {
  const {table} = useTBoyFeedback()
  const displayList = table?.display

  return (
    <>
      {displayList?.loading ? (
        <PlaceholderTable />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map(item => <TrFeedback key={item.id} data={item}/> )}
        </>
      ) : <EmptyPage />}
    </>
  )
}

export default TBody