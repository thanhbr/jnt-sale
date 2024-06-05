import styled from 'styled-components'

export const StyledDrawerOrderTab = styled.div`
  position: relative;

  height: calc(100vh - 112px);

  overflow: auto;
  textarea {
    resize: none;
  }
  .drawer-order-tab__footer {
    position: sticky;
    bottom: 0;
    z-index: 300;

    height: 68px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 24px;

    background: #fff;
  }
`
