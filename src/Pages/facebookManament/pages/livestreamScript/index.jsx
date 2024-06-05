import {Button} from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {FacebookLayoutGeneral} from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import {useEffect} from 'react'
import {useReducer} from 'react'
import {PageFacebookLogin} from '../login'
import {facebookLivestreamScriptInitialState} from './provider/_initstate'
import {FacebookLivestreamScriptReducer} from './provider/_reducer'
import {FacebookLivestreamScriptProvider} from './provider'
import {FacebookLivestreamScriptWrapper} from './components/wrapper'

export const PageFacebookLivestreamScript = () => {
  const [state, dispatch] = useReducer(
    FacebookLivestreamScriptReducer,
    facebookLivestreamScriptInitialState,
  )

  return (
    <FacebookLivestreamScriptProvider value={{state, dispatch}}>
      <PageContainer />
    </FacebookLivestreamScriptProvider>
  )
}

const PageContainer = () => {
  const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
  const {auth} = facebookAuth

  useEffect(() => {
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
  }, [])

  useEffect(() => {
    if (auth.userId) getUser()
  }, [auth.userId])

  if (auth.userId)
    return (
      <FacebookLayoutGeneral
        title="Facebook: Cấu hình & cài đặt "
        subTitle="Quản lý kịch bản lên đơn tự động"
        description="Thiết lập kịch bản lên đơn tự động để hệ thống nhận diện và tạo đơn tự động khi khách hàng bình luận đúng từ khóa mà bạn quy định."
        breadcrumb={[{id: 1, name: 'Quay lại', url: '/facebook', isBack: true}]}
        authData={facebookAuth}
        actions={[
          <Button
            href="/facebook/livestream-scripts/create"
            size="md-"
            icon={FACEBOOK_ICONS.plus01}
          >
            Thêm mới kịch bản
          </Button>,
        ]}
        logout={logout}
      >
        <FacebookLivestreamScriptWrapper />
      </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData} />
}
