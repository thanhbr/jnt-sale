import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage_Card = styled.div`
  position: relative;
  z-index: 10;

  height: 220px;
  padding: 32px 12px 12px 12px;

  background: #fff;
  border: 1px solid #fff;
  border-radius: 6px;

  transition: border 0.25s;

  cursor: pointer;

  &[data-disabled='true'] {
    background: linear-gradient(
        0deg,
        rgba(244, 247, 252, 0.45),
        rgba(244, 247, 252, 0.45)
      ),
      linear-gradient(0deg, #ffffff, #ffffff);

    cursor: no-drop;
  }

  &[data-checked='true'],
  &:hover {
    border-color: ${THEME_SEMANTICS.delivering};
  }

  .facebook-fanpage-card {
    &__actions {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      padding: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;

      border-radius: 50%;
    }
  }
`
