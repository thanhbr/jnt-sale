import { GridLayout } from 'layouts/gridLayout'
import { PageHeader } from 'layouts/pageHeader'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { ActionFormBtnList } from '../components/actionFormBtnList'
import { PurchasesReducer } from '../provider/_reducer'
import { PurchasesInitialState } from '../provider/initState'
import { PurchasesProvider } from '../provider/index'
import { CREATE_PURCHASE_CONSTANTS } from '../interfaces/_constants'
import { GeneralInfo } from '../components/section/_generalInfo'
import { ProductPurchase } from '../components/section/_productInfo'
import usePurchaseProductInfo from '../hooks/usePurchaseProductInfo'
import { ExtraInfo } from '../components/section/_extraInfo'
import { PurchaseActive } from '../components/section/_extraInfo/purchase'
import { VendorPayment } from '../components/section/_vendorPayment'
import usePurchasePaymentVendor from '../hooks/usePurchasePaymentVendor'
import usePurchaseGeneralInfo from '../hooks/usePurchaseGeneralInfo'
import { useParams } from 'react-router-dom'
import useCreatePurchase from '../hooks/useCreatePurchase'
import { ActionRefund } from '../components/section/_statusInfo/actionRefund'
import { PURCHASES_ICONS } from '../interfaces/_icons'
import { Tooltip } from '../../../common/tooltip'
import { StatusInfo } from '../components/section/_statusInfo'

export const EditPurchases = () => {
  const [state, dispatch] = useReducer(PurchasesReducer, PurchasesInitialState)

  return (
    <PurchasesProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <PageContainer/>
    </PurchasesProvider>
  )
}

const PageContainer = ({ ...props }) => {
  const { methods, statusInfo } = useCreatePurchase()
  const productInfo = usePurchaseProductInfo()
  const paymentInfo = usePurchasePaymentVendor()
  const generalInfo = usePurchaseGeneralInfo()
  const { purchaseId } = useParams()

  useEffect(() => {
    productInfo.methods.onFetchProduct()
    paymentInfo.methods.onFetchMethodOrigin()
    generalInfo.methods.onFetchVendor()
    generalInfo.methods.onFetchWarehouse()
    if (!!purchaseId) methods.getPurchaseDetail()
  }, [])

  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={CREATE_PURCHASE_CONSTANTS.header.breadcrumbEdit}
          breadcrumbTitle={
            (<>Chỉnh sửa phiếu nhập hàng {!statusInfo?.canEdit &&
            <Tooltip title={'Không thể chỉnh sửa phiếu nhập hàng đã nhập kho'}
                     className={'--danger'}
                     placement={'bottom-start'}>
              {PURCHASES_ICONS.error}
            </Tooltip>}</>)
          }
        />
      }
      grid={[
        {
          width: 70,
          sections:

            productInfo.data.totalAmount !== (productInfo.data.totalPayment - productInfo.totalReturn)
              ?
              [
                {
                  title: 'Thông tin chung',
                  props: {
                    style: { position: 'relative' },
                    children: <GeneralInfo/>,
                  },
                },
                {
                  title: 'Thông tin sản phẩm',
                  props: {
                    style: { position: 'relative' },
                    children: <ProductPurchase/>,
                  },
                },
                {
                  title: 'Nhập kho',
                  props: {
                    style: { position: 'relative' },
                    children: <PurchaseActive/>,
                  },
                },
                {
                  title: 'Thanh toán cho nhà cung cấp',
                  props: {
                    style: { position: 'relative' },
                    children: <VendorPayment/>,
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
                    children: <ActionFormBtnList/>,
                  },
                }
              ]
              : [
                {
                  title: 'Thông tin chung',
                  props: {
                    style: { position: 'relative' },
                    children: <GeneralInfo/>,
                  },
                },
                {
                  title: 'Thông tin sản phẩm',
                  props: {
                    style: { position: 'relative' },
                    children: <ProductPurchase/>,
                  },
                },
                {
                  title: 'Nhập kho',
                  props: {
                    style: { position: 'relative' },
                    children: <PurchaseActive/>,
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
                    children: <ActionFormBtnList/>,
                  },
                },
              ]
          ,
          props: { style: { position: 'relative' } },
        },
        {
          width: 30,
          sections: (
            (productInfo.detail.warehouse_status == 1 && +statusInfo?.paymentStatus == 1)
            || ([1, 5].includes(+statusInfo?.paymentStatus) && productInfo.detail.warehouse_status == 4)
          ) ?
            [
              {
                title: 'Thông tin trạng thái',
                props: {
                  children: <StatusInfo/>,
                },
              },
              {
                title: 'Thông tin bổ sung',
                props: {
                  children: <ExtraInfo/>,
                },
              },
            ]
            :
            [
              {
                title: 'Thông tin trạng thái',
                props: {
                  children: <StatusInfo/>,
                },
              },
              {
                title: 'Thực hiện hoàn trả',
                props: {
                  style: { position: 'relative' },
                  children: (<ActionRefund/>),
                },
              },
              {
                title: 'Thông tin bổ sung',
                props: {
                  children: <ExtraInfo/>,
                },
              },
            ],
        },
      ]}
      data-model="container"
    />
  )
}
