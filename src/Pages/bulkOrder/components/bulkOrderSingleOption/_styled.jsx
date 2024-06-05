import {Option} from 'common/form/autoComplete/_option'
import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledBulkOrderSingleOption = styled(Option)`
  min-height: 36px;

  display: flex;
  align-items: center;

  color: ${THEME_COLORS.gray_900};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  cursor: pointer;

  transition: color 0.25s;

  &[data-active='true'],
  &:hover {
    color: ${THEME_COLORS.primary_300};
  }
`
