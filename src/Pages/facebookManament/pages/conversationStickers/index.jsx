import { Button } from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import { FACEBOOK_ICONS } from 'Pages/facebookManament/interfaces/_icons'
import './component/commentTable/index.scss'
import { FacebookLayoutGeneral } from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { PageFacebookLogin } from '../login'
import { FacebookConversationStickersProvider } from './provider'
import { facebookConversationStickersInitialState } from './provider/_initstate'
import { FacebookConversationStickersReducer } from './provider/_reducer'
import useFacebookConversationStickers from './hooks/useFacebookConversationStickers'
import { Loading } from '../../../../common/loading'
import CreateStickers from './component/modal/index'
import DeleteStickersConfirm from './component/modal/confirmDelete'
import {FacebookConversationStickersTable} from "./component/commentTable/index";

export const PageFacebookConversationStickers = () => {
  const [state, dispatch] = useReducer(
    FacebookConversationStickersReducer,
    facebookConversationStickersInitialState,
  )

  return (
    <FacebookConversationStickersProvider value={{ state, dispatch }}>
      <PageContainer/>
    </FacebookConversationStickersProvider>
  )
}

const PageContainer = () => {
  const { facebookAuth, logout, getUser, setAuthData } = useFacebookAuth()
  const {data,methods} = useFacebookConversationStickers()
  const { auth } = facebookAuth

  useEffect(() => {
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
  }, [])

  useEffect(() => {
    if (auth.userId){
      getUser()
      methods.listOrigin()
    }
  }, [auth.userId])

  if (auth.userId)
    return (
        <FacebookLayoutGeneral
          title="Facebook: Cấu hình & cài đặt"
          subTitle="Quản lý Nhãn khách hàng"
          description="Thiết lập danh sách các nhãn khách hàng để gắn nhãn phân loại từng khách hàng khi quản lý hội thoại/livestream."
          breadcrumb={[{ id: 1, name: 'Quay lại', url: '/facebook', isBack: true }]}
          authData={facebookAuth}
          actions={[
            <Button size="md-" icon={FACEBOOK_ICONS.plus01} onClick={methods.onShowCreateSticker}>
               Thêm nhãn
            </Button>,
          ]}
          logout={logout}
        >
           <FacebookConversationStickersTable
              rows={data.table.display.updateList}
              style={{
                 width: 'calc(100% + 48px)',
                 margin:'0 -24px'
              }}
           />
          <CreateStickers/>
          <DeleteStickersConfirm/>
          {data.loading && <Loading/>}
        </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData}/>
}
