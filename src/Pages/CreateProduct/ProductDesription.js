import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import CheckBox from "../../Component/CheckBox/CheckBox";
import ChipsInput from "Component/ChipsInput/ChipsInput";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "LayoutWrapper";
import ButtonGroup from "Component/ButtonGroup/buttonGroup";
import { unmountComponentAtNode } from "react-dom";
import { getUrlUnitList, getUrlWarehouse } from "api/url";
import { getData } from "api/api";
import Dropdown from "Component/PureDropdown/Dropdown";

const RenderMiniDropdown = ({ ...props }) => {
  const {
    listOption = [
      { label: "kg", value: "kg" },
      { label: "g", value: "g" },
    ],
    callBack = () => {},
    selected = {},
  } = props;
  const ref = useRef(null);
  const [isShow, changeIsShow] = useState(null);
  const expandIcon = useRef(null);
  const didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
    console.log("didmout");
  };
  const unmout = () => {
    document.removeEventListener("mousedown", handleClickOutside);
    console.log("unmout");
  };
  useEffect(() => {
    didmout();
    return () => unmout();
  }, []);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      changeIsShow(false);
      if (!expandIcon) return;
      const icon = expandIcon.current;
      icon.style.transform = "rotate(0deg)";
    }
  };
  return (
    <div
      ref={ref}
      onClick={(e) => {
        changeIsShow(true);
      }}
      className="mini-wrapper upos-text"
    >
      <div className="mini-selected">{selected.label || ""}</div>
      <img
        ref={expandIcon}
        className={
          isShow
            ? "turn-down add-effect-all expand-dropdown"
            : "turn-back add-effect-all expand-dropdown"
        }
        src="/svg/arr-gray.svg"
      />
      <div
        className={
          isShow
            ? "upos-show-item mini-item-wrap"
            : "upos-hide-item mini-item-wrap"
        }
      >
        {listOption.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              changeIsShow(false);
              callBack && callBack(item);
            }}
            className="mini-item"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
