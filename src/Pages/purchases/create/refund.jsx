import { GridLayout } from 'layouts/gridLayout'
import { PageHeader } from 'layouts/pageHeader'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { PurchasesReducer } from '../provider/_reducer'
import { PurchasesInitialState } from '../provider/initState'
import { PurchasesProvider } from '../provider/index'
import { useParams } from 'react-router-dom'
import { ActionRefundBtnList } from '../components/actionFormBtnList/refunButtons'
import useRefundPurchase from '../hooks/useRefundPurchase'
import { RefundExtraInfo } from '../components/section/_extraInfo/refundExtra'
import { RefundProduct } from '../components/section/_productInfo/refundProduct'
import { RefundPayment } from '../components/section/_vendorPayment/refundPayment'
import useRefundPurchaseProductInfo from '../hooks/useRefundPurchaseProductInfo'
import useRefundPurchasePaymentVendor from '../hooks/useRefundPurchasePaymentVendor'
import { STATUS_WAREHOUSE } from '../interfaces/_constants'

export const RefundPurchases = () => {
  const [state, dispatch] = useReducer(PurchasesReducer, PurchasesInitialState)

  return (
    <PurchasesProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <PageContainer/>
    </PurchasesProvider>
  )
}

const PageContainer = ({ ...props }) => {
  const { methods, detail } = useRefundPurchase()
  const productInfo = useRefundPurchaseProductInfo()
  const paymentInfo = useRefundPurchasePaymentVendor()
  const { purchaseId } = useParams()

  useEffect(() => {
    productInfo.methods.onFetchProduct()
    paymentInfo.methods.onFetchPayment()
    if (!!purchaseId) methods.getPurchaseDetail()
  }, [])
  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={[{
            id: 1,
            name: `Quay lại phiếu nhập hàng ${detail?.code}`,
            url: `/purchase/edit/${purchaseId}`,
            isBack: true
          }]}
          breadcrumbTitle={'Hoàn trả phiếu nhập hàng ' + detail?.code}
        />
      }
      grid={[
        {
          width: 70,
          sections: (+detail?.is_stock == 1 && +detail?.warehouse_status !== +STATUS_WAREHOUSE.hoan_tra_toan_bo.status && +detail?.payment_status !== 1) ? [
              {
                title: 'Thông tin sản phẩm hoàn trả',
                props: {
                  style: { position: 'relative' },
                  children: <RefundProduct/>,
                },
              },
              {
                title: 'Nhận tiền hoàn lại từ nhà cung cấp',
                props: {
                  style: { position: 'relative' },
                  children: <RefundPayment/>,
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
                    // background: 'transparent'
                  },
                  children: <ActionRefundBtnList/>,
                },
              },
            ]
            : detail?.is_stock == 1 && +detail?.warehouse_status !== +STATUS_WAREHOUSE.hoan_tra_toan_bo.status
              ? [
                {
                  title: 'Thông tin sản phẩm hoàn trả',
                  props: {
                    style: { position: 'relative' },
                    children: <RefundProduct/>,
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
                      // background: 'transparent'
                    },
                    children: <ActionRefundBtnList/>,
                  },
                },
              ]
              : [
                {
                  title: 'Nhận tiền hoàn lại từ nhà cung cấp',
                  props: {
                    style: { position: 'relative' },
                    children: <RefundPayment/>,
                  },
                },
                {
                  type: 'sticky-bottom-transparent',
                  props: {
                    style: {
                      position: 'sticky',
                      bottom: -44,
                      zIndex: 10,
                      marginBottom: 0,
                      padding: '12px 24px',
                      // background: 'transparent'
                    },
                    children: <ActionRefundBtnList/>,
                  },
                },
              ]
          ,
          props: { style: { position: 'relative' } },
        },
        {
          width: 30,
          sections:
            [
              {
                title: 'Thông tin bổ sung',
                props: {
                  children: <RefundExtraInfo/>,
                },
              },
            ],
        },
      ]}
      data-model="container"
    />
  )
}
