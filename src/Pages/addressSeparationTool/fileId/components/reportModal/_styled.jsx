import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledReportModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 640px;
  padding: 24px;

  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  transform: translate(-50%, -50%);

  .report-modal {
    &__header,
    &__body {
      margin-bottom: 24px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__btn {
      min-width: 110px;
      margin: 0 0 0 8px;

      &:first-child {
        margin: 0;
      }

      &[data-submit='true'] {
        background: ${THEME_SEMANTICS.failed}!important;
        border-color: ${THEME_SEMANTICS.failed}!important;
      }
    }
  }
`
