import {GridLayout} from 'layouts/gridLayout'
import {PageHeader} from 'layouts/pageHeader'
import {useEffect} from 'react'
import {useReducer} from 'react'
import {ActionFormBtnList} from '../components/actionFormBtnList'
import { PurchasesReducer } from '../provider/_reducer'
import { PurchasesInitialState } from '../provider/initState'
import { PurchasesProvider } from '../provider/index'
import { CREATE_PURCHASE_CONSTANTS } from '../interfaces/_constants'
import { GeneralInfo } from '../components/section/_generalInfo'
import {ProductPurchase} from "../components/section/_productInfo";
import usePurchaseProductInfo from "../hooks/usePurchaseProductInfo";
import {ExtraInfo} from "../components/section/_extraInfo";
import {PurchaseActive} from "../components/section/_extraInfo/purchase";
import {VendorPayment} from "../components/section/_vendorPayment";
import usePurchasePaymentVendor from '../hooks/usePurchasePaymentVendor'
import usePurchaseGeneralInfo from '../hooks/usePurchaseGeneralInfo'

export const CreatePurchases = () => {
  const [state, dispatch] = useReducer(PurchasesReducer, PurchasesInitialState)

  return (
    <PurchasesProvider value={{pageState: state, pageDispatch: dispatch}}>
      <PageContainer />
    </PurchasesProvider>
  )
}

const PageContainer = ({...props}) => {
  const productInfo = usePurchaseProductInfo()
  const paymentInfo = usePurchasePaymentVendor()
  const generalInfo = usePurchaseGeneralInfo()

  useEffect(() => {
    productInfo.methods.onFetchProduct()
    paymentInfo.methods.onFetchMethodOrigin()
    generalInfo.methods.onFetchVendor()
    generalInfo.methods.onFetchWarehouse()
  }, [])

  return (
    <GridLayout
      {...props}
      header={
        <PageHeader
          breadcrumbLinks={CREATE_PURCHASE_CONSTANTS.header.breadcrumbCreate}
          breadcrumbTitle="Tạo mới phiếu nhập hàng"
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
                children: <GeneralInfo/>,
              },
            },
            {
              title: 'Thông tin sản phẩm',
              props: {
                style: {position: 'relative'},
                children: <ProductPurchase/>,
              },
            },
            {
              title: 'Nhập kho',
              props: {
                style: {position: 'relative'},
                children: <PurchaseActive />,
              },
            },
            {
              title: 'Thanh toán cho nhà cung cấp',
              props: {
                style: {position: 'relative'},
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
                children: <ExtraInfo />,
              },
            },
          ],
        },
      ]}
      data-model="container"
    />
  )
}
