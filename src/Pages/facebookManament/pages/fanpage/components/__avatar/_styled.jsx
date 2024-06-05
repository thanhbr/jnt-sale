import {Popper} from 'common/popper'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage__Avatar = styled(Popper)`
  .facebook-fanpage-avatar {
    &__image {
      width: 44px;
      height: 44px;

      border-radius: 50%;

      cursor: pointer;
    }

    &__popper {
      width: 274px;
      padding: 12px 20px;

      display: flex;
    }

    &__popper-image {
      width: 64px;
      height: 64px;
      margin-right: 16px;

      border-radius: 50%;
    }

    &__popper-logout {
      min-width: 128px;

      background: ${THEME_SEMANTICS.failed};
      border-color: ${THEME_SEMANTICS.failed};

      font-weight: 400;
    }
  }
`
