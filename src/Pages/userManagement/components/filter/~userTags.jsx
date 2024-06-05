import {memo} from "react";
import {OrderTag} from "../../../refactorOrder/components/orderTags/_tag";
import {StyledOrderTags} from "../../../refactorOrder/components/orderTags/_styled";
import useFilterUserManagement from "../../hooks/useFilterUserManagement";
import {SCRIPT} from "../../interfaces/~script";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const UserTags = memo(() => {
  const {t} = useTranslation()
  const { groupStatus, groupEmployee, functions } = useFilterUserManagement()

  const shouldShowResetAll = [
    groupStatus?.activeValue.length !== 0,
    groupEmployee?.activeValue.length !== 0
  ].includes(true)

  return (
    <StyledOrderTags>
      {Object.keys(groupStatus?.activeValue).length !== 0  && (
        <OrderTag onDelete={() => functions.filterTagDelete('status')} >
          {t(SCRIPT.PANELS.STATUS)}: {t(groupStatus?.activeValue?.name)}
        </OrderTag>
      )}
      {Object.keys(groupEmployee?.activeValue).length !== 0  && (
        <OrderTag onDelete={() => functions.filterTagDelete('employee')} >
          {t(SCRIPT.PANELS.GROUP)}: {t(groupEmployee?.activeValue?.name)}
        </OrderTag>
      )}
      {shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={() => functions.handleDeleteAll()}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.RESET_TO_DEFAULT)}
        </Text>
      )}
    </StyledOrderTags>
  )
})