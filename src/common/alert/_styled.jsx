import styled from 'styled-components'

export const StyledAlert = styled.div`
  position: relative;

  padding: 13px 38px 13px 16px;

  display: flex;

  background: #151624;
  border: 1px solid #151624;
  border-radius: 6px;

  transition: all 0.25s;

  svg {
    width: 20px;
    height: 20px;

    margin: 0 4px 0 0;
  }

  .alert {
    &__delete-btn {
      position: absolute;
      top: 24px;
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

        color: #7c88a6;

        path[stroke] {
          stroke: #7c88a6;
        }
      }
    }
  }
`
