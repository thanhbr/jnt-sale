import styled from 'styled-components'

export const StyledSwitch = styled.div`
  position: relative;

  width: 34px;
  height: 20px;

  background: #d0d0d9;
  border-radius: 10px;

  transition: background 0.25s;

  cursor: pointer;

  &[data-checked='true'] {
    background: var(--toggle__active-color);

    &::before {
      left: 16px;
    }
  }

  &[data-disabled='true'] {
    opacity: 0.65;

    cursor: no-drop;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 2px;

    width: 16px;
    height: 16px;

    background: #fff;
    border-radius: 50%;

    transform: translateY(-50%);
    transition: left 0.25s;

    content: '';
  }
`
