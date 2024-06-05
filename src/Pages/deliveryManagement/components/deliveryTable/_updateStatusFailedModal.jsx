import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const UpdateStatusFailedModal = ({data, onClose, ...props}) => {
  const { t } = useTranslation()
  return (
    <StyledUpdateStatusFailedModal {...props} onClick={onClose}>
      <div
        className="delivery-manager-table__update-status-failed-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 24}}>
         {t('failed_update_list')}
        </Text>
        {Array.isArray(data) && data.length > 0 && (
          <div className="delivery-manager-table__update-status-failed-modal__content common-scrollbar">
            {data.map(item => (
              <div
                key={item.id}
                className="delivery-manager-table__update-status-failed-modal__content-item"
              >
                {ORDER_ICONS.danger}
                <Text style={{display: 'block', flex: 1}}>
                 {t('order_id')}:<b style={{margin: '0 2px'}}>{item?.billcode || '---'}</b>
                  {item.message}
                </Text>
              </div>
            ))}
          </div>
        )}
        <div className="delivery-manager-table__update-status-failed-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            {t('general_close')}
          </Button>
        </div>
      </div>
    </StyledUpdateStatusFailedModal>
  )
}

const StyledUpdateStatusFailedModal = styled.div`
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

  .delivery-manager-table__update-status-failed-modal {
    &__container {
      max-width: 722px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__content {
      max-height: 50vh;
      margin-bottom: 24px;
      padding: 16px 10px;

      overflow: auto;

      background: #f3f6fc;
      border-radius: 6px;
    }

    &__content-item {
      margin-bottom: 16px;

      display: flex;

      &:last-child {
        margin-bottom: 0;
      }

      svg {
        width: 20px;
        height: 20px;

        margin-right: 8px;
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
`
