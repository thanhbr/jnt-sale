import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom'
import {PATH} from '../../const/path'

export default function CreateOrder({...props}) {
  const openNewOrder = () => {}
  return (
    <Link
      className="create-order-button upos-text"
      to={{
        pathname: PATH.NEW_ORDER,
        state: {fromOrder: true},
      }}
    >
      + Tạo đơn
    </Link>
  )
}
