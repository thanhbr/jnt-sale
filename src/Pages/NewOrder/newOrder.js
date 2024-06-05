import React, { useEffect, useContext, Fragment } from 'react'

import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useConfigContext } from '../../Component/NavBar/navBar'
import dataStorage from '../../dataStorage'
import { postData, getData } from '../../api/api'
import { getUrlUserInfo } from '../../api/url'
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
// export function UpdateFeeService(objUpdate = {}) {
//   const [state, dispatch] = useContext(OrderContext);
//   const objFee = getObjectCaculateFee(state);
//   const newObj = { ...objFee, ...objUpdate };
//   const callback = (data) => {
//     data.map((v, i) => {
//       dispatch({
//         type: "CHANGE_DETAIL_SHIPPING_NEW_ORDER",
//         payload: { field: v.id, value: "shipping_fee", data: v },
//       });
//     });
//   };
//   CheckShippingFee(newObj, callback);
// }
export default function ControlPanel() {
  const { openMenu } = useConfigContext()
  const { t } = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const [width, height] = useWindowSize()

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

  count++
  console.log(`render time ===========  NewOrder${count}`)
  useEffect(() => { }, [])
  return (
    <>
      <SimpleModal
        open={state.new_order.showModal}
        callback={() => {
          dispatch({ type: 'SHOW_MODAL', payload: false })
        }}
        modalClassName="modal-client-contact"
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
          <div className="title-page new-order">{t('create_order')}</div>
        </Grid>
        <Grid className="status-check-new-order" item xs={12} sm={12} md={9}>
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
            <Grid
              className="new-order-line2-3 new-order-line2-3-full"
              item
              xs={12}
              sm={12}
              md={3}
            >
              <OrderInfomation />
            </Grid>
          </>
        ) : width > 959 || width < 1801 ? (
          <>
            <Grid className="new-order-line2-1" item xs={12} sm={12} md={3}>
              <ClientInfomation />
              <div style={{ marginTop: '16px' }}>
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
    </>
  )
}
