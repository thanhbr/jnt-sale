import React, { Component, createRef } from "react";
import { convertStringToNumber } from "../../util/functionUtil";

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;
const KEY_ENTER = 13;
const KEY_TAB = 9;

export default class NumericEditor extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef(null);

    this.cancelBeforeStart =
      this.props.charPress && "1234567890".indexOf(this.props.charPress) < 0;

    this.state = this.createInitialState(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setCarot();
  }

  render() {
    return (
      <div className="new-order-input-price">
        <input
          ref={this.inputRef}
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          onChange={this.handleChange}
          className="upos-text upos-input product-info-input show-unit-input price-input"
         />
        {/* <img className="product-currency" src="/svg/vnd.svg" /> */}
      </div>
    );
  }

  /* Component Editor Lifecycle methods */
  // the final value to send to the grid, on completion of editing
  getValue() {
    try {
      const {data} = this.props;
      const textDiscount = `${data.discount  }`;
      let discount = 0;
      console.log(
        `===========>${ 
          this.state.value 
          }----------${ 
          !textDiscount.includes("%")}`
      );
      if (!textDiscount.includes("%")) {
        discount = Number(textDiscount.replace(/[^0-9]+/g, ""));
        if (this.state.value < discount) {
          return discount || 0;
        } 
          return this.state.value || 0;
        
      } 
        return this.state.value || 0;
      
    } catch (error) {
      console.log(`===========>${  this.state.value  }----------${  error}`);
    }
  }

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart() {
    return this.cancelBeforeStart;
  }

  // Gets called once when editing is finished (eg if enter is pressed).
  // If you return true, then the result of the edit will be ignored.
  isCancelAfterEnd() {
    // will reject the number if it greater than 1,000,000
    // not very practical, but demonstrates the method.
    // const data = this.props.data;
    // const textDiscount = data.discount + "";
    // let discount = 0;
    // if (!textDiscount.includes("%")) {
    //   discount = Number(textDiscount.replace(/[^0-9\.]+/g, ""));
    // }
    return this.state.value > 1000000;
  }

  /* Utility methods */
  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;

    if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = "";
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = props.value;
      if (props.keyPress === KEY_F2) {
        highlightAllOnFocus = false;
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  }

  updateDataTotal() {
    const rowNode = this.props.api.getRowNode(this.props.data.id);
    const {data} = this.props;
    const textDiscount = `${data.discount  }`;

    const quantity = convertStringToNumber(data.quantity);
    const discount = convertStringToNumber(data.discount);
    const price = convertStringToNumber(this.state.value);
    let newPrice;
    let total = 0;
    if (textDiscount.includes("%")) {
      total = quantity * price - (quantity * price * discount) / 100;
    } else {
      price < discount ? (newPrice = discount) : (newPrice = price);
      total = quantity * newPrice - discount;
    }
    rowNode.setDataValue("total", total);
    // rowNode.setDataValue("price", newPrice )
  }

  onKeyDown(event) {
    if (this.isLeftOrRight(event) || this.deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (
      !this.finishedEditingPressed(event) &&
      !this.isKeyPressedNumeric(event)
    ) {
      if (event.preventDefault) event.preventDefault();
    }
    if (this.finishedEditingPressed(event)) {
      console.log("complete edit");
      // this.updateDataTotal();
    }
  }

  isLeftOrRight(event) {
    return [37, 39].indexOf(event.keyCode) > -1;
  }

  validAndUpdateSelected(text) {
    let newText = text;
    const numbPrice = Number(text);
    const {data} = this.props;
    const discount = `${data.discount  }`;
    if (discount.includes("đ")) {
      const numbDiscount = Number(discount.replace(/[^0-9]+/g, ""));
      if (numbPrice < numbDiscount) newText = numbDiscount;
    }
    this.setState({ value: newText });
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ value: text }, () => this.updateDataTotal());
    // this.validAndUpdateSelected(text);
  }

  getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === "undefined" ? event.keyCode : event.which;
  }

  isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }

  isKeyPressedNumeric(event) {
    const charCode = this.getCharCodeFromEvent(event);
    const charStr = event.key ? event.key : String.fromCharCode(charCode);
    return this.isCharNumeric(charStr);
  }

  deleteOrBackspace(event) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  }

  finishedEditingPressed(event) {
    const charCode = this.getCharCodeFromEvent(event);
    return charCode === KEY_ENTER || charCode === KEY_TAB;
  }

  setCarot() {
    // https://github.com/facebook/react/issues/7835#issuecomment-395504863
    setTimeout(() => {
      const currentInput = this.inputRef.current;
      currentInput.focus();
      if (this.state.highlightAllOnFocus) {
        currentInput.select();

        this.setState({
          highlightAllOnFocus: false,
        });
      } else {
        // when we started editing, we want the carot at the end, not the start.
        // this comes into play in two scenarios: a) when user hits F2 and b)
        // when user hits a printable character, then on IE (and only IE) the carot
        // was placed after the first character, thus 'apply' would end up as 'pplea'
        const length = currentInput.value ? currentInput.value.length : 0;
        if (length > 0) {
          currentInput.setSelectionRange(length, length);
        }
      }
    });
  }
}
