import styled from 'styled-components'

export const StyledOrderEmpty = styled.div`
  min-height: calc(100vh - 287px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .order-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
`