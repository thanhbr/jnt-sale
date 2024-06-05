import {Breadcrumb} from 'common/breadcrumb'
import React, {useState} from 'react';
import {GROUPCUSTOMER_BREADCRUMB} from '../../interfaces/_constants'
import {StyledGrCustomerHeader} from './_styled'
import {ICONS} from '../../interfaces/_icons'
import {Button} from 'common/button'
import GroupCustomerModal from '../modals/GroupCustomerModal'
import useGroupCustomer from '../../hooks/useGroupCustomer'
import { useTranslation } from "react-i18next";

export const GroupCustomerHeader = ({...props}) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  const {functions} = useGroupCustomer()
  const { t } = useTranslation()
  return (
    <StyledGrCustomerHeader {...props}>
      <Breadcrumb links={GROUPCUSTOMER_BREADCRUMB} title={t("manage_customer_group")} />
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
            {t("general_create")}
        </Button>
      </div>
      {showModal ? <GroupCustomerModal show={showModal} closeModal={closeModal}/> : ''}
    </StyledGrCustomerHeader>
  )
}
