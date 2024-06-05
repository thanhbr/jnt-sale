import {useState, useRef, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {v4 as uuidv4} from 'uuid'

/**
 * props description 
 * listOption={[
          {label: string ,  value : string},
        ....
    ]}
 * selected: {label: string ,  value : string},
    Object ( display default status of dropdown, maybe a Object or a option)
 * 
 * customClass : String
 * custom class name for css
 */

export default function Dropdown({...props}) {
  const {t} = useTranslation()
  const {
    cb,
    listOption = [],
    selected = {},
    customClass = '',
    icon,
    filter,
    PlaceHolderText = '',
    byPassTran,
    expandIconPath = '',
    customStyle,
    isDisableSelect = false,
    hideScroll = false,
    showClear = false,
    renderInput,
    renderItem,
  } = props
  const [isShowMenu, changeShowMenu] = useState(false)
  const ref = useRef(null)
  const expandRef = useRef(null)
  // selected.value === item.value ? "dropdown-items dropdown-items-active" : "dropdown-items"
  // console.log(selected)
  const changeSelect = item => {
    if (cb && typeof cb === 'function') {
      cb(item)
    }
    changeShowMenu(false)
    if (!expandRef) return
    const icon = expandRef.current
    if (!icon) return
    icon.style.transform = 'rotate(0deg)'
  }
  function handleClickOutside(event) {
    if (isDisableSelect) return;
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false)
      if (!expandRef) return
      const icon = expandRef.current
      if (!icon) return;
      icon.style.transform = 'rotate(0deg)'
    }
  }
  const didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
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
  const RenderSelected = () => {
    if (icon) {
      return icon
    }
    if (selected.label) {
      // if (!selected.value) {
      if (byPassTran) {
        return (
          <>
            {selected.label}
            {showClear && selected.label ? (
              <img
                className="search-filter-clear"
                src="/svg/Xbutton.svg"
                onClick={() => {
                  cb && cb('CLICK_DELETE')
                }}
              />
            ) : null}
          </>
        )
      }
      return (
        <>
          {t(selected.label)}
          {showClear && selected.label ? (
            <img
              className="search-filter-clear"
              src="/svg/Xbutton.svg"
              onClick={() => {
                cb && cb('CLICK_DELETE')
              }}
            />
          ) : (
            <></>
          )}
        </>
      )
      // } else {
      //   return selected.label;
      // }
    }
    return t(PlaceHolderText)
  }
  return (
    <div
      ref={ref}
      className={
        customClass ? `${customClass} dropdown-wrapper` : 'dropdown-wrapper'
      }
    >
      <div
        className={
          !isShowMenu
            ? `${customStyle} dropdown-selected`
            : `${customStyle} dropdown-selected`
        }
        onClick={e => {
          if (isDisableSelect) return
          if (e.target.className === 'search-filter-clear') return
          changeShowMenu(!isShowMenu)
          if (!expandRef) return
          const icon = expandRef.current
          if (!icon) return
          if (!isShowMenu) {
            icon.style.transform = 'rotate(180deg)'
          } else {
            icon.style.transform = 'rotate(0deg)'
          }
        }}
      >
        {renderItem ? renderInput(selected) : <RenderSelected />}
        {isDisableSelect ? null : <img
          id={`${filter || ''}-icon-expand`}
          ref={expandRef}
          className="block-click add-effect-all expand-dropdown"
          src={expandIconPath || '/svg/CaretRight.svg'}
        />}
      </div>
      <div
        className={
          isShowMenu
            ? hideScroll
              ? 'dropdown-items-wrapper'
              : 'dropdown-items-wrapper show-scroll-bar'
            : hideScroll
            ? 'dropdown-items-wrapper dropdown-hide'
            : 'dropdown-items-wrapper dropdown-hide show-scroll-bar'
        }
      >
        {listOption.map(item => {
          let itemClass = 'dropdown-items'
          if (selected.value === item.value)
            itemClass += ' dropdown-items-active'
          if (item.customItemClass)
            itemClass = `${itemClass} ${item.customItemClass}`
          return (
            <div
              key={uuidv4()}
              className={
                selected.value === item.value
                  ? 'dropdown-items dropdown-items-active ' + (item.className ?? '')
                  : 'dropdown-items ' + (item.className ?? '')
              }
              onClick={() => changeSelect(item)}
            >
              {renderItem ? renderItem(item) : byPassTran ? item.label : t(item.label)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
