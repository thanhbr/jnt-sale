import React, {useContext, useLayoutEffect, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {useTranslation} from 'react-i18next'
import {makeStyles} from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import {NavigateBeforeSharp} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {Navigate, useNavigate} from 'react-router-dom'
import moment from 'moment'
import CustomHeader from './customHeader'
import DetailCellRenderer from '../MasterDetail/masterDetail'
import Dropdown from '../DropdownV2/dropdown'
import PureDropdown from '../PureDropdown/Dropdown'

import TrackingStatus from '../TrackingStatus/trackingStatus'
import {OrderContext} from '../../LayoutWrapper'
import EmptyOrder from '../../Pages/Order/component/Empty/index.jsx'
import {PATH} from '../../const/path'
import dataStorage from '../../dataStorage'
import {displayNumber, UposLogFunc} from '../../util/functionUtil'
import {useConfigContext} from '../NavBar/navBar'
import {getUrlUpdateStatus} from '../../api/url'
import {postData} from '../../api/api'
import BasicPagination from 'Component/Pagination/Pagination'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

let gridApi = null
let menuStatus = null
let timeOut
const menuIcon = (
  <svg
    width="4"
    height="17"
    viewBox="0 0 4 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block-click"
  >
    <path
      d="M1.77778 9.87807C2.75962 9.87807 3.55556 9.08213 3.55556 8.10029C3.55556 7.11845 2.75962 6.32251 1.77778 6.32251C0.795938 6.32251 0 7.11845 0 8.10029C0 9.08213 0.795938 9.87807 1.77778 9.87807Z"
      fill="#223E62"
    />
    <path
      d="M1.77778 3.6559C2.75962 3.6559 3.55556 2.85996 3.55556 1.87812C3.55556 0.89628 2.75962 0.100342 1.77778 0.100342C0.795938 0.100342 0 0.89628 0 1.87812C0 2.85996 0.795938 3.6559 1.77778 3.6559Z"
      fill="#223E62"
    />
    <path
      d="M1.77778 16.1004C2.75962 16.1004 3.55556 15.3044 3.55556 14.3226C3.55556 13.3407 2.75962 12.5448 1.77778 12.5448C0.795938 12.5448 0 13.3407 0 14.3226C0 15.3044 0.795938 16.1004 1.77778 16.1004Z"
      fill="#223E62"
    />
  </svg>
)

const renderOrderId = params => {
  const {data} = params
  const date = moment(data.date, 'YYYY-MM-DD HH:mm:ss').format(
    'HH:mm | DD/MM/YYYY',
  )
  return (
    <Link
      to={{
        pathname: PATH.ORDER_DETAIL,
        // search: "?sort=name",
        // hash: "#the-hash",
        state: {fromDashboard: true},
        search: `${data.id}`,
        // hash: "#the-hash",
      }}
      onClick={() => {
        dataStorage.OrderDetail = params.data
      }}
      className="order-id-wrapper cursor-pointer"
    >
      <div className="upos-text order-id">{data.id}</div>
      <div className="upos-text order-date">
        <AccessTimeIcon className='order-date-icon' fontSize="small" />
        {date}
      </div>
    </Link>
  )
  // try {
  //   // "2021-04-29 09:29:09"
  //   const {data} = params
  //   const date = moment(data.date, 'YYYY-MM-DD HH:mm:ss').format(
  //     'HH:mm | DD/MM/YYYY',
  //   )
  //   return (
  //     <Link
  //       to={{
  //         pathname: PATH.ORDER_DETAIL,
  //         // search: "?sort=name",
  //         // hash: "#the-hash",
  //         state: {fromDashboard: true},
  //         search: `${data.id}`,
  //         // hash: "#the-hash",
  //       }}
  //       onClick={() => {
  //         dataStorage.OrderDetail = params.data
  //       }}
  //       className="order-id-wrapper cursor-pointer"
  //     >
  //       <div className="upos-text order-id">{data.id}</div>
  //       <div className="upos-text order-date">
  //         <AccessTimeIcon className='order-date-icon' fontSize="small" />
  //         {date}
  //       </div>
  //     </Link>
  //   )
  // } catch (error) {
  //   return '--'
  // }
}
const renderExpandIcon = params => {
  const { data } = params
  let isexpand = false
  if (data.order_details.length) {
    return (
      <img
        src="/img/order/expand.png"
        className="bounder-button order-list-expand"
        onClick={e => {
          isexpand = !isexpand
          if (isexpand) {
            e.target.style.transform = 'rotate(90deg)'
          } else {
            e.target.style.transform = 'rotate(0deg)'
          }
          params.api
            .getDisplayedRowAtIndex(params.node.rowIndex)
            .setExpanded(isexpand)
        }}
      />
    )
  }
    return <div />
  // try {
  //   const {data} = params
  //   let isexpand = false
  //   if (data.order_details.length) {
  //     return (
  //       <img
  //         src="/img/order/expand.png"
  //         className="bounder-button order-list-expand"
  //         onClick={e => {
  //           isexpand = !isexpand
  //           if (isexpand) {
  //             e.target.style.transform = 'rotate(90deg)'
  //           } else {
  //             e.target.style.transform = 'rotate(0deg)'
  //           }
  //           params.api
  //             .getDisplayedRowAtIndex(params.node.rowIndex)
  //             .setExpanded(isexpand)
  //         }}
  //       />
  //     )
  //   }
  //   return <div />
  // } catch (error) {
  //   return <div>error</div>
  // }
}
const renderClient = params => {
  const { data } = params
  return (
    <div className="client-wrapper upos-text">
      <div className="client-name">{data.customer_name}</div>
      <div className="client-phone">{data.customer_mobile}</div>
    </div>
  )
  // try {
  //   const {data} = params
  //   return (
  //     <div className="client-wrapper upos-text">
  //       <div className="client-name">{data.customer_name}</div>
  //       <div className="client-phone">{data.customer_mobile}</div>
  //     </div>
  //   )
  // } catch (error) {}
}
const renderAdress = params => {
  try {
    const {data} = params
    return (
      <div className="client-adress upos-text">{data.customer_address}</div>
    )
  } catch (error) {}
}

const renderStatus = params => {
  try {
    const {data} = params
    return (
      <div className="order-list-status">
        <TrackingStatus status={data.shipping_status_id} />
      </div>
    )
  } catch (error) {}
}
const renderOrder = params => {
  try {
    const {data} = params
    return (
      <div className="order-balance">
        <span className="upos-text upos-bold">
          {displayNumber(data.total_amount)}đ
        </span>
      </div>
    )
  } catch (error) {}
}
const renderCOD = params => {
  try {
    const {data} = params
    return (
      <div className="order-balance">
        <span className="upos-text upos-bold">
          {displayNumber(data.cod_amount)}đ
        </span>
      </div>
    )
  } catch (error) {}
}
// Hủy
const renderControlRow = params => <div className="upos-text" />

function isFirstColumn(params) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns()
  const thisIsFirstColumn = displayedColumns[0] === params.column
  return thisIsFirstColumn
}
/**
 * @default param
 */
