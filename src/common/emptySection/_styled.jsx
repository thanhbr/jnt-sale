import styled from 'styled-components'

export const StyledEmptySection = styled.section`
  height: 609px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  @media screen and (max-width: 1599px) {
    height: 409px;
  }

  .empty-section {
    &__banner {
      width: 120px;
      height: 120px;

      img,
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__text {
      width: 50%;
      max-width: 400px;

      color: #7c88a6;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      text-align: center;
    }
  }
`
