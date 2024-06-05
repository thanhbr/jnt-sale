import { Button } from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import { FACEBOOK_ICONS } from 'Pages/facebookManament/interfaces/_icons'
import './component/autoResponseTable/index.scss'
import { FacebookLayoutGeneral } from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { PageFacebookLogin } from '../login'
import { FacebookAutoResponsesProvider } from './provider'
import { facebookAutoResponsesInitialState } from './provider/_initstate'
import { FacebookAutoResponsesReducer } from './provider/_reducer'
import { TableLayout } from '../../../../layouts/tableLayout'
import { AutoResponseTableHead } from './component/autoResponseTable/autoResponseTableHead'
import { AutoResponseTableBody } from './component/autoResponseTable/autoResponseTableBody'
import useFacebookAutoResponses from './hooks/useFacebookAutoResponses'
import Filter from './component/filter/index'
import { Loading } from '../../../../common/loading'
import DeleteModal from './component/modal/confirmDelete'
import DisableConfirm from './component/modal/disabledPopup/confirmStatus'
import EnableConfirm from './component/modal/enabledPopup/confirmStatus'


export const PageFacebookAutoResponses = () => {
  const [state, dispatch] = useReducer(
    FacebookAutoResponsesReducer,
    facebookAutoResponsesInitialState,
  )

  return (
    <FacebookAutoResponsesProvider value={{ state, dispatch }}>
      <PageContainer/>
    </FacebookAutoResponsesProvider>
  )
}

const PageContainer = () => {
  const { facebookAuth, logout, getUser, setAuthData } = useFacebookAuth()
  const {data,methods} = useFacebookAutoResponses()
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
      methods.listPage()
    }
  }, [auth.userId])

  if (auth.userId)
    return (
        <FacebookLayoutGeneral
          title="Facebook: Cấu hình & cài đặt"
          subTitle="Quản lý kịch bản phản hồi tự động"
          description="Thiết lập kịch bản phản hồi tự động bình luận trên những bài viết mà bạn mong muốn hoặc toàn bộ bài viết trên trang."
          breadcrumb={[{ id: 1, name: 'Quay lại', url: '/facebook', isBack: true }]}
          authData={facebookAuth}
          actions={[
            <Button size="md-" icon={FACEBOOK_ICONS.plus01} href={'/facebook/auto-responses/create'}>
               Thêm mới kịch bản phản hồi
            </Button>,
          ]}
          logout={logout}
        >
          <Filter/>
          <TableLayout
            style={{
              width: 'calc(100% + 48px)',
              margin:'0 -24px'
            }}
            table={{
              tHead: <AutoResponseTableHead/>,
              tBody: <AutoResponseTableBody/>,
            }}
          />
          {data.loading && <Loading/>}
          <DeleteModal/>
          <DisableConfirm/>
          <EnableConfirm/>
        </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData}/>
}
