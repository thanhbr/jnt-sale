import { Button } from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import './component/commentTable/index.scss'
import { FacebookLayoutGeneral } from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { PageFacebookLogin } from '../login'
import { FacebookHideAutoCommentProvider } from './provider'
import { facebookHideAutoCommentInitialState } from './provider/_initstate'
import { FacebookHideAutoCommentReducer } from './provider/_reducer'
import { TableLayout } from '../../../../layouts/tableLayout'
import { CommentTableHead } from './component/commentTable/commentTableHead'
import { CommentTableBody } from './component/commentTable/commentTableBody'
import useFacebookHideAutoComment from './hooks/useFacebookHideAutoComment'
import ExtraButton from './component/_extraButton'
import { Loading } from '../../../../common/loading'


export const PageFacebookHideAutoComment = () => {
  const [state, dispatch] = useReducer(
    FacebookHideAutoCommentReducer,
    facebookHideAutoCommentInitialState,
  )

  return (
    <FacebookHideAutoCommentProvider value={{ state, dispatch }}>
      <PageContainer/>
    </FacebookHideAutoCommentProvider>
  )
}

const PageContainer = () => {
  const { facebookAuth, logout, getUser, setAuthData } = useFacebookAuth()
  const {data,methods} = useFacebookHideAutoComment()
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
          subTitle="Quản lý ẩn bình luận tự động"
          description="Thiết lập ẩn bình luận tự động cho từng trang để tránh tình trạng đối thủ trộm thông tin mua hàng mà khách hàng bình luận."
          breadcrumb={[{ id: 1, name: 'Quay lại', url: '/facebook', isBack: true }]}
          authData={facebookAuth}
          actions={[
            <Button size="md-" onClick={() => {
              methods.onSubmitAutoHiddenComment()
            }}>
              Lưu
            </Button>,
          ]}
          logout={logout}
        >
          <ExtraButton/>
          <TableLayout
            style={{
              width: 'calc(100% + 48px)',
              margin:'0 -24px'
            }}
            table={{
              tHead: <CommentTableHead/>,
              tBody: <CommentTableBody/>,
            }}
          />
          {data.loading && <Loading/>}
        </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData}/>
}
