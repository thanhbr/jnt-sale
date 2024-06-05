import {PATH} from '../const/path'
import ControlPanel from '../Pages/ControlPanel/controlPanel'
import LoginForm from '../Pages/LoginForm/login'
import ForgotPasswordForm from '../Pages/ForgotPassword'
import NotFound from 'Pages/404/index.'
import NoConnection from 'Pages/noConnection'
import {
  addOnToolRoute,
  cashBookRoute, configAndSettingRoute, configPolicy,
  deliveryRoute,
  facebookRoute, orderRoute,
  partnerRoute, productRoute,
  warehouseRoute,
  accountantRoute,
  reportRoute,
  posRoute
} from './groupRouter'
import ConfirmInfo from 'Pages/confirmInfo'

const publicRoutes = [
  {path: PATH.HOME, component: LoginForm},
  {path: PATH.LOGIN, component: LoginForm},
  {path: PATH.CONFIRM_INFO, component: ConfirmInfo},
  {path: PATH.FORGOT_PASSWORD, component: ForgotPasswordForm},
  {path: PATH.NOT_FOUND, component: NotFound},
  {path: PATH.NO_CONNECTION, component: NoConnection},
]
const privateRoutes = [
  {path: PATH.ADMIN_DASHBOAR, component: ControlPanel},
  ...facebookRoute,
  ...warehouseRoute,
  ...partnerRoute,
  ...addOnToolRoute,
  ...deliveryRoute,
  ...cashBookRoute,
  ...productRoute,
  ...orderRoute,
  ...configPolicy,
  ...configAndSettingRoute,
  ...accountantRoute,
  ...reportRoute,
  ...posRoute
]

export {publicRoutes, privateRoutes}