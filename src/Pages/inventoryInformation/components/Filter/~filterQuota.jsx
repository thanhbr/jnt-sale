import React, {useState} from 'react';
import {CategoryInput} from "./_categoryInput";
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import {AUTO_COMPLETE_ICONS} from "../../../../common/form/autoComplete/_icons";
import styled from "styled-components";
import {Text} from "../../../../common/text";
import {INVENTORY_INFORMATION_ROW_QUOTA} from "../../interfaces/~contants";
import {Popover} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const FilterQuota = () => {
  const {t} = useTranslation()
  const {data, functions} = useFilterInventoryInformation()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <StyledFilterQuota>
      <div className={'inventory-info-filter-quota'}>
        <div style={{width: 200, height: 36, background: 'transparent', position: 'absolute', zIndex: 2}}
             onClick={handleClick}
        ></div>
        <CategoryInput
          className="category-auto-complete__input"
          categoryList={[]}
          categoryValue={{name: t(data?.filter?.quota?.norm_type?.name), value: ''}}
          categoryWidth={210}
          placeholder={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.ENTER_RATED_VALUE)}
          maxLength={12}
          // onCategoryChange={handleCategoryChange}
          // onKeyDown={handleCategoryKeyDown}
          // disabled={onDisabled}
          icon={
            // val ? (
            //   AUTO_COMPLETE_ICONS.x
            // ) : (
            <div
              style={{
                transform: open
                  ? 'rotate(180deg) translateY(4px)'
                  : 'rotate(0)',
                transition: 'transform 0.25s',
              }}
              aria-describedby={id}
            >

              <i
                aria-describedby={id}
                onClick={handleClick}
              >
                {AUTO_COMPLETE_ICONS.chevronLeft}
              </i>
            </div>
            // )
          }
          value={data?.filter?.quota?.value}
          // onBlur={_ => functions.onFocusInputMenuQuota() }
          onChange={value => functions?.onChangeQuota(value)}
          // onClick={handleClick}
          // onIconClick={handleClick}
        />
        {open && (
          <Popover
            id={id}
            className="common-popover"
            open={true}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ul
              className="info-inventory-auto-complete__menu scroll-custom"
            >
              {INVENTORY_INFORMATION_ROW_QUOTA?.map(item => (
                <li key={item?.id}
                    onClick={_ => {
                      functions?.onChangeTypeQuota(item)
                      handleClose()
                    }}
                    style={{padding: '8px 36px 8px 12px', cursor: 'pointer'}}
                >
                  <Text data-active={data?.filter?.quota?.norm_type?.name === item.name}>{t(item.name)}</Text>
                </li>
              ))}
            </ul>
          </Popover>
        )}
      </div>
    </StyledFilterQuota>
  );
};

export default FilterQuota;

export const StyledFilterQuota = styled.div`
  .inventory-info-filter-quota {
    .input__icon  {
      left: 170px;
    }
  }
`
