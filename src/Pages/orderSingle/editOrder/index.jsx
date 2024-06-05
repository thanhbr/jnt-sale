import React, {useContext, useEffect, useReducer} from "react";
import {orderSingleReducer} from "../provider/_reducer";
import {orderSingleInitialState} from "../provider/_initialState";
import {OrderSingleProvider} from "../provider";
import {OrderSingleContext} from "../provider/_context";
import useOrderSingleShippingInfo from "../hooks/useOrderSingleShippingInfo";
import {GridLayout} from "../../../layouts/gridLayout";
import {PageHeader} from "../../../layouts/pageHeader";
import {ORDER_SINGLE_CONSTANTS} from "./interface/~constants";
import {ActionFormEditBtnList} from "./components/actionFormBtnList";
import {OrderEditSingleCustomerInfo} from "./components/setions/customerInfo";
import useEditOrderSingle from "../hooks/useEditOrderSingle";
import {OrderEditSingleShippingInfo} from "./components/setions/shippingInfo";
import {OrderEditSingleProductInfo} from "./components/setions/productInfo";
import {OrderEditSingleExtraInfo} from "./components/setions/extraInfo";
import {OrderEditSinglePaymentMethod} from "./components/setions/paymentMethod";
import ToolbarDelivery from "./components/setions/toolbar/delivery";
import ToolbarInStore from "./components/setions/toolbar/inStore";
import styled from "styled-components";
import {ModalShippingPoint} from "./components/modal/modalShippingPoint";
import {ModalCreatePaymentMethod} from "./components/modal/modalPaymentMethod";
import {ModalCreateSourceOrder} from "./components/modal/modalSourceOrder";
import {SkeletonOrderCustomer, SkeletonOrderProductInfo, SkeletonOrderShippingInfo, SkeletonOrderExtraInfo} from "./components/skelenton";
import {OrderSinglePaymentMethod} from "../components/sections/paymentMethod";

export const PageEditOrderSingle = () => {
  const [state, dispatch] = useReducer(
    orderSingleReducer,
    orderSingleInitialState,
  )

  return (
    <OrderSingleProvider value={{state, dispatch}}>
      <PageContainer />
      {state?.editModalShippingPoint?.open && (<ModalShippingPoint />)}
      {state?.editModalPayment?.open && <ModalCreatePaymentMethod />}
      {state?.editModalSourceOrder?.open && <ModalCreateSourceOrder />}
    </OrderSingleProvider>
  )
}

