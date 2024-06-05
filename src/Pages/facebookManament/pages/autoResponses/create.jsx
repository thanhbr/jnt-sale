import {Button} from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import './component/autoResponseTable/index.scss'
import {FacebookLayoutGeneral} from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import {useEffect} from 'react'
import {useReducer} from 'react'
import {PageFacebookLogin} from '../login'
import {FacebookAutoResponsesProvider} from './provider'
import {facebookAutoResponsesInitialState} from './provider/_initstate'
import {FacebookAutoResponsesReducer} from './provider/_reducer'
import useFacebookAutoResponses from './hooks/useFacebookAutoResponses'
import {Loading} from '../../../../common/loading'
import {BasicInfo} from './component/section/basicInfo'
import useCreateFacebookAutoResponses from './hooks/useCreateFacebookAutoResponses'
import {PostAndComment} from './component/section/postAndComment'
import {AutoResponseScript} from './component/section/autoResponseScript'
import {useSearchParams} from "react-router-dom";
import ConfirmCreate from './component/modal/confirmCreate/_index'
import {CreateAutoScriptSkeleton} from "./component/skeleton/createSkeleton";
import { FACEBOOK_ICONS } from '../../interfaces/_icons'
import { StyledActionFormBtnList } from './component/actionFormBtnList/_styled'


export default () => {
   const [state, dispatch] = useReducer(
      FacebookAutoResponsesReducer,
      facebookAutoResponsesInitialState,
   )

   return (
      <FacebookAutoResponsesProvider value={{state, dispatch}}>
         <PageContainer/>
      </FacebookAutoResponsesProvider>
   )
}

const PageContainer = () => {
   const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
   const {data, methods} = useFacebookAutoResponses()
   const autoResponses = useCreateFacebookAutoResponses()
   const {auth} = facebookAuth
   const [searchParams, setSearchParams] = useSearchParams();
   const search = searchParams.get('search') ?? ''
   useEffect(() => {
      FacebookService.initFacebookSdk({
         getAuthData: data => setAuthData(data),
      })
   }, [])

   useEffect(() => {
      if (auth.userId) {
         getUser()
         methods.listOrigin()
         autoResponses?.methods?.getListFanPage()
      }
   }, [auth.userId])
   if (auth.userId)
      return (
         <FacebookLayoutGeneral
            title="Facebook: Cấu hình & cài đặt"
            subTitle={autoResponses?.data?.idAutoResponse ? `Chỉnh sửa kịch bản phản hồi tự động` : "Tạo mới kịch bản phản hồi tự động"}
            breadcrumb={[{id: 1, name: 'Quay lại', url: '/facebook/auto-responses', isBack: true}]}
            authData={facebookAuth}
            logout={logout}
            button={true}
            actions={[

               <Button size={'md-'} appearance="ghost" href="/facebook/auto-responses" style={{minWidth: 74}}>
                  Hủy
               </Button>,
               <Button
                 size={'md-'}
                 style={{minWidth: 110, marginLeft: 12}}
                 onClick={autoResponses.methods.onSubmitCreate}
               >
                  Lưu
               </Button>
            ]}
         >
            {data.table.loading && autoResponses?.data?.idAutoResponse
               ?
               <CreateAutoScriptSkeleton/>
               :
               <div className={"create-script-content"} style={{height: 'calc(100vh - 214px)',overflow: 'auto'}}>
                  <BasicInfo title={'Thông tin cơ bản'}/>
                  <PostAndComment title={'Chọn bài viết và bình luận phản hồi'}/>
                  <AutoResponseScript title={'Kịch bản phản hồi tự động'}/>
                  <ConfirmCreate/>
               </div>
            }
            {data.loading && <Loading/>}
         </FacebookLayoutGeneral>
      )

   return <PageFacebookLogin connect={setAuthData}/>
}
