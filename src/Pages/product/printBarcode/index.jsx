import React from 'react';
import {ProductProvider} from "../provider";
import useProduct from "../hooks/useProduct";
import {PageHeader} from "../../../layouts/pageHeader";
import {PRINT_BARCODE_PRODUCT_CONSTANTS} from "../interfaces/~constants";
import {GridLayout} from "../../../layouts/gridLayout";
import PaperSize from "./paperSize";
import ActionFormBtnList from "./actionFormBtnList";
import ProductInformation from "./productInfomation";
import SettingTemplate from "./settingTemplate";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const PrintBarcode = ({...props}) => {
  const { t } = useTranslation()
  const {provider} = useProduct()
  const {state, dispatch} = provider

  return (
    <>
      <ProductProvider value={{pageState: state, pageDispatch: dispatch}}>
        <GridLayout
          {...props}
          header={
            <PageHeader
              breadcrumbLinks={PRINT_BARCODE_PRODUCT_CONSTANTS?.header?.breadcrumb}
              breadcrumbTitle={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRINT_BARCODE)}
            />
          }
          grid={[
            {
              width: 70,
              sections: [
                {
                  title: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INFO),
                  props: {
                    style: {
                      position: 'relative',
                      padding: '24px'
                    },
                    children: <ProductInformation />,
                  },
                },
                {
                  title: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PAPER_SIZE),
                  props: {
                    style: {
                      position: 'relative',
                      padding: '26px 24px'
                    },
                    children: <PaperSize />,
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
                      padding: "12px 24px 0 12px"
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
                  title: t(DISPLAY_NAME_MENU.PRODUCT_PAGE.SETUP_TEMPLATE),
                  props: {
                    style: {
                      padding: '22px 24px 24px 24px',
                    },
                    children: <SettingTemplate />,
                  },
                },
              ],
            },
          ]}
          data-model="container"
        />
      </ProductProvider>
    </>
  );
};

export default PrintBarcode;