import React from 'react';
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import useTHeadTypeReceipt from "../../hooks/useTHeadTypeReceipt";

const InactiveStatus = () => {
  const {method} = useTHeadTypeReceipt()
  return (
    <ConfirmModal
      openModal={method?.modalInactive?.open}
      closeModal={() => method.handleCloseConfirmInactive()}
      acceptance={() => method.acceptanceCloseConfirmInactive()}
      stylePopup={'type-receipt-modal-inactive'}
      header={<Text fontSize={20} fontWeight={600}>Ngưng sử dụng loại phiếu thu</Text>}
      body={<div style={{marginTop: 24}}>Bạn có chắc chắn muốn ngưng sử dụng loại phiếu thu đã chọn?</div>}
      footer={
        {
          cancel: {
            title: 'Huỷ'
          },
          acceptance: {
            title: 'Xác nhận'
          },
        }
      }
    />
  )
}

export default InactiveStatus;