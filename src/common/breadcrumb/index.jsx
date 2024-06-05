import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Fragment} from 'react'
import {useLocation} from 'react-router-dom'
import {BREADCRUMB_ICONS} from './_icons'
import {StyledBreadCrumb} from './_styled'
import {useTranslation} from "react-i18next";

/**
 * @type {TypeLink} = {
 *  id: number,
 *  name: string,
 *  url: string | '#' | null
 * }
 */
/**
 * @param {links}      ?: TypeLink[]     <Link list>
 * @param {subTitle}   ?: string         <Page sub title>
 * @param {title}      ?: string         <Page title>
 */
export const Breadcrumb = ({
  links = [],
  subTitle,
  title = 'Page Title',
  ...props
}) => {
  const location = useLocation()
  const {pathname} = location
  const { t } = useTranslation()

  return (
    <StyledBreadCrumb {...props}>
      <div className="breadcrumb__title">
        <Text as="h1" fontSize={24} fontWeight={800} lineHeight={34}>
          {title}
        </Text>
        {subTitle && (
          <Text fontSize={16} style={{marginLeft: 8}}>
            {subTitle}
          </Text>
        )}
      </div>
      {Array.isArray(links) && links.length > 0 && (
        <ul className="breadcrumb__links">
          {links.map((item, i) => (
            <Fragment key={item?.id || i}>
              {i > 0 && BREADCRUMB_ICONS.arrowLeft}
              {item?.isBack && BREADCRUMB_ICONS.back}
              <li>
                <Text
                  as="a"
                  href={item?.url || '#'}
                  color={item?.isBack ? THEME_COLORS.primary_300 : '#7C88A6'}
                  style={{
                    cursor:
                      !item?.url || ['#', pathname].includes(item.url)
                        ? 'default'
                        : 'pointer',
                  }}
                >
                  {t(item?.name) || 'Unknown'}
                </Text>
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </StyledBreadCrumb>
  )
}
