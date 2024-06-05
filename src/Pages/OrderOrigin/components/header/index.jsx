import {Breadcrumb} from 'common/breadcrumb'
import React, {useState} from 'react';
import {GROUPCUSTOMER_BREADCRUMB} from '../../interfaces/_constants'
import {StyledGrCustomerHeader} from './_styled'
import {ICONS} from '../../interfaces/_icons'
import {Button} from 'common/button'
import OrderOriginModal from '../modals/OrderOriginModal'
import useOrderOrigin from '../../hooks/useOrderOrigin'

export const OrderOriginHeader = ({...props}) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  const {functions} = useOrderOrigin()
  return (
    <StyledGrCustomerHeader {...props}>
      <Breadcrumb links={GROUPCUSTOMER_BREADCRUMB} title="Quản lý nguồn đơn hàng" />
      <div className="address-separate-tool-header__actions">
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.reload}
          onClick={() =>{
            functions.resetPage()
          }}
        />
        <Button
          className="address-separate-tool-header__action-btn gr_btn_add_header"
          icon={ICONS.plus}
          onClick={() => setShowModal(true)}
        >
          Thêm mới
        </Button>
      </div>
      {showModal ? <OrderOriginModal show={showModal} closeModal={closeModal}/> : ''}
    </StyledGrCustomerHeader>
  )
}
