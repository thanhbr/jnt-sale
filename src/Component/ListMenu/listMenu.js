import {useState, useLayoutEffect, useEffect, useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {Link, useLocation} from 'react-router-dom'
import {useConfigContext} from '../NavBar/navBar'
import {PATH} from '../../const/path'
import {DISPLAY_NAME_MENU} from '../../const/display_name_menu'
import {ROLE} from '../../const/role'
import {MENU_TREE} from './menuTree'
import {v4 as uuidv4} from 'uuid'
import useGlobalContext from '../../containerContext/storeContext'

let isClickExpand = false
let isChangeWidth = false
//= ===================================================
/*
--change status of menu when width < 1366 px; 
*/
export function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      isChangeWidth = true
      isClickExpand = false
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
function onMouseLeaveMenu(params, openMenu) {}
function onClickMenuLv1(params, openMenu) {
  try {
    closeAllLv3Menu()
    const parentEle = params.target.parentElement
    const listLv2 = parentEle.getElementsByClassName('menu-lv2')
    for (let index = 0; index < listLv2.length; index++) {
      if (listLv2[index].classList.contains('show-item-menu')) {
        listLv2[index].classList.remove('show-item-menu')
        listLv2[index].classList.add('hide-item-menu')
      } else {
        listLv2[index].classList.remove('hide-item-menu')
        listLv2[index].classList.add('show-item-menu')
      }
    }
  } catch (error) {
    console.error(
      `============== error at onClickMenuLv1 ==============${error}`,
    )
  }
}
// ==== lv2 action =====
function showLv3Menu(params) {
  try {
    const parentEle = params.target.parentElement
    const listLv3 = parentEle.getElementsByClassName('menu-lv3')
    for (let index = 0; index < listLv3.length; index++) {
      if (listLv3[index].classList.contains('hide-item-menu')) {
        listLv3[index].classList.remove('hide-item-menu')
        listLv3[index].classList.add('show-item-menu')
      }
    }
  } catch (error) {}
}
const onMouseEnterLv2 = (params, openMenu) => {
  try {
    if (openMenu) return
    closeAllLv3Menu(params, openMenu)
    showLv3Menu(params)
  } catch (error) {
    console.error(error)
  }
}
const onMouseLeaveLv2 = (params, openMenu) => {
  try {
  } catch (error) {
    console.error(error)
  }
}
/**
 *
 *
 *
 */
let oldParamsMenuLv2
const onClickMenuLv2 = (params, openMenu, haveChild, bypass) => {
  try {
    const elementLv2 = params && params.target
    if (!openMenu) {
      // minimenu handle
      if (!haveChild && !elementLv2.classList.contains('bg-active-menu-lv2')) {
        clearAllactivelv2()
        clearAllactivelv3()
        elementLv2.classList.add('bg-active-menu-lv2')
      }
      return
    }
    // full menu handle
    closeAllLv3Menu()
    const oldSelect =
      (oldParamsMenuLv2 && oldParamsMenuLv2.target.innerText) || null
    if ((oldSelect === elementLv2.innerText) & !bypass) {
      // click duplicate
      oldParamsMenuLv2 = null
      return
    }
    oldParamsMenuLv2 = params
    if (haveChild) {
      showLv3Menu(params)
    } else {
      clearAllactivelv2()
      clearAllactivelv3()
      elementLv2.classList.add('bg-active-menu-lv2') // set active
    }
  } catch (error) {
    console.error(`error on onClickMenuLv2${error}`)
  }
}
function clearAllactivelv2(params) {
  try {
    const listLv3 = document.querySelectorAll('.menu-lv2.bg-active-menu-lv2')
    for (let index = 0; index < listLv3.length; index++) {
      const element = listLv3[index]
      element.classList.remove('bg-active-menu-lv2')
    }
  } catch (error) {
    console.error(
      `============== error at closeAllLv3Menu ==============${error}`,
    )
  }
}
//= ==lv3 action ===
const openMenuLv3 = (params, openMenu) => {
  // set active
  try {
    clearAllactivelv2()
    clearAllactivelv3()
    oldParamsMenuLv2 = null // reset lv2
    const element = params.target
    if (element && !element.classList.contains('bg-active-menu-lv3'))
      element.classList.add('bg-active-menu-lv3')
    const wrapLv2 = element.parentElement && element.parentElement.parentElement
    const menulv2 = wrapLv2.querySelector('.menu-lv2')
    if (menulv2 && !menulv2.classList.contains('bg-active-menu-lv3'))
      menulv2.classList.add('bg-active-menu-lv2')
    setTimeout(() => {
      closeAllLv3Menu()
    }, 1)
  } catch (error) {
    console.error(`error on openMenuLv3${error}`)
  }
}
const onMouseLeaveWrapperlv3 = (params, openMenu) => {
  if (openMenu) return
  closeAllLv3Menu()
}
//= ===clear====
function closeAllLv3Menu(params, openMenu) {
  try {
    const listLv3 = document.getElementsByClassName('menu-lv3')
    for (let index = 0; index < listLv3.length; index++) {
      const element = listLv3[index]
      if (element.classList.contains('show-item-menu')) {
        element.classList.remove('show-item-menu')
        element.classList.add('hide-item-menu')
      }
    }
  } catch (error) {
    console.error(
      `============== error at closeAllLv3Menu ==============${error}`,
    )
  }
}
function clearAllactivelv3(params) {
  try {
    const listLv3 = document.querySelectorAll('.menu-lv3.bg-active-menu-lv3')
    for (let index = 0; index < listLv3.length; index++) {
      const element = listLv3[index]
      element.classList.remove('bg-active-menu-lv3')
    }
  } catch (error) {
    console.error(
      `============== error at closeAllLv3Menu ==============${error}`,
    )
  }
}
// const rotateElementDown = ele => {
//   try {
//     if (!ele) return
//   } catch (error) {}
// }
const expandMenuHandle = openMenu => {
  if (!openMenu) closeAllLv3Menu()
  if (openMenu && oldParamsMenuLv2)
    onClickMenuLv2(oldParamsMenuLv2, openMenu, null, true)
}
//= ============
function isDidmout(params) {}
function isUnmout(params) {}
export default function MenuList(params) {
  let autoDetect = false
  const [width, height] = useWindowSize()
  const {openMenu, setOpenMenu} = useConfigContext()
  const {t} = useTranslation()
  const [state, dispatch] = useGlobalContext()
  const onChangeMenu = () => {
    isChangeWidth = false
    isClickExpand = true
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    isDidmout()
    return isUnmout()
  })

  if (!state && state.isLogin) return <div />
  width < 1440 ? (autoDetect = true) : (autoDetect = false)

  if (!isClickExpand) {
    autoDetect && openMenu && setOpenMenu(false)
    !autoDetect && !openMenu && setOpenMenu(true)
  }
  expandMenuHandle(openMenu)
  return (
    <div
      className={
        openMenu
          ? height < 769
            ? 'side-main-menu full-menu ff-scroll-bar-type-1 low-height-screen'
            : 'side-main-menu full-menu ff-scroll-bar-type-1'
          : height < 769
          ? 'side-main-menu mini-menu low-height-screen'
          : 'side-main-menu mini-menu'
      }
    >
      <div
        className={
          'wrap-menu-list'
        }
      >
        {MENU_TREE.map(item => (
          <div
            key={uuidv4()}
            className={item.class ? `${item.class} menu-wrap` : "menu-wrap" }
            onMouseLeave={params => onMouseLeaveMenu(params, openMenu)}
          >
            {item.child &&
              item.child.length &&
              item.child.map(lv2 => (

                <div key={uuidv4()} className="menu-lv2-wrapper">
                  {lv2.path ?
                    <Link
                      to={lv2.path}
                      onMouseEnter={params => onMouseEnterLv2(params, openMenu)}
                      onMouseLeave={params => onMouseLeaveLv2(params, openMenu)}
                      onClick={params =>
                        onClickMenuLv2(params, openMenu, !!lv2.child)
                      }
                      className="menu-lv2 show-item-menu"
                    >
                      {lv2.iconLeft ? lv2.iconLeft : <div />}
                      <div className="label-menu off-event-point">
                        {t(lv2.display_name)}
                      </div>
                      {lv2.child ? (
                        <svg  className="button-drop-down off-event-point" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.99954 13.0942L15.0079 8.08591L13.8304 6.90674L9.99954 10.7401L6.16954 6.90674L4.99121 8.08507L9.99954 13.0942Z" fill="#7C88A6"/>
                        </svg>
                      ) : null}
                    </Link>
                    :
                    <p
                      onMouseEnter={params => onMouseEnterLv2(params, openMenu)}
                      onMouseLeave={params => onMouseLeaveLv2(params, openMenu)}
                      onClick={params =>
                        onClickMenuLv2(params, openMenu, !!lv2.child)
                      }
                      className="menu-lv2 show-item-menu"
                    >
                      {lv2.iconLeft ? lv2.iconLeft : <div />}
                      <div className="label-menu off-event-point">
                        {t(lv2.display_name)}
                      </div>
                      {lv2.child ? (
                        <svg  className="button-drop-down off-event-point" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.99954 13.0942L15.0079 8.08591L13.8304 6.90674L9.99954 10.7401L6.16954 6.90674L4.99121 8.08507L9.99954 13.0942Z" fill="#7C88A6"/>
                        </svg>
                      ) : null}
                    </p>
                  }
                  <div
                    className="menu-lv3-wrapper"
                    onMouseLeave={params =>
                      onMouseLeaveWrapperlv3(params, openMenu)
                    }
                  >
                    {lv2.child && lv2.child.length && (
                      <div className="lv3-header menu-lv3 label-menu off-event-point hide-item-menu">
                        {t(lv2.display_name)}
                      </div>
                    )}
                    {lv2.child &&
                      lv2.child.length &&
                      lv2.child.map(lv3 => (
                        <Link
                          key={uuidv4()}
                          to={lv3.path}
                          className="menu-lv3 hide-item-menu"
                          onClick={params => openMenuLv3(params, openMenu)}
                        >
                          <div className="label-menu off-event-point">
                            {t(lv3.display_name)}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
        {/*{!openMenu ? <div style={{height: '80px'}}></div> : null}*/}
      </div>
      <img
        onClick={onChangeMenu}
        className={
          openMenu ? 'button-show-hide-menu' : 'button-show-hide-menu-mini'
        }
        src="/img/iconMenu/CaretDoubleLeft.svg"
      />
    </div>
  )
}
