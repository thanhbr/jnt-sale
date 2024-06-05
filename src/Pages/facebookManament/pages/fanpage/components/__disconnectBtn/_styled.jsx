import {Button} from 'common/button'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage__DisconnectBtn = styled(Button)`
  background: ${THEME_SEMANTICS.failed}!important;
  border-color: ${THEME_SEMANTICS.failed}!important;

  &:disabled {
    background: linear-gradient(
        0deg,
        rgba(244, 247, 252, 0.98),
        rgba(244, 247, 252, 0.98)
      ),
      #00081d;
    color: linear-gradient(0deg, #191d32, #191d32),
      linear-gradient(0deg, rgba(244, 247, 252, 0.8), rgba(244, 247, 252, 0.8));
  }
`
