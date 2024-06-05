/**
 *
 * custom select for order v 1.0
 * by kynk - copyright 2020
 *
 */
import { useState, useEffect, useRef, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";

export default function PureSearchBox({ ...props }) {
  const {
    callBack = () => {},
    id = "",
    customClass = "",
    stringQuerry = "",
    suggestText = {},
    placeHolderText = "",
  } = props;

  const [showSuggest, changeShowSuggest] = useState(false);
  const [value, changeValue] = useState("");
  const ref1 = useRef(null);
  const { t } = useTranslation();

  const changeText = (e) => {
    const text = e.target.value;
    changeValue(text);
    // if (text === stringQuerry) return;
    callBack && callBack(text);
  };
  const didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };
  const unmount = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

  function handleClickOutside(event) {
    if (ref1.current && !ref1.current.contains(event.target)) {
      changeShowSuggest(false);
    }
  }

  useEffect(() => {
    didmout();
    return () => {
      unmount();
    };
  }, [ref1]);
  try {
    return (
      <div
        ref={ref1}
        className={
          customClass ? `upos-search-box ${customClass}` : "upos-search-box"
        }
      >
        <div className="input-box-wrapper">
          <input
            className="upos-input"
            placeholder={placeHolderText}
            onChange={(e) => {
              changeText(e);
            }}
            onClick={() => {
              changeShowSuggest(!showSuggest);
            }}
            value={value}
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
              {suggestText.text1 ? t(suggestText.text1) : "-"}
            </div>
            <div className="upos-text suggest-2">{t("suggest_for_you")}</div>
            <div className="upos-text suggest-3">
              <div className="upos-text example-1">
                {suggestText.text2 ? t(suggestText.text2) : "--"}
              </div>
              <div className="upos-text example-2">
                {suggestText.text3 ? t(suggestText.text3) : "---"}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  } catch (error) {
    console.log("error render search box");
  }
}
