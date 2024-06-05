import {PageHeader} from 'layouts/pageHeader'
import {TableLayout} from 'layouts/tableLayout'
import {useEffect, useReducer} from 'react'
import {BulkOrderFilter} from './components/bulkOrderFilter'
import {BulkOrderNotifications} from './components/bulkOrderNotifications'
import {BulkOrderTableTbody} from './components/bulkOrderTable/bulkOrderTableTbody'
import {BulkOrderTableThead} from './components/bulkOrderTable/bulkOrderTableThead'
import {BulkOrderTags} from './components/bulkOrderTags'
import useBulkOrder from './hooks/useBulkOrder'
import {BULK_ORDER_CONSTANTS} from './interface/_constants'
import {BulkOrderProvider} from './provider'
import {bulkOrderInitialState} from './provider/_initialState'
import {bulkOrderReducer} from './provider/_reducer'
import {StyledBulkOrder} from './_styled'

export const PageBulkOrder = () => {
  const [state, dispatch] = useReducer(bulkOrderReducer, bulkOrderInitialState)

  return (
    <BulkOrderProvider value={{state, dispatch}}>
      <PageContainer />
    </BulkOrderProvider>
  )
}

const PageContainer = () => {
  const {table, methods} = useBulkOrder()

  useEffect(() => {
    methods.fetchOrigin()
  }, [])

  return (
    <StyledBulkOrder>
      <PageHeader
        actions={BULK_ORDER_CONSTANTS.headerActions}
        breadcrumbLinks={BULK_ORDER_CONSTANTS.breadcrumb}
        breadcrumbSubTitle="(Đơn không khấu trừ tồn kho)"
        breadcrumbTitle="Lịch sử lên đơn hàng loạt"
      />
      <BulkOrderNotifications />
      <TableLayout
        className="bulk-order__table-layout"
        header={
          <>
            <BulkOrderFilter />
            <BulkOrderTags />
          </>
        }
        table={{
          tHead: <BulkOrderTableThead />,
          tBody: <BulkOrderTableTbody />,
        }}
        pagination={{
          ...table.data.pagination,
          onAmountChange: table.methods.onAmountChange,
          onPageChange: table.methods.onPageChange,
        }}
      />
    </StyledBulkOrder>
  )
}
