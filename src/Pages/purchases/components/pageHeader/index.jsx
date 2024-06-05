import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {Tooltip} from 'common/tooltip'
import {StyledPageHeader} from './_styled'
import { useContext } from 'react'
import { PurchasesContext } from '../../provider/_context'
import PopoverPopupState from '../popper'
import { useTranslation } from 'react-i18next'

export const PageHeader = ({
  actions,
  breadcrumbLinks,
  breadcrumbSubTitle,
  breadcrumbTitle,
  ...props
}) => {
  const {pageState} = useContext(PurchasesContext)
  const {loading} = pageState.table
  const {t} = useTranslation()
  return (
    <StyledPageHeader {...props}>
      <div className="page-header__breadcrumb">
        <Breadcrumb
          links={breadcrumbLinks}
          subTitle={breadcrumbSubTitle}
          title={breadcrumbTitle}
        />
      </div>
      <div className="page-header__actions">
        {Array.isArray(actions) &&
          actions.map(item => (
            <div key={item?.id} className={"page-header__action-item " + item?.className}>
              {item?.type == 'dropdown'
              ?
                <PopoverPopupState item={item}/>
              :
                (item?.isDeveloping ? (
                  <Tooltip placement="bottom" title={t('general_coming_soon')}>
                    <Button
                      appearance={item?.appearance}
                      icon={item?.icon}
                      onClick={item?.onClick}
                      disabled={!loading}
                    >
                      {t(item?.name)}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    href={item?.href}
                    appearance={item?.appearance}
                    icon={item?.icon}
                    onClick={item?.onClick}
                    disabled={!loading}
                    >
                    {t(item?.name)}
                  </Button>
                ))
              }
            </div>

          ))}
      </div>
    </StyledPageHeader>
  )
}
