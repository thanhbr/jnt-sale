/* eslint-disable @babel/no-unused-expressions */
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getData, postData } from "../../api/api";
import {
  getUrlCategory,
  getUrlCreateCategory,
  getUrlCreateUnit,
  getUrlUpdateCategory,
  getUrlUpdateStatus,
  getUrlUpdateUnit,
} from "../../api/url";
import AsyncDropdown from "../../Component/AsyncDropdown/asyncDropdown";
import { ProductContext } from "../../LayoutWrapper";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { useWindowSize } from "../../Component/ListMenu/listMenu";
import useGlobalContext from "../../containerContext/storeContext";

let TimeOut = null;
function RenderRow({ ...props }) {
  const { value = "", callBack = () => {}, messageError, label = "" } = props;
  const { t } = useTranslation();
  const [text, changeText] = useState("");
  useEffect(() => {}, [text, value, messageError]);
  return (
    <>
      <div className="name-client-info">
        <div className="label-input new-category-label">
          {label ? t(label) : "missing_label"}
        </div>
        <div className="name-wrapper">
          <input
            value={text || value}
            className={
              messageError
                ? "border-red-input client-input upos-text"
                : "client-input upos-text"
            }
            onChange={(e) => {
              changeText(e.target.value);
              callBack && callBack(e.target.value);
            }}
          />
          {/* <img onClick={() => {}} src="/svg/contact.svg" /> */}
        </div>
      </div>
      <div className="upos-error-text upos-animation-opacity upos-text">
        {messageError ? t(messageError) : ""}
      </div>
    </>
  );
}

export default function PopupCreateUnit({ ...props }) {
  const { callBack = () => {} } = props;
  const [GlobalState, GlobalDispatch] = useGlobalContext();
  const [producState, dispatchProductState] = useContext(ProductContext);
  const [listParentCategory, changeListParentCategory] = useState([]);
  const { t } = useTranslation();
  const state = producState.unit.stateWidget;
  const data = state.data;
  const objError = state.objError;
  const isEdit = state.isEdit;
  const [textAre, changeTextAre] = useState("");
  const [width, height] = useWindowSize();

  const CloseClick = (e) => {
    dispatchProductState({
      type: "UPDATE_STATUS_MODAL_CREATE_PRODUCT_UNIT",
      payload: false,
    });
    dispatchProductState({
      type: "CHANGE_DATA_WIDGET_UNIT",
      payload: {
        unit_name: "",
        unit_short_name: "",
      },
    });
    // callBack && callBack();
  };
  const HandleClickConfirm = () => {
    let objError = {
      unit_name: "",
      unit_short_name: "",
    };
    if (!data.unit_name) {
      objError.unit_name = "invalid_category_code";
    }
    if (objError.unit_name) {
      dispatchProductState({
        type: "UPDATE_OBJ_ERROR_UNIT",
        payload: objError,
      });
      return;
    }
    dispatchProductState({
      type: "UPDATE_OBJ_ERROR",
      payload: {
        unit_name: "",
      },
    });
    let url;
    isEdit ? (url = getUrlUpdateUnit(data.id)) : (url = getUrlCreateUnit());
    if (!url) {
      return;
    }
    const dataRequest = JSON.stringify(data);
    postData(url, dataRequest)
      .then((res) => {
        if (res && res.data && res.data.success) {
          const listMessage = GlobalState.noti;
          const newListMessage = {
            ...listMessage,
            ...{
              [res.data.message]: {
                type: "",
                autoHide: true,
                icon: "success",
                prefix: "",
                status: "success",
              },
            },
          };
          GlobalDispatch({
            type: "UPDATE_MESSAGE",
            payload: newListMessage,
          });
          dispatchProductState({
            type: "UPDATE_OBJ_ERROR",
            payload: {
              category_code: "",
              category_name: "",
              parent_id: "",
              category_note: "",
            },
          });
          dispatchProductState({
            type: "CHANGE_DATA_WIDGET",
            payload: {
              category_code: "",
              category_name: "",
              parent_id: "",
              category_note: "",
            },
          });
          callBack && callBack();
        } else {
          let message = "create_unit_false";
          if (res && res.data && !res.data.success && res.data.errors) {
            message = res.data.errors.code;
          }
          const listMessage = GlobalState.noti;
          const newListMessage = {
            ...listMessage,
            ...{
              [message]: {
                type: "",
                autoHide: true,
                icon: "fail",
                prefix: "",
                status: "fail",
              },
            },
          };
          GlobalDispatch({
            type: "UPDATE_MESSAGE",
            payload: newListMessage,
          });
        }
      })
      .catch((error) => {
        const listMessage = GlobalState.noti;
        const newListMessage = {
          ...listMessage,
          ...{
            create_unit_false: {
              type: "",
              autoHide: true,
              icon: "fail",
              prefix: "",
              status: "fail",
            },
          },
        };
        GlobalDispatch({
          type: "UPDATE_MESSAGE",
          payload: newListMessage,
          scrollY,
        });
      });
  };
  useEffect(() => {
    const url = getUrlCategory({});
    getData(url)
      .then((res) => {
        console.log("kyn -- get list done");
        if (res && res.data && res.data.success) {
          let data = res.data.data;
          data.map((item, index) => {
            item.label = item.category_name;
            item.value = item.id;
          });
          changeListParentCategory(data);
        }
      })
      .catch((error) => {
        console.log("error get data");
      });
  }, []);

  return (
    <div className={"popup-create-unit-wrapper"}>
      <div className="popup-header">
        <div className="title-client-info">{t("create_unit_title")}</div>
        <div onClick={() => CloseClick()} className="close-modal-button">
          <img src="/svg/bigCloseButton.svg" />
        </div>
      </div>
      <RenderRow
        label="unit_name"
        value={data.unit_name}
        messageError={objError.category_code}
        callBack={(text) => {
          if (TimeOut) {
            clearTimeout(TimeOut);
          }
          setTimeout(() => {
            dispatchProductState({
              type: "CHANGE_DATA_WIDGET_UNIT",
              payload: {
                unit_name: text,
              },
            });
          });
        }}
      />
      <RenderRow
        label="unit_short_name"
        value={data.unit_short_name}
        messageError={objError.category_code}
        callBack={(text) => {
          if (TimeOut) {
            clearTimeout(TimeOut);
          }
          setTimeout(() => {
            dispatchProductState({
              type: "CHANGE_DATA_WIDGET_UNIT",
              payload: {
                unit_short_name: text,
              },
            });
          });
        }}
      />
      <div className="popup-create-button-row">
        <div
          onClick={() => {
            dispatchProductState({
              type: "UPDATE_STATUS_MODAL_CREATE_PRODUCT_UNIT",
              payload: false,
            });
          }}
          className={`cursor-pointer upos-button-active upos-text button-cancel-product`}
        >
          {t("cancel")}
        </div>
        <div
          onClick={() => {
            HandleClickConfirm();
          }}
          className={`cursor-pointer upos-button-active upos-text button-create-product`}
        >
          {t("create_new_unit")}
        </div>
      </div>
    </div>
  );
}
