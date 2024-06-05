import React, {useEffect} from 'react';
import {TableLayout} from "../../layouts/tableLayout";
import useGiveBackProduct from "./hooks/useGiveBackProduct";
import {GiveBackProductProvider} from './provider'
import HeaderInventoryInfo from "./components/headerInventoryInfo";
import FilterFormInventoryInfo from "./components/filter";
import THeadGivebackProduct from "./components/table/theadGivebackProduct";
import PanelFormGivebackProduct from "./components/panel";
import TbodyGivebackProduct from "./components/table/tbodyGivebackProduct";

const GiveBackProductPage = () => {
  const {fetch, provider, pagination} = useGiveBackProduct()
  const {state, dispatch} = provider
  const {table} = state

  useEffect(() => {
    fetch?.origin()
  }, [])
  return (
    <GiveBackProductProvider value={{pageState: state, pageDispatch: dispatch}}>
      <HeaderInventoryInfo />
      <TableLayout
        header={
          <>
            <FilterFormInventoryInfo />
            <PanelFormGivebackProduct />
          </>
        }
        table={{
          tHead: <THeadGivebackProduct />,
          tBody: <TbodyGivebackProduct />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </GiveBackProductProvider>
  )
}

export default GiveBackProductPage