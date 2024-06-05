import styled from 'styled-components'

export const StyledStickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1;

  width: calc(100% - 220px);
  height: 54px;
  padding: 0 32px;

  background: #fff;
  box-shadow: 2px -4px 10px rgba(0, 0, 0, 0.1);

  transition: all 0.25s;

  &[data-pl-sm='true'] {
    width: calc(100% - 56px);
  }

  &[data-transparent='true'] {
    opacity: 0.65;
  }
`
