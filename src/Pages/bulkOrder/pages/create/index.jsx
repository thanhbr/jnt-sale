import {PageHeader} from 'layouts/pageHeader'
import {TableLayout} from 'layouts/tableLayout'
import {BulkOrderCreateActionCards} from 'Pages/bulkOrder/components/bulkOrderCreateActionCards'
import {BulkOrderCreateForm} from 'Pages/bulkOrder/components/bulkOrderCreateForm'
import {BulkOrderCreateNotifications} from 'Pages/bulkOrder/components/bulkOrderCreateNotifications'
import {BulkOrderCreateTableAction} from 'Pages/bulkOrder/components/bulkOrderCreateTable/bulkOrderCreateTableAction'
import {BulkOrderCreateTableTbody} from 'Pages/bulkOrder/components/bulkOrderCreateTable/bulkOrderCreateTableTbody'
import {BulkOrderTableCreateThead} from 'Pages/bulkOrder/components/bulkOrderCreateTable/bulkOrderCreateTableThead'
import useBulkOrderCreate from 'Pages/bulkOrder/hooks/useBulkOrderCreate'
import {BULK_ORDER_CREATE_CONSTANTS} from 'Pages/bulkOrder/interface/_constants'
import {BulkOrderCreateProvider} from 'Pages/bulkOrder/provider'
import {bulkOrderCreateInitialState} from 'Pages/bulkOrder/provider/_initialState'
import {bulkOrderCreateReducer} from 'Pages/bulkOrder/provider/_reducer'
import {useEffect, useReducer} from 'react'
import {useParams} from 'react-router-dom'

export const PageBulkOrderCreate = () => {
  const [state, dispatch] = useReducer(
    bulkOrderCreateReducer,
    bulkOrderCreateInitialState,
  )

  return (
    <BulkOrderCreateProvider value={{state, dispatch}}>
      <PageContainer />
    </BulkOrderCreateProvider>
  )
}

const PageContainer = () => {
  const params = useParams()
  const isCreatePage = params?.fileId === 'create'

  const {table} = useBulkOrderCreate()

  useEffect(() => {
    if (!isCreatePage)
      table.methods.onFecthFile(params?.fileId, {type: 'origin'})
  }, [params?.fileId, isCreatePage])

  return (
    <>
      <PageHeader
        actions={
          isCreatePage
            ? BULK_ORDER_CREATE_CONSTANTS.headerActions
            : BULK_ORDER_CREATE_CONSTANTS.headerDetailActions.map(item =>
                item.id !== 3
                  ? item
                  : {
                      ...item,
                      onClick: () => (window.location.href = item?.href || '#'),
                      props: {
                        ...item?.props,
                        preventDefault: true,
                      },
                    },
              )
        }
        breadcrumbLinks={BULK_ORDER_CREATE_CONSTANTS.breadcrumb}
        breadcrumbSubTitle="(Đơn không khấu trừ tồn kho)"
        breadcrumbTitle="Lên đơn hàng loạt"
      />
      <BulkOrderCreateNotifications />
      <TableLayout
        header={
          <>
            <BulkOrderCreateForm />
            {table.properties.canShowTable && <BulkOrderCreateTableAction />}
          </>
        }
        table={{
          scrollable: table.data.display.list.length > 0,
          tHead: table.properties.canShowTable ? (
            <BulkOrderTableCreateThead />
          ) : undefined,
          tBody: table.properties.canShowTable ? (
            <BulkOrderCreateTableTbody />
          ) : undefined,
          width: 2842,
        }}
      />
      {!table.properties.canShowTable && <BulkOrderCreateActionCards />}
    </>
  )
}
