import {useState, useRef, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useFocus} from '../../util/functionUtil'
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
let timeout
let timeoutFocus
export default function DropdownFilter({...props}) {
  const {t} = useTranslation()
  const {cb, listOption, selected, customClass, icon, message = '', pathExpandDropIcon=""} = props
  const [listDropdown, changeListDropdown] = useState([
    {
      label: t('no_data'),
      value: '',
    },
  ])
  const [isShowMenu, changeShowMenu] = useState(false)
  const [adressKey, changeAdressKey] = useState('')

  const ref = useRef(null)
  const expandRef = useRef(null)
  // selected.value === item.value ? "dropdown-items dropdown-items-active" : "dropdown-items"

  const changeSelect = item => {
    if (item.value === '') {
      return
    }
    if (cb && typeof cb === 'function') {
      cb(item)
    }
    changeShowMenu(false)
    AnimForExpandIcon(false)
  }
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false)
      AnimForExpandIcon(false)
    }
  }
  const AnimForExpandIcon = status => {
    if (!expandRef) return
    const icon = expandRef.current
    if (!icon) return
    if (status) {
      icon.style.transform = 'rotate(180deg)'
    } else {
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
  const handleAdressList = text => {
    if (!text) changeListDropdown(listOption)
    const newList = []
    listOption.map((item, index) => {
      const itemText = item.label.toUpperCase()
      const key = text.toUpperCase()
      if (itemText.includes(key)) newList.push(item)
    })
    if (!newList.length) newList.push({label: t('no_data'), value: ''})
    changeListDropdown(newList)
  }
  const changeKeywordAdress = e => {
    const text = e.target.value
    changeAdressKey(text)
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      handleAdressList(text)
    }, 500)
  }
  // const useFocus = () => {
  //   const htmlElRef = useRef(null);
  //   const setFocus = () => {
  //     htmlElRef.current && htmlElRef.current.focus();
  //   };

  //   return [htmlElRef, setFocus];
  // };
  console.log(`kyn ==== value of selected${selected.value}`)
  const [inputRef, setInputFocus] = useFocus()
  return (
    <div
      ref={ref}
      className={
        customClass ? `${customClass} dropdown-wrapper` : 'dropdown-wrapper'
      }
    >
      <div
        className={`${
          !isShowMenu ? 'dropdown-selected' : 'dropdown-selected'
        } ${message ? 'border-red-input' : ''}`}
        // className={!isShowMenu ? "dropdown-selected" : "dropdown-selected"}
        onClick={() => {
          changeShowMenu(!isShowMenu)
          AnimForExpandIcon(!isShowMenu)
          if (!isShowMenu) {
            try {
              setTimeout(() => {
                setInputFocus()
              }, 300)
            } catch (error) {
              console.log('error')
            }
          }
        }}
      >
        {!icon ? selected.label : icon}
        {selected.label ? (
          <img
            className="search-filter-clear"
            src="/svg/Xbutton.svg"
            onClick={() => {
              changeAdressKey("")
              cb && cb('CLICK_DELETE')
            }}
          />
        ) : (
          <></>
        )}
        <img
          ref={expandRef}
          className="block-click add-effect-all expand-dropdown"
          src={pathExpandDropIcon ? pathExpandDropIcon : "/svg/arr-down.svg"}
        />
      </div>
      {/* <div className="upos-error-text upos-animation-opacity upos-text">{message || ""}</div> */}
      <div
        className={
          isShowMenu
            ? 'dropdown-items-wrapper'
            : 'dropdown-items-wrapper dropdown-hide'
        }
      >
        <input
          ref={inputRef}
          value={adressKey}
          onChange={e => changeKeywordAdress(e)}
          className="client-input upos-text input-filter-adresss"
        />
        {/* <div className="upos-error-text upos-animation-opacity upos-text">{message || ""}</div> */}
        {(adressKey ? listDropdown : listOption).map(item => {
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
                  ? 'dropdown-items dropdown-items-active'
                  : 'dropdown-items'
              }
              onClick={() => changeSelect(item)}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
