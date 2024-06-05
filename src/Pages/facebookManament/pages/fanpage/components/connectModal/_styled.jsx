import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledFacebookFanpageConnectModalListItem = styled.li`
  position: relative;

  padding-left: 24px;

  &::before {
    position: absolute;
    top: 8px;
    left: 10px;

    width: 4px;
    height: 4px;

    background: ${THEME_COLORS.secondary_100};
    border-radius: 50%;

    content: '';
  }
`
