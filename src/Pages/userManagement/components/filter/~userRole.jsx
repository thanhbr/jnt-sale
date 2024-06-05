import React from 'react';

import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import {Option} from "../../../../common/form/autoComplete/_option";
import useFilterUserManagement from "../../hooks/useFilterUserManagement";
import {SCRIPT} from "../../interfaces/~script";
import {useTranslation} from "react-i18next";

const UserRole = () => {
  const {t} = useTranslation()
  const {groupEmployee} = useFilterUserManagement()
  return (
    <AlternativeAutoComplete
      className={'order-filter-form__input-wide'}
      inputProps={{
        categoryList: [],
        categoryValue: {name: SCRIPT.SELECT.ROLE.TITLE, value: ''},
        categoryWidth: 140,
        placeholder: t(SCRIPT.SELECT.ROLE.PLACEHOLDER),
        readOnly: true,
        value: groupEmployee?.value?.name || '',
        onIconClick: () => groupEmployee.onSelected(null),
      }}
      // menu
      menuProps={{
        empty: groupEmployee.list.length <= 0 ? t(SCRIPT.SELECT.ROLE.EMPTY) : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t(SCRIPT.SELECT.ROLE.SEARCH),
        value: groupEmployee.keyword,
        onChange: groupEmployee.onKeywordChange,
      }}
      onFocus={groupEmployee.onFocus}
    >
      {groupEmployee.list.length > 0 &&
        groupEmployee.list.map(item => (
          <Option
            key={item.id}
            className={"user-management-filter-form__option-text"}
            data-active={item.id === groupEmployee.value?.id}
            onClick={() => groupEmployee.onSelected(item)}
          >
            {t(item.name)}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
};

export default UserRole;