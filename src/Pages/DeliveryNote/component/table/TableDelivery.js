import React, { useContext, useEffect, useReducer } from 'react'
import './index.scss'
import { Paper, Table, TableContainer } from '@material-ui/core'
import TableHeader from './TableHeader'
import Empty from '../empty/Empty'
import TableBodyDelivery from './TableBody'
import { useDelivery } from 'Pages/DeliveryNote/useDelivery/useDelivery'
import reducerDelivery from 'Pages/DeliveryNote/store/reducer'
import { initialDelivery } from 'Pages/DeliveryNote/store/initial'
import { Delivery } from 'Pages/DeliveryNote'
import { TableLayout } from 'layouts/tableLayout'
import SkeletonDelivery from '../Skeleton/SkeletonDelivery'
import config from 'config'
import { sendRequestAuth } from 'api/api'
import { ActionType } from 'Pages/DeliveryNote/store/action'
export default function TableDelivery() {
  const { state, dispatch } = useContext(Delivery)
  const { fetchList } = useDelivery()
  const loading = state.isloading
  const data = state.listNote
  useEffect(() => {
    fetchList()
  }, [])
  const show = () => {
    if (data.length > 0 && loading) return <TableBodyDelivery />
    else if (!loading) return <SkeletonDelivery numb={data? data.length : 20} />
    else return <Empty />
  }
  const queryStartFrom = state.pagination.active * state.pagination.amount

  const queries = {
    per_page: state.pagination.amount,
    start: queryStartFrom,
  }
  const hadnleFetchTable = async q => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/delivery-note/list${q}`,
    )

    if (response.data.success) {
      const perPage = response?.data?.meta?.per_page || 0
      const start = response?.data?.meta?.start || 0
      const total = response?.data?.meta?.total || 0
      dispatch({
        type: ActionType.GET_PAGINATION,
        payload: {
          active: Math.floor(start / perPage),
          amount: perPage,
          total: Math.ceil(total / perPage),
          totalItems: total,
        },
      })
      dispatch({ type: ActionType.LIST_NOTE, payload: response.data.data })
      dispatch({ type: ActionType.IS_LOADING, payload: true })
    }

  }
  const generateQuery = obj => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(obj)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    return queryString
  }
    const handleTablePaginationAmountChange = async n => {
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      const currentPage = state.pagination.active || 0
      const totalPages = state.pagination.total
      const totalItems = state.pagination.totalItems
      const page = totalItems < currentPage * n ? totalPages - 1 : currentPage
      const q = generateQuery({ ...queries, per_page: n, start:0 })
      hadnleFetchTable(q)
    }

    const handleTablePaginationPageChange = async page => {
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      const amount = state.pagination?.amount || 20

      const q = generateQuery({ ...queries, start: page * amount })
      hadnleFetchTable(q)
    }

    return (
      // <TableContainer  component={Paper} className="table__delivery">
      //      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
      //         <TableHeader/>
      //         {show()}
      //   </Table>
      // </TableContainer>
      <TableLayout
        table={{
          tHead: <TableHeader />,
          tBody: show(),
        }}
      pagination={{
        ...state.pagination,
        onAmountChange: handleTablePaginationAmountChange,
        onPageChange: handleTablePaginationPageChange,
      }}
      />
    )
  }
