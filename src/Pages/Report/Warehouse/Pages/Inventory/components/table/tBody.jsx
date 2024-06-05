import React from 'react';
import Empty from "./_empty";
import TrBody from "./__trBody";
import useTableReportInventory from "../../hooks/useTableReportInventory";
import Selenton from "./_selenton";

const TBody = () => {
  const {displayList} = useTableReportInventory()

  return (
    <>
      {displayList?.loading ? (
        <Selenton />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map((item, index) => <TrBody key={item.id} index={index} data={item}/> )}
        </>
      ) : <Empty />}
    </>
  )
}

export default TBody