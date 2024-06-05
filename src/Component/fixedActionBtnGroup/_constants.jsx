import {FIXED_ACTION_BTN_GROUP_ICONS} from './_icons'
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

export const FIXED_ACTION_BTN_GROUP = [
  {
    id: 1,
    name: 'Hướng dẫn',
    icon: FIXED_ACTION_BTN_GROUP_ICONS.book,
    action: () => console.log('Hướng dẫn'),
    // path : 'https://help.upos.vn'
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.FEEDBACK.HOME,
    icon: FIXED_ACTION_BTN_GROUP_ICONS.chat,
    action: 'feedback',
  },
]
