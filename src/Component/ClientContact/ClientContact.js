import {useContext, useEffect, useState} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {useTranslation} from 'react-i18next'
import {AgGridReact} from 'ag-grid-react'
import {OrderContext} from '../../LayoutWrapper'
import PureSearchBox from '../PureSearchBox/PureSearchBox'
import {getUrlCustomer} from '../../api/url'
import {getData} from '../../api/api'
import {
  CheckShippingFee,
  convertStringToNumber,
  getObjectCaculateFee,
} from '../../util/functionUtil'
import CustomHeader from './customHeader'
import BasicPagination from 'Component/Pagination/Pagination'
import Tooltip from '@material-ui/core/Tooltip'
let grid = null
const columnDefs = [
  {
    field: 'name',
    headerName: 'Full_Name',
    width: 130,
    cellRenderer: 'renderName',
    headerComponentParams: {label: 'Full_Name'},
    cellClass: 'paddingUnset upos-multil-line',
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 130,
    cellRenderer: 'renderMobile',
    headerComponentParams: {label: 'Mobile'},
    cellClass: 'paddingUnset',
  },
  {
    field: 'city_provinde',
    headerName: 'city_provinde',
    width: 130,
    cellRenderer: 'renderCity',
    headerComponentParams: {label: 'city_provinde'},
    cellClass: 'paddingUnset upos-multil-line',
  },
  {
    field: 'district',
    headerName: 'district',
    width: 130,
    cellRenderer: 'renderDis',
    headerComponentParams: {label: 'district'},
    cellClass: 'paddingUnset upos-multil-line',
  },
  {
    field: 'ward',
    headerName: 'ward',
    width: 130,
    cellRenderer: 'renderWard',
    headerComponentParams: {label: 'ward'},
    cellClass: 'paddingUnset upos-multil-line',
  },
  {
    field: 'address',
    headerName: 'address',
    minWidth: 230,
    cellRenderer: 'renderAdd',
    headerComponentParams: {label: 'address'},
    cellClass: 'paddingUnset address-cell upos-multil-line',
  },
]
const renderName = params => {
  const {data} = params
  return <div className="contact-name upos-multil-line-cell">{data.name}</div>
}
const renderMobile = params => {
  const {data} = params
  return <div>{data.mobile}</div>
}
const renderCity = params => {
  const {data} = params
  return <div className="upos-multil-line-cell">{data.city_name}</div>
}
const renderDis = params => {
  const {data} = params
  return <div className="upos-multil-line-cell">{data.district_name}</div>
}
const renderWard = params => {
  const {data} = params
  return <div className="upos-multil-line-cell">{data.ward_name}</div>
}
const renderAdd = params => {
  const {data} = params
  return (
    <Tooltip title={data.address} arrow>
      <div className="upos-multil-line-cell">{data.address}</div>
    </Tooltip>
  )
}
let timeout
let objSearch = {}
export default function ClientContact({...props}) {
  const {t} = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const [rows, changeRows] = useState([])
  const [page, setPage] = useState({})
  const CloseClick = () => {
    dispatch({type: 'SHOW_MODAL', payload: false})
  }
  const frameworkComponents = {
    renderName,
    renderMobile,
    renderCity,
    renderDis,
    renderWard,
    renderAdd,
    agColumnHeader: CustomHeader,
  }
  const onGridReady = params => {
    if (params && params.api) {
      grid = params.api
      setTimeout(() => {
        grid.sizeColumnsToFit()
      }, 500)
    }
  }
  const getDataCustomer = url => {
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const {data, meta} = res.data
          setPage(meta)
          changeRows(data)
        }
      })
      .catch(error => {
        console.log('error')
      })
  }
  const compDidMount = () => {
    const url = getUrlCustomer(objSearch)
    getDataCustomer(url)
  }
  const searchCustomer = keyword => {
    objSearch = {...objSearch, ...{keyword}}
    const url = getUrlCustomer(objSearch)
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      getDataCustomer(url)
    }, 300)
  }
  const updateStoreService = data => {
    data.map((v, i) => {
      dispatch({
        type: 'CHANGE_DETAIL_SHIPPING_NEW_ORDER',
        payload: {field: v.id, value: 'shipping_fee', data: v},
      })
    })
  }
  const OnClickRow = item => {
    CloseClick()
    const element = {
      name: item.name,
      mobile: item.mobile,
      city_id: item.city_id,
      city_name: item.city_name,
      district_id: item.district_id,
      district_name: item.district_name,
      ward_id: item.ward_id,
      ward_name: item.ward_name,
      address: item.address,
      area: {
        label: `${item.city_name} - ${item.district_name}`,
        value: {
          district_id: item.district_id,
          city_id: item.city_id,
        },
      },
      ward: {
        label: item.ward_name,
        value: item.ward_id,
      },
    }
    let obj = getObjectCaculateFee(state)
    obj = {
      ...obj,
      ...{
        ward_id: item.ward_id,
        city_id: item.city_id,
        district_id: item.district_id,
      },
    }
    CheckShippingFee(obj, updateStoreService)
    dispatch({
      type: 'UPDATE_ALL_INFO_CUSTOMER',
      payload: element,
    })
  }
  const compUnMount = () => {}
  useEffect(() => {
    compDidMount()
    return compUnMount()
  }, [])
  try {
    return (
      <div className="client-contact-wrapper">
        <div className="contact-header">
          <div className="upos-text upos-h1 client-contact-title">
            {t('contact_customer')}
          </div>
          <div onClick={() => CloseClick()} className="close-modal-button">
            <img src="/svg/bigCloseButton.svg" />
          </div>
        </div>
        <div className="client-contact-body">
          <div className="client-contact-search">
            <PureSearchBox
              suggestText={{
                text1: 'support_search_customer',
                text2: '09123456789',
                text3: 'Kim Cook',
              }}
              callBack={searchCustomer}
            />
          </div>
          <div className="client-contact-grid-data show-scroll-bar">
            <div
              className="client-contact-grid-wrapper-popup upos-grid-border"
              style={{width: '100%', height: '100%', position: 'relative'}}
            >
              <div
                id=""
                style={{height: '100%', width: '100%'}}
                className={
                  props.className
                    ? `${props.className} upos-grid-disable-scroll-x bg-header-white order-grid-wrapper ag-theme-alpine`
                    : 'upos-grid-disable-scroll-x ag-theme-alpine bg-header-white order-grid-wrapper'
                }
              >
                <AgGridReact
                  rowHeight={48}
                  columnDefs={columnDefs}
                  frameworkComponents={frameworkComponents}
                  onGridReady={onGridReady}
                  rowData={rows}
                  onRowClicked={params => {
                    console.log('click row')
                    OnClickRow(params.data)
                  }}
                />
              </div>
            </div>
            <BasicPagination
              isHidePerPage
              isHideLeftFooter
              per_page={page.per_page}
              start={page.start}
              totals={page.total}
              onchangePagination={params => {
                const url = getUrlCustomer(params)
                getDataCustomer(url)
              }}
              unit="ticket_control"
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.log('error')
  }
}
