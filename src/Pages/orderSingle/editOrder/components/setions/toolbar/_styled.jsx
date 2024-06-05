import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../../../common/theme/_semantics";

export const StyledEditOrderNotificationBar = styled.div`
  position: relative;

  padding: 9px 12px;

  display: flex;

  background: rgba(26, 148, 255, 0.1);
  border: 1px solid ${THEME_SEMANTICS.delivering};
  border-radius: 6px;

  transition: all 0.25s;

  &[data-close-toggle='true'] {
    padding: 10px 42px 10px 12px;
  }

  &[data-type='danger'] {
    background: rgba(255, 85, 85, 0.1);
    border-color: #ff5555;
  }

  &[data-type='success'] {
    background: rgba(0, 171, 86, 0.1);
    border-color: #00ab56;
  }

  &[data-type='warning'] {
    background: rgba(255, 159, 65, 0.1);
    border-color: ${THEME_SEMANTICS.preparing};
  }

  svg {
    width: 20px;
    height: 20px;

    margin: 0 4px 0 0;
  }

  .notification-bar {
    &__delete-btn {
      position: absolute;
      top: 20px;
      right: 12px;

      width: 18px;
      height: 18px;

      background: transparent;
      border: none;

      transform: translateY(-50%);

      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`
