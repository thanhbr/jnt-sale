import {Button} from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import {FacebookLayoutGeneral} from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import {useState} from 'react'
import {useEffect} from 'react'
import {useReducer} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {PageFacebookLogin} from '../../login'
import {FacebookLivestreamScriptSingleConfirmDuplicateModal} from './components/confirmDuplicateModal'
import {FacebookLivestreamScriptSingleWrapper} from './components/wrapper'
import useFacebookLiveStreamScriptSingle from './hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingleProvider} from './provider'
import {facebookLivestreamScriptSingleInitialState} from './provider/_initstate'
import {FacebookLivestreamScriptSingleReducer} from './provider/_reducer'

export const PageFacebookLivestreamScriptSingle = () => {
  const [state, dispatch] = useReducer(
    FacebookLivestreamScriptSingleReducer,
    facebookLivestreamScriptSingleInitialState,
  )

  return (
    <FacebookLivestreamScriptSingleProvider value={{state, dispatch}}>
      <PageContainer />
    </FacebookLivestreamScriptSingleProvider>
  )
}

const PageContainer = () => {
  const navigate = useNavigate()
  const params = useParams()
  const isCreatePage = params?.single === 'create'

  const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
  const {auth} = facebookAuth

  const {data, methods} = useFacebookLiveStreamScriptSingle()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldOpenConfirmDuplicateModal, setShouldOpenConfirmDuplicateModal] =
    useState(false)

  const handleSubmit = opt => {
    setIsSubmitting(true)
    const response = methods.handleSubmit({
      id: params?.single,
      type: isCreatePage ? 'create' : 'detail',
      ...opt,
    })

    if (response)
      response.then(() => {
        setIsSubmitting(false)
        setShouldOpenConfirmDuplicateModal(false)

        if (response?.data?.success && isCreatePage) {
          navigate('/facebook/livestream-scripts')
        }
      })
  }

  const handleValidate = () => {
    const check = methods.handleValidate()

    if (check) {
      const response = methods.handleValidateFanpageDuplicate()
      response.then(res => {
        if (res?.data?.success === false) {
          setShouldOpenConfirmDuplicateModal(res?.data?.errors)
        } else handleSubmit()
      })
    }
  }

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
        title="Facebook: Cấu hình & cài đặt"
        subTitle={
          isCreatePage
            ? 'Tạo mới kịch bản lên đơn tự động'
            : 'Chỉnh sửa kịch bản lên đơn tự động'
        }
        breadcrumb={[
          {
            id: 1,
            name: 'Quay lại',
            url: '/facebook/livestream-scripts',
            isBack: true,
          },
        ]}
        authData={facebookAuth}
        logout={logout}
        actions={[
          <Button
            href="/facebook/livestream-scripts"
            appearance="ghost"
            size="md-"
          >
            Hủy
          </Button>,
          <Button
            style={{minWidth: 110, marginLeft: 8}}
            onClick={handleValidate}
            size="md-"
          >
            Lưu
          </Button>,
        ]}
      >
        <FacebookLivestreamScriptSingleWrapper />
        {shouldOpenConfirmDuplicateModal && (
          <FacebookLivestreamScriptSingleConfirmDuplicateModal
            data={shouldOpenConfirmDuplicateModal}
            name={data.form.name.value}
            loading={isSubmitting}
            onClose={() => setShouldOpenConfirmDuplicateModal(false)}
            onSubmit={handleSubmit}
          />
        )}
      </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData} />
}
