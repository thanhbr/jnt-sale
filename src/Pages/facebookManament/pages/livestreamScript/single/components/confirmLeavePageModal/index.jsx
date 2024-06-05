import {Button} from 'common/button'
import {Modal} from 'common/modal'
import {Text} from 'common/text'

export const FacebookLivestreamScriptSingleConfirmLeavePageModal = ({
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      title="Xác nhận rời khỏi trang"
      actions={[
        <Button
          appearance="ghost"
          size="sm"
          style={{minWidth: 110}}
          onClick={onClose}
        >
          Huỷ
        </Button>,
        <Button
          size="sm"
          style={{minWidth: 110, marginLeft: 8}}
          onClick={onSubmit}
        >
          Xác nhận
        </Button>,
      ]}
      width={480}
      onClose={onClose}
    >
      <Text>
        Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi
        thay đổi chưa được lưu?
      </Text>
    </Modal>
  )
}
