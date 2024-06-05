import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledTag = styled.span`
  height: 16px;
  padding: 0 5px;

  display: inline-block;

  background: #168aff;
  border-radius: 4px;

  color: #fff;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;

  &[data-appearance='leaf'] {
    border-radius: 8px 0;
  }

  &[data-type='danger'] {
    background: #ff424f;
    border-radius: 8px;
  }

  &[data-type='important'] {
    background: rgba(255, 66, 78, 0.4);

    color: ${THEME_COLORS.secondary_100};
  }

  &[data-type='progress'] {
    background: rgba(0, 171, 86, 0.4);

    color: ${THEME_COLORS.secondary_100};
  }

  &[data-type='success'] {
    background: #00ab56;
  }
`
