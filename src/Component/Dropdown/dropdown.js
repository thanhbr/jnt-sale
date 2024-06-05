import {useState, useRef, useEffect, useContext} from 'react'
import {useTranslation} from 'react-i18next'
import axios, {AxiosResponse} from 'axios'
import {getData, getDataAsync, useAxiosFetch} from '../../api/api'
import {OrderContext} from '../../LayoutWrapper'
import {UposLogFunc} from '../../util/functionUtil'
import {v4 as uuidv4} from 'uuid'

export default function Dropdown({...props}) {
  const {
    callBack = () => {},
    listOption = [],
    placeHolderText,
    type,
    url,
    filter,
    customClass,
    byPassTran,
    data = null,
    labelKey,
    idKey,
    checkStatus,
    statusKey,
  } = props
  const {t} = useTranslation()
  const [state, dispatch] = useContext(OrderContext)
  const [isShowMenu, changeShowMenu] = useState(false)
  const ref = useRef(null)

  const selected = state.ObjectFilter[filter]
  const changeSelect = item => {
    const oldState = state.ObjectFilter[filter]
    const value = item.value || item[idKey]
    if (oldState.value === value) return
    dispatch({type: 'SET_SELECT_FILTER', payload: {[filter]: item}})
    changeShowMenu(false)
  }

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false)
    }
  }
  const Didmout = () => {
    document.addEventListener('mousedown', handleClickOutside)
    if (type === 'async-option') {
      // const { data, loading, error, errorMessage } = useAxiosFetch(url);
      // .then((res) => {
      //   if (res && res.data && res.data.success) {
      //     const list = res.data.data;
      //     list.map((item) => {
      //       item.value = item.id;
      //       item.label = item.name || item.full_name;
      //     });
      //     callBack(list);
      //   }
      // })
      // .catch((err) => {
      //   UposLogFunc(
      //     `ERROR AT GET DATA FOR DROPDOWN : URL ${url} -ERROR: ${err.message}`
      //   );
      // });
    }
  }
  const Unmount = () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    Didmout()
    return () => {
      Unmount()
    }
  }, [])
  const valueSelected = selected.value || selected[idKey]
  const labelSelected = selected.label || selected[labelKey]
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
        {valueSelected === '' || !valueSelected
          ? t(placeHolderText.label || placeHolderText)
          : labelSelected}
        {valueSelected === '' || !valueSelected ? (
          <img
            id={`${filter}-icon-expand`}
            className="block-click add-effect-all expand-dropdown"
            src="/svg/arr-down.svg"
          />
        ) : (
          <img
            onClick={() => {
              dispatch({
                type: 'SET_SELECT_FILTER',
                payload: {[filter]: ''},
              })
              setTimeout(() => {
                try {
                  const icon = document.querySelector(`#${filter}-icon-expand`)
                  icon.style.transform = 'rotate(0deg)'
                } catch (error) {}
              }, 300)
            }}
            className="add-effect-all reset-dropdown"
            src="/svg/Xbutton.svg"
          />
        )}
      </div>
      <div
        className={
          isShowMenu
            ? 'dropdown-items-wrapper show-scroll-bar'
            : 'dropdown-items-wrapper show-scroll-bar dropdown-hide'
        }
      >
        {(listOption || []).length ? (
          listOption.map(item => {
            if (checkStatus) {
              if (!item[statusKey]) return
            }
            // console.log("kyn --- " + JSON.stringify(item));
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
                {item.label || item[labelKey]}
              </div>
            )
          })
        ) : (
          <div className="upos-text dropdown-nodata">No data</div>
        )}
      </div>
    </div>
  )
}
