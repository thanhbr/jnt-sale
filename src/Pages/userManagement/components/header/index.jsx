import React from 'react';
import {USER_MANAGEMENT_BREADCRUMB} from "../../interfaces/~contants";
import {SCRIPT} from "../../interfaces/~script";
import {StyledUseManagementHeader} from '../~styled'
import {PageHeader} from "../../../../layouts/pageHeader";
import {USER_MANAGEMENT_HEADER_ACTIONS} from "../../interfaces/~contants";
import useFilterUserManagement from "../../hooks/useFilterUserManagement";
import {useTranslation} from "react-i18next";

const Index = () => {
  const {t} = useTranslation()
  const { functions } = useFilterUserManagement()
  const actions = [functions.refresh, functions.checkPermission]
  return (
    <StyledUseManagementHeader>
      <div className={"user-management-header"}>
        <PageHeader
          actions={USER_MANAGEMENT_HEADER_ACTIONS.map((item, i) => ({
            ...item,
            onClick: actions[i],
          }))}
          breadcrumbLinks={USER_MANAGEMENT_BREADCRUMB}
          breadcrumbTitle={t(SCRIPT.BREADCRUMB.ROOT)}
        />
      </div>
    </StyledUseManagementHeader>
  );
};

export default Index;