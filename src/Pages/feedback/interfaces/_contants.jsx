import {ICONS_TYPE_OF_RECEIPT} from "../../typeOfReceipt/interfaces/_icons";
import {ICONS_FEEDBACK} from "./_icons";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

export const FEEDBACK_BREADCRUMB_TITLE = DISPLAY_NAME_MENU.FEEDBACK.LIST

export const FEEDBACK_BREADCRUMB = [
  {id: 1, name: DISPLAY_NAME_MENU.FEEDBACK.HOME, url: '#'},
  {id: 2, name: DISPLAY_NAME_MENU.FEEDBACK.LIST_OF_YOUR, url: '#'},
]

export const FEEDBACK_HEADER_ACTIONS = [
  {
    id: 1,
    name: null,
    appearance: 'secondary',
    icon: ICONS_TYPE_OF_RECEIPT.repeat,
  },
  {
    id: 2,
    name: DISPLAY_NAME_MENU.GENERAL.CREATE,
    appearance: 'primary',
    icon: ICONS_TYPE_OF_RECEIPT.plus,
  },
]

export const FEEDBACK_BODY_STATUS = [
  {
    id: 1,
    title: DISPLAY_NAME_MENU.FEEDBACK.NEW_REQUEST,
    color: '#1A94FF',
    background: '#EBF5FF',
    width: 90
  },
  {
    id: 2,
    title: DISPLAY_NAME_MENU.FEEDBACK.PROCESSING,
    color: '#FC820A',
    background: '#FFF5EB',
    width: 82
  },
  {
    id: 3,
    title: DISPLAY_NAME_MENU.FEEDBACK.PROCESSED,
    color: '#00AB56',
    background: '#E6FFF2',
    width: 68
  },
  {
    id: 4,
    title: DISPLAY_NAME_MENU.FEEDBACK.REJECT,
    color: '#FF424E',
    background: '#FFEBEC',
    width: 91
  },
]

export const FEEDBACK_BODY_FILE = [
  {
    format: 'jpg',
    icon: ICONS_FEEDBACK.jpg
  },
  {
    format: 'png',
    icon: ICONS_FEEDBACK.jpg
  },
  {
    format: 'pdf',
    icon: ICONS_FEEDBACK.pdf
  },
  {
    format: 'pdf',
    icon: ICONS_FEEDBACK.pdf
  },
  {
    format: 'svg',
    icon: ICONS_FEEDBACK.word
  },
  {
    format: 'doc',
    icon: ICONS_FEEDBACK.word
  },
  {
    format: 'docx',
    icon: ICONS_FEEDBACK.word
  },
  {
    format: 'xlsx',
    icon: ICONS_FEEDBACK.excel
  }
]