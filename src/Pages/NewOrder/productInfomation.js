import {useState, useEffect, useRef, useContext} from 'react'
import {AgGridReact} from 'ag-grid-react'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import CustomHeader from './customHeader'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {useTranslation} from 'react-i18next'
import Dropdown from '../../Component/DropdownV2/dropdown'
import PureDropdown from '../../Component/PureDropdown/Dropdown'

import {OrderContext} from '../../LayoutWrapper'
import {
  getUrlDetailProduct,
  getUrlWareHouseInfo,
  getUrlDetailsListAll,
} from '../../api/url'
import {getData} from '../../api/api'

import QuantityBox from '../../Component/QuantityBox/QuantityBox'
import dataStorage from '../../dataStorage'
import RenderPrice from '../../Component/GridEditInput/input'
import RenderDiscountInput from '../../Component/GridEditInput/inputWithDropdown'
import {
  CaculateWeight,
  convertStringToNumber,
  displayNumber,
  getDiscountPrice,
  UposLogFunc,
} from '../../util/functionUtil'
let timeout
let NeedUpdateData = false
let grid = null
export const SearchBox = ({...props}) => {
  const ref = useRef(null)
  const {t} = useTranslation()
  const {
    listOption = {},
    id = '',
    customClass = '',
    warehouse = '',
    textSearch = '',
  } = props
  const [state, dispatch] = useContext(OrderContext)
  const [showSuggest, changeShowSuggest] = useState(false)
  const [listSuggest, changeListSuggest] = useState([])
  const [value, changeValue] = useState('')
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowSuggest(false)
    }
  }
  const changeText = e => {
    const text = e.target.value
    if (!text || text === '') {
      if (timeout) clearTimeout(timeout)
      changeListSuggest([])
      changeValue(text)
    } else {
      changeValue(text)
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        getDataListProduct(text)
      }, 500)
    }
  }
  const getDataListProduct = keyword => {
    if (!keyword || keyword === '') {
      changeListSuggest([])
    } else {
      let objectSearch = {keyword}
      if (warehouse.value) {
        objectSearch = {
          ...objectSearch,
          ...{warehouse_id: warehouse.value},
        }
      }
      const url = getUrlDetailsListAll(objectSearch)
      getData(url)
        .then(res => {
          // console.log(res);
          if (res && res.data && res.data.success) {
            const data = res.data.data || []
            changeListSuggest(data)
          }
        })
        .catch(error => {
          changeListSuggest([])
          console.log('error')
        })
    }
  }
  const didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
    if (value) {
      changeValue('')
      changeListSuggest([])
    }
  }
  const unmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  const getDetailProduct = item => {
    const id = item.id || item.product_id || item.product_details_id
    if (!id) {
      UposLogFunc(`ERROR: CAN NOT GET ID OF PRODUCT : ${JSON.stringify(item)}`)
    }
    const url = getUrlDetailProduct(id)
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const {data} = res.data
          const dataGrid = state.new_order.product_info

          let pass = true
          dataGrid.map((value, index) => {
            if (value.sku === data.sku) {
              pass = false
            }
          })
          const price = convertStringToNumber(data.price)
          if (pass) {
            dataGrid.push({
              product_id: id,
              product_id_details: id,
              product_model: data.sku,
              total_price: item.price,
              no: dataGrid.length + 1,
              id: data.sku,
              sku: data.sku,
              inventory: item.warehouse_quantity,
              quantity: 1,
              price,
              display_price: price,
              discount: {unit: 'đ', value: 0},
              total: price,
              name: data.name,
              wholesale_price: data.wholesale_price,
              weight: data.weight,
              weight_unit: data.weight_unit,
              product_name: data.product_name,
            })
            NeedUpdateData = true
            UpdateDataGrid(dispatch, dataGrid)
          }
        }
      })
      .catch(error => {
        console.log('error')
      })
  }
  const handleClickProduct = item => {
    getDetailProduct(item)
  }
  useEffect(() => {
    didmout()
    return () => {
      unmount()
    }
  }, [ref, warehouse])
  const renderSuggest = () => {
    if (listSuggest && listSuggest.length) {
      return (
        <Paper className="suggest-wrapper show-scroll-bar" elevation={1}>
          {listSuggest.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleClickProduct(item)
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
                  {`${t('inventory')} ${item.warehouse_quantity}`}
                </div>
              </div>
            </div>
          ))}
        </Paper>
      )
    }
    return (
      <Paper className="suggest-wrapper" elevation={3}>
        <div className="upos-text suggest-1">
          {listOption.suggest.text || '--'}
        </div>
        <div className="upos-text suggest-2">{t('suggest_for_you')}</div>
        <div className="upos-text suggest-3">
          <div className="upos-text example-1">
            {listOption.suggest.example.ex1 || ''}
          </div>
          <div className="upos-text example-2">
            {listOption.suggest.example.ex2 || ''}
          </div>
        </div>
      </Paper>
    )
  }
  return (
    <div
      ref={ref}
      className={customClass ? `${customClass} search-box` : 'search-box'}
    >
      <div className="input-box-wrapper">
        <input
          value={value}
          id={id}
          placeholder={listOption.placeHolderText}
          onChange={e => {
            changeText(e)
          }}
          onClick={() => {
            changeShowSuggest(true)
          }}
          spellCheck={false}
        />
        {showSuggest ? renderSuggest() : null}
      </div>
    </div>
  )
}
const renderProductID = params => {
  try {
    const {data} = params
    return (
      <div className="neworder-sku-name">
        <Tooltip title={data.product_name} arrow>
          <div className="neworder-name">{data.product_name}</div>
        </Tooltip>
        <Tooltip title={data.sku} arrow>
          <div className="neworder-sku">{data.sku}</div>
        </Tooltip>
      </div>
    )
  } catch (error) {
    return '--'
  }
}
const renderInventory = params => {
  try {
    const {data} = params
    return <div className="inventory-neworder upos-text">{data.inventory}</div>
  } catch (error) {}
}
function getAllRows(api) {
  const rowData = []
  api.forEachNode(node => {
    rowData.push(node.data)
  })
  return rowData
}
const RenderPriceNotEdit = (params, price_board) => {
  try {
    const {data} = params
    return (
      <div className="upos-text upos-can-edit-cell price-cell price-input show-unit-input">
        {displayNumber(data.display_price)}
      </div>
    )
  } catch (error) {}
}
const RenderQuantity = params => {
  try {
    const dispatch = useContext(OrderContext)[1]
    const {data} = params
    const {api} = params
    const {quantity} = data
    const updateWithInput = value => {
      try {
        value = convertStringToNumber(value)
        if (value === 0) return
        const rowNode = api.getRowNode(data.id)
        const rowData = rowNode.data
        const discount = getDiscountPrice(
          rowData.discount,
          convertStringToNumber(rowData.value) *
            convertStringToNumber(rowData.display_price),
        )
        const price = convertStringToNumber(rowData.display_price)
        const total = price * value - discount
        rowNode.setDataValue('total', total)
        rowNode.setDataValue('quantity', value)
        const allRowData = getAllRows(api)
        NeedUpdateData = false
        dispatch({
          type: 'UPDATE_GRID_DATA_NEW_ORDER',
          payload: allRowData,
        })
      } catch (error) {
        console.log('error')
      }
    }
    return (
      <QuantityBox
        subAction={value => {
          updateWithInput(value)
        }}
        addAction={value => {
          updateWithInput(value)
        }}
        changeInput={value => {
          updateWithInput(value)
        }}
        value={quantity}
      />
    )
  } catch (error) {}
}
const renderDiscount = params => {
  try {
    const {data} = params
    return (
      <div
        className={
          data.discount.unit === '%'
            ? 'upos-can-edit-cell new-order-discount upos-text show-unit-input discount-percent-input'
            : 'upos-can-edit-cell new-order-discount upos-text discount-price-input show-unit-input'
        }
      >
        {`${displayNumber(data.discount.value)}`}
      </div>
    )
  } catch (error) {
    console.log(`error${error}`)
  }
}

