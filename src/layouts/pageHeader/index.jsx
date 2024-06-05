import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {Tooltip} from 'common/tooltip'
import {StyledPageHeader} from './_styled'
import { Text } from '../../common/text'
import { Fragment } from 'react'
import { BREADCRUMB_ICONS } from '../../common/breadcrumb/_icons'
import { THEME_COLORS } from '../../common/theme/_colors'
import {useTranslation} from "react-i18next";

export const PageHeader = ({
  actions,
  breadcrumbLinks,
  breadcrumbSubTitle,
  breadcrumbTitle,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <StyledPageHeader {...props}>
      <div className="page-header__breadcrumb">
        {!!props?.confirmBack ? <>
            <div className="breadcrumb__title">
              <Text as="h1" fontSize={24} fontWeight={700} lineHeight={34}>
                {t(breadcrumbTitle)}
              </Text>
              {breadcrumbSubTitle && (
                <Text fontSize={16} style={{marginLeft: 8}}>
                  {breadcrumbSubTitle}
                </Text>
              )}
            </div>
            <ul className="breadcrumb__links" style={{display:'flex'}} onClick={props?.confirmBack}>
              {breadcrumbLinks.map((item, i) => (
                <Fragment key={item?.id || i} >
                  {i > 0 && BREADCRUMB_ICONS.arrowLeft}
                  {item?.isBack && BREADCRUMB_ICONS.back}
                  <li>
                    <Text
                      color={item?.isBack ? THEME_COLORS.primary_300 : '#7C88A6'}
                      style={{
                        cursor:'pointer',
                      }}
                    >
                      {t(item?.name) || 'Unknown'}
                    </Text>
                  </li>
                </Fragment>
              ))}
            </ul>
          </>
          :
          <Breadcrumb
            links={breadcrumbLinks}
            subTitle={breadcrumbSubTitle}
            title={breadcrumbTitle}
          />
        }
      </div>
      <div className="page-header__actions">
        {Array.isArray(actions) &&
        actions.map(item => (
          <div key={item?.id} className="page-header__action-item">
            {item?.children ? (
              item.children
            ) : (
              <>
                {!!item?.isDeveloping || !!item?.tooltip ? (
                  <Tooltip
                    placement="bottom"
                    title={
                      item?.isDeveloping
                        ? 'Tính năng đang phát triển'
                        : item?.tooltip
                    }
                  >
                    <Button
                      {...item?.props}
                      appearance={item?.appearance}
                      icon={item?.icon}
                      onClick={item?.onClick}
                    >
                      {t(item?.name)}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    {...item?.props}
                    href={item?.href}
                    appearance={item?.appearance}
                    icon={item?.icon}
                    onClick={e => {
                      if (!!item?.props?.preventDefault) e.preventDefault()
                      if (item?.onClick) item.onClick()
                    }}
                  >
                    {t(item?.name)}
                  </Button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </StyledPageHeader>
  )
}
