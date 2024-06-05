import styled from 'styled-components'

export const StyledFacebookFanpageHeader = styled.div`
  margin-bottom: 30px;

  .facebook-fanpage-header {
    &__banner {
      width: 100%;

      object-fit: cover;
      object-position: center;
    }

    &__container {
      position: relative;
      z-index: 2;

      padding: 16px 32px 90px 32px;
    }

    &__action {
      position: absolute;
      top: 21px;
      right: 32px;
      z-index: 3;
    }

    &__action-upper {
      margin-bottom: 22px;

      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`
