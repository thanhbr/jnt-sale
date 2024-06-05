import {GridLayout} from 'layouts/gridLayout'
import {PageHeader} from 'layouts/pageHeader'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {useState} from 'react'
import {FacebookLayoutGeneralLogoutModal} from './logoutModal'
import {FacebookLayoutGeneralSidebar} from './sidebar'
import {FacebookLayoutGeneral__ActionBtn} from './__actionBtn'
import {FacebookFanpageLayoutGeneral__Avatar} from './__avatar'
import ConfirmChanged from './confirmChanged'
import useGlobalContext from '../../../../containerContext/storeContext'
import {Text} from '../../../../common/text'

export const FacebookLayoutGeneral = ({
  title,
  subTitle,
  description,
  breadcrumb,
  authData,
  actions,
  logout,
  ...props
}) => {
  const [shouldOpenLogoutModal, setShouldOpenLogoutModal] = useState(false)

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const leavePage = path => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        showPopup: true,
        link: path,
      },
    })
  }
  return (
    <>
      <GridLayout
        {...props}
        header={
          <PageHeader
            breadcrumbLinks={breadcrumb}
            confirmBack={
              GlobalState?.facebookAuth?.changed?.status
                ? () => leavePage(breadcrumb[0]?.url)
                : ''
            }
            breadcrumbTitle={title}
            actions={[
              {
                id: 1,
                children: (
                  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý hội thoại"
                    icon={FACEBOOK_ICONS.chatCircleDots}
                    href={'/facebook/conversation'}
                  />
                ),
              },
              {
                id: 2,
                children: (
                  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý danh sách Livestream"
                    icon={FACEBOOK_ICONS.livestream01}
                    href={'/facebook/livestream'}
                  />
                ),
              },
              {
                id: 3,
                children: (
                  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý đơn hàng facebook"
                    icon={FACEBOOK_ICONS.handBag01}
                    href={'/facebook/orders'}
                  />
                ),
              },
              {
                id: 4,
                children: (
                  <FacebookLayoutGeneral__ActionBtn
                    tooltip="Quản lý kết nối Fanpage"
                    icon={FACEBOOK_ICONS.facebookAnchor}
                    href={'/facebook'}
                  />
                ),
              },
              {
                id: 5,
                children: (
                  <Text
                    style={{
                      borderLeft: '1px solid #C8CBD4',
                      height: '44px',
                      display: 'inline-block',
                      paddingRight: '12px',
                    }}
                  />
                ),
              },
              {
                id: 6,
                children: (
                  <FacebookFanpageLayoutGeneral__Avatar
                    avatar={authData?.user?.avatar}
                    name={authData?.user?.name}
                    onToggleLogoutModal={setShouldOpenLogoutModal}
                  />
                ),
              },
            ]}
          />
        }
        grid={[
          {
            width: 15.5,
            sections: [
              {
                props: {
                  style: {
                    padding: 0,
                    background: 'transparent',
                  },
                  children: <FacebookLayoutGeneralSidebar />,
                },
              },
            ],
            props: {style: {position: 'sticky', top: 0, width: 277}},
          },
          {
            width: 84.5,
            sections: [
              {
                title: subTitle,
                description,
                actionProps: {style: {top: 0}},
                actions,
                props: {
                  descriptionProps: {style: {marginTop: 4, width: '70%'}},
                  children: props?.children,
                  style: {
                    marginBottom: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                },
              },
            ],
            props: {style: {width: 'calc(100% - 277px)'}},
          },
        ]}
      />
      {shouldOpenLogoutModal && (
        <FacebookLayoutGeneralLogoutModal
          onClose={() => setShouldOpenLogoutModal(false)}
          onSubmit={logout}
        />
      )}
      <ConfirmChanged />
    </>
  )
}
