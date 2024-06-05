import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { useConfigContext } from "../../Component/NavBar/navBar";
import TabView from "../../Component/Tabview/tabview";
import ButtonBack from "../../Component/BtnBack/buttonBack";
import ProductDesription from "./ProductDesription";
import ProductInfo from "./ProductInfo";
import SingleButton from "../../Component/SingleButton/SingleButton";
import ButtonGroup from "../../Component/ButtonGroup/buttonGroup";
import { Fragment, useContext } from "react";
import { ProductContext } from "LayoutWrapper";
import SimpleModal from "../../Component/Modal/modal";
import EditAndNewUnit from "Pages/UnitManagement/EditAndNewUnit";
import PopupCreateUnit from "./PopUpCreateUnit";
const fs = require("fs");
const FormData = require("form-data");
export default function CreateProduct({ ...pros }) {
  const { t } = useTranslation();
  const { openMenu } = useConfigContext();
  const [productState, dispatchProductState] = useContext(ProductContext);
  const CreateProductAction = () => {
    var data = new FormData();
    // const objImg = fs.createReadStream();
    // data.append("product_image");
  };
  const changeTabView = (item) => { };
  return (
    <Fragment>
      <SimpleModal
        open={productState.product.modalUnit.isShow}
        callback={() => {
          dispatchProductState({
            type: "UPDATE_STATUS_MODAL_CREATE_PRODUCT_UNIT",
            payload: false,
          });
        }}
      >
        <PopupCreateUnit />
      </SimpleModal>
      <SimpleModal
        open={productState.product.modalCategory.isShow}
        callback={() => {
          dispatchProductState({
            type: "UPDATE_STATUS_MODAL_CREATE_PRODUCT_CATEGORY",
            payload: false,
          });
        }}
      >
        <div>Modal Category here</div>
      </SimpleModal>
      <div className="order_tab">
        <TabView
          t={t}
          list={[
            {
              label: "management_product",
              value: "management_product",
            },
            {
              label: "management_index",
              value: "management_index",
            },
            {
              label: "management_unit",
              value: "management_unit",
            },
          ]}
          cb={(item) => changeTabView(item)}
        //   selected={}
        />
        <Grid container className="new-order-line1">
          <Grid item xs={12} sm={12} md={3} className="new-order-line1-1">
            <ButtonBack />
            <div className="title-page new-product">{t("create_product")}</div>
          </Grid>
        </Grid>
        <div className="bg-order-cmp">
          <Grid container className="new-order-line2 create-product-wrap">
            <Grid className="new-order-line2-1" item xs={12} sm={12} md={6}>
              <ProductInfo />
            </Grid>
            <Grid className="new-order-line2-2" item xs={12} sm={12} md={6}>
              <ProductDesription />
            </Grid>
            <Grid
              className="create-product-fotter-grid"
              item
              xs={12}
              sm={12}
              md={12}
            >
              <div className="create-product-fotter">
                <ButtonGroup
                  customClassName=""
                  list={[
                    {
                      label: t("close"),
                      fnFunction: () => { },
                      customClass: "close-button",
                    },
                    {
                      label: t("create_product"),
                      fnFunction: () => {
                        CreateProductAction();
                      },
                      customClass: "create-product-button",
                    },
                  ]}
                />
              </div>
              <div className="fake-div-80"></div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
}
