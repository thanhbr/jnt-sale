import {StyledConversation} from './_styled'
import {CustomLayout} from '../../layouts/custom'
import {GridLayout} from '../../../../layouts/gridLayout'
import {useState, useEffect, useReducer, useRef} from 'react'
import {FacebookConversationReducer} from './provider/_reducer'
import {facebookConversationInitialState} from './provider/_initstate'
import {FacebookConversationProvider} from './provider'
import useFacebookAuth from '../../hooks/useFacebookAuth'
import useFacebookConversation from './hooks/useFacebookConversation'
import {PageFacebookLogin} from '../login'
import FacebookService from '../../services'
import {LeftContent} from './component/section/leftContent'
import RightContent from './component/section/rightContent'
import io from 'socket.io-client'
import {SideBarConversation} from './component/sidebar'
import useFilterFacebookConversation from './hooks/useFilterFacebookConversation'
import config from '../../../../config'
import NotificationSound from '../../interfaces/media/messenger_web.mp3'
import useFacebookConversationOrder from './hooks/useFacebookConversationOrder'

export const FacebookConversation = () => {
  const [state, dispatch] = useReducer(
    FacebookConversationReducer,
    facebookConversationInitialState,
  )

  return (
    <FacebookConversationProvider value={{state, dispatch}}>
      <PageContainer />
    </FacebookConversationProvider>
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
  const {data, methods} = useFacebookConversation()
  const filterForm = useFilterFacebookConversation()
  const useOrder = useFacebookConversationOrder()
  const {auth} = facebookAuth
  const audioRef = useRef()
  const audioBtnRef = useRef()

  const sendPing = _ => {
    const socket = io(config.WS, {transports: ['websocket']})
    data.page.active.map(item => {
      socket.on('connect', () => {
        socket.emit('join-page', item)
      })
      socket.on(item, (...data) => {
        filterForm.methods.handleConversation(item, data[0])
      })
    })
  }
  useEffect(() => {
    if (data.page.active.length > 0) {
      sendPing(data)
    }
  }, [data.page.active])
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
      methods.getListFanpage()
      methods.getListTags()
      methods.getListPost()
    }
  }, [auth.userId])

  useEffect(() => {
    useOrder.methods.getOriginData()
  }, [])

  useEffect(() => {
    if (audioBtnRef.current && data.notification) {
      filterForm.methods.handleNotification(false)
      audioBtnRef.current.click()
    }
  }, [data.notification])

  useEffect(() => {
    methods.getActionSubscribeApp()
  }, [data.page.list])

  if (auth.userId)
    return (
      <StyledConversation>
        <CustomLayout
          sidebar={<SideBarConversation />}
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
          >
            1231231313
          </div>
          <GridLayout
            {...props}
              className={'conversation_grid-layout'}
            style={{marginLeft: '64px'}}
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
      </StyledConversation>
    )

  return <PageFacebookLogin connect={setAuthData} />
}
