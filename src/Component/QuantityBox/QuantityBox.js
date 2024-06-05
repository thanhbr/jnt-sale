import {useState} from 'react'
import {convertStringToNumber} from '../../util/functionUtil'

export default function QuantityBox({...props}) {
  const {
    addAction = () => {},
    subAction = () => {},
    value = 1,
    changeInput = () => {},
  } = props
  const [num, changeNum] = useState(value)
  const handleOnChangeInput = event => {
    let {value} = event.target
    value = convertStringToNumber(value)
    // if (!/\d/.test(value) && value !== "") {
    //   return;
    // }
    // const inputNum = convertStringToNumber(value);
    if (value > 999 || value < 0) return
    changeNum(value)
    // changeInput(value);
  }
  function getCharCodeFromEvent(event) {
    event = event || window.event
    return typeof event.which === 'undefined' ? event.keyCode : event.which
  }
  function isKeyPressedNumeric(event) {
    const charCode = getCharCodeFromEvent(event)
    const charStr = event.key ? event.key : String.fromCharCode(charCode)
    return isCharNumeric(charStr)
  }
  function isCharNumeric(charStr) {
    return !!/\d/.test(charStr)
  }
  function onKeyDown(event) {
    if (!isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault()
    }
  }
  return (
    <div className="quantitybox-wrapper">
      <div
        onClick={() => {
          if (value > 1) {
            subAction(convertStringToNumber(value) - 1)
            changeNum(convertStringToNumber(value) - 1)
          }
        }}
        className="Subtraction-button cursor-pointer"
      >
        -
      </div>
      <input
        // onKeyDown={onKeyDown}
        onChange={value => {
          console.log('on change quantity')
          handleOnChangeInput(value)
        }}
        value={!num && num !== 0 ? value : num}
        onBlur={() => {
          console.log('kynnk ---on blur quantity')
          // num == 0 ? (num = 1) : (num = num);
          changeInput(convertStringToNumber(num))
        }}
        className="quantity-input upos-text"
      />
      <div
        onClick={() => {
          addAction(convertStringToNumber(value) + 1)
          changeNum(convertStringToNumber(value) + 1)
        }}
        className="Addition-button cursor-pointer"
      >
        +
      </div>
    </div>
  )
}
