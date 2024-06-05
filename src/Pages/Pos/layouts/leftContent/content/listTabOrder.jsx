import { Text } from '../../../../../common/text'
import { POS_ICON } from '../../../constants/icons'

import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { PosOrderContext } from '../../../provider/_context'
import { usePosOrderAction } from '../../../hooks/usePosOrderAction'
import { Tooltip } from '../../../../../common/tooltip'

export const ListTab = () => {

  const { state, dispatch } = useContext(PosOrderContext)

  const listOrder = state.orders.list
  const { orders } = state
  const { customer } = orders
  const { warehouses } = state
  const warehouseDefault = warehouses.list.length > 0 ? warehouses.list.find(item => +item.is_main == 1) || warehouses.list[0] : []
  const categoryId = state.products.filter?.groupProduct?.id || ''
  const listPayment = {
    active: state.payment?.method?.listActive,
    list: state.payment?.method?.list,
  }

  const { func, confirmRemoveOrderModal } = usePosOrderAction()

  const handleRemoveOrder = e => {
    if (e.shiftKey && e.keyCode === 46) {
      e.preventDefault()
      if(listOrder.length == 1) return
      const orderActive = listOrder.find(item => item.id == orders.active)
      if (!!orderActive?.changed)
        confirmRemoveOrderModal.onDisplay(true, { id: orderActive.id, listOrder, opt: {customer} })
      else
        func.removeOrders(orders.active, listOrder, { customer })
    }
  }
  const handleAddOrder = e => {
    if (e.keyCode === 112) {
      e.preventDefault()
      func.addNewOrders(listOrder, { warehouseDefault, listPayment, customer, categoryId })
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleRemoveOrder)
    window.addEventListener('keydown', handleAddOrder)

    return () => {
      window.removeEventListener('keyup', handleRemoveOrder)
      window.removeEventListener('keydown', handleAddOrder)
    }
  }, [listOrder, warehouseDefault, state.payment?.method?.list, categoryId, orders.active])

  return (
    <StyledTab>
      {
        orders.list.length > 0 && orders.list.map(order => {
          return (
            <div className={'order-tabs__items'} key={order.id}
                 onClick={() => order.id == orders.active ? '' : func.onTabChange(order.id)}
                 data-active={order.id == orders.active}>
              <Text as={'p'}>Đơn hàng {order.id}</Text>
              <div onClick={e => {
                e.stopPropagation()
                orders.list.length > 1 ? !!order.changed ? confirmRemoveOrderModal.onDisplay(true, {
                  id: order.id,
                  listOrder,
                  opt: {customer}
                }) : func.removeOrders(order.id, listOrder, { customer }) : ''
              }} data-active={orders.list.length > 1}
              >
                {POS_ICON.remove}
              </div>
            </div>
          )
        })
      }
      {
        orders.list.length < 5 && (
          <div className={'order-tabs__add'}
               onClick={() => func.addNewOrders(listOrder, { warehouseDefault, listPayment, customer, categoryId })}>
            <Tooltip title={'Thêm mới đơn hàng (Phím tắt F1)'}>
              {POS_ICON.plus}
            </Tooltip>
          </div>
        )
      }
    </StyledTab>
  )
}

const StyledTab = styled.div`

margin-top: 16px;
display: flex;
align-items: center;
  .order-tabs__add{
    width: 32px;
    height: 32px;
    background: #1A94FF;
    padding: 6px 0;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    :hover{
      background: #46a3f5;
      border-color: #1A94FF;
    }
  }
  .order-tabs__items{
    width: calc(20% - 3.2px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #DDE3E3;
    padding: 6px 16px;
    margin-right: 4px;
    cursor: pointer;
    border-radius: 4px 4px 0px 0px;
    div{
      &[data-active='false']{
        svg{
          g{
            path{
              fill: #EEF5FC;
            }
          }
        }
      }
    }
    :last-child{
      margin-right: 0;
    }
    svg{
      g{
        path{
          fill: #EEF5FC;
        }
      }
    }
    &[data-active=true]{
      background: #ffffff;
      svg{
        g{
          path{
            fill: #FF424E;
          }
        }
      }
    }
    :hover{
      background: #ffffff;
      svg{
        g{
          path{
            fill: #FF424E;
          }
        }
      }
    }
  }
`