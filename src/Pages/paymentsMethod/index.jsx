import React, {memo, useEffect} from "react";
import usePaymentMethod from "./hooks/usePaymentMethod";
import {PaymentMethodProvider} from "./provider";
import {StyledPaymentMethod} from "./components/~style";
import Header from "./components/header"
import {ORDER_ICONS} from "../refactorOrder/interfaces/_icons";
import {Input} from "../../common/form/input";
import {TableLayout} from "../../layouts/tableLayout";
import {Grid} from "@mui/material";
import TableHeader from "./components/table/tableHeader";
import TableBody from "./components/table/tableBody";
import {paymentMethodActions} from "./provider/~reducer";
import {ModalCreatePaymentMethod} from "./components/modal";
import {ModalEditPaymentMethod} from "./components/modal/edit";
import {ModalConfirmDelete} from "./components/modal/confirmDelete";


export const PaymentMethod = memo(() => {
  const { provider, fetch, handlePaginationAmountChange, handlePaginationPageChange } = usePaymentMethod()
  const {state, dispatch} = provider
  useEffect(() => {
    fetch.origins()
  }, [])

  return (
    <PaymentMethodProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <StyledPaymentMethod>
        <Header />
        <TableLayout
          header={
            <Grid container className={"payment-method__collapse-group"}>
              <Grid item xs={4} sm={3} md={3} lg={3} >
                <Input
                  className="payment-method-search__input-wide"
                  icon={ORDER_ICONS.searchMd}
                  placeholder={'Tìm kiếm theo phương thức thanh toán'}
                  onChange={e => dispatch({type: paymentMethodActions.SET_SEARCH, payload: e.target.value.trim()})}
                />
              </Grid>
            </Grid>
          }
          table={{
            tHead: <TableHeader />,
            tBody: <TableBody />,
          }}
          pagination={{
            ...state.paginate,
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange
          }}
        />
        {state?.openModalCreate && <ModalCreatePaymentMethod />}
        {state?.openModalEdit && <ModalEditPaymentMethod />}
        {state?.openModalConfirmDelete && <ModalConfirmDelete />}
      </StyledPaymentMethod>
    </PaymentMethodProvider>
  )
})