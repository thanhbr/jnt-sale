import React from 'react'
import { Text } from 'common/text'
import '../index.scss'
import useFacebookDetailConversation from '../../../hooks/useFacebookDetailConversation'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'

const DeleteCommentModal = ({ ...props }) => {
  const { data, comment } = useFacebookDetailConversation()
  const confirm = data?.detail?.conversation?.confirm?.delete
  return (
    <>
      <ConfirmModal
        openModal={!!confirm?.comment_id}
        body={<Confirm/>}
        stylePopup={'product-group-modal_confirm'}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Đóng',

            },
            acceptance: {
              width: 110,
              title: 'Xóa'
            },
          }
        }
        submitProps={
          {
            appearance: 'danger'
          }
        }
        footerProps={
          { className: 'product-group-modal_dismiss' }
        }
        closeModal={() => comment.func?.handleDeleteCommentConfirm()}
        acceptance={() => comment.func?.handleDeleteComment(confirm)}
      />
    </>

  )
}
export default DeleteCommentModal
const Confirm = () => {
  return (
    <div>
      <Text
        fontSize={19}
        fontWeight={600}
      >Xóa bình luận</Text>
      <Text as='p' className='product-group-modal_txt'>
        Thao tác này sẽ xóa bình luận cả trên evoshop và Facebook, sau khi thực hiện sẽ không thể khôi phục. Bạn có chắc chắn muốn xóa?
      </Text>
    </div>

  )
}