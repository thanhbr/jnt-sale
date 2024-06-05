import { Grid } from '@mui/material'
import React, {useState} from 'react';
import { Button } from 'common/button'
import { ICONS } from 'Pages/customer/_icons'
import "./index.scss"
import OrderOriginModal from '../modals/OrderOriginModal'

const Empty =  ({...props}) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  return (
    <tr className={'grcustomer-tr-empty'}>
      <td colSpan={9}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <div className="container-empty">
            <img src={'/img/group-customer/empty-product.png'} alt={'no image customer'}/>
            <p className="text-empty">{props.type == 'search' ? 'Không tìm thấy dữ liệu phù hợp' : 'Bạn chưa có nhóm khách hàng nào' }</p>
            {props.type=='' && (
            <Button
                className="action-btn"
                icon={ICONS.plus}
                onClick={() => setShowModal(true)}
                
              >
                Thêm nhóm khách hàng
              </Button>)
            }
          </div>
          {showModal ? <OrderOriginModal show={showModal} closeModal={closeModal}/> : ''}
        </Grid>
      </td>
    </tr>
  )
}
export default Empty