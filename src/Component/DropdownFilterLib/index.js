import {useState, useRef, useContext, Component} from 'react'

import Select, {defaultTheme} from 'react-select'

// import { stateOptions } from '../data';
import {Controller} from 'react-hook-form'
import {useFocus} from 'util/functionUtil'
import {useWatch} from 'react-hook-form'
import {SettingContext} from '../../LayoutWrapper'
import {FixedSizeList as List} from 'react-window'

const {colors} = defaultTheme

const selectStyles = {
  control: provided => ({...provided, minWidth: 240, margin: 8}),
  menu: () => ({boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)'}),
}

export const DropdownFilterLib = ({
  defaultVal,
  setSelect1,
  setSelect2,
  selected,
  customClass,
  icon,
  cb,
  select1,
  register,
  listOption,
  label,
  control,
  getValues,
  value,
  onChange,
  ...props
}) => {
  const [state, dispatch] = useContext(SettingContext)
  const {area, ward} = state.setting_store.store_info
  const [open, setOpen] = useState(false)
  //   const [value, setValue] = useState(undefined)
  const ref = useRef(null)
  const expandRef = useRef(null)
  const [inputRef, setInputFocus] = useFocus()
  const toggleOpen = () => {
    setOpen(!open)
  }
  console.log(value, onChange)

  // const value = getValues()
  // console.log(value)
  const onSelectChange = field => {
    toggleOpen()
  }

  const handleChange = (value, action) => {
    const inputR = action.name

    if (action.name === 'store_province_id') {
      setSelect1 && setSelect1(value)
      setSelect2 && setSelect2({label: '', value: ''})
      dispatch({
        type: 'CHANGE_WARD',
        payload: {label: '', value: ''},
      })
      //   setValue(inputR, value.value?.city_id)

      onChange(() => onChange(value.value?.city_id))
    }

    if (action.name === 'store_district_id') {
      setSelect2 && setSelect2(value)
      //   setValue(inputR, value.value?.district_id)
      onChange(() => onChange(value.value?.district_id))
    }

    cb && cb(value)
    onSelectChange()
    AnimForExpandIcon(false)
  }

  const changeSelect = item => {
    if (item.value === '') {
      return
    }
    if (cb && typeof cb === 'function') {
      cb(item)
    }
    setOpen(false)
    AnimForExpandIcon(false)
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

  return (
    <Dropdown
      ref={inputRef}
      isOpen={open}
      onClose={toggleOpen}
      target={
        <div
          ref={ref}
          className={
            customClass ? `${customClass} dropdown-wrapper` : 'dropdown-wrapper'
          }
        >
          <div
            className={`${!open ? 'dropdown-selected' : 'dropdown-selected'}`}
            onClick={() => {
              setOpen(!open)
              AnimForExpandIcon(!open)
              if (!open) {
                try {
                  setTimeout(() => {
                    setInputFocus()
                  }, 100)
                } catch (error) {
                  console.log('error')
                }
              }
            }}
          >
            {!icon
              ? selected?.label ||
                (label === 'store_province_id' ? area.label : ward.label)
              : icon}
            {selected?.label ? (
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
            <img
              ref={expandRef}
              className="block-click add-effect-all expand-dropdown"
              src="/svg/arr-down.svg"
            />
          </div>
        </div>
      }
    >
      <Select
        name={label}
        {...register(label)}
        value={selected?.label || area.label}
        onChange={(value, action) => {
          handleChange(value, action)
          // setOpen(false);
          AnimForExpandIcon(false)
        }}
        autoFocus
        backspaceRemovesValue={false}
        components={{MenuList, DropdownIndicator, IndicatorSeparator: null}}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onBlur={() => AnimForExpandIcon(false)}
        options={listOption}
        placeholder="Search..."
        styles={selectStyles}
        tabSelectsValue={false}
        // value={value}
      />
    </Dropdown>
  )
}

// styled components

const Menu = props => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)'
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 2,
        width: '100%',
      }}
      {...props}
    />
  )
}
const Blanket = props => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
)
const Dropdown = ({children, isOpen, target, onClose}) => (
  <>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </>
)
const Svg = p => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
)
const height = 35

class MenuList extends Component {
  render() {
    const {options, children, maxHeight, getValue} = this.props
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * height
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({index, style}) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
}

const ChevronDown = () => (
  <Svg style={{marginRight: -6}}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
)

const DropdownIndicator = () => (
  <div style={{color: colors.neutral20, height: 24, width: 32}}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
)
