import { useState, useEffect, useRef , useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import CustomHeader from "./customHeader";
import Paper from "@material-ui/core/Paper";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useTranslation } from "react-i18next";
import Dropdown from "../../Component/DropdownV2/dropdown";
import PureDropdown from "../../Component/PureDropdown/Dropdown";
import { v4 as uuidv4 } from 'uuid';

import { OrderContext } from "../../LayoutWrapper";
import {
  getUrlDetailProduct,
  getUrlListProduct,
  getUrlWareHouseInfo,
} from "../../api/url";
import { getData } from "../../api/api";

import QuantityBox from "../../Component/QuantityBox/QuantityBox";
import dataStorage from "../../dataStorage";
import RenderPrice from "../../Component/GridEditInput/input";
import RenderDiscountInput from "../../Component/GridEditInput/inputWithDropdown";
import { convertStringToNumber } from "../../util/functionUtil";
// import SearchBox from "../../Component/SearchBox/searchBox";
let timeout;
let NeedUpdateData = false;
let grid;
const SearchBox = ({ ...props }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const { listOption = {}, id = "", customClass = "" } = props;
  const [state, dispatch] = useContext(OrderContext);
  const [showSuggest, changeShowSuggest] = useState(false);
  const [listSuggest, changeListSuggest] = useState([]);
  const [value, changeValue] = useState("");
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowSuggest(false);
    }
  }
  const changeText = (e) => {
    const text = e.target.value;
    if (!text || text === "") {
      if (timeout) clearTimeout(timeout);
      changeListSuggest([]);
      changeValue(text);
    } else {
      changeValue(text);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        getDataListProduct(text);
      }, 500);
    }
  };
  const getDataListProduct = (keyword) => {
    if (!keyword || keyword === "") {
      changeListSuggest([]);
    } else {
      const url = getUrlListProduct({ keyword });
      getData(url)
        .then((res) => {
          // console.log(res);
          if (res && res.data && res.data.success) {
            const data = res.data.data || [];
            changeListSuggest(data);
          }
        })
        .catch((error) => {
          changeListSuggest([]);
          console.log("error");
        });
    }
  };
  const didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };
  const unmount = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  const getDetailProduct = (item) => {
    const id = item.product_details_id || item.product_id;
    if (!id) return;
    const url = getUrlDetailProduct(id);
    getData(url)
      .then((res) => {
        if (res && res.data && res.data.success) {
          const {data} = res.data;
          const dataGrid = state.new_order.product_info;

          let pass = false;
          dataGrid.map((value, index) => {
            if (value.sku === data.sku) {
              pass = true;
            }
          });
          const price = convertStringToNumber(data.price);
          // const disc = convertStringToNumber(data.discount);
          if (!pass) {
            dataGrid.push({
              product_id: id,
              product_id_details: item.product_details_id,
              product_model: data.sku,
              total_price: item.price,
              no: dataGrid.length + 1,
              id: data.sku,
              sku: data.sku,
              inventory: item.warehouse_quantity,
              quantity: 1,
              price,
              display_price: price,
              discount: { unit: "đ", value: 0 },
              total: price,
              name: data.name,
              wholesale_price: data.wholesale_price,
              weight: data.weight,
              weight_unit: data.weight_unit,
            });
            NeedUpdateData = true;
            dispatch({ type: "UPDATE_GRID_DATA_NEW_ORDER", payload: dataGrid }); // add product
            if (grid && grid.api && grid.api.setRowData) {
              grid.api.setRowData(dataGrid);
            }
          }
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const handleClickProduct = (item) => {
    getDetailProduct(item);
  };
  useEffect(() => {
    didmout();
    return () => {
      unmount();
    };
  }, [ref]);
  const renderSuggest = () => {
    if (listSuggest && listSuggest.length) {
      return (
        <Paper className="suggest-wrapper show-scroll-bar" elevation={3}>
          {listSuggest.map((item, index) => (
              <div
                key={uuidv4()}
                onClick={() => {
                  handleClickProduct(item);
                }}
                className="upos-row-suggest"
              >
                <div className="upos-image-suggest">
                  <img src="/img/order/no-image.png" />
                </div>
                <div className="upos-info-suggest">
                  <div className="upos-text upos-name-suggest">
                    {item.product_name}
                  </div>
                  <div className="upos-text quantity-suggest">
                    {`${t("inventory")} ${item.warehouse_quantity}`}
                  </div>
                  {/* <div className="upos-text">
                  {item.product_name}
                </div> */}
                </div>
              </div>
            ))}
        </Paper>
      );
    } 
      return (
        <Paper className="suggest-wrapper" elevation={3}>
          <div className="upos-text suggest-1">
            {listOption.suggest.text || "--"}
          </div>
          <div className="upos-text suggest-2">{t("suggest_for_you")}</div>
          <div className="upos-text suggest-3">
            <div className="upos-text example-1">
              {listOption.suggest.example.ex1 || ""}
            </div>
            <div className="upos-text example-2">
              {listOption.suggest.example.ex2 || ""}
            </div>
          </div>
        </Paper>
      );
    
  };
  return (
    <div
      ref={ref}
      className={customClass ? `${customClass} search-box` : "search-box"}
    >
      <div className="input-box-wrapper">
        <input
          value={value}
          id={id}
          placeholder={listOption.placeHolderText}
          onChange={(e) => {
            changeText(e);
          }}
          onClick={() => {
            changeShowSuggest(true);
          }}
        />
        {showSuggest ? renderSuggest() : null}
      </div>
    </div>
  );
};
const renderProductID = (params) => {
  try {
    const {data} = params;
    return (
      <div className="order-id-wrapper">
        <div className="upos-text">{data.name}</div>
        <div className="order-id">{data.sku}</div>
      </div>
    );
  } catch (error) {
    return "--";
  }
};
const renderInventory = (params) => {
  try {
    const {data} = params;
    return <div className="inventory-neworder upos-text">{data.inventory}</div>;
  } catch (error) {}
};
function getAllRows(api) {
  const rowData = [];
  api.forEachNode((node) => {
    rowData.push(node.data);
  });
  return rowData;
}
const RenderPriceNotEdit = (params, price_board) => {
  try {
    const {data} = params;
    // const price_board = state.new_order.price_board;
    // const isRetail = price_board.value === "retail_price_board";
    return (
      <div className="upos-text upos-can-edit-cell price-cell price-input show-unit-input">
        {data.display_price}
      </div>
    );
  } catch (error) {}
};
const RenderQuantity = (params) => {
  try {
    const dispatch = useContext(OrderContext)[1];
    const {data} = params;
    // const dataGrid = state.new_order.product_info || [];
    const quantity = convertStringToNumber(data.quantity);
    const price = convertStringToNumber(data.price);
    const discount = convertStringToNumber(data.discount);
    // const quantity = Number(data.quantity);
    // const price = Number(data.price);
    // const discount = Number(data.discount);
    // const inventory = Number(data.inventory);
    return (
      <QuantityBox
        subAction={() => {
          try {
            if (quantity === 1) return;
            const {api} = params;
            const rowNode = api.getRowNode(data.id);
            const newQuantity = quantity - 1;
            let total = 0;
            if (newQuantity === 0) {
              // rowNode.setDataValue("total", 0);
            } else {
              total = price * newQuantity - discount;
              // rowNode.setDataValue("total", price * newQuantity - discount);
            }
            rowNode.setDataValue("total", total);
            // rowNode.setDataValue("total_price", total);
            rowNode.setDataValue("quantity", newQuantity);
            const allRowData = getAllRows(api);
            // dataStorage.new_order.dataGrid = allRowData;
            NeedUpdateData = false;
            // dispatch({
            //   type: "CHANGE_ORDER_INFO_TOTAL",
            //   payload: total,
            // });
            // dispatch({
            //   type: "CHANGE_ORDER_INFO_DISCOUNT",
            //   payload: allRowData,
            // });
            dispatch({
              type: "UPDATE_GRID_DATA_NEW_ORDER",
              payload: allRowData,
            });
          } catch (error) {
            console.log("error");
          }
        }}
        addAction={() => {
          try {
            const {api} = params;
            const rowNode = api.getRowNode(data.id);
            const newQuantity = quantity + 1;
            rowNode.setDataValue("quantity", newQuantity);
            rowNode.setDataValue("total", price * newQuantity - discount);
            // rowNode.setDataValue("total_price", price * newQuantity - discount);
            const allRowData = getAllRows(api);
            // dataStorage.new_order.dataGrid = allRowData;
            NeedUpdateData = false;
            // dispatch({
            //   type: "CHANGE_ORDER_INFO_TOTAL",
            //   payload: price * newQuantity - discount,
            // });
            dispatch({
              type: "UPDATE_GRID_DATA_NEW_ORDER",
              payload: allRowData,
            });
          } catch (error) {
            console.log("error");
          }
        }}
        value={quantity}
      />
    );
  } catch (error) {}
};
const renderDiscount = (params) => {
  try {
    const {data} = params;
    const text = `${data.discount  }`;
    // let unit;
    // const check
    // if (!text.includes("%") && !text.includes("đ")) {
    //   unit = "đ";
    // } else {
    //   unit = "";
    // }
    return (
      <div
        className={
          data.discount.unit === "đ"
            ? "upos-can-edit-cell new-order-discount upos-text discount-price-input show-unit-input"
            : "upos-can-edit-cell new-order-discount upos-text show-unit-input discount-percent-input"
        }
      >
        {`${data.discount.value}`}
      </div>
    );
  } catch (error) {
    console.log(`error${  error}`);
  }
};
const renderTotal = (params) => {
  try {
    const {data} = params;
    return <div className="neworder-total upos-text">{data.total}</div>;
  } catch (error) {}
};
const RenderRemoveRow = (params) => {
  const [state, dispatch] = useContext(OrderContext);
  try {
    const {api} = params;
    const {data} = params;
    const rowNode = api.getRowNode(data.id);
    // const [state, dispatch] = useContext(OrderContext);
    const removeRowGrid = () => {
      const index = (rowNode || {}).rowIndex || 0;
      const allRowData = getAllRows(api);
      allRowData.splice(index, 1);
      api.setRowData(allRowData);
      NeedUpdateData = false;
      dispatch({
        type: "UPDATE_GRID_DATA_NEW_ORDER",
        payload: allRowData,
      });
    };
    return (
      <div
        onClick={() => {
          removeRowGrid();
        }}
        className="upos-grid-delete"
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 7L1 1L7 7ZM1 7L7 1L1 7Z"
            stroke="#7D9AC0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  } catch (error) {
    console.log("error");
  }
};
function isFirstColumn(params) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  const thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}
let count = 0;
export function GridData({ ...rest }) {
  const props = { ...rest };
  const [state, dispatch] = useContext(OrderContext);
  const columnDefs = [
    {
      field: "sku",
      cellRenderer: "renderProductID",
      headerComponentParams: { label: "sku" },
    },
    {
      field: "inventory",
      cellRenderer: "renderInventory",
      headerComponentParams: { label: "inventory" },
    },
    {
      id: "quantity",
      field: "quantity",
      cellRenderer: "renderQuantity",
      headerComponentParams: { label: "quantity" },
    },
    {
      id: "display_price",
      field: "display_price",
      cellEditor: "renderPrice",
      editable: true,
      singleClickEdit: true,
      cellRenderer: "RenderPriceNotEdit",
      cellClass: "upos-price-menu",
      // cellRendererParams: price_board,
      // cellEditor: "agTextCellEditor",
      headerComponentParams: { label: "price" },
      width: 120,
    },
    {
      id: "discount",
      field: "discount",
      editable: true,
      singleClickEdit: true,
      cellRenderer: "renderDiscount",
      cellEditor: "RenderDiscountInput",
      headerComponentParams: { label: "discount" },
      cellClass: "upos-discount-menu",
      width: 120,
    },
    {
      id: "total",
      field: "total",
      cellRenderer: "renderTotal",
      headerComponentParams: { label: "total_price" },
      width: 160,
    },
    {
      id: "remove",
      field: "remove",
      cellRenderer: "renderRemoveRow",
      headerComponentParams: { label: "" },
      width: 30,
    },
  ];
  const defaultColDef = {
    flex: 1,
    // resizable: true,
    // checkboxSelection: isFirstColumn,
  };
  const overlayNoRowsTemplate = `<div class="empty-order-wrapper empty-product-neworder"><img class="img-no-order" src="/img/order/no-product.png"><div class="upos-text empty-order-des">Chưa có sản phẩm.</div><div class="upos-text empty-order-des">Vui lòng chọn sản phẩm trên thanh tìm kiếm</div></div>`;

  const frameworkComponents = {
    renderProductID,
    renderInventory,
    renderQuantity: RenderQuantity,
    renderPrice: RenderPrice,
    renderDiscount,
    renderTotal,
    agColumnHeader: CustomHeader,
    renderRemoveRow: RenderRemoveRow,
    RenderPriceNotEdit,
    RenderDiscountInput,
  };
  const getRowNodeId = (data) => data.id;
  // const [rowData, updateData] = useState(null);
  const data = state.new_order.product_info;
  const [rowData, updateData] = useState(data);
  const onGridReady = (params) => {
    // DATA.forEach(function (dataItem, index) {
    //   dataItem.rowHeight = 64;
    // });
    // NeedUpdateData= false;
    dispatch({ type: "UPDATE_GRID_DATA_NEW_ORDER", payload: rowData });
    grid = params;
    updateData(rowData);
  };
  if (NeedUpdateData) {
    // grid && grid.api && grid.api.setRowData(state.new_order.product_info);
    // updateData(rowData);
    // NeedUpdateData = false;
  }
  const getRowHeight = (params) => params.data.rowHeight;

  /**
   * Controller overlay
   */
  // const onBtShowLoading = () => {
  //   this.gridApi.showLoadingOverlay();
  // };

  // const onBtShowNoRows = () => {
  //   this.gridApi.showNoRowsOverlay();
  // };

  // const onBtHide = () => {
  //   this.gridApi.hideOverlay();
  // };

  const onFirstDataRendered = (params) => {};
  // console.log(
  // "=================== data product ===============" + JSON.stringify(rowData)
  // );
  // if (!rowData || !rowData.length)
  //   return (
  //     <Empty
  //       customClass="empty-product-neworder"
  //       path="/img/order/no-product.png"
  //       notice="not_have_product_yet"
  //       subNotice="please_add_product_to_create_new_order"
  //       hideButton={true}
  //     />
  //   );
  count++;
  // console.log("render-grid-product-info ------------" + count);
  return (
    <div
      id="product-grid"
      style={{}}
      className={
        props.className
          ? `${props.className} bg-header-white order-grid-wrapper ag-theme-alpine`
          : "ag-theme-alpine bg-header-white order-grid-wrapper"
      }
    >
      <AgGridReact
        rowHeight={64}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        getRowHeight={getRowHeight}
        onFirstDataRendered={onFirstDataRendered}
        frameworkComponents={frameworkComponents}
        rowData={rowData}
        suppressRowClickSelection
        getRowNodeId={getRowNodeId}
        overlayNoRowsTemplate={overlayNoRowsTemplate}
        onCellEditingStopped={function (event) {
          // const allRowData = event.data;
          const {api} = event;
          const allRowData = getAllRows(api);
          dispatch({
            type: "UPDATE_GRID_DATA_NEW_ORDER",
            payload: allRowData,
          });
          // console.log("kynk cellEditingStopped");
          // return false;
        }}
      />
    </div>
  );
}

export default function ProductInfomation({ ...props }) {
  const [state, dispatch] = useContext(OrderContext);
  const [listWarehouse, changeListWarehouse] = useState([]);
  const [defaulSelect, changeDefaultSelect] = useState(
    state.new_order.warehouse
  );
  const changeWarehouse = (res) => {
    const list = res.data.data;
    const newList = [];
    list.map((item) => {
      newList.push({ value: item.id, label: item.warehouse_name });
      if (
        !state.new_order.warehouse.value &&
        item.warehouse_name &&
        item.warehouse_name.toUpperCase() === "KHO MẶC ĐỊNH"
      ) {
        changeDefaultSelect({ value: item.id, label: item.warehouse_name });
        setTimeout(() => {
          dispatch({
            type: "CHANGE_NEW_ORDER_WAREHOUSE",
            payload: { value: item.id, label: item.warehouse_name },
          });
        }, 100);
      }
    });
    dataStorage.listWarehouse = newList;
    changeListWarehouse(newList);
  };
  const changePriceAtGrid = (item) => {
    const price_board = item.value;
    const dataGrid = state.new_order.product_info;
    const dataUpdated = [];
    switch (price_board) {
      case "retail_price_board":
        dataGrid.map((item, index) => {
          dataUpdated.push({
            no: index + 1,
            id: item.sku,
            sku: item.sku,
            inventory: item.warehouse_quantity,
            quantity: 1,
            price: item.price,
            display_price: item.price,
            discount: { unit: "đ", value: 0 },
            total: item.price,
            name: item.name,
            wholesale_price: item.wholesale_price,
            product_id: item.id,
            product_id_details: item.product_details_id,
            product_model: item.sku,
            total_price: item.price,
          });
        });
        break;
      case "wholesale_price_board":
        dataGrid.map((item, index) => {
          dataUpdated.push({
            no: index + 1,
            id: item.sku,
            sku: item.sku,
            inventory: item.warehouse_quantity,
            quantity: 1,
            price: item.price,
            display_price: item.wholesale_price,
            discount: { unit: "đ", value: 0 },
            total: item.wholesale_price,
            name: item.name,
            wholesale_price: item.wholesale_price,
            product_id: item.id,
            product_id_details: item.product_details_id,
            product_model: item.sku,
            total_price: item.price,
          });
        });
        break;
      default:
        break;
    }
    NeedUpdateData = false;
    dispatch({ type: "UPDATE_GRID_DATA_NEW_ORDER", payload: dataUpdated });
    if (grid && grid.api && grid.api.setRowData) {
      grid.api.setRowData(dataUpdated);
    }
  };
  const didMount = () => {
    if (dataStorage.listWarehouse && dataStorage.listWarehouse.length) {
      changeListWarehouse(dataStorage.listWarehouse);
    } else {
      const url = getUrlWareHouseInfo();
      getData(url)
        .then((res) => {
          if (res && res.data && res.data.success) {
            changeWarehouse(res);
          }
        })
        .catch((error) => {});
    }
  };
  const onSelectWareHouse = (item) => {
    changeDefaultSelect(item);
    dispatch({ type: "CHANGE_NEW_ORDER_WAREHOUSE", payload: item });
  };
  const unMount = () => {};
  useEffect(() => {
    didMount();
    return unMount();
  }, []);
  return (
    <div className="product-info-wrapper bg-order-cmp">
      <div className="prod-info-header">
        <div className="prod-info-label">Thông tin sản phẩm</div>
        <div className="prod-info-add">+ Thêm sản phẩm</div>
      </div>
      <div className="dropdown-prod-info-wrapper">
        {/* <AsyncDropdown
          filter="warehouse_id"
          placeHolderText={defaulSelect}
          // placeHolderText={"select-warehouse"}
          type="async-option"
          url={getUrlWareHouseInfo()}
          callBack={(item) => changeWarehouse(item)}
          customClass="show-scroll-bar dropdown-type2"
          listOption={listWarehouse}
        /> */}
        <PureDropdown
          cb={(item) => onSelectWareHouse(item)}
          listOption={listWarehouse}
          selected={defaulSelect}
          customClass="dropdown-type2"
          byPassTran
          //  icon
          //  filter
          //  PlaceHolderText = ""
        />
        <Dropdown
          listOption={[
            { label: "wholesale_price_board", value: "wholesale_price_board" },
            { label: "retail_price_board", value: "retail_price_board" },
          ]}
          selected={state.new_order.price_board}
          cb={(item) => {
            dispatch({ type: "CHANGE_PRICE_BOARD", payload: item });
            changePriceAtGrid(item);
          }}
          customClass="dropdown-type2"
          // byPassTran={true}
        />
        <SearchBox
          listOption={{
            label: "Khách hàng",
            placeHolderText: "Tìm sản phẩm theo tên, mã SKU, ... ",
            urlParam: "",
            value: "client",
            suggest: {
              text: "Hỗ trợ tìm kiếm theo tên, mã sku",
              example: {
                ex1: "áo sơ mi",
                ex2: "A002701-S-X",
              },
            },
          }}
          customClass="search-client-prod-info"
        />
      </div>
      <GridData />
    </div>
  );
}
