import { Text } from '../../../../../common/text'
import { FACEBOOK_ICONS } from '../../../interfaces/_icons'
import styled from 'styled-components'

export const NotificationInside = ({content,...props}) => {
  return(
    <StyledNotifi>
      <div className="post-notification" {...props}>
        <Text as={'p'} className={'post-notification__icon'}>{FACEBOOK_ICONS.question02}</Text>
        <Text as={'p'}>{content}</Text>
      </div>
    </StyledNotifi>
  )
}
const StyledNotifi =  styled.div`

  .post-notification{
    min-height: 51px;
    display: flex;
    align-items: center;
    background: rgba(26, 148, 255, 0.1);
    border: 1px solid #1A94FF;
    border-radius: 6px;
    padding: 5px 12px;
    &__icon{
      margin-right: 8px;
    }
    p{
      display: flex;
      align-items: center;
    }
  }

`