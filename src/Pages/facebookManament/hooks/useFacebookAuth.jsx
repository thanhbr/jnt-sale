import {sendRequestAuth} from 'api/api'
import FacebookService from '../services'
import useGlobalContext from 'containerContext/storeContext'
import config from 'config'

const useFacebookAuth = () => {
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const {auth} = GlobalState.facebookAuth

  const getUser = async () => {
    if (auth.userId) {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/fb/user/${auth.userId}`,
      )
      if (response?.data?.success)
        GlobalDispatch({
          type: 'FACEBOOK_AUTH_USER_UPDATE',
          payload: {
            user: {
              avatar: response?.data?.data?.facebook_avatar || '',
              name: response?.data?.data?.facebook_name || '',
            },
          },
        })
    }
  }

  const logout = () => {
    FacebookService.logout(
      data =>
        data?.status !== 'connected' &&
        GlobalDispatch({
          type: 'FACEBOOK_AUTH_UPDATE',
          payload: {
            auth: {
              accessToken: '',
              graphDomain: '',
              signRequest: '',
              userId: '',
              dataAccessExpirationTime: 0,
              expiresIn: 0,
            },
          },
        }),
    )
  }

  const setAuthData = data =>
    GlobalDispatch({
      type: 'FACEBOOK_AUTH_UPDATE',
      payload: {
        auth: {
          accessToken: data?.accessToken || '',
          graphDomain: data?.graphDomain || '',
          signRequest: data?.signedRequest || '',
          userId: data?.userID || '',
          dataAccessExpirationTime: data?.data_access_expiration_time || 0,
          expiresIn: data?.expiresIn || 0,
        },
      },
    })

  return {
    facebookAuth: GlobalState.facebookAuth,
    logout,
    getUser,
    setAuthData,
  }
}

export default useFacebookAuth