const PageContainer = ({...props}) => {
  const {state} = useContext(OrderSingleContext)
  const shippingInfo = useOrderSingleShippingInfo()
  const {functions, properties} = useEditOrderSingle()

  useEffect(() => {
    functions.onFetchDetail()
    shippingInfo.methods.getDeliveryNote()
  }, [])

  // Trạng thái đơn hàng
  const shippingStatus = state?.shipping_status?.value

  return (
    <StyledEditOrderGrid>
      {properties.skeleton && (
        <GridLayout
          {...props}
          header={
            <PageHeader
              breadcrumbLinks={ORDER_SINGLE_CONSTANTS.header.breadcrumb}
              breadcrumbTitle="Chỉnh sửa đơn hàng"
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: '',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px',
                      maxHeight: '364px'
                    },
                    children: <SkeletonOrderCustomer />,
                  },
                },
                {
                  title: '',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px 24px 0 24px'
                    },
                    children: <SkeletonOrderProductInfo />,
                  },
                },
                {
                  title: '',
                  description: (state.form.shippingInfo.shippingPartner?.list?.length === 0 && !state.skeleton) ? '' :
                    (state.form.productInfo.inventory &&
                      state.form.shippingInfo.isStorePickUp)
                      ? '' : '',
                  props: {
                    style: {position: 'relative', marginBottom: 0, padding: '30px 24px 5px 24px'},
                    children: <SkeletonOrderShippingInfo />,
                  },
                },
              ],
              props: {style: {position: 'relative'}},
            },
            {
              width: 30,
              sections: [
                {
                  title: '',
                  props: {
                    style: {
                      minHeight: '28.1875rem',
                      padding: '24px 24px 4px 24px',
                    },
                    children: <SkeletonOrderExtraInfo />,
                  },
                },
              ],
            },
          ]}
          data-model="container"
        />
      )}
      {shippingStatus === '21' && (
        <GridLayout
          {...props}
          header={
            <PageHeader
              breadcrumbLinks={ORDER_SINGLE_CONSTANTS.header.breadcrumb}
              breadcrumbTitle="Chỉnh sửa đơn hàng"
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: 'Thông tin khách hàng',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px',
                      maxHeight: '364px'
                    },
                    children: <OrderEditSingleCustomerInfo />,
                  },
                },
                {
                  title: 'Thông tin sản phẩm',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px 24px 0 24px'
                    },
                    children: <OrderEditSingleProductInfo />,
                  },
                },
                {
                  title: 'Thông tin vận chuyển',
                  description: (state.form.shippingInfo.shippingPartner?.list?.length === 0 && !state.skeleton) ? '' :
                    (state.form.productInfo.inventory &&
                      state.form.shippingInfo.isStorePickUp)
                      ? 'Đơn hàng này sẽ không bàn giao đối tác vận chuyển vì khách hàng nhận hàng tại cửa hàng.'
                      : 'Tùy thuộc vào gói cước bạn đã thỏa thuận với đối tác vận chuyển, phí vận chuyển dự kiến có thể thay đổi.',
                  props: {
                    style: {position: 'relative', marginBottom: 0, padding: '30px 24px 5px 24px'},
                    children: <OrderEditSingleShippingInfo />,
                  },
                },
                {
                  type: 'sticky-bottom-transparent',
                  props: {
                    style: {
                      position: 'sticky',
                      bottom: -44,
                      marginBottom: -40,
                      padding: '12px 24px 12px 12px',
                      zIndex: 19,
                    },
                    children: <ActionFormEditBtnList />,
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
                    style: {
                      minHeight: '28.1875rem',
                      padding: '24px 24px 4px 24px',
                    },
                    children: <OrderEditSingleExtraInfo />,
                  },
                },
                {
                  title: 'Hình thức thanh toán',
                  props: {
                    style: {
                      minHeight: '11.8125rem',
                      padding: '24px 24px 0 24px',
                    },
                    children: <OrderEditSinglePaymentMethod  state={state.form.shippingInfo.isStorePickUp} />,
                  },
                },
              ],
            },
          ]}
          data-model="container"
        />
      )}
      {shippingStatus === '1' && (
        <GridLayout
          {...props}
          header={
            <PageHeader
              breadcrumbLinks={ORDER_SINGLE_CONSTANTS.header.breadcrumb}
              breadcrumbTitle="Chỉnh sửa đơn hàng"
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: '',
                  props: {
                    style: {position: 'relative', background: 'transparent', padding: '0'},
                    children: <ToolbarDelivery />,
                  },
                },
                {
                  title: 'Thông tin khách hàng',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px',
                      maxHeight: '364px'
                    },
                    children: <OrderEditSingleCustomerInfo />,
                  },
                },
                {
                  title: 'Thông tin sản phẩm',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px 24px 0 24px'
                    },
                    children: <OrderEditSingleProductInfo />,
                  },
                },
                {
                  title: 'Thông tin vận chuyển',
                  description: (state.form.shippingInfo.shippingPartner?.list?.length === 0 && !state.skeleton) ? '' :
                    (state.form.productInfo.inventory &&
                      state.form.shippingInfo.isStorePickUp)
                      ? 'Đơn hàng này sẽ không bàn giao đối tác vận chuyển vì khách hàng nhận hàng tại cửa hàng.'
                      : 'Tùy thuộc vào gói cước bạn đã thỏa thuận với đối tác vận chuyển, phí vận chuyển dự kiến có thể thay đổi',
                  props: {
                    style: {
                      position: 'relative',
                      marginBottom: '0',
                      padding: '30px 24px 5px 24px',
                    },
                    children: <OrderEditSingleShippingInfo />,
                  },
                },
                {
                  type: 'sticky-bottom-transparent',
                  props: {
                    style: {
                      position: 'sticky',
                      bottom: -44,
                      marginBottom: -40,
                      padding: '12px 24px 12px 12px',
                      zIndex: 19,
                    },
                    children: <ActionFormEditBtnList />,
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
                    style: {
                      minHeight: '28.1875rem',
                      padding: '24px 24px 4px 24px',
                    },
                    children: <OrderEditSingleExtraInfo />,
                  },
                },
              ],
            },
          ]}
          data-model="container"
        />
      )}
      {shippingStatus === '8' && (
        <GridLayout
          {...props}
          header={
            <PageHeader
              breadcrumbLinks={ORDER_SINGLE_CONSTANTS.header.breadcrumb}
              breadcrumbTitle="Chỉnh sửa đơn hàng"
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: '',
                  props: {
                    style: {
                      position: 'relative',
                      background: 'transparent',
                      padding: '0',
                      marginTop: '-24px',
                    },
                    children: <ToolbarInStore />,
                  },
                },
                {
                  title: 'Thông tin khách hàng',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px',
                      maxHeight: '364px',
                    },
                    children: <OrderEditSingleCustomerInfo />,
                  },
                },
                {
                  title: 'Thông tin sản phẩm',
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px 24px 0 24px'
                    },
                    children: <OrderEditSingleProductInfo />,
                  },
                },
                {
                  title: 'Thông tin vận chuyển',
                  description: (state.form.shippingInfo.shippingPartner?.list?.length === 0 && !state.skeleton) ? '' :
                    (state.form.productInfo.inventory &&
                      state.form.shippingInfo.isStorePickUp)
                      ? 'Đơn hàng này sẽ không bàn giao đối tác vận chuyển vì khách hàng nhận hàng tại cửa hàng.'
                      : 'Tùy thuộc vào gói cước bạn đã thỏa thuận với đối tác vận chuyển, phí vận chuyển dự kiến có thể thay đổi.',
                  props: {
                    style: {position: 'relative', marginBottom: 0, padding: '30px 24px 5px 24px'},
                    children: <OrderEditSingleShippingInfo />,
                  },
                },
                {
                  type: 'sticky-bottom-transparent',
                  props: {
                    style: {
                      position: 'sticky',
                      bottom: -44,
                      marginBottom: -40,
                      padding: '12px 24px 12px 12px',
                      zIndex: 19,
                    },
                    children: <ActionFormEditBtnList />,
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
                    style: {
                      minHeight: '28.1875rem',
                      padding: '24px 24px 4px 24px',
                    },
                    children: <OrderEditSingleExtraInfo />,
                  },
                },
                {
                  title: 'Hình thức thanh toán',
                  props: {
                    style: {
                      minHeight: '11.8125rem',
                      padding: '24px 24px 0 24px',
                    },
                    children: <OrderEditSinglePaymentMethod  state={state.form.shippingInfo.isStorePickUp} />,
                  },
                },
              ],
            },
          ]}
          data-model="container"
        />
      )}
    </StyledEditOrderGrid>
  )
}


export const StyledEditOrderGrid = styled.div`
   .grid-layout__section-header h3 {
      margin-bottom: -8px;
   }
`