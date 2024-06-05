import React, {useContext} from 'react'

import Input from '../Search/index'
import AdvanceFilter from '../AdvancedFilter/index'
import OrderFilter from '../OrderFilter/index'
import ChipFilter from '../ChipFilter/index'
import './index.scss'
import { PanelData } from '../PanelData'
import {OrderContext} from "../../../../LayoutWrapper";
import FormOrderFilter from "../FormOrderFilter";

const Filter = () => {
  const [state, dispatch] = useContext(OrderContext)
  const handleShow = () => {
    dispatch({type: 'TOGGLE_ORDER_FILTER'})
  }
  return (
    <>
      <div className={'order-header'}>
        <div className={'order-filter'}>
          <Input />
          <AdvanceFilter />
          <OrderFilter handleShow={handleShow} />
        </div>
        {state.showOrderFilter ? (
          <FormOrderFilter />
        ) : ''}
        <ChipFilter />
        <PanelData/>
      </div>
    </>
  )
}

export default Filter;