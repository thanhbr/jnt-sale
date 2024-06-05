import React, {useEffect} from 'react';
import {ProductProvider} from './provider/index'
import useProduct from "./hooks/useProduct";
import Header from "./components/headerList";
import {TableLayout} from "../../layouts/tableLayout";
import {ProductFilterForm} from "./components/productFilterForm";
import ProductTHead from "./components/productTable/~productTHead";
import ProductTBody from "./components/productTable/~productTBody";
import {ProductNotifications} from './components/productNotification';
const ProductPage = () => {
  const {fetch, provider, pagination} = useProduct()
  const {state, dispatch} = provider
  const {table} = state

  //
  useEffect(() => {
    fetch.origin()
    // fetch.paymentMethod()
  }, [])

  return (
    <ProductProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <ProductNotifications/>
      <TableLayout
        header={
          <>
            <ProductFilterForm />
          </>
        }
        table={{
          tHead: <ProductTHead />,
          tBody: <ProductTBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />

    </ProductProvider>
  )
}

export default ProductPage;