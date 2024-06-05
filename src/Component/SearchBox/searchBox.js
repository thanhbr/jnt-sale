/**
 *
 * custom select for order v 1.0
 * by kynk - copyright 2020
 *
 */
import { useState, useEffect, useRef, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

export default function SearchBox({ ...props }) {
  const {
    listOption = {},
    callBack = () => {},
    id = "",
    customClass = "",
    showSelected = true,
    stringQuerry = "",
    selected,
  } = props;

  const [showSuggest, changeShowSuggest] = useState(false);
  const [isShowMenu, changeShowMenu] = useState(false);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const { t } = useTranslation();
  const changeSelect = (obj) => {
    try {
      changeShowMenu(false);
      if (obj.value === selected) return;
      callBack && callBack(obj.value, "CHANGE_DROPDOWN");
    } catch (error) {
      console.log(`error at changeSelect ==========${  error}`);
    }
  };

  const changeText = (e) => {
    const text = e.target.value;
    if (text === stringQuerry) return;
    callBack && callBack(text, "CHANGE_TEXT");
  };
  const didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };
  const unmount = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false);
    }
    if (ref1.current && !ref1.current.contains(event.target)) {
      changeShowSuggest(false);
    }
  }

  useEffect(() => {
    didmout();
    return () => {
      unmount();
    };
  }, [ref, ref1]);
  try {
    return (
      <div
        ref={ref1}
        className={customClass ? `${customClass} search-box` : "search-box"}
      >
        <div className="input-box-wrapper">
          <input
            id={id}
            placeholder={listOption[selected].placeHolderText}
            onChange={(e) => {
              changeText(e);
            }}
            onClick={() => {
              changeShowSuggest(!showSuggest);
            }}
            value={stringQuerry}
          />

          <Paper
            className={
              showSuggest
                ? "suggest-wrapper upos-show-item"
                : "suggest-wrapper upos-hide-item"
            }
            elevation={3}
          >
            <div className="upos-text suggest-1">
              {listOption[selected].suggest.text || "--"}
            </div>
            <div className="upos-text suggest-2">{t("suggest_for_you")}</div>
            <div className="upos-text suggest-3">
              <div className="upos-text example-1">
                {listOption[selected].suggest.example.ex1 || ""}
              </div>
              <div className="upos-text example-2">
                {listOption[selected].suggest.example.ex2 || ""}
              </div>
            </div>
          </Paper>
        </div>

        {showSelected ? (
          <div ref={ref} className="dropdown-wrapper cursor-pointer">
            <div
              className="searchbox-dropdown"
              onClick={(e) => {
                changeShowMenu(!isShowMenu);
                const icon = e.target.querySelector("img");
                if (!icon) return;
                if (!isShowMenu) {
                  icon.style.transform = "rotate(180deg)";
                } else {
                  icon.style.transform = "rotate(0deg)";
                }
              }}
            >
              {listOption[selected].label}
              <img
                className="block-click add-effect-all expand-menu-order"
                src="/svg/arr-white.svg"
              />
            </div>
            <div
              className={
                isShowMenu
                  ? "dropdown-items-wrapper"
                  : "dropdown-items-wrapper dropdown-hide"
              }
            >
              {Object.keys(listOption).map((item) => (
                  <div
                    key={uuidv4()}
                    className={
                      selected === listOption[item].label
                        ? "dropdown-items dropdown-items-active"
                        : "dropdown-items"
                    }
                    onClick={() => changeSelect(listOption[item])}
                  >
                    {listOption[item].label}
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  } catch (error) {
    console.log("error render search box");
  }
}
