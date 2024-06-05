import React, {memo, useState} from 'react';
import {StyledUseManagementFilter} from "../~styled";
import {Input} from "../../../../common/form/input";
import {ORDER_ICONS} from "../../../refactorOrder/interfaces/_icons";
import {Button} from "../../../../common/button";
import Box from "@mui/material/Box";
import {SCRIPT} from "../../interfaces/~script";
import UserStatus from "./~userStatus"
import UserRole from "./~userRole"
import {Grid} from "@mui/material";
import useFilterUserManagement from "../../hooks/useFilterUserManagement";
import {UserTags} from "./~userTags";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const UserFilter = memo(() => {
  const {t} = useTranslation()
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const { search, badge, functions } = useFilterUserManagement()
    const [searchParams] = useSearchParams()
  return (
    <StyledUseManagementFilter>
      <Box
        component="div"
        noValidate
        autoComplete="off"
        className={"user-management-filter"}
      >
        <div className="user-management-filter__group">
          <Input
            className="user-management-filter__input-wide"
            icon={ORDER_ICONS.searchMd}
            placeholder={t(SCRIPT.INPUT.PLACEHOLDER_SEARCH)}
            autoComplete={'false'}
            defaultValue={searchParams.get('search')}
            // value={value}
            onChange={e => search.onChange(e)}
          />
          <Button
            appearance="secondary"
            badgeType="danger"
            icon={ORDER_ICONS.filterFunnel02}
            size="md-"
            className={'user-management-filter__order'}
            badge={
              badge.others > 0
                ? badge.others > 9
                ? '9+'
                : badge.others
                : undefined
            }
            onClick={() => setShouldCollapse(!shouldCollapse)}
          >
            {t(DISPLAY_NAME_MENU.GENERAL.OTHER_FILTERS)}
          </Button>
          {shouldCollapse && (
            <Button
              appearance="secondary"
              size="md-"
              disabled={!functions.canSubmitOtherFilter}
              onClick={() => functions.canSubmitOtherFilter && functions.applyUserOtherFilter()}
            >
              {t(DISPLAY_NAME_MENU.GENERAL.APPLY)}
            </Button>
          )}
        </div>
        {shouldCollapse && (
          <div
            className="user-management-filter__collapse"
            data-collapse={shouldCollapse}
          >
            <Grid container className={"user-management-filter__collapse-group"}>
              <Grid item xs={4} sm={3} md={3} lg={3} >
                <div className={"user-management-filter__user-status"}>
                  <UserStatus />
                </div>
              </Grid>
              <Grid item xs={4} sm={3} md={3} lg={3} >
                <div className={"user-management-filter__user-role"}>
                  <UserRole />
                </div>
              </Grid>
            </Grid>
          </div>
        )}
        {/*{state.showTag && <Tag />}*/}
      </Box>
      <div className="user-management-filter-form__group" style={{marginBottom: 4}}>
        <UserTags />
      </div>
    </StyledUseManagementFilter>
  );
})