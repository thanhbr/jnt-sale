import {
  Navigate,
  Outlet
} from 'react-router-dom'
import {PATH} from '../../const/path'
import useGlobalContext from '../../containerContext/storeContext'

export default function PrivateRoute({children, ...rest}) {
  const [state, ] = useGlobalContext()
  return (
    state.isLogin ? <Outlet/> : <Navigate to={{
      pathname: PATH.LOGIN,
    }}/>
  )
}