const RenderItemAttribute = ({ ...params }) => {
  let {
    item = {},
    index = 0,
    isFirt = false,
    arrChips = [],
    onDeleteAttribute = () => {},
  } = params;
  const [name, changName] = useState(item.name);
  const { t } = useTranslation();
  return (
    <Grid spacing={3} container className="">
      <Grid item xs={12} sm={12} md={5} spacing={2} className="">
        <div className="product-property-name-wrap">
          <div className="label-input product-info-label">
            {t("name_variable")}
          </div>
          <input
            value={name}
            onChange={(e) => {
              const text = e.target.value;
              changName(text);
            }}
            className="upos-input upos-text product-input product-input-weight"
          />
        </div>
      </Grid>
      <Grid
        item
        xs={!isFirt ? 11 : 12}
        sm={!isFirt ? 11 : 12}
        md={!isFirt ? 6 : 7}
        spacing={2}
        className="upos-row-attribute"
      >
        <div key={index} className="product-property-value-wrap">
          <div className="label-input product-info-label">
            {t("value_variable")}
          </div>
          <ChipsInput
            handleAddChip={(item) => {
              if (item) {
                arrChips.push(item);
              }
            }}
            handleDeleteChip={(item, index) => {
              arrChips.splice(index, 1);
            }}
            chips={arrChips}
          />
        </div>
      </Grid>
      {!isFirt ? (
        <Grid item xs={1} sm={1} md={1} className="add-item-attribute">
          <div
            onClick={() => {
              onDeleteAttribute(index);
            }}
            className="button-delete-attribute"
          >
            <img
              className="delete-variable-prodcut"
              src="/img/grid/delete.svg"
            />
          </div>
        </Grid>
      ) : null}
    </Grid>
  );
};
export default function ProductDesription({ ...props }) {
  const { t } = useTranslation();
  const [productState, dispatchProductState] = useContext(ProductContext);
  const dataProduct = productState.product.productInfo;
  const [imgFile, changeImgFile] = useState(null);
  const [basePrice, changeBasePrice] = useState("");
  const [originInventory, changeOriginInventory] = useState("");
  const [listUnit, changeListUnit] = useState([]);
  const [listWarehouse, changeListWareHouse] = useState([]);
  const [imgSrc, changeImgSrc] = useState("/img/order/image_uploader.png");
  const addImgRef = useRef(null);
  const addFileRef = useRef(null);
  const unit = dataProduct.unit;
  const didmount = () => {
    const url = getUrlUnitList();
    getData(url).then((res) => {
      if (res && res.data && res.data.success) {
        let data = res.data.data;
        data.map((v, i) => {
          v.label = v.unit_name;
          v.value = v.id;
        });
        changeListUnit(data);
      }
    });
    const urlWareHouse = getUrlWarehouse({});
    getData(urlWareHouse).then((res) => {
      if (res && res.data && res.data.success) {
        let data = res.data.data;
        data.map((v, i) => {
          v.label = v.warehouse_name;
          v.value = v.id;
          if (v.is_main === "1") {
            dispatchProductState({
              type: "UPDATE_PRODUCT_INFO",
              payload: { warehouse: v },
            });
          }
        });
        changeListWareHouse(data);
      }
    });
  };
  const unmount = () => {};
  useEffect(() => {
    didmount();
    return () => unmount();
  }, []);

  const addImage = (e) => {
    try {
      if (!e) {
        return;
      }
      if (e && e.target && e.target.files[0]) {
        changeImgFile(e.target.files[0]);
        dispatchProductState({
          type: "UPDATE_PRODUCT_INFO",
          payload: { image_thumb: e.target.files[0] },
        });
        const reader = new FileReader();
        reader.onload = function (e) {
          if (
            e &&
            e.target &&
            e.target.result
            // addImgRef &&
            // addImgRef.current
          ) {
            // addImgRef.current.src = e.target.result;
            changeImgSrc(e.target.result);

            console.log("kyn load done");
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onChangeBasePrice = (e) => {
    const text = e.target.value;
    changeBasePrice(text);
  };
  const onChangeOriginInventory = (e) => {
    const text = e.target.value;
    changeOriginInventory(text);
  };
  console.log("lengt arr attr kynkyn" + dataProduct.arr_attr.length);
  return (
    <div className="info-wrapper product-create-description">
      <div className="title-client-info product-des-title">
        {t("product_desription_optional")}
      </div>
      <div className="product-desription-wrap">
        <div
          onClick={() => {
            addImage();
          }}
          className="image-product"
        >
          <div className="upos-text">{t("image")}</div>
          <img
            onClick={() => {
              if (addFileRef && addFileRef.current) {
                addFileRef.current.click();
              }
            }}
            ref={addImgRef}
            className="upos-image-thumbail"
            src={imgSrc}
          />
          <input
            className="upos-hide-item upos-display-none"
            ref={addFileRef}
            type="file"
            onChange={(e) => addImage(e)}
          ></input>
        </div>
        <div className="des-product upos-text">
          <div className="upos-text">{t("desc")}</div>
          <textarea className="upos-textare upos-text" />
        </div>
      </div>
      <div className="title-client-info product-des-title">
        <div className="left-title">{t("ware_house")}</div>
        <div className="right-title">
          <CheckBox
            text="init_warehouse"
            status={dataProduct.initWarehouse}
            onCallBack={(status) => {
              dispatchProductState({
                type: "UPDATE_PRODUCT_INFO",
                payload: { initWarehouse: !status },
              });
            }}
          />
        </div>
      </div>
      <div className="product-warehouse-wrap">
        <Grid spacing={3} container className="">
          <Grid item xs={12} sm={12} md={6} spacing={2} className="">
            <div className="product-weight-wrap">
              <div className="label-input product-info-label">
                {t("weight_optional")}
              </div>
              <div className="create-product-unit-input">
                <input className="upos-input upos-text product-input product-input-weight" />
                <RenderMiniDropdown
                  selected={dataProduct.weight}
                  callBack={(item) => {
                    dispatchProductState({
                      type: "UPDATE_PRODUCT_INFO",
                      payload: { weight: item },
                    });
                  }}
                />
              </div>
            </div>
            <div className="label-input product-info-label">
              {t("product_category")}
            </div>
            <Dropdown
              listOption={listWarehouse}
              cb={(item) => {
                dispatchProductState({
                  type: "UPDATE_PRODUCT_INFO",
                  payload: { warehouse: item },
                });
              }}
              selected={dataProduct.warehouse}
              customClass="product-create-category dropdown-type2"
              customStyle="selected-full-width"
              byPassTran={true}
              expandIconPath={"/svg/arr-gray.svg"}
            />
            <div className="label-input product-info-label">
              {t("base_price")}
            </div>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => onChangeBasePrice(e)}
              className="upos-input upos-text product-input product-input-price"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            spacing={2}
            className="product-create-warehouse-right"
          >
            <div className="product-unit-row">
              <div className="product-unit-wrap">
                <div className="label-input product-info-label">
                  {t("unit-label")}
                </div>
                <Dropdown
                  listOption={listUnit}
                  cb={(item) => {
                    dispatchProductState({
                      type: "UPDATE_PRODUCT_INFO",
                      payload: { unit: item },
                    });
                  }}
                  selected={unit}
                  customClass="product-create-category dropdown-type2"
                  customStyle="selected-full-width"
                  byPassTran={true}
                  expandIconPath={"/svg/arr-gray.svg"}
                />
              </div>

              <div
                onClick={() => {
                  dispatchProductState({
                    type: "UPDATE_STATUS_MODAL_CREATE_PRODUCT_UNIT",
                    payload: true,
                  });
                }}
                className="button-add"
              >
                +
              </div>
            </div>

            <div className="label-input product-info-label">
              {t("origin_inventory")}
            </div>
            <input
              type="number"
              value={originInventory}
              onChange={(e) => onChangeOriginInventory(e)}
              className="upos-input upos-text product-input product-input-price"
            />
          </Grid>
        </Grid>
      </div>
      <div className="title-client-info product-des-title">
        <div className="left-title">{t("product_property")}</div>
        <div className="right-title">
          <CheckBox
            text="product_multi_attribute"
            status={dataProduct.isMulti}
            onCallBack={(status) => {
              dispatchProductState({
                type: "UPDATE_PRODUCT_INFO",
                payload: { isMulti: !status },
              });
            }}
          />
        </div>
      </div>
      {dataProduct.isMulti ? (
        <>
          <div className="product-property-wrap">
            {<RenderItemAttribute isFirt={true} />}
            {dataProduct.arr_attr && dataProduct.arr_attr.length
              ? dataProduct.arr_attr.map((item, index) => {
                  return (
                    <RenderItemAttribute
                      item={item}
                      index={index}
                      arrChips={item.arr_value}
                      onDeleteAttribute={(i) => {
                        dispatchProductState({
                          type: "DELETE_PRODUCT_ATTRIBUTE",
                          payload: i,
                        });
                      }}
                    />
                  );
                })
              : null}
          </div>
          <div
            onClick={() => {
              try {
                let emptyObj = [
                  {
                    name: `thuộc tính mới ${
                      (dataProduct.arr_attr.length || 0) + 1
                    } ( ấn để sửa )`,
                    arr_value: [],
                  },
                ];
                dispatchProductState({
                  type: "UPDATE_PRODUCT_ATTRIBUTE",
                  payload: emptyObj,
                });
              } catch (error) {
                console.log("error");
              }
            }}
            className="add-property cursor-pointer"
          >
            {t("add_property")}
          </div>
        </>
      ) : null}
    </div>
  );
}
