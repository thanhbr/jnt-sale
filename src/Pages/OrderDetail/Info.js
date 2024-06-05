import {OrderContext} from '../../LayoutWrapper'
import {useState, useEffect, useRef, useContext} from 'react'
import {AgGridReact} from 'ag-grid-react'
import CustomHeader from './customHeader'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import dataStorage from '../../dataStorage'
import {getUrlOrderDetail} from '../../api/url'
import {getData} from '../../api/api'
import {displayNumber, getPriceBoardName} from '../../util/functionUtil'

const infoLine = (item = {}) => (
  <div className="info-line-wrapper">
    <div className="info-line-label upos-text upos-text-color-main ">
      {item.label || '--'}
    </div>
    <div className="info-line-value upos-text upos-text-indygo-dye upos-text-roboto-medium-500">
      {item.value || '--'}
    </div>
  </div>
)
const renderNo = params => {
  try {
    const {data} = params
    return <div className="client-adress upos-text ">{data.no || ''}</div>
  } catch (error) {}
}
const renderSku = params => {
  try {
    const {data} = params
    return <div className="client-adress upos-text">{data.sku}</div>
  } catch (error) {}
}
const renderDescription = params => {
  try {
    const {data} = params
    return <div className="client-adress upos-text">{data.description}</div>
  } catch (error) {}
}
const renderQuantity = params => {
  try {
    const {data} = params
    return <div className="client-adress upos-text">{data.quantity}</div>
  } catch (error) {}
}
const renderPrice = params => {
  try {
    const {data} = params
    return (
      <div className="client-adress upos-text">{displayNumber(data.price)}</div>
    )
  } catch (error) {}
}
const renderDiscount = params => {
  try {
    const {data} = params
    return (
      <div className="client-adress upos-text">
        {displayNumber(data.discount)}
      </div>
    )
  } catch (error) {}
}
const renderTotal = params => {
  try {
    const {data} = params
    return (
      <div className="client-adress upos-text">{displayNumber(data.total)}</div>
    )
  } catch (error) {}
}

export default function Info({...props}) {
  const columnDefs = [
    {
      field: 'no',
      cellRenderer: 'renderNo',
      headerComponentParams: {label: 'No'},
    },
    {
      field: 'sku',
      cellRenderer: 'renderSku',
      headerComponentParams: {label: 'order_id'},
    },
    {
      field: 'description',
      cellRenderer: 'renderDescription',
      headerComponentParams: {label: 'description'},
    },
    {
      field: 'quantity',
      cellRenderer: 'renderQuantity',
      headerComponentParams: {label: 'quantity'},
    },
    {
      field: 'price',
      cellRenderer: 'renderPrice',
      headerComponentParams: {label: 'price'},
    },
    {
      field: 'discount',
      cellRenderer: 'renderDiscount',
      headerComponentParams: {label: 'discount'},
    },
    {
      field: 'total',
      cellRenderer: 'renderTotal',
      headerComponentParams: {label: 'total'},
    },
  ]
  const defaultColDef = {
    flex: 1,
    resizable: true,
  }
  const frameworkComponents = {
    renderNo,
    renderSku,
    renderDescription,
    renderQuantity,
    renderPrice,
    renderDiscount,
    renderTotal,
    agColumnHeader: CustomHeader,
  }
  const {t} = useTranslation()
  const {rowData, orderDetail, warehouseInfo, employeeInfo} = props
  const onGridReady = params => {}
  const getRowHeight = params => {}
  const onFirstDataRendered = params => {}
  const compDidmount = () => {}
  const compUnmout = () => {}
  const FunctionUltil = () => {
    return (
      <>
        <div className="order-page-function-button">
          <img src="/svg/excel.svg" />
        </div>
        <div className="order-page-function-button">
          <img style={{height: '23px'}} src="/svg/print.svg" />
        </div>
      </>
    )
  }
  useEffect(() => {
    compDidmount()
    return compUnmout()
  }, [])
  return (
    <div className="info-wrapper bg-order-cmp">
      <div className="header-info-tab">
        <div className="order-info-id upos-text upos-text-title upos-text-indygo-dye">
          {/* 149697 */}
          {orderDetail.id}
        </div>
        {/* <div className="order-info-func order-function-wrapper">
          <img src="/svg/excel.svg" />
          <img src="/svg/print.svg" />
        </div> */}
        <div className="order-details-right-header-bar">
          <FunctionUltil />
        </div>
      </div>
      <div className="detail-info-wrapper">
        <div className="detail-info-1">
          {infoLine({
            label: t('creator_order'),
            value: employeeInfo.fullname,
          })}
          {infoLine({
            label: t('order_date_created'),
            value: orderDetail.dt_created
              ? moment(orderDetail.dt_created, 'YYYY-MM-DD hh:mm:ss').format(
                  'DD-MM-YYYY',
                )
              : '--',
          })}
          {infoLine({
            label: t('warehouse_export'),
            value: warehouseInfo.warehouse_name,
          })}
          {infoLine({
            label: t('price_board'),
            value: t(getPriceBoardName(orderDetail.type_price)),
          })}
        </div>
        <div className="detail-info-2">
          {infoLine({
            label: t('order_sender'),
            value: orderDetail.sender_name,
          })}
          {infoLine({
            label: 'Email',
            value: orderDetail.customer_email,
          })}
          {infoLine({
            label: t('Adress'),
            value: orderDetail.customer_address,
          })}
          {infoLine({
            label: t('buyer'),
            value: `${orderDetail.customer_name} - ${
              orderDetail.customer_mobile }`,
          })}
        </div>
      </div>
      <div className="detail-info-3 bg-header-white">
        {rowData.length ? (
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
          />
        ) : (
          <div className="nodata-wrapper">
            <div className="upos-text upos-text-indygo-dye">{t('no_data')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
