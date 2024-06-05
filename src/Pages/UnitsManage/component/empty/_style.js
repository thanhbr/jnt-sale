import styled from 'styled-components'

export const StyledUnitEmpty = styled.div`
  min-height: calc(100vh - 430px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .empty__unit-title {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
`
