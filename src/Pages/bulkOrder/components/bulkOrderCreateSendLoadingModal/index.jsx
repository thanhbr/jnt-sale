import {CircularProgress} from '@mui/material'
import {Text} from 'common/text'
import {StyledBulkOrderCreateSendLoadingModal} from './_styled'
import LinearDeterminate from '../../../../common/__progress'
import { useContext } from 'react'
import { BulkOrderCreateContext } from '../../provider/_context'

export const BulkOrderCreateSendLoadingModal = ({data, ...props}) => {
  const percent = props.percentLoading
  return (
    <StyledBulkOrderCreateSendLoadingModal {...props}>
      <div className="bulk-order-create-send-loading-modal__container">
        <div className="bulk-order-create-send-loading-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 8}}>
            Gửi đơn giao hàng
          </Text>
          <Text as="p" color="#7C88A6">
            Evoshop sẽ kiểm tra thông tin đơn hàng và gửi đơn giao hàng đến đối tác
            vận chuyển
          </Text>
        </div>
        <div className="bulk-order-create-send-loading-modal__body">
          <div className="bulk-order-create-send-loading-modal__loading">
            <CircularProgress
              className="bulk-order-create-send-loading-modal__circle"
              size={54}
              thickness={4}
            />
          </div>
          <Text>Hệ thống đang xử lý dữ liệu, chờ chúng tôi một tí nhé!</Text>
          <div className="LinearDeterminate" style={{width:'100%', margin: '24px'}}>
            <LinearDeterminate value={percent}/>
          </div>
        </div>
      </div>
    </StyledBulkOrderCreateSendLoadingModal>
  )
}
