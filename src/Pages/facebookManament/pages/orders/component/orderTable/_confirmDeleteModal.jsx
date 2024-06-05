import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const ConfirmDeleteModal = ({
  content,
  isLoading,
  title,
  onClose,
  onSubmit,
  ...props
}) => {
  return (
    <StyledConfirmDeleteModal {...props} onClick={onClose}>
      <div
        className="order-table-facebook__confirm-delete-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="order-table-facebook__confirm-delete-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
            {title}
          </Text>
        </div>
        <div className="order-table-facebook__confirm-delete-modal__body">
          <Text>{content}</Text>
        </div>
        <div className="order-table-facebook__confirm-delete-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Đóng
          </Button>
          <Button
            disabled={isLoading}
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={onSubmit}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </StyledConfirmDeleteModal>
  )
}

const StyledConfirmDeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .order-table-facebook__confirm-delete-modal {
    &__container {
      width: 480px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__body {
      margin-bottom: 32px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
`
