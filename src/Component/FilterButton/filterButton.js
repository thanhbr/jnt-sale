import { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown/dropdown";
// import Dropdown from "../PureDropdown/dr";
import { SaveFilter } from "./saveFilter";
import { OrderContext } from "../../LayoutWrapper";
import {
  getUrlWareHouseInfo,
  getUrlOrigin,
  getUrlOrderStatus,
  getUrlEmployee,
  getListShippingPartner,
} from "../../api/url";
import dataStorage from "../../dataStorage";
import { getData, getDataAsync, useAxiosFetch } from "../../api/api";
import { CheckEmpty } from "../../util/functionUtil";

export default function FilterButton({ ...props }) {
  const { cbFunction = () => {} } = props;
  const { t } = useTranslation();
  const ref = useRef(null);
  const refExpand = useRef(null);
  const [state, dispatch] = useContext(OrderContext);
  const objList = state.List;
  const isShowMenu = state.isOpenFilter;

  // const listOrigin = useAxiosFetch(getUrlOrigin()).data;
  // const listStatus = useAxiosFetch(getUrlOrderStatus()).data;
  // const listEmpl = useAxiosFetch(getUrlEmployee()).data;
  // const listWarehouse = useAxiosFetch(getUrlWareHouseInfo()).data || [];
  // const listShipping = useAxiosFetch(getListShippingPartner()).data;

  const {listOrigin} = objList;
  const {listStatus} = objList;
  const {listEmpl} = objList;
  const {listWarehouse} = objList;
  const {listShipping} = objList;

  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      event.target.innerText !== t("reset") &&
      event.target.innerText !== t("search") &&
      !event.target.classList.contains("icon-search-order") &&
      !event.target.classList.contains("icon-refresh-order") &&
      state.isOpenFilter
    ) {
      dispatch({ type: "SET_STATUS_FILTER", payload: false });
    }
  }
  const Didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };
  const unmount = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  useEffect(() => {
    Didmout();
    return () => {
      unmount();
    };
  }, []);
  return (
    <div ref={ref} className="filter-wrapper">
      <div
        className={
          !isShowMenu
            ? "filter-button cursor-pointer"
            : "filter-button cursor-pointer"
        }
        onClick={() => {
          dispatch({ type: "SET_STATUS_FILTER", payload: !isShowMenu });
        }}
      >
        {t("more")}
        <img
          className={
            isShowMenu ? "turn-down add-effect-all" : "turn-back add-effect-all"
          }
          ref={refExpand}
          src="/svg/white-expand.svg"
        />
      </div>

      <div
        className={
          isShowMenu
            ? "filter-option filter-option-wrapper upos-show-item "
            : "filter-option filter-option-wrapper upos-hide-item "
        }
      >
        <div className="filter-row-1">
          <Dropdown
            filter="warehouse_id"
            placeHolderText="Warehouse"
            customClass="show-scroll-bar"
            byPassTran
            listOption={listWarehouse}
            labelKey="warehouse_name"
            idKey="id"
          />
          <Dropdown
            filter="order_source"
            placeHolderText="Order_source"
            customClass="show-scroll-bar"
            listOption={listOrigin}
            byPassTran
            labelKey="name"
            idKey="id"
          />
          <Dropdown
            filter="shipping_status"
            placeHolderText="Shipping_status"
            customClass="show-scroll-bar lagre-dropdown"
            listOption={listStatus}
            byPassTran
            labelKey="name"
            idKey="id"
          />
          <Dropdown
            filter="shipping_partner"
            customClass="show-scroll-bar"
            listOption={listShipping}
            placeHolderText="Shipping-partner"
            labelKey="name"
            idKey="id"
            checkStatus
            statusKey="connected"
          />
          <Dropdown
            filter="employee"
            placeHolderText="Employee"
            customClass="show-scroll-bar"
            listOption={listEmpl}
            byPassTran
            labelKey="fullname"
            idKey="user_id"
          />
        </div>
        <div className="filter-row-2">
          <SaveFilter callback={() => {}} />
        </div>
      </div>
    </div>
  );
}
