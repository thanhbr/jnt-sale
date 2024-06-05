import React, {useEffect} from 'react';
import useGiveBackProduct from "../hooks/useGiveBackProduct";
import {GiveBackProductProvider} from '../provider'
import {PageHeader} from "../../../layouts/pageHeader";
import {GridLayout} from "../../../layouts/gridLayout";
import {EDIT_GIVEBACK_PRODUCT_CONSTANTS} from "../interfaces/contants";
import HeaderRefundProduct from "./components/refundProduct/header";
import BodyRefundProduct from "./components/refundProduct/body";
import GetRefund from "./components/getRefund";
import HeaderRefundCustomer from "./components/refundCustomer/header";
import BodyRefundCustomer from "./components/refundCustomer/body";
import AdditionalInfo from "./components/additionalInfo";
import ActionFormBtnList from "./components/actionFormBtnList";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const CreateGiveBackProductPage = () => {
  const {t} = useTranslation()
  const {fetch, provider} = useGiveBackProduct()
  const {state, dispatch} = provider
  useEffect(() => {
    fetch?.origin()
  }, [])
  return (
    <GiveBackProductProvider value={{pageState: state, pageDispatch: dispatch}}>
      <GridLayout
        header={
          <PageHeader
            breadcrumbLinks={EDIT_GIVEBACK_PRODUCT_CONSTANTS?.header?.breadcrumb}
            breadcrumbTitle={t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.CREATE)}
          />
        }
        grid={[
          {
            width: 70,
            sections: [
              {
                title: (<HeaderRefundProduct />),
                props: {
                  style: {
                    position: 'relative',
                    padding: 24
                  },
                  children: <BodyRefundProduct />,
                },
              },
              {
                title: (<GetRefund /> ),
                props: {
                  style: {
                    position: 'relative',
                    padding: '24px 24px 0 24px'
                  },
                  children: <></>,
                },
              },
              {
                title: (<HeaderRefundCustomer />),
                props: {
                  style: {
                    position: 'relative',
                    padding: '24px 24px 0 24px'
                  },
                  children: <BodyRefundCustomer />,
                },
              },
              {
                type: 'sticky-bottom-transparent',
                props: {
                  style: {
                    position: 'sticky',
                    bottom: -44,
                    marginBottom: 0,
                    zIndex: 999,
                    padding: 24
                  },
                  children: <ActionFormBtnList />,
                },
              },
            ],
            props: {style: {position: 'relative'}},
          },
          {
            width: 30,
            sections: [{
              title: (<><span>{t(DISPLAY_NAME_MENU.GENERAL.ADDITIONAL_INFO)}</span></>),
              props: {
                children: <AdditionalInfo />,
                style: {
                  padding: '30px 24px',
                },
              },
            },],
            props: {
              style: {
                position: 'sticky',
                top: 39,
              },
            }
          },
        ]}
        data-model="container"
      />
    </GiveBackProductProvider>
  )
}

export default CreateGiveBackProductPage