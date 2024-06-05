import React, { Component, createRef } from "react";
import {
  convertStringToNumber,
  getDiscountPrice,
} from "../../util/functionUtil";
import { v4 as uuidv4 } from 'uuid';

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
    this.validAndUpdateSelected = this.validAndUpdateSelected.bind(this);
    this.updateDataTotal = this.updateDataTotal.bind(this);
  }

  componentDidMount() {
    this.setCarot();
  }

  renderMiniDropdown() {
    const listOption = [
      { label: "đ", value: "vnd" },
      { label: "%", value: "percent" },
    ];
    return (
      <div
        onClick={(e) => {
          this.setState({
            isShow: !this.state.isShow,
          });
        }}
        className="mini-wrapper"
      >
        <div className="mini-selected">{this.state.selected.label}</div>
        <img
          ref={this.expandIcon}
          className={
            this.state.isShow
              ? "turn-down add-effect-all expand-dropdown"
              : "turn-back add-effect-all expand-dropdown"
          }
          src="/img/order/icon.png"
        />
        <div
          className={
            this.state.isShow
              ? "upos-show-item mini-item-wrap"
              : "upos-hide-item mini-item-wrap"
          }
        >
          {listOption.map((item, index) => (
              <div
                key={uuidv4()}
                onClick={() => {
                  this.setState(
                    {
                      selected: item,
                      isShow: false,
                    },
                    () => {
                      this.validAndUpdateSelected(-1);
                    }
                  );
                }}
                className="mini-item"
              >
                {item.label}
              </div>
            ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="neworder-discount-wrapper">
        <input
          ref={this.inputRef}
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          onChange={this.handleChange}
          className="upos-text upos-input discount-info-input"
         />
        {this.renderMiniDropdown()}
      </div>
    );
  }

  /* Component Editor Lifecycle methods */
  // the final value to send to the grid, on completion of editing
  getValue() {
    // return `${this.state.value || 0} ${this.state.selected.label}`;
    return { unit: this.state.selected.label, value: this.state.value || 0 };
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
    return this.state.value > 1000000;
  }

  updateDataTotal() {
    const rowNode = this.props.api.getRowNode(this.props.data.id);
    const {data} = this.props;
    const quantity = convertStringToNumber(data.quantity);
    const discount = this.state.value;
    const unit = this.state.selected.label;
    const objDis = {
      unit,
      value: discount,
    };
    const price = convertStringToNumber(this.props.data.display_price);
    const numDiscount = getDiscountPrice(objDis, price * quantity);
    const total = price * quantity - numDiscount;
    rowNode.setDataValue("total", total);
  }

  /* Utility methods */
  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;
    let startSelect;
    if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = "";
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      //   text = props.value.replace(/[^0-9\.]+/g, "");
      const text = `${props.value.unit || ""  }`;
      const value = `${props.value.value || 0  }`;
      if (text.includes("%")) {
        startSelect = { value: "percent", label: "%" };
      } else {
        startSelect = { value: "vnd", label: "đ" };
      }
      // startValue = value.replace(/[^0-9\.]+/g, "");
      if (props.keyPress === KEY_F2) {
        highlightAllOnFocus = false;
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
      selected: startSelect,
      isShow: false,
    };
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
    let newText;
    const price = Number(this.props.data.price);
    text = Number(text);
    if (this.state.selected.value === "vnd") {
      if (text > price) {
        newText = price;
      } else if (text < 0) {
        newText = 0;
      } else {
        newText = text;
      }
    }
    if (this.state.selected.value === "percent") {
      if (text > 100) {
        newText = 100;
      } else if (text < 0) {
        newText = 0;
      } else {
        newText = text;
      }
    }
    // console.log(`"---------------------> " + ${newText}`);
    this.setState(
      {
        value: newText,
      },
      () => this.updateDataTotal()
    );
  }

  handleChange(event) {
    const text = event.target.value;
    this.validAndUpdateSelected(text);
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