const RenderRemoveRow = params => {
  const [state, dispatch] = useContext(OrderContext)
  try {
    const {api} = params
    const {data} = params
    const rowNode = api.getRowNode(data.id)
    const removeRowGrid = () => {
      const index = (rowNode || {}).rowIndex || 0
      const allRowData = getAllRows(api)
      allRowData.splice(index, 1)
      api.setRowData(allRowData)
      NeedUpdateData = false
      dispatch({
        type: 'UPDATE_GRID_DATA_NEW_ORDER',
        payload: allRowData,
      })
    }
    return (
      <div
        onClick={() => {
          removeRowGrid()
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
    )
  } catch (error) {
    console.log('error')
  }
}
export function GridData({...rest}) {
  const props = {...rest}
  const {t} = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const columnDefs = [
    {
      field: 'sku',
      cellRenderer: 'renderProductID',
      headerComponentParams: {label: 'product-sku'},
      cellClass: 'upos-multil-line',
      minWidth: 160,
    },
    {
      field: 'inventory',
      cellRenderer: 'renderInventory',
      headerComponentParams: {label: 'inventory'},
      cellClass: 'new-order-cell-align-center',
    },
    {
      id: 'quantity',
      field: 'quantity',
      cellRenderer: 'renderQuantity',
      headerComponentParams: {label: 'quantity'},
    },
    {
      id: 'display_price',
      field: 'display_price',
      cellEditor: 'renderPrice',
      editable: true,
      singleClickEdit: true,
      cellRenderer: 'RenderPriceNotEdit',
      cellClass: 'upos-price-menu',
      headerComponentParams: {label: 'price'},
      width: 120,
      onCellValueChanged(params) {
        const {data} = params
        const {api} = params
        const rowNode = api.getRowNode(data.id)
        const rowData = rowNode.data
        const discount = getDiscountPrice(
          rowData.discount,
          convertStringToNumber(rowData.value) *
            convertStringToNumber(rowData.display_price),
        )
        const quantity = convertStringToNumber(rowData.quantity)
        const price = convertStringToNumber(rowData.display_price)
        const total = price * quantity - discount
        rowNode.setDataValue('total', total)
        const allRowData = getAllRows(api)
        NeedUpdateData = false
        UpdateDataGrid(dispatch, allRowData)
      },
    },
    {
      id: 'discount',
      field: 'discount',
      editable: true,
      singleClickEdit: true,
      cellRenderer: 'renderDiscount',
      cellEditor: 'RenderDiscountInput',
      headerComponentParams: {label: 'discount'},
      cellClass: 'upos-discount-menu',
      width: 120,
    },
    {
      id: 'total',
      field: 'total',
      cellRenderer: 'renderTotal',
      headerComponentParams: {label: 'total_price'},
      width: 160,
    },
  ]
  const renderTotal = params => {
    try {
      const {data} = params
      const {api} = params
      const rowNode = api.getRowNode(data.id)
      const removeRowGrid = () => {
        const index = (rowNode || {}).rowIndex || 0
        const allRowData = getAllRows(api)
        allRowData.splice(index, 1)
        api.setRowData(allRowData)
        NeedUpdateData = false
        UpdateDataGrid(dispatch, allRowData)
      }
      return (
        <div className="neworder-total upos-text">
          <div>{displayNumber(data.total)}</div>
          <div
            onClick={() => {
              removeRowGrid()
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
        </div>
      )
    } catch (error) {}
  }
  const defaultColDef = {
    flex: 1,
    resizable: true,
  }
  const overlayNoRowsTemplate = `<div class="empty-order-wrapper empty-product-neworder">
  <img class="img-no-order-ic-popup" src="/img/order/no-product.png">
  <div class="upos-text empty-order-des">${t('not_have_product_yet')}</div>
  <div class="upos-text empty-order-des">${t(
    'please_add_product_to_create_inventory_control',
  )}</div>
</div>`

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
  }
  const getRowNodeId = data => data.id
  const data = state.new_order.product_info
  const [rowData, updateData] = useState(data)
  const onGridReady = params => {
    grid = params
    setTimeout(() => {
      grid.api.sizeColumnsToFit()
    }, 300)
  }
  if (NeedUpdateData) {
  }
  const getRowHeight = params => params.data.rowHeight

  const onFirstDataRendered = params => {}
  return (
    <div
      id="product-grid"
      style={{}}
      className={
        'ff-scroll-bar-type-2 ag-theme-alpine bg-header-white new-order-grid-product upos-grid-disable-scroll-x'
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
        stopEditingWhenGridLosesFocus
        overlayNoRowsTemplate={overlayNoRowsTemplate}
        onCellEditingStopped={function (event) {
          const {api} = event
          const allRowData = getAllRows(api)
          dispatch({
            type: 'UPDATE_GRID_DATA_NEW_ORDER',
            payload: allRowData,
          })
        }}
      />
    </div>
  )
}

function UpdateDataGrid(dispatch, dataGrid, id_partner) {
  try {
    const weight = CaculateWeight(dataGrid)
    dispatch({
      type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
      payload: {field: id_partner, value: 'weight', data: weight},
    })
    dispatch({type: 'UPDATE_GRID_DATA_NEW_ORDER', payload: dataGrid})
    if (grid && grid.api && grid.api.setRowData) {
      grid.api.setRowData(dataGrid)
    }
  } catch (error) {
    UposLogFunc(`ERROR UPDATE_DATA_GRID :  ${error.message}`)
  }
}
export default function ProductInfomation({...props}) {
  const [state, dispatch] = useContext(OrderContext)
  const [listWarehouse, changeListWarehouse] = useState([])
  const [defaulSelect, changeDefaultSelect] = useState(
    state.new_order.warehouse,
  )
  const {warehouse} = state.new_order
  const changeWarehouse = res => {
    const list = res.data.data
    const newList = []
    list.map(item => {
      newList.push({value: item.id, label: item.warehouse_name})
      if (
        !state.new_order.warehouse.value &&
        item.warehouse_name &&
        item.warehouse_name.toUpperCase() === 'KHO MẶC ĐỊNH'
      ) {
        changeDefaultSelect({value: item.id, label: item.warehouse_name})
        setTimeout(() => {
          dispatch({
            type: 'CHANGE_NEW_ORDER_WAREHOUSE',
            payload: {value: item.id, label: item.warehouse_name},
          })
        }, 100)
      }
    })
    dataStorage.listWarehouse = newList
    changeListWarehouse(newList)
  }
  const updateDataGridPrice = (gridData, price_board) => {
    try {
      if (!gridData) {
        UposLogFunc(`ERROR AT UPDATE_DATA_GRID ${GridData}`)
      }
      gridData.map((item, index) => {
        const newPrice =
          price_board === 'retail_price_board'
            ? item.price
            : item.wholesale_price
        item.display_price = newPrice
        const numPrice = convertStringToNumber(newPrice)
        const quantity = convertStringToNumber(item.quantity)

        const discount = convertStringToNumber(
          getDiscountPrice(item.discount, numPrice * quantity),
        )
        const total = quantity * numPrice - discount
        item.total = total
      })
      return gridData
    } catch (error) {
      UposLogFunc(`ERROR AT UPDATE_DATA_GRID ${GridData} ${error.message}`)
    }
  }
  const changePriceAtGrid = item => {
    const price_board = item.value
    let dataGrid = state.new_order.product_info
    if (grid && grid.api) {
      console.log('api here')
      dataGrid = getAllRows(grid.api)
    }
    dataGrid = updateDataGridPrice(dataGrid, price_board)
    NeedUpdateData = false
    UpdateDataGrid(dispatch, dataGrid)
    // dispatch({ type: "UPDATE_GRID_DATA_NEW_ORDER", payload: dataGrid });
    // if (grid && grid.api && grid.api.setRowData) {
    //   grid.api.setRowData(dataGrid);
    // }
  }
  const didMount = () => {
    if (dataStorage.listWarehouse && dataStorage.listWarehouse.length) {
      changeListWarehouse(dataStorage.listWarehouse)
    } else {
      const url = getUrlWareHouseInfo()
      getData(url)
        .then(res => {
          if (res && res.data && res.data.success) {
            changeWarehouse(res)
          }
        })
        .catch(error => {})
    }
  }
  const onSelectWareHouse = item => {
    changeDefaultSelect(item)
    // changeValue("");
    // changeListSuggest([]);
    dispatch({type: 'CHANGE_NEW_ORDER_WAREHOUSE', payload: item})
    UpdateDataGrid(dispatch, [])
    // dispatch({ type: "UPDATE_GRID_DATA_NEW_ORDER", payload: [] });
    // if (grid && grid.api && grid.api.setRowData) {
    //   grid.api.setRowData([]);
    // }
  }
  const unMount = () => {}
  useEffect(() => {
    didMount()
    return unMount()
  }, [])
  return (
    <div className="product-info-wrapper bg-order-cmp">
      <div className="create-new-order-title-wrapper">
        <div className="upos-text-roboto-medium-500 upos-text-indygo-dye">
          Thông tin sản phẩm
        </div>
        <div className="prod-info-add">+ Thêm sản phẩm</div>
      </div>
      <div className="dropdown-prod-info-wrapper">
        <div className="dropdown-prod-info-wrapper-block-3">
          <SearchBox
            textSearch=""
            warehouse={warehouse}
            listOption={{
              label: 'Khách hàng',
              placeHolderText: 'Tìm sản phẩm theo tên, mã SKU, ... ',
              urlParam: '',
              value: 'client',
              suggest: {
                text: 'Hỗ trợ tìm kiếm theo tên, mã sku',
                example: {
                  ex1: 'áo sơ mi',
                  ex2: 'A002701-S-X',
                },
              },
            }}
            customClass="search-client-prod-info"
          />
        </div>
        <div className="dropdown-prod-info-wrapper-block-1">
          <PureDropdown
            cb={item => onSelectWareHouse(item)}
            listOption={listWarehouse}
            selected={defaulSelect}
            customClass="dropdown-type2"
            expandIconPath="/img/order/icon.png"
            byPassTran
          />

          {/* </div>
        <div className="dropdown-prod-info-wrapper-block-2"> */}
          <PureDropdown
            listOption={[
              {
                label: 'wholesale_price_board',
                value: 'wholesale_price_board',
              },
              {label: 'retail_price_board', value: 'retail_price_board'},
            ]}
            selected={state.new_order.price_board}
            cb={item => {
              dispatch({type: 'CHANGE_PRICE_BOARD', payload: item})
              changePriceAtGrid(item)
            }}
            customClass="dropdown-type2"
            expandIconPath="/img/order/icon.png"
            hideScroll
          />
        </div>
      </div>
      <GridData />
    </div>
  )
}
