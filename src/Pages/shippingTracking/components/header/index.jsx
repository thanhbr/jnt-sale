import {Breadcrumb} from 'common/breadcrumb'
import {TRACKING_BREADCRUMB} from 'Pages/shippingTracking/_constants'
import {StyledShippingTrackingHeader} from './_styled'

export const ShippingTrackingHeader = ({...props}) => {
  return (
    <StyledShippingTrackingHeader {...props}>
      <Breadcrumb links={TRACKING_BREADCRUMB} title="Tra cứu hành trình vận đơn" />
    </StyledShippingTrackingHeader>
  )
}