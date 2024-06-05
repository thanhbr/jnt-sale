import styled from 'styled-components'

export const StyledConfirmTheFileHasBeenFiledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 480px;
  padding: 24px;

  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  transform: translate(-50%, -50%);

  .confirm-the-file-has-been-filed {
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
    }
  }
`
