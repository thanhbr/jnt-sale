import React from 'react';
import useFilter from "../../hooks/useFilter";
import TrTable from "./trTable";
import Selenton from "./skeleton";
import Empty from "./empty";

const TBody = () => {
  const {displayList} = useFilter()

  return (
    <>
      {displayList?.loading ? (
        <Selenton />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map((item, index) => <TrTable key={item.id} index={index} data={item} quantityLow={displayList?.quantityLow}/> )}
        </>
      ) : <Empty />}
    </>
  )
}

export default TBody