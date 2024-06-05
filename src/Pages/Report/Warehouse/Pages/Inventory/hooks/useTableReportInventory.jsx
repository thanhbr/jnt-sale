import React, {useContext} from 'react';
import {ReportInventoryContext} from "../provider/context";

const useTableReportInventory = () => {
  const {pageState, pageDispatch} = useContext(ReportInventoryContext)
  const displayList = pageState?.table?.display
  const shouldShowCreateBtn = pageState?.table?.listDefault?.length === 0 && !!!pageState?.filter?.keyword

  return {
    displayList,
    shouldShowCreateBtn
  }
}

export default useTableReportInventory