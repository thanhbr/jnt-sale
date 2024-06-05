import styled from 'styled-components'

export const StyledActionFormBtnList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &[data-sticky='true'] {
    position: sticky;
    bottom: 0;
    z-index: 1000;
  }
`
