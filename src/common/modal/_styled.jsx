import styled from 'styled-components'

export const StyledModal = styled.div`
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

  .modal {
    &__container {
      position: relative;

      padding: 24px;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__close {
      position: absolute;
      top: 24px;
      right: 24px;
      z-index: 10;

      cursor: pointer;
    }

    &__header {
      margin-bottom: 16px;
    }

    &__footer {
      margin-top: 16px;

      display: flex;
      justify-content: flex-end;
    }
  }
`
