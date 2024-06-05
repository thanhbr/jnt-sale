import React, {useEffect} from 'react';
import useFeedback from "./hooks/useFeedback";
import {FeedbackProvider} from "./provider"
import {TableLayout} from "../../layouts/tableLayout";
import Header from "./components/header";
import THead from "./components/table/tHead";
import TBody from "./components/table/tBody";
import {useLocation} from "react-router-dom";

const Feedback = () => {
  const {provider, pagination, fetch} = useFeedback()
  const {state, dispatch} = provider
  const {table} = state
  const location = useLocation()

  useEffect(() => {
    fetch.origin()
  }, [location?.search])

  return (
    <FeedbackProvider value={{state: state, dispatch: dispatch}}>
      <Header />
      <TableLayout
        header={''}
        table={{
          tHead: <THead />,
          tBody: <TBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </FeedbackProvider>
  )
}

export default Feedback