import React from 'react';
import {useNavigate} from "react-router-dom";

import {Button} from "../../../../common/button";
import useCreateUserManagement from "../../hooks/useCreateUserManagement";
import {PATH} from "../../../../const/path";

export const ActionFormBtnList = () => {
  const {functions, wipDisabled} = useCreateUserManagement()
  const navigate = useNavigate();
  return (
    <>
      <Button appearance="ghost"
              onClick={() => navigate(PATH.USER)}
      >Hủy</Button>
      <Button onClick={() => functions.submit()}
              style={{marginLeft: 12}}
              disabled={wipDisabled}
      >Lưu</Button>
    </>
  )
}