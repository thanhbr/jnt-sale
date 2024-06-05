import {Grid} from '@mui/material'
import './index.scss'
import React, {useContext, useEffect} from 'react'
import {OrderContext} from '../../../../LayoutWrapper'
import Skeleton from '@mui/material/Skeleton'
import CountUp from 'react-countup'
import {getData} from '../../../../api/api'
import {getUrlOrderTotal} from '../../../../api/url'

export function PanelData() {
  const [state, dispatch] = useContext(OrderContext)
  let params = {}
  const filter = state.filter
  const meta = state.meta
  params = {
    keyword: filter.keyword.value,
    date_type: filter.date_type.value,
    start_date: filter.start_date.value,
    end_date: filter.end_date.value,
    customer_id: filter.customer_id.value,
    group_user: filter.group_user.value,
    user_id: filter.user_id.value,
    warehouse_id: filter.warehouse_id.value,
    shipping_partner: filter.shipping_partner.value,
    shipping_status: filter.shipping_status.value,
    product_id: filter.product_id.value,
    livestream_id: filter.livestream_id.value,
    order_origin_id: filter.order_origin_id.value,
    start: meta.start,
    per_page: meta.per_page,
  }
  useEffect(() => {
    // fakeDataUser()
    console.log('==============================', params)
    const url = getUrlOrderTotal(params)
    getData(url)
      .then(res => {
        if (res.data.success) {
          dispatch({type: 'SET_META', payload: res.data.data})
          dispatch({type: 'SET_LOADING_PANEL', payload: false})
        }
      })
      .catch(err => {
        console.log('error')
      })
  }, [state.applySearch])
  return (
    <Grid xs={12} sm={12} md={12} lg={12} container className="panel-content">
      <Grid xs={3} sm={3} md={3} lg={3}>
        <div className="panel-item">
          <p className="text-panel">
            <span>Tổng số lượng đơn</span>
          </p>
          {state.meta.totals >= 0 && !state.loadingPanel ? (
            <p className="value-panel">
              <CountUp
                start={10000}
                end={state.meta?.totals}
                duration={1}
                separator=","
              />
            </p>
          ) : (
            <Skeleton variant="text" height={23} />
          )}
        </div>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3}>
        <div className="panel-item">
          <p className="text-panel">
            <span>Tổng COD</span>
          </p>
          {state.meta.totals_cod >= 0 && !state.loadingPanel ? (
            <p className="value-panel">
              <CountUp
                start={10000}
                end={state.meta?.totals_cod}
                duration={1}
                separator=","
              />{' '}
              ₫
            </p>
          ) : (
            <Skeleton variant="text" height={23} />
          )}
        </div>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3}>
        <div className="panel-item">
          <p className="text-panel">
            <span>Tổng giá trị đơn hàng</span>
          </p>
          {state.meta.totals_amount >= 0 && !state.loadingPanel ? (
            <p className="value-panel">
              <CountUp
                start={10000}
                end={state.meta?.totals_amount}
                duration={1}
                separator=","
              />{' '}
              ₫
            </p>
          ) : (
            <Skeleton variant="text" height={23} />
          )}
        </div>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3}>
        <div className="panel-item">
          <p className="text-panel">
            <span>Tổng phí vận chuyển</span>
          </p>
          {state.meta.totals_ship_fee >= 0 && !state.loadingPanel ? (
            <p className="value-panel">
              <CountUp
                start={10000}
                end={state.meta?.totals_ship_fee}
                duration={1}
                separator=","
              />{' '}
              ₫
            </p>
          ) : (
            <Skeleton variant="text" height={23} />
          )}
        </div>
      </Grid>
    </Grid>
  )
}
