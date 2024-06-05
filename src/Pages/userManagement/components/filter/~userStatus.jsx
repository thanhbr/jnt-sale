import React from 'react';
import {Option} from "../../../../common/form/select/_option";
import {SCRIPT} from "../../interfaces/~script";
import {CategoryAutoComplete} from "../../../../Component/CategoryAutoComplete";
import {STATUS_LIST} from "../../interfaces/~contants";
import useFilterUserManagement from "../../hooks/useFilterUserManagement";
import {useTranslation} from "react-i18next";

const UserStatus = () => {
  const {t} = useTranslation()
  const {
    groupStatus,
  } = useFilterUserManagement()
  return (
    <CategoryAutoComplete
      className="user-management-filter-collapse__input-wide"
      categoryList={[{name: t(SCRIPT.SELECT.STATUS.TITLE), value: ''}]}
      categoryWidth={140}
      emptyMenu={groupStatus?.list?.length <= 0}
      emptyText={t(SCRIPT.SELECT.STATUS.EMPTY)}
      setValue={groupStatus?.value?.name || ''}
      placeholder={t(SCRIPT.SELECT.STATUS.PLACEHOLDER)}
      onChange={() => console.log('onChange')}
      onBlur={() => groupStatus?.onBlur()}
      onReset={() => {groupStatus?.onSelected([])}}
      onDisabled={false}
    >
    {groupStatus?.list?.length > 0 &&
      groupStatus.list.map((item, index) => (
        <Option
          key={STATUS_LIST[index].id}
          className={`user-management-filter-form__option-text`}
          onClick={() => {groupStatus?.onSelected(item)}}
        >
          {t(STATUS_LIST[index].name)}
        </Option>
      ))
    }
    </CategoryAutoComplete>
  );
};

export default UserStatus;