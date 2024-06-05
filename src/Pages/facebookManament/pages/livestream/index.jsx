import { StyledConversation } from './_styled'
import { CustomLayout } from '../../layouts/custom'
import React, { useContext, useEffect, useReducer } from 'react'
import { FacebookLivestreamReducer } from './provider/_reducer'
import { facebookLivestreamInitialState } from './provider/_initstate'
import { FacebookLivestreamProvider } from './provider'
import useFacebookAuth from '../../hooks/useFacebookAuth'
import useFacebookLivestream from './hooks/useFacebookLivestream'
import { PageFacebookLogin } from '../login'
import FacebookService from '../../services'
import { SideBarConversation } from './component/sidebar'
import { PageHeader } from '../../../../layouts/pageHeader'
import { HAEDER_ACTION_BUTTON, HEADER_FACE_BOOK_ORDERS } from './interface/_const'
import { TableLayout } from '../../../../layouts/tableLayout'
import { FacebookLivestreamContext } from './provider/_context'
import { Pagination } from '../../../../common/pagination'
import { StickyFooter } from '../../../../common/stickyFooter'
import { FilterForm } from './component/filter'
import { THead } from './component/MainTable/_THead'
import { TBody } from './component/MainTable/_TBody'
import useFacebookFilterForm from './hooks/useFacebookFilterForm'
import io from 'socket.io-client'
import config from '../../../../config'

export const FacebookLivestream = () => {
  const [state, dispatch] = useReducer(
    FacebookLivestreamReducer,
    facebookLivestreamInitialState,
  )

  return (
    <FacebookLivestreamProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <PageContainer/>
    </FacebookLivestreamProvider>
  )
}
export const PageContainer = (
  {
    title,
    subTitle,
    description,
    breadcrumb,
    authData,
    actions,
    ...props
  }
) => {
  const { pageState } = useContext(FacebookLivestreamContext)
  const { facebookAuth, logout, getUser, setAuthData } = useFacebookAuth()
  const { auth } = facebookAuth
  const { data, fetch, pagination } = useFacebookLivestream()
  const { table } = pageState
  const { functions } = useFacebookFilterForm()
  const { page } = pageState

  const sendPing = _ => {
    const socket = io(config.WS, { transports: ['websocket'] })
    page.active.map(item => {

      socket.on('connect', () => {
        socket.emit('join-page', item)
      })

      socket.on(`stream_${item}`, (...data) => {
        functions.autoSyncVideoLivestream()
      })

    })
  }
  useEffect(() => {
    sendPing()
  }, [page.active])
  useEffect(() => {
    FacebookService.initFacebookSdk({
      getAuthData: data => setAuthData(data),
    })
  }, [])

  useEffect(() => {
    if (auth.userId) {
      fetch.listPage(auth.userId)
    }
  }, [auth.userId])

  useEffect(() => {
    fetch.getActionSubscribeApp()
  }, [data.page.list])

  if (auth.userId)
    return (
      <StyledConversation>
        <CustomLayout
          sidebar={<SideBarConversation/>}
          authData={facebookAuth}
          logout={logout}
        >
          <div  id={'order_background-facebook'} className="container order_background" style={{
            backgroundImage: 'url(\'/img/facebook/background-fb-conversation.png\')',
            marginLeft: '64px',
            height: '100%',
            padding: '16px 24px 16px 32px'
          }}>
            <PageHeader
              actions={HAEDER_ACTION_BUTTON.map((item, i) => ({
                ...item,
                onClick: () => functions.handleVideoLivestreamSync(''),
              }))}
              breadcrumbLinks={HEADER_FACE_BOOK_ORDERS}
              breadcrumbTitle="Quản lý danh sách Livestream"
            />
            <TableLayout
              header={
                <>
                  <FilterForm/>
                </>
              }
              table={{
                tHead: <THead/>,
                tBody: <TBody/>,
              }}
              className={'table_facebook_order'}
            />
            <StickyFooter style={{ width: 'calc(100% - 63px)' }}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', }}>
                <Pagination
                  active={table.pagination?.active || 0}
                  amount={table.pagination?.amount || 0}
                  total={table.pagination.total}
                  totalItems={table.pagination?.totalItems || 0}
                  onAmountChange={pagination?.onAmountChange}
                  onPageChange={pagination?.onPageChange}
                />
              </div>
            </StickyFooter>
          </div>
        </CustomLayout>
      </StyledConversation>
    )

  return <PageFacebookLogin connect={setAuthData}/>
}