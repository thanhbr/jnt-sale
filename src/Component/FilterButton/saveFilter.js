import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderContext } from "../../LayoutWrapper";
import { getUrlOrder } from "../../api/url";
import { getData } from "../../api/api";
import useGlobalContext from "../../containerContext/storeContext";

export function SaveFilter({ ...props }) {
  const { callback = () => {} } = props;
  const [state, dispatch] = useContext(OrderContext);
  const [activeInput, changeActiveInput] = useState(false);
  const [value, changeValue] = useState("save_filter");
  const [message, changeMessage] = useState("");
  const [stateGolbal, dispatchGlobal] = useGlobalContext();
  const { t } = useTranslation();
  const onChageText = (e) => {
    const text = e.target.value;
    changeValue(text);
  };
  const onClickCancel = () => {
    changeMessage("");
    changeValue("");
  };
  const onClickFilter = () => {
    changeValue("");
    changeActiveInput(true);
    changeMessage("");
  };
  const setNotification = () => {
    const listMessage = stateGolbal.noti;
    const newListMessage = {
      ...listMessage,
      ...{
        create_filter_success: {
          type: "filter",
          autoHide: true,
          icon: "success",
          prefix: value,
          status: "success",
        },
      },
    };
    dispatchGlobal({
      type: "UPDATE_MESSAGE",
      payload: newListMessage,
    });
  };
  const onClickSave = () => {
    if (!value) {
      changeMessage(t("name_must_not_empty"));
      return;
    }
    const {listFilter} = state;
    const arrFilter = Object.keys(listFilter);
    const ObjFilter = state.ObjectFilter;
    if (
      ObjFilter.warehouse_id === "" &&
      ObjFilter.shipping_partner === "" &&
      ObjFilter.shipping_status === "" &&
      ObjFilter.order_source === "" &&
      ObjFilter.employee === ""
    ) {
      changeMessage(t("filter_empty"));
      return;
    }
    if (arrFilter.includes(value)) {
      changeMessage(t("duplicate_filter"));
      return;
    } 
      const NewObj = {
        [value]: {
          warehouse_id: ObjFilter.warehouse_id,
          shipping_partner: ObjFilter.shipping_partner,
          shipping_status: ObjFilter.shipping_status,
          order_source: ObjFilter.order_source,
          employee: ObjFilter.employee,
        },
      };
      dispatch({ type: "SET_FILTER", payload: NewObj });
      dispatch({ type: "SET_STATUS_FILTER", payload: false });
      changeMessage("");
      setNotification();
    
    changeActiveInput(false);
    changeValue("save_filter");
  };

  const onSearchOrderWithFilter = () => {
    dispatch({ type: "SET_STATUS_FILTER", payload: false });
    // const ObjectFilter = state.ObjectFilter;
    // const url = getUrlOrder({});
    // getData(url)
    //   .then((res) => {})
    //   .catch((err) => {});
  };
  const onCancelFilter = () => {
    dispatch({ type: "CANCEL_FILTER" });
    dispatch({ type: "SET_STATUS_FILTER", payload: false });
  };
  //   const onSaveFilter = () => {};
  useEffect(() => {}, []);
  //   console.log("================" + activeInput);
  return (
    <>
      <div className="save-filter-wrapper ">
        <div onClick={() => onClickFilter()}>
          <input
            className={
              activeInput
                ? "input-filter-name upos-text upos-save-filter upos-save-filter"
                : "input-filter-disable upos-input upos-text upos-save-filter"
            }
            value={t(value)}
            onChange={(e) => onChageText(e)}
            disabled={!activeInput}
          />
          {message ? (
            <div className="upos-error-text upos-animation-opacity upos-text filter-error">
              {message}
            </div>
          ) : null}
        </div>

        <div
          onClick={() => onClickSave()}
          className={
            activeInput
              ? "save-filter-button cursor-pointer upos-text upos-save-filter-button"
              : "hide-filter-button upos-text upos-save-filter-button"
          }
        >
          {t("save")}
        </div>
      </div>
      <div className="filter-button-wrapper">
        {/* <div
          onClick={() => {
            // onSaveFilter();
            onSearchOrderWithFilter();
          }}
          className="filter-button-confirm"
        >
          {t("confirm")}
        </div> */}
        <div
          onClick={() => {
            onCancelFilter();
          }}
          className="filter-button-cancel"
        >
          {t("close")}
        </div>
      </div>
    </>
  );
}
