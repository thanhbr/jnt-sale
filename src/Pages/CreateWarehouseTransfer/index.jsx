import {GridLayout} from 'layouts/gridLayout'
import {PageHeader} from 'layouts/pageHeader'
import {useContext, useEffect} from 'react'
import {useReducer} from 'react'
import {ActionFormBtnList} from './components/actionFormBtnList'
import {WarehouseTransferGeneralInfo} from './components/sections/generalInfo'
import {WarehouseTSProvider} from './provider'
import {createWarehouseTransferInitialState} from './provider/_initialState'
import {CreateWarehouseTransferReducer} from './provider/_reducer'
import {WarehouseTSExtraInfo} from './components/sections/extraInfo'
import {WarehouseTransferContext} from './provider/_context'
import useGlobalContext from 'containerContext/storeContext'
import { WAREHOUSE_TRANSFER_CONSTANTS } from './interface/_constants'
import { WarehouseTSProductInfo } from './components/sections/productInfo'
import useWareHouseTransfer from 'Pages/WareHouseTransfer/hooks/useWareHouseTransfer'
import useWarehouseTS from './hooks/useWarehouseTS'

export const CreateWarehouseTransfer = () => {
  const [state, dispatch] = useReducer(
    CreateWarehouseTransferReducer,
    createWarehouseTransferInitialState,
  )

  return (
    <WarehouseTSProvider value={{state, dispatch}}>
      <PageContainer />
    </WarehouseTSProvider>
  )
}

const PageContainer = ({...props}) => {
  const {methods} = useWarehouseTS()

  useEffect(() => {
    methods.onFetchOrigin()
  }, [])

  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={WAREHOUSE_TRANSFER_CONSTANTS.header.breadcrumb}
          breadcrumbTitle="Tạo mới phiếu chuyển kho"
        />
      }
      grid={[
        {
          width: 70,
          sections: [
            {
              title: 'Thông tin chung',
              props: {
                style: {position: 'relative'},
                children: <WarehouseTransferGeneralInfo />,
              },
            },
            {
              title: 'Thông tin sản phẩm',
              props: {
                style: {position: 'relative',  marginBottom: '4px'},
                children: <WarehouseTSProductInfo />,
              },
            },
            {
              type: 'sticky-bottom-transparent',
              props: {
                style: {
                  position: 'sticky',
                  bottom: -44,
                  zIndex: 19,
                  marginBottom: 0,
                  padding: '12px 24px',
                  background: 'unset'
                },
                children: <ActionFormBtnList />,
              },
            },
          ],
          props: {style: {position: 'relative'}},
        },
        {
          width: 30,
          sections: [
            {
              title: 'Thông tin bổ sung',
              props: {
                children: <WarehouseTSExtraInfo />,
              },
            },
          ],
        },
      ]}
      data-model="container"
    />
  )
}
