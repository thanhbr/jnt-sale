import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledSpinner = styled.div`
  svg {
    position: relative;
    z-index: 2;

    color: ${THEME_COLORS.primary_300};
  }
`
