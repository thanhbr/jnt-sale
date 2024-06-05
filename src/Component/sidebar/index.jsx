import useGlobalContext from 'containerContext/storeContext'
import {createContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import SIDEBAR_COMPONENTS from './_components'
import {SIDEBAR_BOTTOM_ITEM, SIDEBAR_MENU_ITEMS} from './_constants'
import {SIDEBAR_MENU_ICONS} from './_icons'
import {StyledSidebar} from './_styled'
import cls from 'clsx'
import css from './index.module.scss'
import {Text} from 'common/text'
import {Tag} from 'common/tag'

const {SidebarMenuItem} = SIDEBAR_COMPONENTS

export const SidebarContext = createContext(null)

export const Sidebar = ({...props}) => {
  const location = useLocation()
  const defaultActiveId = SIDEBAR_MENU_ITEMS.find(
    item =>
      (item?.path && location.pathname.includes(item.path)) ||
      item.list
        .map(child => child?.path && location.pathname.includes(child.path))
        .includes(true),
  )?.label

  const [globalState, globalDispatch] = useGlobalContext()
  const {shouldMinimizeSidebar} = globalState

  const [activeId, setActiveId] = useState(defaultActiveId)

  const handleSidebarToggle = () => globalDispatch({type: 'TOGGLE_SIDEBAR'})

  const [doubleArrow, setDoubleArrow] = useState(false)

  useEffect(() => {
    // close submenu when minimize sidebar
    if (shouldMinimizeSidebar) setActiveId(null)
  }, [shouldMinimizeSidebar])

  return (
    <SidebarContext.Provider value={{activeId, setActiveId}}>
      <StyledSidebar
        data-minimize={globalState?.shouldMinimizeSidebar}
        {...props}
        onMouseEnter={() => setDoubleArrow(true)}
        onMouseLeave={() => setDoubleArrow(false)}
      >
        <div className="sidebar-logo">
          {shouldMinimizeSidebar ? (
            <Text as="a" className={cls(css.linkLogo)} href="/">
              <img
                className={cls(css.logo)}
                src="/svg/logoSmall.svg"
                alt="logoSmall"
              />
            </Text>
          ) : (
            <>
              <Text as="a" className={cls(css.linkLogo)} href="/">
                <img
                  className={cls(css.logo)}
                  src="/img/logo-light.png"
                  alt="logo"
                />
              </Text>
              {/* <Tag
                style={{
                  position: 'relative',
                  top: -1,
                  left: -36,
                  height: 14,
                  padding: '0 8px',
                  background:
                    'linear-gradient(82.85deg, #F40385 -3.66%, #F97000 142.34%)',
                  fontSize: 9,
                  lineHeight: '14px',
                }}
              >
                BETA
              </Tag> */}
            </>
          )}
        </div>
        {doubleArrow && <button
          className="sidebar__toggle"
          data-rotate={globalState?.shouldMinimizeSidebar}
          onClick={handleSidebarToggle}
        >
          {SIDEBAR_MENU_ICONS.doubleArrow}
        </button>}
        <ul
          className="sidebar__menu"
          data-scrollable={!globalState?.shouldMinimizeSidebar} // when minimize sidebar will have enough height - no need scrollable
        >
          {SIDEBAR_MENU_ITEMS.map(item => (
            <SidebarMenuItem key={item.id} data={item} />
          ))}
        </ul>
        <ul className="sidebar__bottom">
          <SidebarMenuItem data={SIDEBAR_BOTTOM_ITEM} size="lg" />
        </ul>
      </StyledSidebar>
    </SidebarContext.Provider>
  )
}
