import { StyledSidebar } from './styled'
import { FilterContent } from './filterContent'
import { ActivePage } from './activePage'

export const SideBarLiveStreamDetail = () => {
  return (
    <StyledSidebar>
      <FilterContent/>
      <ActivePage/>
    </StyledSidebar>
  )
}