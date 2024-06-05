import React, {Component, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {useTranslation} from 'react-i18next'
import {convertStringToNumber, displayNumber} from '../../util/functionUtil'

function CustomHeader({...props}) {
  console.log('custom header create')
  const {t} = useTranslation()
  const {label} = props
  return (
    <div className="order-custom-header upos-text">
      {label ? t(label) : '--'}
    </div>
  )
}

const renderNo = params => {
  try {
    const {data} = params
    if (data.isFooter) {
      return <div className="upos-text upos-bold">{data.no}</div>
    }
    return <div className="upos-text">{data.no || ''}</div>
  } catch (error) {}
}
const renderSku = params => {
  try {
    const {data} = params
    return <div className="upos-text">{data.sku}</div>
  } catch (error) {}
}
const renderDescription = params => {
  try {
    const {data} = params
    return <div className="upos-text">{data.description}</div>
  } catch (error) {}
}
const renderQuantity = params => {
  try {
    const {data} = params
    return <div className="upos-text">{data.quantity}</div>
  } catch (error) {}
}
const renderPrice = params => {
  try {
    const {data} = params
    if (data.isFooter) {
      return <div />
    }
    return (
      <div className="upos-text upos-bold upos-text-indygo-dye">{`${displayNumber(
        data.price,
      )} đ`}</div>
    )
  } catch (error) {}
}
const renderDiscount = params => {
  try {
    const {data} = params
    if (data.isFooter) {
      return (
        <div className="upos-text upos-bold upos-text-indygo-dye">
          {data.discount}
        </div>
      )
    }
    return (
      <div className="upos-text upos-bold upos-text-indygo-dye">{`${displayNumber(
        data.discount,
      )} đ`}</div>
    )
  } catch (error) {}
}
const renderTotal = params => {
  try {
    const {data} = params
    const discount = convertStringToNumber(data.discount)
    const price = convertStringToNumber(data.price)
    const quantity = convertStringToNumber(data.quantity)
    const rowTotal = price * quantity - discount
    let value = '--'
    console.log('kyn -- footer' + data.isFooter)
    data.isFooter ? (value = data.total) : (value = rowTotal)
    return (
      <div>
        <span className="upos-text upos-bold upos-text-indygo-dye">{`${displayNumber(
          value,
        )} đ`}</span>
      </div>
    )
  } catch (error) {}
}

function isFirstColumn(params) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns()
  const thisIsFirstColumn = displayedColumns[0] === params.column
  return thisIsFirstColumn
}

export default function GridData({...props}) {
  const {t} = useTranslation()
  const {data} = props
  const detail = (data && data.order_details) || []
  // let totaldiscount = 0;
  // let totals = 0;
  // for (let index = 0; index < detail.length; index++) {
  //   const element = detail[index];
  //   convertStringToNumber;
  //   const discount = convertStringToNumber(element.discount);
  //   const price = convertStringToNumber(element.price);
  //   const quantity = convertStringToNumber(element.quantity);
  //   const rowTotal = price * quantity - discount;
  //   totaldiscount = totaldiscount + discount;
  //   totals = totals + rowTotal;
  // }
  const columnDefs = [
    {
      field: 'no',
      cellRenderer: 'renderNo',
      headerComponentParams: {label: 'No'},
      maxWidth: 70,
      cellClass: 'order-list-details-cell',
      // pinnedRowCellRenderer: "customPinnedRowRenderer",
    },
    {
      field: 'sku',
      cellRenderer: 'renderSku',
      headerComponentParams: {label: 'order_sku'},
      maxWidth: 100,
      cellClass: 'order-list-details-cell',
    },
    {
      field: 'description',
      cellRenderer: 'renderDescription',
      headerComponentParams: {label: 'description_product'},
      minWidth: 400,
      cellClass: 'order-list-details-cell',
    },
    {
      field: 'quantity',
      cellRenderer: 'renderQuantity',
      headerComponentParams: {label: 'quantity'},
      cellClass: 'order-list-details-cell',
    },
    {
      field: 'price',
      cellRenderer: 'renderPrice',
      headerComponentParams: {label: 'price'},
      cellClass: 'order-list-details-cell',
    },
    {
      field: 'discount',
      cellRenderer: 'renderDiscount',
      headerComponentParams: {label: 'discount'},
      cellClass: 'order-list-details-cell',
    },
    {
      field: 'total',
      cellRenderer: 'renderTotal',
      headerComponentParams: {label: 'total_price'},
      cellClass: 'order-list-details-cell',
    },
  ]
  const defaultColDef = {
    flex: 1,
    resizable: true,
  }
  const customPinnedRowRendererDouble = data => <div>double</div>
  const customPinnedRowRenderer = data => <div>single</div>
  const frameworkComponents = {
    renderNo,
    renderSku,
    renderDescription,
    renderQuantity,
    renderPrice,
    renderDiscount,
    renderTotal,
    agColumnHeader: CustomHeader,
    customPinnedRowRenderer,
    customPinnedRowRendererDouble,
  }
  const [rowData, updateData] = useState(null)
  const onGridReady = params => {
    const DATA = []
    let totaldiscount = 0
    let totals = 0
    detail.map((item, index) => {
      const discount = convertStringToNumber(item.discount)
      const price = convertStringToNumber(item.price)
      const quantity = convertStringToNumber(item.quantity)
      const rowTotal = price * quantity - discount

      // console.log("kyn-discount " + discount);
      // console.log("kyn-price " + price);
      // console.log("kyn-quantity " + quantity);
      // console.log("kyn-rowTotal " + rowTotal);

      const element = {
        no: index + 1,
        sku: item.product_id,
        description: item.product_name,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0,
        total: rowTotal,
      }

      totaldiscount = totaldiscount + discount
      totals = totals + rowTotal
      // console.log("kyn-totals " + totals);
      // console.log("kyn-totaldiscount " + totaldiscount);
      DATA.push(element)
    })
    const footer1 = {
      isFooter: true,
      no: t('note'),
      sku: '',
      description: '',
      quantity: '',
      price: '',
      discount: t('total_discount'),
      total: totaldiscount,
    }
    const footer2 = {
      isFooter: true,
      no: '',
      sku: '',
      description: '',
      quantity: '',
      price: '',
      discount: t('totals'),
      total: totals,
    }
    DATA.push(footer1)
    DATA.push(footer2)
    totaldiscount = 0
    totals = 0
    DATA.map((dataItem, index) => {
      dataItem.rowHeight = 64
    })
    updateData(DATA)
  }
  const pinnedBottomRowData = params => {}
  const getRowHeight = params => {}
  const onFirstDataRendered = params => {}
  if (!detail || !detail.length) return <div> no_data</div>
  return (
    <div id="myMasterDetailGrid" className="full-width-panel">
      <AgGridReact
        id="detailGrid"
        rowHeight={64}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        getRowHeight={getRowHeight}
        onFirstDataRendered={onFirstDataRendered}
        frameworkComponents={frameworkComponents}
        rowData={rowData}
        suppressRowClickSelection
        rowSelection="multiple"
        pinnedBottomRowData={[]}
      />
      {/* <div className="detail-grid-footer">
        <div className="detail-grid-footer-row">abc</div>
        <div className="detail-grid-footer-row">def</div>
      </div> */}
    </div>
  )
}
