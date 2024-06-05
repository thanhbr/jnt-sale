import { StyledSidebar } from './styled'
import { FilterContent } from './filterContent'
import {ListPage} from "./listPage";

export const SideBarConversation = () => {
  return (
    <StyledSidebar>
      <FilterContent/>
      <ListPage/>
    </StyledSidebar>
  )
}