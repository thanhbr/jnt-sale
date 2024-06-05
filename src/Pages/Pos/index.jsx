import { StyledPosOrder } from './_styled'
import React, { useEffect, useReducer, useState } from 'react'
import { PosOrderReducer } from './provider/_reducer'
import { posOrderInitialState } from './provider/_initstate'
import { PosOrderProvider } from './provider'
import { usePosOrder } from './hooks/usePosOrder'
import { CustomLayout } from './layouts/custom'
import { GridLayout } from '../../layouts/gridLayout'
import { LeftContentPos } from './layouts/leftContent'
import { RightContentPos } from './layouts/rightContent'
import { Loading } from '../../common/loading'
import ConfirmLeave from './component/modal/confirmLeave'
import ConfirmCloseTabOrder from './component/modal/confirmCloseTabOrder'

export const PosOrder = () => {
  const [state, dispatch] = useReducer(
    PosOrderReducer,
    posOrderInitialState,
  )

  return (
    <PosOrderProvider value={{ state, dispatch }}>
      <PageContainer/>
    </PosOrderProvider>
  )
}
export const PageContainer = ({
  title,
  subTitle,
  description,
  breadcrumb,
  authData,
  actions,
  ...props
}) => {
  const { data, origin } = usePosOrder()
  useEffect(() => {
    origin.fetchOriginData()
    origin.fetchAddressOrder()
  }, [])
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    function listener(e) {
      if (!enabled && !!data.statusUpdate) {
        e.preventDefault();

        const orderPos = data
        orderPos.statusUpdate = false
        orderPos.loading = false
        orderPos.general.modal.leave = false
        orderPos.general.modal.removeOrder = {
          display: false,
          order: {}
        }
        // orderPos.orders.list.map((item, index) => {
        //   orderPos.orders.list[index].changed = false
        // })
        window.localStorage.setItem('order_pos', JSON.stringify(orderPos))
        e.returnValue = true;
        return true;
      }else{
        setEnabled(true)
      }
    }

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [enabled,data.statusUpdate, data.orders?.list]);
  return (
    <StyledPosOrder>
      <CustomLayout>
        {!!data.loading && <Loading/>}
        <ConfirmLeave />
        <ConfirmCloseTabOrder />
        <GridLayout
          {...props}
          className={'pos_grid-layout'}
          grid={[
            {
              className: 'pos-layout-left',
              width: 66.66,
              sections: [
                {
                  props: {

                    style: {
                      padding: 0,
                      background: 'transparent',
                      width: '100%',
                      margin: 0,
                      height: '100vh',
                      marginRight: '24px'
                    },
                    children: <LeftContentPos/>,
                  },
                },
              ],
            },
            {
              className: 'pos-layout-right',
              width: 33.33,
              sections: [
                {
                  props: {
                    children: <RightContentPos/>,
                    style: {
                      margin: 0,
                      borderRadius: 0,
                      height: '100vh',
                      padding: 0,
                      background: '#ffffff',
                      width: '100%',
                    },
                  },
                },
              ],
            },
          ]}
          gridProps={{
            style: {
              width: '100%',
              margin: 0,
            },
          }}
        />
      </CustomLayout>
    </StyledPosOrder>
  )
}
