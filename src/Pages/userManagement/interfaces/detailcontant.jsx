import { THEME_COLORS } from "common/theme/_colors"
import { THEME_SEMANTICS } from "common/theme/_semantics"
import { useConfirm } from "../hooks/useConfirm"
import { USER_ICON } from "../icon/icon"
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";
export const POPOVER_USER = [
  { id: '1', name: DISPLAY_NAME_MENU.GENERAL.EDIT, icon: USER_ICON.edit, action: 1 },
  { id: '2', name: DISPLAY_NAME_MENU.USER_PAGE.RESET_PASS, icon: USER_ICON.openLock, action: 2 },
  { id: '4', name: DISPLAY_NAME_MENU.GENERAL.ROLE, icon: USER_ICON.user, action: 4 },
]
export const POPVER_USER_ID_GLOBAL=[
  { id: '1', name: DISPLAY_NAME_MENU.GENERAL.EDIT, icon: USER_ICON.edit, action: 1 },
  { id: '4', name: DISPLAY_NAME_MENU.GENERAL.ROLE, icon: USER_ICON.user, action: 4 },
]
export const DETAIL_TABLE_HEADING_LIST = [
  DISPLAY_NAME_MENU.GENERAL.USER_PROFILE,
  '',
  DISPLAY_NAME_MENU.USER_PAGE.INFO,
]
export const DETAIL_TABLE_FIGURE_LIST = [
  {
    id: 1,
    label: DISPLAY_NAME_MENU.GENERAL.FULL_NAME,
    color: THEME_SEMANTICS.delivering,
  },
  {
    id: 2,
    label: DISPLAY_NAME_MENU.GENERAL.ADDRESS,
    color: THEME_SEMANTICS.delivering,
  },
  {
    id: 3,
    label: DISPLAY_NAME_MENU.GENERAL.STATUS,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 4,
    label: DISPLAY_NAME_MENU.GENERAL.PHONE,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 5,
    label: DISPLAY_NAME_MENU.GENERAL.EMAIL,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 6,
    label: DISPLAY_NAME_MENU.USER_PAGE.ROLE,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 7,
    label: DISPLAY_NAME_MENU.GENERAL.DOB,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 8,
    label: DISPLAY_NAME_MENU.GENERAL.NOTE,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 9,
    label: DISPLAY_NAME_MENU.GENERAL.USER_NAME,
    color: THEME_COLORS.secondary_100,
  },
  {
    id: 10,
    label: DISPLAY_NAME_MENU.GENERAL.GENDER,
    color: THEME_COLORS.secondary_100,
  },
]

export const MODAL_CONFIRM = [
  {
    id: 1,
    title: DISPLAY_NAME_MENU.USER_PAGE.INACTIVE,
    content: DISPLAY_NAME_MENU.USER_PAGE.INACTIVE_TOOLTIP,
    action:1
  },
  {
    id: 2,
    title: DISPLAY_NAME_MENU.USER_PAGE.RESET_PASS,
    content: DISPLAY_NAME_MENU.USER_PAGE.RESET_PASS_TOOLTIP,
    action:2
  }
]
export const EMPTY_USER={
  title: DISPLAY_NAME_MENU.GENERAL.FIND_NO_DATA,
}