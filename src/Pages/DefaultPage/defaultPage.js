import {BrowserRouter as Router, Route, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {PATH} from '../../const/path'
import useGlobalContext from '../../containerContext/storeContext'

export default function DefaultPage(props) {
  const [state, dispatch] = useGlobalContext()
  return (
    <>
    <Route
      render={() =>
        state.isLogin ? (
          <Navigate to={PATH.LOGIN} />
        ) : (
          <Navigate to={PATH.ADMIN_DASHBOAR} />
        )
      }
    />
    </>
  )
}
