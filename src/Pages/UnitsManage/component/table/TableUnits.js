import React, { useContext, useEffect, useReducer } from 'react'
import './index.scss'
import { Paper, Table, TableContainer } from '@material-ui/core'
import TableHeader from './TableHeader'
import Empty from '../empty/Empty'
import TableBody from './TableBody'
import { useUnit } from 'Pages/UnitsManage/hooks/useUnit'
import reducer from 'Pages/UnitsManage/store/reducer'
import { initial } from 'Pages/UnitsManage/store/initial'
import { Unit } from 'Pages/UnitsManage'
import { TableLayout } from 'layouts/tableLayout'
import SkeletonUnit from '../Skeleton/SkeletonUnit'
import config from 'config'
import { sendRequestAuth } from 'api/api'
import { ActionType } from 'Pages/UnitsManage/store/action'
export default function TableUnit() {
  const { state, dispatch } = useContext(Unit)
  const { fetchList } = useUnit()
  const loading = state.isloading
  const data = state.list
  useEffect(() => {
    fetchList()
  }, [])

  const show = () => {
    if (data.length > 0 && loading) return <TableBody />
    else if (!loading) return <SkeletonUnit numb={state.pagination.totalItems > 20 || state.pagination.totalItems <= 0 ? 20 : state.pagination.totalItems} />
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
      `${config.API}/product/unit/list${q}`,
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
      dispatch({ type: ActionType.LIST_UNIT, payload: response.data.data })
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
      console.log(state.pagination)
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      const currentPage = state.pagination.active || 0
      const currentAmount = state.pagination.amount || 20
      const currStart = currentPage * currentAmount

      // const totalPages = state.pagination.total
      // const totalItems = state.pagination.totalItems
      // const start = totalItems < currentPage * n ? (Math.ceil(totalItems/n) - 1) * n : (Math.floor(currStart/n)) * n
      const q = generateQuery({ ...queries, per_page: n, start: (Math.floor(currStart/n)) * n })
      hadnleFetchTable(q)
    }

    const handleTablePaginationPageChange = async page => {
      dispatch({ type: ActionType.IS_LOADING, payload: false })
      const amount = state.pagination?.amount || 20
      const q = generateQuery({ ...queries, start: page * amount })
      hadnleFetchTable(q)
    }

    return (
      // <TableContainer  component={Paper} className="table__unit">
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
