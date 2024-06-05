import {THEME_COLORS} from 'common/theme/_colors'
import {Link} from 'react-router-dom'

/**
 * @type {TypeColor}      = string              <only color value>
 * @type {TypeFontWeight} = 100 | ... | 900     <only font-weight value>
 */
/**
 * @param {as}            ?: ReactNode          <HTML tag of text>
 * @param {color}         ?: TypeColor          <Text color>
 * @param {fontSize}      ?: number             <Size text>
 * @param {fontWeight}    ?: TypeFontWeight     <Bold of text>
 * @param {lineHeight}    ?: number             <Height of text>
 */
export const Text = ({
  as = 'span',
  color = THEME_COLORS.secondary_100,
  fontSize = 13,
  fontWeight,
  lineHeight = 20,
  ...props
}) => {
  const isLink = as === 'a'

  const Tag = isLink ? (props?.target === '_blank' ? 'a' : Link) : as
  const styles = {
    color,
    fontSize,
    fontStyle: as === 'i' ? 'italic' : 'normal',
    fontWeight: fontWeight
      ? fontWeight
      : ['b', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(
        as.toLowerCase(),
      )
        ? 600
        : 400,
    lineHeight: isNaN(lineHeight) ? lineHeight : `${lineHeight}px`,
    width: 'fit-content',
  }

  return (
    <Tag
      {...props}
      to={isLink ? props?.href || '#' : undefined}
      style={{...styles, ...props?.style}}
    >
      {props?.children}
    </Tag>
  )
}
