import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

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

export default function DropdownFilter({ ...props }) {
  const { t } = useTranslation();
  const {
    cb,
    listOption = [],
    selected = {},
    customClass = "",
    icon,
    filter,
    byPassTran,
    isHideExpand = false,
  } = props;
  const [isShowMenu, changeShowMenu] = useState(false);
  const ref = useRef(null);
  const expandRef = useRef(null);
  // selected.value === item.value ? "dropdown-items dropdown-items-active" : "dropdown-items"

  const changeSelect = (item) => {
    if (cb && typeof cb === "function") {
      cb(item);
    }
    changeShowMenu(false);
    if (!expandRef) return;
    const icon = expandRef.current;
    if (!icon) return;
    icon.style.transform = "rotate(0deg)";
  };
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false);
      if (!expandRef) return;
      const icon = expandRef.current;
      icon.style.transform = "rotate(0deg)";
    }
  }
  const didmout = () => {
    document.addEventListener("mousedown", handleClickOutside);
  };
  const unmount = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  useEffect(() => {
    didmout();
    return () => {
      unmount();
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className={
        customClass ? `${customClass} dropdown-wrapper` : "dropdown-wrapper"
      }
    >
      <div
        className={!isShowMenu ? "dropdown-selected" : "dropdown-selected"}
        onClick={(e) => {
          const icon = e.target.querySelector("img");
          if (!icon) return;
          if (!isShowMenu) {
            icon.style.transform = "rotate(180deg)";
          } else {
            icon.style.transform = "rotate(0deg)";
          }
          if (e.target.classList.contains("reset-dropdown")) return;
          changeShowMenu(!isShowMenu);
        }}
      >
        {!icon ? (byPassTran ? selected.label : t(selected.label)) : null}

        <img
          id={`${filter || ""}-icon-expand`}
          ref={expandRef}
          className="block-click add-effect-all expand-dropdown"
          src="/svg/arr-down.svg"
        />
      </div>
      <div
        className={
          isShowMenu
            ? "dropdown-items-wrapper"
            : "dropdown-items-wrapper dropdown-hide"
        }
      >
        {listOption.map((item) => {
          let itemClass = "dropdown-items";
          if (selected.value === item.value) {
            itemClass += " dropdown-items-active";
          }
          if (item.customItemClass) {
            itemClass += item.customItemClass;
          }
          return (
            <div key={uuidv4()} className={itemClass} onClick={() => changeSelect(item)}>
              {t(item.label)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
