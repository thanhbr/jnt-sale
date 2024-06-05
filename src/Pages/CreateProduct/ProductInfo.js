import { getData } from "api/api";
import { getUrlCategory } from "api/url";
import Dropdown from "Component/PureDropdown/Dropdown";
import { ProductContext } from "LayoutWrapper";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UposLogFunc } from "util/functionUtil";
let TimeOut;
export default function ProductInfo({ ...props }) {
  const { t } = useTranslation();
  const [productState, dispatchProductState] = useContext(ProductContext);
  const [name, changeName] = useState("");
  const [sku, changeSku] = useState("");
  const [bar, changeBarcode] = useState("");
  const [price, changePrice] = useState("");
  const [wholeSalePrice, changeWholeSalePrice] = useState("");
  const [originPrice, changeOriginPrice] = useState("");
  const [listCategory, changeListCategory] = useState([]);
  const state = productState.product.productInfo;
  const category = state.category;
  useEffect(() => {
    const url = getUrlCategory({});
    getData(url)
      .then((res) => {
        if (res && res.data && res.data.success) {
          let list = res.data.data;
          list.map((v, i) => {
            v.value = v.id;
            v.label = v.category_name;
          });
          changeListCategory(list);
        }
      })
      .catch((error) => {
        UposLogFunc(
          `ERROR GET DATA CATEGORY - CREATE-PRODUCT: ${error.message}`
        );
      });
  }, []);
  const onChangeName = (e) => {
    const text = e.target.value;
    changeName(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { product_name: text },
      });
    }, 300);
  };

  const onChangeSku = (e) => {
    const text = e.target.value;
    changeSku(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { id: text },
      });
    }, 300);
  };
  const onChangeBarcode = (e) => {
    const text = e.target.value;
    changeBarcode(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { barcode: text },
      });
    }, 300);
  };
  const onChangeOriginPrice = (e) => {
    const text = e.target.value;
    changeOriginPrice(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { origin_price: text },
      });
    }, 300);
  };
  const onChangeWholeSalePrice = (e) => {
    const text = e.target.value;
    changeWholeSalePrice(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { wholesale_price: text },
      });
    }, 300);
  };
  const onChangePrice = (e) => {
    const text = e.target.value;
    changePrice(text);
    if (TimeOut) {
      clearTimeout(TimeOut);
    }
    setTimeout(() => {
      dispatchProductState({
        type: "UPDATE_PRODUCT_INFO",
        payload: { price: text },
      });
    }, 300);
  };
  return (
    <div className="info-wrapper">
      <div className="title-client-info product-create-title">
        {t("product_information")}
      </div>
      <div className="label-input product-info-label">{t("product_name")}</div>
      <input
        value={name}
        onChange={(e) => onChangeName(e)}
        className="upos-input upos-text product-input product-input-name"
      />
      <div className="label-input product-info-label">{t("product_sku")}</div>
      <input
        value={sku}
        onChange={(e) => onChangeSku(e)}
        className="upos-input upos-text product-input product-input-sku"
      />
      <div className="label-input product-info-label">
        {t("product_barcode_optional")}
      </div>
      <input
        value={bar}
        onChange={(e) => onChangeBarcode(e)}
        className="upos-input upos-text product-input product-input-barcode"
      />
      <div className="label-input product-info-label">
        {t("product_category")}
      </div>
      <Dropdown
        listOption={listCategory}
        cb={(item) => {
          dispatchProductState({
            type: "UPDATE_PRODUCT_INFO",
            payload: { category: item },
          });
        }}
        selected={category}
        customClass="product-create-category dropdown-type2"
        customStyle="selected-full-width"
        byPassTran={true}
        expandIconPath={"/svg/arr-gray.svg"}
      />
      <div className="title-client-info product-create-title">
        {t("product_price")}
      </div>
      <div className="label-input product-info-label">
        {t("wholesale_price")}
      </div>
      <input
        type="number"
        value={wholeSalePrice}
        onChange={(e) => onChangeWholeSalePrice(e)}
        className="upos-input upos-text product-input product-input-price"
      />
      <div className="label-input product-info-label">{t("retail_price")}</div>
      <input
        type="number"
        value={price}
        onChange={(e) => onChangePrice(e)}
        className="upos-input upos-text product-input product-input-price"
      />
      <div className="label-input product-info-label">{t("origin_price")}</div>
      <input
        type="number"
        value={originPrice}
        onChange={(e) => onChangeOriginPrice(e)}
        className="upos-input upos-text product-input product-input-price"
      />
    </div>
  );
}
