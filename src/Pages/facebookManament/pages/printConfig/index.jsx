import useFacebookAuth from '../../hooks/useFacebookAuth'
import { useEffect } from 'react'
import FacebookService from '../../services'
import { FacebookLayoutGeneral } from '../../layouts/general'
import { PageFacebookLogin } from '../login'
import { PrintSection } from './component/section'

export const PrintConfig = () => {
  const { facebookAuth, logout, getUser, setAuthData } = useFacebookAuth()
  const { auth } = facebookAuth

  useEffect(() => {
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
  }, [])

  useEffect(() => {
    if (auth.userId){
      getUser()
    }
  }, [auth.userId])

  if (auth.userId)
    return (
      <FacebookLayoutGeneral
        title="Facebook: Cấu hình & cài đặt"
        subTitle="Thông tin thiết lập máy in bình luận tự động từ Facebook"
        breadcrumb={[{ id: 1, name: 'Quay lại', url: '/facebook', isBack: true }]}
        authData={facebookAuth}
        logout={logout}
      >
        <PrintSection/>
      </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData}/>
}