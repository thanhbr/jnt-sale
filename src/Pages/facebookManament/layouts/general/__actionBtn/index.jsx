import {Tooltip} from 'common/tooltip'
import {StyledFacebookLayoutGeneral__ActionBtn} from './_styled'
import {Text} from "../../../../../common/text";

export const FacebookLayoutGeneral__ActionBtn = ({tooltip, icon, ...props}) => {
  return (
    <Tooltip placement="bottom" title={tooltip || ''}>
      <StyledFacebookLayoutGeneral__ActionBtn {...props}>
        <Text as={'a'} href={props?.href} >{icon}</Text>
      </StyledFacebookLayoutGeneral__ActionBtn>
    </Tooltip>
  )
}
