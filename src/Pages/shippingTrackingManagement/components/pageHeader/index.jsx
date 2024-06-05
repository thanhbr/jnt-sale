import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {Tooltip} from 'common/tooltip'
import {StyledPageHeader} from './_styled'
import { useContext } from 'react'
import { ShippingTrackingContext } from '../../provider/_context'
import PopoverPopupState from '../popper'

export const PageHeader = ({
  actions,
  breadcrumbLinks,
  breadcrumbSubTitle,
  breadcrumbTitle,
  ...props
}) => {
  const {pageState, pageDispatch} = useContext(ShippingTrackingContext)
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
                  <Tooltip placement="bottom" title="Tính năng đang phát triển">
                    <Button
                      appearance={item?.appearance}
                      icon={item?.icon}
                      onClick={item?.onClick}
                    >
                      {item?.name}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    href={item?.href}
                    appearance={item?.appearance}
                    icon={item?.icon}
                    onClick={item?.onClick}
                  >
                    {item?.name}
                  </Button>
                ))
              }
            </div>

          ))}
      </div>
    </StyledPageHeader>
  )
}
