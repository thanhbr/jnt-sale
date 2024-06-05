import {Drawer} from '@mui/material'
import {Button} from 'common/button'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {FacebookLayoutGeneral} from 'Pages/facebookManament/layouts/general'
import FacebookService from 'Pages/facebookManament/services'
import {useEffect} from 'react'
import {useReducer} from 'react'
import styled from 'styled-components'
import {PageFacebookLogin} from '../login'
import {FacebookResponseContentScriptWrapper} from './components/wrapper'
import {FacebookResponseContentScriptProvider} from './provider'
import {facebookResponseContentScriptInitialState} from './provider/_initstate'
import {FacebookResponseContentScriptReducer} from './provider/_reducer'
import useFacebookResponseContentScript from './hooks/useFacebookResponseContentScript'
import {FacebookResponseContentScriptDetailDrawer} from './components/detailDrawer'
import {FacebookResponsecontentScriptconfirmDeleteModal} from './components/confirmDeleteModal'

export const PageFacebookResponseContentScript = () => {
  const [state, dispatch] = useReducer(
    FacebookResponseContentScriptReducer,
    facebookResponseContentScriptInitialState,
  )

  return (
    <FacebookResponseContentScriptProvider value={{state, dispatch}}>
      <PageContainer />
    </FacebookResponseContentScriptProvider>
  )
}

const PageContainer = () => {
  const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
  const {auth} = facebookAuth

  const {data, methods} = useFacebookResponseContentScript()
  const {script, modal} = data
  const {detail} = script

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
        subTitle="Quản lý Mẫu nội dung phản hồi"
        description="Thiết lập danh sách mẫu nội dung phản hồi cho tin nhắn/bình luận để tiết kiệm thời gian phản hồi các câu hỏi chung thường gặp."
        breadcrumb={[{id: 1, name: 'Quay lại', url: '/facebook', isBack: true}]}
        authData={facebookAuth}
        actions={[
          <Button
            size="md-"
            icon={FACEBOOK_ICONS.plus01}
            onClick={() => methods.handleDetailChange({type: 'create'})}
          >
            Thêm mẫu
          </Button>,
        ]}
        logout={logout}
      >
        <FacebookResponseContentScriptWrapper />
        <StyledRightDrawer
          anchor="right"
          open={!!detail?.type}
          onClose={() =>
            detail?.data?.modifiled
              ? methods.handleDetailConfirmToggle(true)
              : methods.handleDetailChange(null)
          }
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: -24,
              width: 24,
              height: 24,
              cursor: 'pointer',
            }}
            onClick={e => {
              e.stopPropagation()
              detail?.data?.modifiled
                ? methods.handleDetailConfirmToggle(true)
                : methods.handleDetailChange(null)
            }}
          >
            {FACEBOOK_ICONS.x01}
          </div>
          <FacebookResponseContentScriptDetailDrawer
            detail={detail}
            exit={detail?.data?.confirm}
            loading={detail?.data?.loading}
            modifiled={detail?.data?.modifiled}
            onClose={() => methods.handleDetailChange(null)}
            onExitToggle={methods.handleDetailConfirmToggle}
            onLoadingToggle={methods.handleDetailLoadingToggle}
            onModifiledToggle={methods.handleDetailModifiledToggle}
            onRefetch={() => methods.handleSearchChange('', {notLoading: true})}
          />
        </StyledRightDrawer>
        {!!modal.confirmDelete.data?.id && (
          <FacebookResponsecontentScriptconfirmDeleteModal
            id={modal.confirmDelete.data.id}
            loading={modal.confirmDelete.loading}
            onClose={() => methods.handleConfirmDeleteModalUpdate(null)}
            onSubmit={() =>
              methods.handleRowDelete(modal.confirmDelete.data.id)
            }
          />
        )}
      </FacebookLayoutGeneral>
    )

  return <PageFacebookLogin connect={setAuthData} />
}

const StyledRightDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    height: calc(100% - 3.5rem);
    margin-top: 3.5rem;

    overflow: unset;
  }
`
