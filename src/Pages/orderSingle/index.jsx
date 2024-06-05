import {GridLayout} from 'layouts/gridLayout'
import {PageHeader} from 'layouts/pageHeader'
import {useContext, useEffect} from 'react'
import {useReducer} from 'react'
import {ActionFormBtnList} from './components/actionFormBtnList'
import {OrderSingleCustomerInfo} from './components/sections/customerInfo'
import {OrderSingleProductInfo} from './components/sections/productInfo'
import useOrderSingle from './hooks/useOrderSingle'
import {ORDER_SINGLE_CONSTANTS} from './interface/_constants'
import {OrderSingleProvider} from './provider'
import {orderSingleInitialState} from './provider/_initialState'
import {orderSingleReducer} from './provider/_reducer'
import {OrderSingleShippingInfo} from './components/sections/shippingInfo'
import {OrderSingleExtraInfo} from './components/sections/extraInfo'
import {OrderSinglePaymentMethod} from './components/sections/paymentMethod'
import {OrderSingleContext} from './provider/_context'
import useOrderSingleShippingInfo from './hooks/useOrderSingleShippingInfo'

export const PageOrderSingle = () => {
  const [state, dispatch] = useReducer(
    orderSingleReducer,
    orderSingleInitialState,
  )

  return (
    <OrderSingleProvider value={{state, dispatch}}>
      <PageContainer />
    </OrderSingleProvider>
  )
}

const PageContainer = ({...props}) => {

  const {methods} = useOrderSingle()
  const {state} = useContext(OrderSingleContext)

  const shippingInfo = useOrderSingleShippingInfo()

  useEffect(() => {
    methods.onFetchOrigin()
    shippingInfo.methods.origin()
    shippingInfo.methods.getDeliveryNote()
  }, [])

  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={ORDER_SINGLE_CONSTANTS.header.breadcrumb}
          breadcrumbTitle="Tạo mới đơn hàng"
        />
      }
      grid={[
        {
          width: 70,
          sections: [
            {
              title: 'Thông tin khách hàng',
              props: {
                style: {position: 'relative'},
                children: <OrderSingleCustomerInfo />,
              },
            },
            {
              title: 'Thông tin sản phẩm',
              props: {
                style: {position: 'relative'},
                children: <OrderSingleProductInfo />,
              },
            },
            {
              title: 'Thông tin vận chuyển',
              description:
                (state.form.shippingInfo.shippingPartner?.list?.length == 0 && !state?.skeleton)
                || !(state?.form?.shippingInfo?.shippingPartner?.list?.length > 0
                && !!state?.form?.shippingInfo?.shippingPartner?.list?.find(item => item?.connected))
                  ? ''
                  : state.form.productInfo.inventory && state.form.shippingInfo.isStorePickUp
                      ? 'Đơn hàng này sẽ không bàn giao đối tác vận chuyển vì khách hàng nhận hàng tại cửa hàng.'
                      : 'Tùy thuộc vào gói cước bạn đã thỏa thuận với đối tác vận chuyển, phí vận chuyển dự kiến có thể thay đổi.',
              props: {
                style: {position: 'relative', marginBottom: 0},
                children: <OrderSingleShippingInfo />,
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
                children: <OrderSingleExtraInfo />,
              },
            },
            {
              title: 'Hình thức thanh toán',
              props: {
                children: <OrderSinglePaymentMethod state={state.form.shippingInfo.isStorePickUp} />,
              },
            },
          ],
        },
      ]}
      data-model="container"
    />
  )
}