function GetMenuRow(status) {
  let list = [
    {
      label: 'report',
      value: 'report',
      customItemClass: ' upos-text upos-error-text',
    },
    {label: 'cancel', value: 'cancel'},
  ]
  if (status === '21' || status === '8') {
    list = [
      ...list,
      ...[
        {label: 'edit', value: 'edit'},
        {label: 'send_order', value: 'send_order'},
      ],
    ]
  }
  if (status === '1') {
    list = [...list, ...[{label: 'edit', value: 'edit'}]]
  }
  return list
}
const UpdateStatusOrder = (status, id) => {
  const url = getUrlUpdateStatus()
  const data = new FormData()
  data.append('order_ids', [id])
  data.append('status', status)
  // postData(url)
  //   .then((res) => {
  //     console.log("success");
  //   })
  //   .catch((error) => {
  //     UposLogFunc(error.message);
  //   });
}
export default function GridData({...rest}) {
  const renderSideMenu = params => {
    const {data} = params
    const {api} = params
    const node = api.node || {}
    const isLast = node.lastChild
    const list = GetMenuRow(data.shipping_status_id)
    return (
      <div className="wrap-menu-side">
        <Dropdown
          listOption={list}
          selected={{label: '...', value: 'more'}}
          icon={menuIcon}
          isHideExpand
          cb={item => {
            const location = {
              pathname: PATH.EDIT_ORDER,
              search: data.id,
              // hash: "#the-hash",
              state: {data},
            }
            switch (item.value) {
              case 'edit':
                navigate(location)
                break
              case 'send_order':
                UpdateStatusOrder('1', data.id)
                break
              case 'cancel':
                UpdateStatusOrder('1', data.id)
                break

              default:
                break
            }
          }}
          customClass={
            isLast ? 'ag-grid-dropdown grid-last-child' : 'ag-grid-dropdown'
          }
        />
      </div>
    )
  }
  const renderTranport = params => {
    try {
      const {data} = params
      let display_name
      const {order_partner_ship} = data
      switch (order_partner_ship) {
        case '1':
          display_name = 'evoshop'
          break
        case '2':
          display_name = 'Giao hàng tiết kiệm'
          break
        case '3':
          display_name = 'Giao hàng nhanh'
          break
        case '4':
          display_name = 'Viettel post'
          break
        default:
          break
      }
      return (
        <div className="tranport-wrapper ">
          <div className="tranport-unit upos-text">{display_name}</div>
          <div className="tranport-cost">
            <span className="upos-text">{`${t('shipping_fee_short')}`}</span>
            <span className="upos-text upos-bold">{`: ${displayNumber(
              data.total_amount,
            )} đ`}</span>
          </div>
        </div>
      )
    } catch (error) {}
  }
  const columnDefs = [
    {
      field: 'expand_icon',
      cellRenderer: 'renderExpandIcon',
      headerCheckboxSelection: true,
      headerComponentParams: {label: 'expand_icon'},
      minWidth: 70,
      maxWidth: 70,
      cellClass: 'upos-grid-control-cell upos-cell-revert',
      checkboxSelection: true,
    },
    {
      field: 'order_id',
      cellRenderer: 'renderOrderId',
      headerComponentParams: {label: 'order_id'},
      width: 200,
      cellClass: 'order-order-id-cell ag-grid-cell-center',
    },
    {
      field: 'client',
      cellRenderer: 'renderClient',
      headerComponentParams: {label: 'client'},
      cellClass: 'order-client-address-cell',
      width: 200,
    },
    {
      field: 'address',
      cellRenderer: 'renderAdress',
      headerComponentParams: {label: 'address'},
      cellClass: 'ag-grid-cell-center',
      width: 200,
    },
    {
      field: 'tranport',
      cellRenderer: 'renderTranport',
      headerComponentParams: {label: 'tranport'},
      cellClass: 'ag-grid-cell-center',
      width: 135,
    },
    {
      field: 'status',
      cellRenderer: 'renderStatus',
      headerComponentParams: {label: 'status'},
      cellClass:
        'upos-grid-status-order ag-grid-cell-center ag-grid-cell-status-order',
      width: 200,
    },
    {
      field: 'order-bill',
      cellRenderer: 'renderOrder',
      headerComponentParams: {label: 'order-bill'},
      width: 135,
    },
    {
      field: 'cod',
      cellRenderer: 'renderCOD',
      headerComponentParams: {label: 'cod'},
      width: 135,
    },
    {
      field: 'menu_side',
      cellRenderer: 'renderSideMenu',
      headerComponentParams: {label: 'hidden_header'},
      cellClass: 'upos-grid-menu upos-grid-menu-center',
      width: 40,
    },
  ]
  const defaultColDef = {
    flex: 1,
    resizable: true,
    // checkboxSelection: isFirstColumn,
  }
  const frameworkComponents = {
    renderOrderId,
    renderClient,
    renderAdress,
    renderTranport,
    renderStatus,
    renderOrder,
    renderCOD,
    agColumnHeader: CustomHeader,
    myDetailCellRenderer: DetailCellRenderer,
    renderSideMenu,
    renderControlRow,
    renderExpandIcon,
  }
  const getRowNodeId = data => data.id
  const overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
  const defaultPage = {
    per_page: '20',
    start: '0',
    current_page: 1,
    all_page: '0',
  }
  // init
  const props = {...rest}
  const detailCellRenderer = 'myDetailCellRenderer'
  const {data = [], callBack = () => {}} = props
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [orderState, dispatchOrderState] = useContext(OrderContext)
  const {listOrderSelected} = orderState
  const pageObj = orderState.ObjectFilter.page_obj
  const FilterObj = orderState.ObjectFilter
  const {all_page} = pageObj
  const page = pageObj.current_page
  const {per_page} = pageObj
  const {start} = pageObj
  const total_order = pageObj.totals

  const handleChange = (event, value) => {
    const start = per_page * (value - 1)
    const newPageObje = {
      start,
      current_page: value,
    }
    dispatchOrderState({
      type: 'UPDATE_OBJ_PAGE',
      payload: newPageObje,
    })
    // dispatchOrderState({ type: "UPDATE_CURRENT_PAGE", payload: value });
    // dispatchOrderState({ type: "UPDATE_START", payload: start });
    callBack({start})
  }

  const renderLeftPagination = (start, perPage, allOrder) => {
    const numStart = start ? Number(start) : 0
    const numPerPage = perPage ? Number(perPage) : 0
    const numAllOrder = allOrder ? Number(allOrder) : 0
    const from = numStart || 0
    let to = 0
    numStart + numPerPage > numAllOrder
      ? (to = numAllOrder)
      : (to = numStart + numPerPage)

    return `${t('display_order')} ${from + 1} - ${to}. ${t('page')}`
  }

  const onGridReady = params => {
    gridApi = params.api
    setTimeout(() => {
      gridApi.sizeColumnsToFit()
    }, 500)
    gridApi.forEachLeafNode(node => {
      if (listOrderSelected.includes(node.data.id)) {
        node.setSelected(true)
      }
    })
  }

  const getRowStyle = params => {}
  const getRowClass = params => {
    if (params.node && params.node.detail) {
      return 'order-background'
    }
  }

  const getRowHeight = params => {}
  const dynamicCellStyle = params => {
    // retur
  }
  const onFirstDataRendered = params => {}
  const resetPage = () => {
    const start = 0
    dispatchOrderState({type: 'UPDATE_OBJ_PAGE', payload: defaultPage})
    callBack({start})
  }
  const onChangeInputPage = e => {
    const text = e.target.value
    if (/^[0-9]*$/.test(text)) {
      const num = Number(text)
      if (num > all_page) {
        resetPage()
      } else {
        const perpage = Number(per_page)
        const start = (num - 1) * perpage
        const newPageObj = {
          current_page: num,
          start,
        }
        dispatchOrderState({type: 'UPDATE_OBJ_PAGE', payload: newPageObj})
        dispatchOrderState({type: 'UPDATE_LIST_ORDER_SELECTED', payload: []})
        callBack({start})
      }
    } else {
      resetPage()
    }
  }
  const onSelectionChanged = event => {
    const rowCount = event.api.getSelectedNodes() || []
    const arr = []
    rowCount.map((v, i) => {
      if (v.data && v.data.id) {
        arr.push(v.data.id)
      }
    })
    dispatchOrderState({type: 'UPDATE_LIST_ORDER_SELECTED', payload: arr})
  }
  const updateSize = () => {
    if (timeOut) {
      clearTimeout(timeOut)
    } else {
      setTimeout(() => {
        if (gridApi && gridApi.sizeColumnsToFit) {
          gridApi.sizeColumnsToFit()
        }
      }, 500)
    }
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  const {openMenu} = useConfigContext()
  if (menuStatus === null) {
    menuStatus = openMenu
    // console.log("kyn--firttime");
  } else if (menuStatus !== openMenu) {
    // console.log("kyn--trigger change");
    if (gridApi && gridApi.sizeColumnsToFit) {
      setTimeout(() => {
        gridApi.sizeColumnsToFit()
      }, 500)
      menuStatus = openMenu
    }
  } else {
    // console.log('kyn--nothing change')
  }
  if (!data || !data.length) return <EmptyOrder />
  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <div className="upos-grid-disable-scroll-x order-grid-wrapper ff-scroll-bar-type-3">
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          // className={
          //   props.className
          //     ? `${props.className} ag-theme-alpine`
          //     : 'ag-theme-alpine'
          // }
          className={
            'ag-theme-alpine upos-grid-disable-scroll-x upos-grid-disable-scroll-x-2'
          }
        >
          <AgGridReact
            rowHeight={64}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            masterDetail
            detailCellRenderer={detailCellRenderer}
            onGridReady={onGridReady}
            getRowHeight={getRowHeight}
            onFirstDataRendered={onFirstDataRendered}
            frameworkComponents={frameworkComponents}
            rowData={data}
            suppressRowClickSelection
            rowSelection="multiple"
            getRowStyle={getRowStyle}
            getRowClass={getRowClass}
            cellStyle={dynamicCellStyle}
            overlayLoadingTemplate={overlayLoadingTemplate}
            onSelectionChanged={onSelectionChanged}
            getRowNodeId={getRowNodeId}
          />
        </div>
      </div>
      <div className="upos-grid-pagination">
        <div className="left-footer">
          <div className="upos-text">
            {renderLeftPagination(start, per_page, total_order)}
          </div>
          <input
            className="upos-input input-pagination upos-text"
            value={page}
            onChange={e => {
              onChangeInputPage(e)
            }}
          />
          <div className="upos-text">{` / ${all_page}`}</div>
        </div>
        <div className="right-footer">
          <Dropdown
            listOption={[
              {label: '20', value: 20},
              {label: '50', value: 50},
              {label: '100', value: 100},
              {label: '150', value: 150},
              {label: '200', value: 200},
            ]}
            selected={{label: per_page, value: per_page}}
            cb={item => {
              const newPageObje = {
                per_page: item.value,
                start: 0,
                current_page: 1,
              }
              dispatchOrderState({
                type: 'UPDATE_OBJ_PAGE',
                payload: newPageObje,
              })
              dispatchOrderState({
                type: 'UPDATE_LIST_ORDER_SELECTED',
                payload: [],
              })
              callBack({per_page: item.value, start: ''})
            }}
          />
          <div className="upos-text">{t('order_per_page')}</div>
          <div className="pagination-wrapper">
            <Pagination
              siblingCount={0}
              boundaryCount={2}
              count={all_page}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
