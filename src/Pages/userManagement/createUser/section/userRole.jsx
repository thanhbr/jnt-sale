import React from 'react';
import {Grid} from "@mui/material";

import useCreateUserManagement from "../../hooks/useCreateUserManagement";
import {USER_ICON} from "../../icon/icon";
import {Tooltip} from "../../../../common/tooltip";
import {Checkbox} from "../../../../common/form/checkbox"
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Text} from "../../../../common/text";

const UserRole = () => {
  const {groupEmployee, functions, valueForm, validate} = useCreateUserManagement()
  return (
    <>
      <div className="create-user-info__form-group">
        <div className="create-user-info__form-group--header" style={{position: 'relative'}}>
          <span className="create-user-info__form-group-role--header">Chọn một trong các vai trò <Text color={THEME_SEMANTICS.failed}> *</Text></span>
          {validate?.errorCheckRules?.status && <span className="create-user-info__form-group-role--header-error">{validate?.errorCheckRules?.message}</span>}
        </div>
        <Grid container className={"create-user-info__group-role"}>
          {groupEmployee?.list?.map(item => (
            <Grid xs={4} sm={4} md={4} lg={4} item
                  key={item.id}>
              <div
                  className={"create-user-info__group-role--list"}
                  onClick={() => functions.onChangeRule(item.id)} 
                  style={{display: 'flex', marginTop: '24px'}}
                >
                <Checkbox
                  // indeterminate={table.methods.onCheckAllSelected() === 2}
                  checked={valueForm?.rules.includes(item.id)}
                />
                <span className={'create-user-info__group-role--text'}>{item.group_name}</span>
                <Tooltip placement="bottom-start" title={item.group_comment || 'Chưa có mô tả'} className={'user-management-tooltip__user-list-role'}>
              <span
                style={{
                  marginLeft: 6,
                  display: 'inline-block',
                  transform: 'translateY(2px)',
                }}
              >
                {USER_ICON.question}
              </span>
                </Tooltip>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default UserRole;