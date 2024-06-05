import {SCRIPT} from "./~script";
import {ICONS} from "../../customer/_icons";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const USER_MANAGEMENT_BREADCRUMB = [
  {id: 1, name: SCRIPT.BREADCRUMB.TITLE, url: '#'},
  {id: 2, name: SCRIPT.BREADCRUMB.USER_ROLE, url: '#'},
]
export const USER_MANAGEMENT_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS.reload,
  },
  {
    id: 2,
    name: SCRIPT.BUTTON.CREATE,
    appearance: 'primary',
    icon: ICONS.plus,
    // href: '/users/create',
  },
]

export const STATUS_LIST = [
  {id: 1, name: SCRIPT.SELECT.STATUS.OPTION_ACTIVE},
  {id: 2, name: SCRIPT.SELECT.STATUS.OPTION_INACTIVE},
]
const SETTING = {
  setting : (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.8179 5.95213C15.8002 5.87229 15.7655 5.79718 15.7162 5.7319C15.667 5.66662 15.6043 5.61268 15.5323 5.57373L13.8331 4.63129C13.7427 4.44566 13.6427 4.26717 13.5332 4.09582L13.5618 2.15383C13.5624 2.07238 13.5463 1.99167 13.5144 1.91673C13.4824 1.8418 13.4354 1.77425 13.3762 1.71831C12.5301 0.951206 11.5295 0.37423 10.4418 0.0262166C10.3636 0.00185955 10.2813 -0.0056438 10.2 0.00420221C10.1188 0.0140482 10.0406 0.0410195 9.97055 0.0833339L8.307 1.08289C8.09996 1.07575 7.90004 1.07575 7.69299 1.08289L6.02946 0.0833339C5.95942 0.0410195 5.88121 0.0140482 5.79998 0.00420221C5.71875 -0.0056438 5.63635 0.00185955 5.55824 0.0262166C4.46906 0.374495 3.46806 0.95415 2.62384 1.72545C2.56411 1.77947 2.51664 1.84565 2.48462 1.91954C2.4526 1.99343 2.43678 2.07332 2.43821 2.15383L2.47391 4.09582C2.35967 4.26717 2.25972 4.44566 2.15976 4.63129L0.467665 5.57373C0.394846 5.6115 0.331403 5.66509 0.281987 5.73056C0.232571 5.79604 0.198434 5.87175 0.182078 5.95213C-0.0606928 7.06713 -0.0606928 8.22132 0.182078 9.33632C0.199813 9.41617 0.234488 9.49127 0.283758 9.55655C0.333029 9.62184 0.395745 9.67578 0.467665 9.71473L2.1669 10.6572C2.25799 10.8419 2.36053 11.0207 2.47391 11.1926L2.43821 13.1346C2.43756 13.2161 2.4537 13.2968 2.48564 13.3717C2.51758 13.4467 2.56463 13.5142 2.62384 13.5701C3.47108 14.3356 4.4713 14.9124 5.55824 15.2622C5.63635 15.2866 5.71875 15.2941 5.79998 15.2843C5.88121 15.2744 5.95942 15.2474 6.02946 15.2051L7.69299 14.2056H8.307L9.97768 15.2051C10.0645 15.2622 10.1665 15.2921 10.2704 15.2908C10.3285 15.2883 10.386 15.2787 10.4418 15.2622C11.5309 14.914 12.5319 14.3343 13.3762 13.563C13.4359 13.509 13.4834 13.4428 13.5154 13.3689C13.5474 13.295 13.5632 13.2151 13.5618 13.1346L13.5332 11.1926C13.6403 11.0213 13.7403 10.8428 13.8402 10.6572L15.5395 9.71473C15.6104 9.67537 15.6719 9.6212 15.72 9.5559C15.768 9.4906 15.8014 9.4157 15.8179 9.33632C16.0607 8.22132 16.0607 7.06713 15.8179 5.95213ZM11.1414 7.64423C11.1414 8.26555 10.9572 8.87291 10.612 9.38952C10.2668 9.90613 9.77621 10.3088 9.20218 10.5465C8.62816 10.7843 7.99651 10.8465 7.38713 10.7253C6.77775 10.6041 6.218 10.3049 5.77866 9.86557C5.33932 9.42623 5.04013 8.86647 4.91891 8.25709C4.7977 7.64771 4.85991 7.01607 5.09768 6.44205C5.33545 5.86802 5.7381 5.3774 6.2547 5.03221C6.77131 4.68702 7.37868 4.50278 8 4.50278C8.83316 4.50278 9.6322 4.83375 10.2213 5.42289C10.8105 6.01202 11.1414 6.81106 11.1414 7.64423Z" fill="#1E9A98"/>
  </svg>
  )
}
export const TABLE_HEADER=[
  {name : DISPLAY_NAME_MENU.GENERAL.F_NAME , class :'fullName'},
  {name : DISPLAY_NAME_MENU.GENERAL.PHONE , class :'phone'},
  {name : DISPLAY_NAME_MENU.GENERAL.EMAIL , class :'email'},
  {name : DISPLAY_NAME_MENU.USER_PAGE.ROLE , class :'managment'},
  {name : DISPLAY_NAME_MENU.GENERAL.STATUS , class :'status'},
  {name : '' , class :'setting'},
]

export const CREATE_USER_CONSTANTS = {
  header: {
    breadcrumb: [
      {id: 1, name: DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.HEADER, url: '#'},
      {id: 2, name: DISPLAY_NAME_MENU.USER_PAGE.USER_ROLE, url: '#'},
    ],
  },
}