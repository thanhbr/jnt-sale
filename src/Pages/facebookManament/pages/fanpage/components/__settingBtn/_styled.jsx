import styled from 'styled-components'

export const StyledFacebookFanpage__SettingBtn = styled.div`
  width: 44px;
  height: 44px;

  background: rgba(242, 244, 252, 0.1);
  border-radius: 50%;

  transform: translateY(-2px);

  p {
    width: 100% !important;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    :hover{
      cursor: pointer;
    }
  }

  svg {
    width: 24px;
    height: 24px;

    transform: translateY(1px);
  }
`
