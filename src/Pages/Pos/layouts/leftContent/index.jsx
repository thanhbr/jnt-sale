import { StyledLeftContent } from './styled'
import { HeaderRightPos } from './header'
import { CreateOrder } from './content'

export const LeftContentPos = () => {
  return (
    <StyledLeftContent>
      <HeaderRightPos/>
      <CreateOrder/>
    </StyledLeftContent>
  )
}