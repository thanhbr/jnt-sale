import {StyledLiveStreamDetail} from './_styled'
import {CustomLayout} from '../../layouts/custom'
import {GridLayout} from '../../../../layouts/gridLayout'
import React, {useContext, useEffect, useReducer, useRef} from 'react'
import {FacebookLiveStreamDetailReducer} from './provider/_reducer'
import {facebookLiveStreamDetailInitialState} from './provider/_initstate'
import {FacebookLiveStreamProvider} from './provider'
import useFacebookAuth from '../../hooks/useFacebookAuth'
import useFacebookLiveStreamDetail from './hooks/useFacebookLiveStreamDetail'
import {PageFacebookLogin} from '../login'
import FacebookService from '../../services'
import {LeftContent} from './component/section/leftContent'
import RightContent from './component/section/rightContent'
import io from 'socket.io-client'
import { SideBarConversation, SideBarLiveStreamDetail } from './component/sidebar'
import useFilterFacebookLiveStreamDetail from './hooks/useFilterFacebookLiveStreamDetail'
import config from '../../../../config'
import NotificationSound from '../../interfaces/media/messenger_web.mp3'
import useFacebookConversationOrder from './hooks/useFacebookConversationOrder'
import { TitleLivestrem } from './component/title'
import LiveStreamConfig from "./component/modal/liveConfig";
import useLiveStreamConfig from "./hooks/useLiveStreamConfig";
import { useParams } from 'react-router-dom'
import {WebSocketPrinter} from '../../services/printer/websocket-printer'
import {Loading} from "../../../../common/loading";
import {useLiveStreamMiniGame} from "./hooks/useLiveStreamMiniGame";
import SettingMiniGame from "./component/modal/settingMiniGame"

export const FacebookLiveStreamDetail = () => {
  const [state, dispatch] = useReducer(
    FacebookLiveStreamDetailReducer,
    facebookLiveStreamDetailInitialState,
  )

  return (
    <FacebookLiveStreamProvider value={{state, dispatch}}>
      <PageContainer />
    </FacebookLiveStreamProvider>
  )
}
export const PageContainer = ({
  title,
  subTitle,
  description,
  breadcrumb,
  authData,
  actions,
  ...props
}) => {
  const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
  const {data, methods} = useFacebookLiveStreamDetail()
  const filterForm = useFilterFacebookLiveStreamDetail()
  const useOrder = useFacebookConversationOrder()
  const configLive = useLiveStreamConfig()
  const {miniGame} = useLiveStreamMiniGame()
  const {auth} = facebookAuth
  const audioRef = useRef()
  const audioBtnRef = useRef()
  let { liveStreamId } = useParams()
  const sendPing = (socketPrinter, configLive) => {
    const socket = io(config.WS, {transports: ['websocket']})
      socket.on('connect', () => {
        socket.emit('join-stream', liveStreamId)
      })
      socket.on(liveStreamId, (...data) => {
        filterForm.methods.handleWebSocketLiveStream(data,socketPrinter,configLive)
      })
      socket.on(`stream_status_${liveStreamId}`, (...data) => {
        methods?.getListLiveStreamDetail()
      })
  }
  useEffect(() => {
     const socketPrinter = new WebSocketPrinter(
        {
          onConnect: () => {
            methods.handleSocketPrinter(true)
          },
          onDisconnect: () => {
            methods.handleSocketPrinter(false)
          },
          onUpdate: (message) => {
            console.log('update')
          },
        }
      )
      const response = configLive.methods.getSettingLiveStream()
    if (!!response)
      response.then(res => {
        sendPing(socketPrinter, res)
      })
  }, [liveStreamId])
  useEffect(() => {
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
  }, [])
  const playNotification = () => {
    if (audioRef.current) audioRef.current.play()
  }
  useEffect(() => {
    if (auth.userId) {
      getUser()
      filterForm.methods.getListLiveStreamComment(filterForm.queries)
      methods?.getListLiveStreamDetail()
      methods.getListTags()
      methods.getPageDetail()
      useOrder.methods.getOriginData()
      configLive.methods.getOriginData()
    }
  }, [auth.userId,liveStreamId])

  useEffect(() => {
    if (audioBtnRef.current && data.notification) {
      filterForm.methods.handleNotification(false)
      audioBtnRef.current.click()
    }
  }, [data.notification])
  
  if (auth.userId)
    return (
      <StyledLiveStreamDetail>
        <CustomLayout
          sidebar={<SideBarLiveStreamDetail />}
          headerTitle={<TitleLivestrem/>}
          authData={facebookAuth}
          logout={logout}
        >
          <audio src={NotificationSound} ref={audioRef} />
          <div
            onClick={playNotification}
            ref={audioBtnRef}
            style={{
              position: 'absolute',
              zIndex: 99999999,
              opacity: 0,
              top: '-50%',
            }}
          ></div>
          <GridLayout
            {...props}
            style={{marginLeft: '64px'}}
            className={'liveStream_grid-layout'}
            grid={[
              {
                className: 'fb-layout-left',
                width: 25.65,
                sections: [
                  {
                    props: {

                      style: {
                        padding: 0,
                        background: '#ffffff',
                        width: '100%',
                        margin: 0,
                        borderRadius: 0,
                        height: 'calc(100vh - 56px)',
                        borderRight: '1px solid #EBEEF5',
                      },
                      children: <LeftContent />,
                    },
                  },
                ],
              },
              {
                className: 'fb-layout-right',
                width: 74.35,
                sections: [
                  {
                    props: {
                      children: <RightContent />,
                      style: {
                        width: '100%',
                        margin: 0,
                        borderRadius: 0,
                        height: 'calc(100vh - 56px)',
                        background: 'transparent',
                        padding: 0,
                      },
                    },
                  },
                ],
              },
            ]}
            gridProps={{
              style: {
                width: '100%',
                margin: 0,
              },
            }}
          />
        </CustomLayout>
        {configLive?.data?.configLiveStream?.openModal && (<LiveStreamConfig />)}
        {data?.detail?.liveStream?.message?.loading && <Loading/>}
        {miniGame?.open && <SettingMiniGame/>}
      </StyledLiveStreamDetail>
    )

  return <PageFacebookLogin connect={setAuthData} />
}
