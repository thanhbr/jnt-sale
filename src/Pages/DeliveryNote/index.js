import { Breadcrumb } from 'common/breadcrumb';
import React, { createContext, useEffect, useReducer } from 'react';
import "./index.scss";
import { initialDelivery } from './store/initial';
import reducerDelivery from './store/reducer';
import { breadCrumbList, delivery_button } from './interFace';
import ButtonHeader from './component/buttonHeader';
import Searching from './component/searching';
import TableDelivery from './component/table/TableDelivery';

import Paginate from './component/paginate/Paginate';
import ModalDelivery from './component/modal/Modal';
import { PageHeader } from 'layouts/pageHeader';
import Modalconfirm from './component/modal/Modalconfirm';
export const Delivery = createContext()
export default function DeliveryNote() {
  const [state, dispatch] = useReducer(reducerDelivery, initialDelivery)
  const { DELIVERY_ACTION_BUTTON } = delivery_button(state, dispatch)

  return (
    <Delivery.Provider value={{ state, dispatch }}>
      <div className='delivery__note-main'>
        <PageHeader
          actions={DELIVERY_ACTION_BUTTON}
          breadcrumbLinks={breadCrumbList}
          breadcrumbTitle="Quản lý mẫu ghi chú giao hàng"
        />
        {state.openModal ? <ModalDelivery /> : ''}
        <Modalconfirm />
        <Searching placeholder={'Tìm kiếm theo nội dung ghi chú'} />
        <div className='delivery_note-table'>
          <TableDelivery />
        </div>
        {/* <Paginate /> */}
      </div>
    </Delivery.Provider>
  )
}
