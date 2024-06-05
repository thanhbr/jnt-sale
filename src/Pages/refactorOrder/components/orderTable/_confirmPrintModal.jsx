import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'
import { Radio } from '../../../../common/form/radio'
import useOrderTHead from '../../../deliveryManagement/hooks/useOrderTHead'
import { useState } from 'react'

export const ConfirmPrintModal = ({
  content,
  isLoading,
  title,
  onClose,
  onSubmit,
  ...props
}) => {

  const [statusPrint, setStatusPrint] = useState(true)
  const handleOptionPrint = boo => {
    setStatusPrint(boo)
  }

  return (
    <StyledConfirmDeleteModal {...props} onClick={onClose}>
      <div
        className="order-table__confirm-delete-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="order-table__confirm-delete-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {title}
          </Text>
        </div>
        <div className="order-table__confirm-delete-modal__body">
          <Text as={'p'}>{content}</Text>
          <Text as={'p'} style={{margin: '16px 0px'}}>Hãy kiểm tra lại lựa chọn của bạn để tránh in nhầm đơn bạn nhé.</Text>
          <div className="order-table__confirm-delete-modal__radio" onClick={() => handleOptionPrint(true)}>
            <Radio checked={statusPrint}/>
            <Text as={'p'}>In tất cả đơn đã chọn (trước & sau khi lấy hàng thành công)</Text>
          </div>
          <div className="order-table__confirm-delete-modal__radio" onClick={() => handleOptionPrint(false)}>
            <Radio checked={!statusPrint}/>
            <Text as={'p'}>Chỉ in đơn có trạng thái “Gửi đơn giao hàng”</Text>
          </div>

        </div>
        <div className="order-table__confirm-delete-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            disabled={isLoading}
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={
              () => {
                onSubmit(statusPrint)
                onClose()
              }
            }
          >
            In vận đơn
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

  .order-table__confirm-delete-modal {
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
  .order-table__confirm-delete-modal__radio{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
    p{
      margin-left: 8px;
    }
  }
`
