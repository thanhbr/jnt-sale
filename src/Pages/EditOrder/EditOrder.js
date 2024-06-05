import React, { useState, useEffect, useContext, Fragment } from 'react'

import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useConfigContext } from '../../Component/NavBar/navBar'
import dataStorage from '../../dataStorage'
import { getData } from '../../api/api'
import { getUrlOrderDetail } from '../../api/url'
import TabView from '../../Component/Tabview/tabview'
import ButtonBack from '../../Component/BtnBack/buttonBack'
import ProductInfomation from './productInfomation'
import OrderInfomation from './orderInfomation'
import ClientInfomation from './clientInfomation'
import TranportInfomation from './tranportInfomation'
import StatusOrderCheck from './statusOrderCheck'
import { OrderContext } from '../../LayoutWrapper'
import SimpleModal from '../../Component/Modal/modal'
import ClientContact from '../../Component/ClientContact/ClientContact'
import { useWindowSize } from '../../Component/ListMenu/listMenu'

let count = 0
export default function EditOrder() {
  const { openMenu } = useConfigContext()
  const { t } = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const [width, height] = useWindowSize()
  const history = useNavigate()
  const data = history.location.state.data || {}
  const [orderDetail, changeOrderDetail] = useState({})
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
  const mapDataOrder = data => {
    const datastore = dataStorage
    const dataTree = {
      contact: { start: { info: { undefined: {} } } },
      message: {},
      fee: [],
      warehouse: { value: '11', label: 'Kho mặc định' },
      price_board: { label: 'retail_price_board', value: 'retail_price_board' },
      client_info: {
        name: data.customer_name,
        mobile: data.customer_mobile,
        city_id: data.city_id,
        city_name: '',
        district_id: data.district_id,
        district_name: 'Quận Bình Thạnh',
        ward_id: data.ward_id,
        ward_name: 'Phường 15',
        address: data.customer_address,
        area: {
          label: 'Hồ Chí Minh - Quận Bình Thạnh',
          value: { district_id: data.district_id, city_id: data.city_id },
        },
        ward: { label: 'Phường 15', value: data.ward_id },
      },
      product_info: [
        {
          product_id: '10885',
          product_id_details: '1321',
          product_model: 'ao3lo-L-T',
          no: 1,
          id: 'ao3lo-L-T',
          sku: 'ao3lo-L-T',
          inventory: '178',
          quantity: 1,
          price: 100000,
          display_price: 100000,
          discount: { unit: 'đ', value: '' },
          total: 100000,
          wholesale_price: '90000',
          weight: '200',
          weight_unit: 'g',
        },
        {
          product_id: '10884',
          product_id_details: '1314',
          product_model: '0068-l-d',
          no: 2,
          id: '0068-l-d',
          sku: '0068-l-d',
          inventory: '150',
          quantity: 1,
          price: 45000,
          display_price: 45000,
          discount: { unit: 'đ', value: '' },
          total: 45000,
          wholesale_price: '40000',
          weight: '500',
          weight_unit: 'g',
        },
      ],
      shipping_info: {
        isSelected: data.order_partner_ship,
        saleAt: 'sale_with_shipping_partner',
        partner: {
          [data.order_partner_ship]: {
            id: data.order_partner_ship,
            id_sender: data.id_sender,
            request_goods: data.request_goods,
            recipient_view: data.recipient_view,
            is_insurrance: data.is_insurrance,
            payment_method: data.payment_method,
            lengh: data.lengh,
            width: data.width,
            height: data.height,
            insurrance_value: data.insurrance_value,
            cod: data.cod_amount,
            partsign: data.partsign,
            note: data.note,
          },
        },
        serviceSelected: {},
      },
      order_info: {
        orderCode: '121313',
        origin: { label: 'API Origin', value: data.order_partner_ship },
        note: data.note,
        discount: 0,
        totals: data.total_amount,
      },
      totals: data.total_amount || 0,
      discount: data.total_discount || 0,
      showModal: false,
    }
    dispatch({ type: 'UPDATE_DATA_EDIT', payload: dataTree })
  }
  count++
  console.log(`render time ===========  editorder${count}`)
  useEffect(() => {
    const { id } = data
    const urlOrderDetail = getUrlOrderDetail(id)
    getData(urlOrderDetail).then(res => {
      if (res && res.data && res.data.success) {
        changeOrderDetail(res.data.data)
        mapDataOrder(res.data.data)
      }
    })
  }, [])
  return (
    <Fragment>
      <SimpleModal
        open={state.new_order.showModal}
        callback={() => {
          dispatch({ type: 'SHOW_MODAL', payload: false })
        }}
      >
        <ClientContact />
      </SimpleModal>
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
      <Grid container className="new-order-line1">
        <Grid item xs={12} sm={12} md={3} className="new-order-line1-1">
          <ButtonBack />
          <div className="title-page new-order">{t('edit_order')}</div>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <StatusOrderCheck />
        </Grid>
      </Grid>
      <Grid container className="new-order-line2">
        {width > 1800 || width < 960 ? (
          <>
            <Grid className="new-order-line2-1" item xs={12} sm={12} md={3}>
              <ClientInfomation />
            </Grid>
            <Grid className="new-order-line2-2" item xs={12} sm={12} md={6}>
              <ProductInfomation />
              <TranportInfomation />
            </Grid>
            <Grid className="new-order-line2-3" item xs={12} sm={12} md={3}>
              <OrderInfomation />
            </Grid>
          </>
        ) : width > 959 || width < 1801 ? (
          <>
            <Grid className="new-order-line2-1" item xs={12} sm={12} md={3}>
              <ClientInfomation />
              <div style={{ marginTop: '24px' }}>
                <OrderInfomation />
              </div>
            </Grid>
            <Grid className="new-order-line2-2" item xs={12} sm={12} md={9}>
              <ProductInfomation />
              <TranportInfomation />
            </Grid>
            {/* <Grid className="new-order-line2-3" item xs={12} sm={12} md={3}>
            </Grid> */}
          </>
        ) : (
          <>
            <div>Case-not-support</div>
          </>
        )}
      </Grid>
    </Fragment>
  )
}
