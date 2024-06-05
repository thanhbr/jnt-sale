import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

export const INPUT_VALIDATE_TYPES = [
  'default',
  'defaultDanger',
  'danger',
  'success',
  'defaultSuccess',
]

export const INPUT_VALIDATE_TYPE_COLORS = {
  default: THEME_COLORS.secondary_100,
  defaultDanger: THEME_SEMANTICS.failed,
  danger: THEME_SEMANTICS.failed,
  success: THEME_SEMANTICS.delivered,
  defaultSuccess: THEME_SEMANTICS.delivered,
}
