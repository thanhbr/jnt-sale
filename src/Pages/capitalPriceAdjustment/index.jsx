import React, {useEffect} from 'react'
import {CapitalAdjustmentProvider} from "./provider/index"
import {useCapitalAdjustment} from "./hooks/useCapitalAdjustment";
import {TableLayout} from "../../layouts/tableLayout";
import HeaderPriceAdjustment from "./component/header";
import FilterCapitalAdjustment from "./component/filter";
import TheadCapitalAdjustment from "./component/table/theadCapitalAdjustment";
import TbodyCapitalAdjustment from "./component/table/tbodyCapitalAdjustment";

const CapitalAdjustment = ()=>{
  const {provider, pagination, fetch} = useCapitalAdjustment()
  const {state, dispatch} = provider
  const {table} = state

  useEffect(() => {
    fetch?.origin()
  }, [])

  return(
    <CapitalAdjustmentProvider value={{ pageState : state, pageDispatch : dispatch}}>
      <HeaderPriceAdjustment />
      <TableLayout
        header={<FilterCapitalAdjustment />}
        table={{
          tHead: <TheadCapitalAdjustment />,
          tBody: <TbodyCapitalAdjustment />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </CapitalAdjustmentProvider>
  )
}
export default CapitalAdjustment