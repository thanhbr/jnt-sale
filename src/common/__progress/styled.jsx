import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledProgress = styled.div`
  .progress-main{
    width: 100%;
    display: flex;
    align-items: center;
    .progress-bar{
      width: 100%;
      margin-right: 8px;
      background: rgba(34, 62, 98, 0.08);
      border-radius: 2px;
      height: 4px;
      span{
        background:${THEME_COLORS.primary_300}
      }
    }
  }
  display: flex;
  align-items: center;
  width: 100%;
  color: ${THEME_COLORS.primary_300}
  
`
