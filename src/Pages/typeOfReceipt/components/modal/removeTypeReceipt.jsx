import React from 'react';
import {Text} from "../../../../common/text";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import useCreateTypeOrReceipt from "../../hooks/useCreateTypeOrReceipt";

const RemoveTypeReceipt = () => {
  const {method} = useCreateTypeOrReceipt()
  return (
    <ConfirmModal
      openModal={method?.openModalRemove}
      closeModal={() => method.handleCloseConfirmRemove()}
      acceptance={() => method.acceptanceCloseConfirmRemove()}
      stylePopup={'type-receipt-modal-remove'}
      header={<Text fontSize={20} fontWeight={600}>Xóa loại phiếu thu</Text>}
      body={<div style={{marginTop: 24}}>Loại phiếu thu sau khi xoá sẽ không thể khôi phục. Bạn vẫn chắn chắn muốn xoá loại phiếu thu đã chọn?</div>}
      footer={
        {
          cancel: {
            title: 'Huỷ'
          },
          acceptance: {
            title: 'Xóa'
          },
        }
      }
      submitProps={
        {
          appearance: 'danger'
        }
      }
    />
  )
}

export default RemoveTypeReceipt;