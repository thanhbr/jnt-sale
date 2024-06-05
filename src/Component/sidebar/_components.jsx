import {isArray} from '@craco/craco/lib/utils'
import {Tooltip} from '@mui/material'
import {Tag} from 'common/tag'
import useGlobalContext from 'containerContext/storeContext'
import {useContext, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Link, useLocation} from 'react-router-dom'
import {SidebarContext} from '.'
import {SIDEBAR_MENU_ICONS} from './_icons'

import {StyledSidebarMenuItem, StyledSidebarSubMenuItem} from './_styled'

const SidebarMenuItem = ({data, size = 'md', ...props}) => {
  const [globalState] = useGlobalContext()
  const {shouldMinimizeSidebar} = globalState

  const {activeId, setActiveId} = useContext(SidebarContext)

  const location = useLocation()
  const isActive =
    location.pathname.includes(data?.path) ||
    (isArray(data?.list) &&
      data.list
        .map(item => item?.path && location.pathname.includes(item.path))
        .includes(true))

  const {t} = useTranslation()

  const haveSubMenu = isArray(data?.list) && data.list.length > 0
  const haveExtraSubMenu = isArray(data?.extraList) && data.extraList.length > 0

  const shouldHideSubMenu = data.label !== activeId

  const handleSubMenuToggle = () =>
    !shouldMinimizeSidebar &&
    setActiveId(shouldHideSubMenu ? data?.label : null)

  return (
    <StyledSidebarMenuItem
      {...props}
      data-active={isActive}
      data-minimize={shouldMinimizeSidebar}
    >
      <Link
        className="sidebar-menu-item__container"
        to={data?.path || '#'}
        data-size={size}
        data-single={!haveSubMenu}
        onClick={handleSubMenuToggle}
      >
        {data?.displayIcon && (
          <>
            {haveSubMenu || haveExtraSubMenu ? (
              <div className="sidebar-menu-item__icon">{data.displayIcon}</div>
            ) : (
              <Tooltip
                id="global-tooltip"
                placement="right-end"
                title={data?.label ? t(data.label) : 'Unknown'}
                arrow
              >
                <div className="sidebar-menu-item__icon">
                  {data.displayIcon}
                </div>
              </Tooltip>
            )}
          </>
        )}
        <span className="sidebar-menu-item__text">
          <span>{data?.label ? t(data.label) : 'Unknown'}</span>
          {data?.isNew && (
            <Tag appearance="leaf" type="danger" style={{marginLeft: 4}}>
              New
            </Tag>
          )}
        </span>
        {haveSubMenu && (
          <div
            className="sidebar-menu-item__toggle"
            data-toggle={!shouldHideSubMenu}
          >
            {SIDEBAR_MENU_ICONS.arrow}
          </div>
        )}
      </Link>
      {haveSubMenu && (
        <ul
          className="sidebar-menu-item__sub-menu"
          data-hidden={shouldHideSubMenu}
          data-type="collapse"
          style={{maxHeight: 40 * data.list.length}}
        >
          {data.list.map(item => (
            <SidebarSubMenuItem
              key={item.id}
              data={item}
              parentLabel={data.label}
            />
          ))}
        </ul>
      )}
      {haveExtraSubMenu && (
        <ul
          className="sidebar-menu-item__sub-menu"
          data-hidden={shouldHideSubMenu}
          data-type="dropdown"
          style={{maxHeight: 40 * data.list.length}}
        >
          {data.extraList.map(item => (
            <SidebarSubMenuItem
              key={item.id}
              data={item}
              parentLabel={data.label}
            />
          ))}
        </ul>
      )}
    </StyledSidebarMenuItem>
  )
}

const SidebarSubMenuItem = ({data, parentLabel, ...props}) => {
  const [globalState] = useGlobalContext()
  const {shouldMinimizeSidebar} = globalState

  const {setActiveId} = useContext(SidebarContext)

  const location = useLocation()

  const currentPath = location.pathname.split('?')[0].split('/')
  const dataPath = `${data?.path || ''}`.split('?')[0].split('/')

  const isActive =
    (Array.isArray(data?.activeList) &&
      data.activeList.includes(location.pathname)) ||
    (currentPath.length === dataPath.length &&
      !dataPath
        .map((item, i) =>
          item.startsWith(':') ? !!currentPath[i] : item === currentPath[i],
        )
        .includes(false))

  const {t} = useTranslation()

  const type = shouldMinimizeSidebar ? 'dropdown' : 'default'

  return (
    <StyledSidebarSubMenuItem
      {...props}
      data-active={isActive}
      data-br={!!data?.displayIcon}
      data-type={type}
    >
      {data?.displayIcon && (
        <div className="sidebar-sub-menu-item__icon">{data.displayIcon}</div>
      )}
      <Link
        className="sidebar-sub-menu-item__link"
        to={data?.path || '#'}
        data-small-p={!!data?.displayIcon}
        onClick={() => setActiveId(parentLabel)}
      >
        <span>{data?.label ? t(data.label) : 'Unknown'}</span>
        {data?.isNew && (
          <Tag type="danger" style={{marginLeft: 4}}>
            New
          </Tag>
        )}
      </Link>
    </StyledSidebarSubMenuItem>
  )
}

const SIDEBAR_COMPONENTS = {SidebarMenuItem, SidebarSubMenuItem}

export default SIDEBAR_COMPONENTS
