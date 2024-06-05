import {GridLayout} from 'layouts/gridLayout'
import {PageHeader} from 'layouts/pageHeader'
import {useEffect, useReducer} from 'react'
import {ORDER_SINGLE_CONSTANTS} from './interface/_constants'
import {InventorySingleProvider} from './provider'
import {orderSingleInitialState} from './provider/_initialState'
import {orderSingleReducer} from './provider/_reducer'
import {OrderSingleProductInfo} from './components/warehouse'
import useOrderSingle from "./hooks/useOrderSingle";
import {ActionFormBtnList} from "./components/actionFormBtnList";
import {OrderSingleExtraInfo} from "./components/extraInfo";
import {useParams} from "react-router-dom";
import {sendRequestAuth} from "../../api/api";
import config from "../../config";
import {orderSingleAction} from "./provider/_actions";
export const PageInventorySingle = () => {
  const [state, dispatch] = useReducer(
    orderSingleReducer,
    orderSingleInitialState,
  )

  return (
    <InventorySingleProvider value={{state, dispatch}}>
      <PageContainer />
    </InventorySingleProvider>
  )
}

const PageContainer = ({...props}) => {
  const {methods} = useOrderSingle()
  const {inventoryId} = useParams()

  useEffect(() => {
    methods.onFetchOrigin()
  }, [])
const  breadcrumb = [
    {
      id: 1,
      name: 'Kho',
      url: '#',
    },
    {id: 2, name: 'Kiểm kho', url: '#'},
    {id: 3, name: inventoryId ? 'Chỉnh sửa phiếu kiểm kho' : "Tạo mới phiếu kiểm kho", url: '#'},
  ]
  const title = inventoryId ? 'Chỉnh sửa phiếu kiểm kho' : "Tạo mới phiếu kiểm kho"
  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={breadcrumb}
          breadcrumbTitle={title}
        />
      }
      grid={[
        {
          width: 70,
          sections: [
            {
              title: 'Thông tin kiểm kho',
              props: {
                style: {position: 'relative',marginBottom: '4px'},
                children: <OrderSingleProductInfo />,
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
                  background:'unset',
                },
                children: <ActionFormBtnList/>,
              },
            }
          ],
          props: {style: {position: 'relative'}},
        },
        {
          width: 30,
          sections: [
            {
              title: 'Thông tin bổ sung',
              props: {
                children: <OrderSingleExtraInfo />,
                style:{
                  zIndex: '9px'
                }
              },
            },
          ],
        },

      ]}
      data-model="container"
    />
  )
}
