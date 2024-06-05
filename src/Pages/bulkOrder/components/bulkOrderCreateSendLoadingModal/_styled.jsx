import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledBulkOrderCreateSendLoadingModal = styled.div`
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

  .bulk-order-create-send-loading-modal {
    &__container {
      width: 640px;
      padding: 24px;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__body {
      min-height: 172px;
      margin-bottom: 64px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;
    }

    &__loading {
      position: relative;

      width: 54px;
      height: 54px;
      margin-bottom: 24px;

      border: 5px solid #c7e6e5;
      border-radius: 50%;
    }

    &__circle {
      position: absolute;
      top: -5px;
      left: -5px;

      color: ${THEME_COLORS.primary_300};
    }
  }
`
