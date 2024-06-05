import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &#content-wrap {
    position: relative;

    height: calc(100vh - 56px);
    margin: 56px 0 0 0;
    padding: 16px 32px 44px 252px;

    background: #f3f6fc;

    overflow: auto;

    transition: padding 0.25s;

    @media screen and (max-width: 1366px) {
      margin: 45px 0 0 0;
    }

    &[data-expand='true'] {
      padding-left: 88px;
    }

    .Login-Wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
`
