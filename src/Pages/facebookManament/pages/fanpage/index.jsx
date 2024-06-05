import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import FacebookService from 'Pages/facebookManament/services'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { PageFacebookLogin } from '../login'
import { FacebookFanpageCardList } from './components/cardList'
import { FacebookFanpageEmpty } from './components/empty'
import { FacebookFanpageWrapper } from './components/wrapper'
import useFacebookFanpage from './hooks/useFacebookFanpage'
import { FacebookFanpageProvider } from './provider'
import { facebookFanPageInitialState } from './provider/_initstate'
import { FacebookFanpageReducer } from './provider/_reducer'
import { Loading } from '../../../../common/loading'

export const PageFacebookFanpage = () => {
  const [state, dispatch] = useReducer(
    FacebookFanpageReducer,
    facebookFanPageInitialState,
  )

  return (
    <FacebookFanpageProvider value={{ state, dispatch }}>
      <PageContainer/>
    </FacebookFanpageProvider>
  )
}

const PageContainer = () => {
  const { facebookAuth, setAuthData } = useFacebookAuth()
  const { auth } = facebookAuth

  const { data, methods } = useFacebookFanpage()
  const { fanpage, filter } = data
  const isEmpty = fanpage.list.length <= 0
  const displayFanpages = fanpage.list.filter(
    item => item?.connected === filter.connected,
  )

  useEffect(() => {
    methods.setLoading(true)
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
    setTimeout(() => methods.setLoading(false),1000)
  }, [])

  useEffect(() => {
    if (auth.userId) methods.getFanpages()
  }, [auth.userId])

  if (!!data?.loading){
    return <Loading/>
  }else{
    if (auth.userId)
      return (
        <FacebookFanpageWrapper
          containerProps={{ style: { background: isEmpty ? '#fff' : 'transparent' } }}
        >
          {!isEmpty ? (
            <FacebookFanpageCardList list={displayFanpages}/>
          ) : (
            <FacebookFanpageEmpty/>
          )}
        </FacebookFanpageWrapper>
      )
      return <PageFacebookLogin connect={setAuthData}/>
  }

}
