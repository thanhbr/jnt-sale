import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfigContext } from '../../Component/NavBar/navBar'
import TabView from '../../Component/Tabview/tabview'
import SwitchButton from '../../Component/SwitchButton/switchButton'
import { OrderContext } from '../../LayoutWrapper'
import Info from './Info'
import History from './History'
import ShipperDetail from './ShipperDetail'
import dataStorage from '../../dataStorage'
import { getData } from '../../api/api'
import { getUrlOrderDetail } from '../../api/url'
import ButtonBack from '../../Component/BtnBack/buttonBack'

const checkedIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="8" fill="#3DDBBC" />
    <circle opacity="0.25" cx="11.9998" cy="12" r="11.2" fill="#3DDBBC" />
  </svg>
)

const unCheckIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#B5CBE8" />
  </svg>
)

const dash = (
  <svg
    width="128"
    height="2"
    viewBox="0 0 514 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="514" height="2" fill="#B5CBE8" />
  </svg>
)

const list = [
  { status: true, label: 'Đơn nháp' },
  { status: false, label: 'Gửi đơn giao hàng' },
  { status: false, label: 'Đang vận chuyển' },
  { status: false, label: 'Giao hàng thành công' },
]

function StatusOrder({ ...props }) {
  const { t } = useTranslation()
  const { rowData, orderDetail, warehouseInfo, employeeInfo } = props;
  const status = orderDetail.shipping_status_id
  let pathImg = "/img/order/status1.png"
  switch (status) {
    case "":
      pathImg = "/img/order/status1.png"
      break;

    default:
      break;
  }

  return (
    <div className="status-orderDetail-wrapper">
      <div className="status-order-detail-diagram">
        <img src={pathImg} />
      </div>
      <div className="status-order-detail-text upos-text">
        <div className="status-order-detail-text-block">
          {t("order-draft")}
        </div>
        <div className="status-order-detail-text-block">
          {t("send_order")}
        </div>
        <div className="status-order-detail-text-block">
          {t("deliverying")}
        </div>
        <div className="status-order-detail-text-block">
          {t("sucess-delivery")}
        </div>
      </div>
      {/* {list.map((item, index) => {
        return (
          <div key={uuidv4()} className="child-order-detail-stt-wrapper">
            <div className="icon-order-status">
              {item.status ? checkedIcon : unCheckIcon}
              {!(index === list.length - 1) ? (
                <div className="status-dash">{dash}</div>
              ) : null}
            </div>
            <div className="label-status">{item.label}</div>
          </div>
        )
      })} */}
    </div>
  )
}
export default function OrderDetail({ ...props }) {
  const [state, dispatch] = useContext(OrderContext)
  const { openMenu } = useConfigContext()
  const { t } = useTranslation()
  const data = dataStorage.OrderDetail || {}
  const idWarehouse = data.warehouse_id
  const userId = data.user_id
  const listWarehouse = dataStorage.listWarehouse || []
  const listEmployee = dataStorage.listEmployee || []
  const history = useNavigate()
  const paramsLink = useParams()
  let warehouseInfo = {}
  for (let index = 0; index < listWarehouse.length; index++) {
    const element = listWarehouse[index]
    if (element.id === idWarehouse) warehouseInfo = element
  }
  let employeeInfo = {}
  for (let index = 0; index < listEmployee.length; index++) {
    const element = listEmployee[index]
    if (element.user_id === userId) employeeInfo = element
  }
  const [orderDetail, changeOrderData] = useState({})
  const [rowData, updateData] = useState([])
  const changeTabView = item => {
    if (item.value === state.OrderTab) return
    dispatch({ type: 'SET_ORDER_TAB', payload: item.value })
    switch (item.value) {
      case 'manage_order':
        // getDataManageOrder();
        break
      case 'pos_bill':
        // getDataPossBill();
        break
      default:
        break
    }
  }
  const compDidmout = () => {
    let id
    id = (data && data.id) || window.location.search.substring(1) || null
    if (!id) {
      return
    }
    const url = getUrlOrderDetail(id)
    getData(url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const response = res.data.data || {}
          const detai = response.items || []
          // const typePrice = orderData.type_price;
          // change_type_price(typePrice);
          changeOrderData(response)
          const DATA = []
          detai.map((value, index) => {
            DATA.push({
              no: index + 1,
              sku: value.product_id,
              description: value.product_name,
              quantity: value.quantity,
              price: value.supplier_price,
              discount: value.discount,
              total: value.price,
            })
          })
          DATA.forEach((dataItem, index) => {
            dataItem.rowHeight = 64
          })
          updateData(DATA)
        }
      })
      .catch(error => { })
  }
  const compUnmout = () => { }
  useEffect(() => {
    compDidmout()
    return compUnmout()
  }, [])
  function RenderTab({ ...props }) {
    const { selected, listTab = [] } = props
    const { t } = useTranslation()
    return (
      <div className="upos-tab-wrapper">
        {listTab.map((v, i) => {
          const isActive = selected === v.value
          return (
            <div
              key={i}
              onClick={v.onClickTAb}
              className={
                isActive ? 'upos-tab-active upos-text-roboto-medium-500' : 'upos-tab-disable upos-text-roboto-medium-500'
              }
            >
              {t(v.label)}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      <div className="order_tab">
        <TabView
          t={t}
          list={[
            {
              label: 'manage_order',
              value: 'manage_order',
            },
          ]}
          cb={item => changeTabView(item)}
          selected={state.OrderTab}
        />
      </div>

      <Grid container className="new-orderDetail-line1">
        <Grid item xs={12} sm={12} md={4} className="new-orderDetail-line1-1">
          <ButtonBack customClass="new-order-button-back" />
          <div className="title-page new-order">{t('ORDER_DETAIL')}</div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className="grid-row-status-order">
          <StatusOrder orderDetail={orderDetail} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <StatusOrder orderDetail={orderDetail} /> */}
        </Grid>
      </Grid>
      <Grid container className="new-orderDetail-line2">
        <Grid item xs={12} sm={12} md={8} className="new-orderDetail-line2-1">
          <RenderTab
            selected={state.DetailTab}
            listTab={[
              {
                label: 'order_detail_infomation',
                key: '',
                value: 'order_detail',
                onClickTAb: () => {
                  dispatch({ type: 'SET_DETAIL_TAB', payload: 'order_detail' })
                },
                customClass: '',
              },
              {
                label: 'order_history_infomation',
                key: '',
                value: 'order_history',
                onClickTAb: () => {
                  dispatch({
                    type: 'SET_DETAIL_TAB',
                    payload: 'order_history',
                  })
                },
                customClass: '',
              },
            ]}
          />
          {state.DetailTab === 'order_detail' ? (
            <Info
              orderDetail={orderDetail}
              rowData={rowData}
              warehouseInfo={warehouseInfo}
              employeeInfo={employeeInfo}
            />
          ) : (
            <History
              orderDetail={orderDetail}
              rowData={rowData}
              warehouseInfo={warehouseInfo}
              employeeInfo={employeeInfo}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} className="new-orderDetail-line2-2">
          {state.DetailTab === 'order_detail' ? (
            <ShipperDetail
              orderDetail={orderDetail}
              rowData={rowData}
              warehouseInfo={warehouseInfo}
              employeeInfo={employeeInfo}
            />
          ) : null}
        </Grid>
      </Grid>
    </>
  )
}
