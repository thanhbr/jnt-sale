import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingleBasicInfo = styled.div`
  width: calc(100% + 44px);
  margin: 0 -22px;

  display: flex;
  flex-wrap: wrap;

  .facebook-livestream-script-single-basic-info {
    &__group {
      width: calc(50% - 44px);
      margin: 0 22px 24px 22px;
    }
  }
`

export const StyledLiTooltipContent = styled.li`
  position: relative;

  margin-bottom: 8px;
  padding-left: 18px;

  &::before {
    position: absolute;
    top: 6px;
    left: 6px;

    width: 4px;
    height: 4px;

    background: #fff;
    border-radius: 50%;

    content: '';
  }
`
