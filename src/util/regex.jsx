export const REGEX_VN_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
export const REGEX_WHITESPACE_AT_BEGINNING_AND_END = /^[^\s]+(\s+[^\s]+)*$/
export const REGEX_WHITESPACE_AT_START_AND_END = /^\s+|\s+$/g
export const REGEX_CUSTOMER_CODE = /^[-_.a-z0-9\u4e00-\u9eff]{1,50}$/i
export const REGEX_EMAIL = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/