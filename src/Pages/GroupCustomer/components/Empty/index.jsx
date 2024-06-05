import { Grid } from '@mui/material'
import React, {useState} from 'react';
import { Button } from 'common/button'
import { ICONS } from 'Pages/customer/_icons'
import "./index.scss"
import GroupCustomerModal from '../modals/GroupCustomerModal'
import { useTranslation } from "react-i18next";

const Empty =  ({...props}) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  const { t } = useTranslation();
  return (
    <tr className={'grcustomer-tr-empty'}>
      <td colSpan={9}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <div className="container-empty">
          {props.type == "search" ? <img src={'/img/group-customer/empty-group.svg'} alt={'no image customer'}/> : <img src={'/img/group-customer/no-group.svg'} alt={'no image customer'}/> }
            <p className="text-empty">{props.type == 'search' ? t("find_no_data") : t("not_customer_groups_yet") }</p>
            {props.type=='' && (
            <Button
                className="action-btn"
                icon={ICONS.plus}
                onClick={() => setShowModal(true)}
                
              >
              {t("add_customer_group")}
              </Button>)
            }
          </div>
          {showModal ? <GroupCustomerModal show={showModal} closeModal={closeModal}/> : ''}
        </Grid>
      </td>
    </tr>
  )
}
export default Empty