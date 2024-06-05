import {useState, useRef, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {getData} from '../../api/api'
import {v4 as uuidv4} from 'uuid'

export default function AsyncDropdown({...props}) {
  const {
    placeHolderText,
    type,
    customClass,
    cbAction,
    selected = {},
    listOption = [],
    id = '',
    hideXbutton = false,
  } = props
  const [isShowMenu, changeShowMenu] = useState(false)
  const ref = useRef(null)
  const {t} = useTranslation()
  const changeSelect = item => {
    cbAction(item)
    changeShowMenu(false)
  }
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false)
    }
  }
  const didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
    if (type === 'async-option') {
    }
  }
  const unmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    didmout()
    return () => {
      unmount()
    }
  }, [ref])
  return (
    <div
      ref={ref}
      className={
        customClass ? `${customClass} dropdown-wrapper` : 'dropdown-wrapper'
      }
    >
      <div
        className={!isShowMenu ? 'dropdown-selected' : 'dropdown-selected'}
        onClick={e => {
          const icon = e.target.querySelector('img')
          if (!icon) return
          if (!isShowMenu) {
            icon.style.transform = 'rotate(180deg)'
          } else {
            icon.style.transform = 'rotate(0deg)'
          }
          if (e.target.classList.contains('reset-dropdown')) return
          changeShowMenu(!isShowMenu)
        }}
      >
        {selected.label ? selected.label : t(placeHolderText)}
        {hideXbutton ? (
          <img
            id={`${id}-icon-expand`}
            className="block-click add-effect-all expand-dropdown"
            src="/svg/arr-down.svg"
          />
        ) : selected.label && selected.value ? (
          <img
            onClick={() => {
              cbAction({})
              setTimeout(() => {
                try {
                  const icon = document.querySelector(`#${id}-icon-expand`)
                  icon.style.transform = 'rotate(0deg)'
                } catch (error) {}
              }, 300)
            }}
            className="add-effect-all reset-dropdown"
            src="/svg/Xbutton.svg"
          />
        ) : (
          <img
            id={`${id}-icon-expand`}
            className="block-click add-effect-all expand-dropdown"
            src="/svg/arr-down.svg"
          />
        )}
        {/* {selected.label && selected.value ? (
          <img
            onClick={() => {
              cbAction({});
              setTimeout(() => {
                try {
                  const icon = document.querySelector(`#${id}-icon-expand`);
                  icon.style.transform = "rotate(0deg)";
                } catch (error) {}
              }, 300);
            }}
            className="add-effect-all reset-dropdown"
            src="/svg/Xbutton.svg"
          />
        ) : (
          <img
            id={`${id}-icon-expand`}
            className="block-click add-effect-all expand-dropdown"
            src="/svg/arr-down.svg"
          />
        )} */}
      </div>

      <div
        className={
          isShowMenu
            ? 'dropdown-items-wrapper show-scroll-bar'
            : 'dropdown-items-wrapper dropdown-hide show-scroll-bar'
        }
      >
        {listOption.map(item => (
          <div
            key={uuidv4()}
            className={
              selected.value === item.value
                ? 'dropdown-items dropdown-items-active'
                : 'dropdown-items'
            }
            onClick={() => changeSelect(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
