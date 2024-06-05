import {Checkbox} from 'common/form/checkbox'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage__Checkbox = styled(Checkbox)`
  background: #fff;
  border-radius: 50%;

  &[data-checked='true'] {
    background: ${THEME_SEMANTICS.delivering};
    border-color: ${THEME_SEMANTICS.delivering};
  }

  &[data-disabled='true'] {
    border-color: #dddde3 !important;
  }

  &:hover {
    border-color: ${THEME_SEMANTICS.delivering};
  }
`
