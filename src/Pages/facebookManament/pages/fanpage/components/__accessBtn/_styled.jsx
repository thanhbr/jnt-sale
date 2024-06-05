import {Button} from 'common/button'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage__AccessBtn = styled(Button)`
  min-width: 103px;

  background: ${THEME_SEMANTICS.delivered}!important;
  border-color: ${THEME_SEMANTICS.delivered}!important;
`

export const StyledFacebookFanpage__AccessPopper = styled.div`
  width: 158px;

  .facebook-fanpage-access-popper {
    &__item {
      min-height: 40px;
      padding: 8px;

      display: flex;
      align-items: center;

      cursor: pointer;
    }

    &__item-icon {
      margin-right: 8px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`
