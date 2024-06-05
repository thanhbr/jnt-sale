import {StyledConversation} from './_styled'
import {CustomLayout} from '../../layouts/custom'
import React, {useContext, useEffect, useReducer} from 'react'
import {FacebookOrdersReducer} from './provider/_reducer'
import {facebookOrdersInitialState} from './provider/_initstate'
import {FacebookOrdersProvider} from './provider'
import useFacebookAuth from '../../hooks/useFacebookAuth'
import useFacebookOrders from './hooks/useFacebookOrders'
import {PageFacebookLogin} from '../login'
import FacebookService from '../../services'
import {SideBarConversation} from './component/sidebar'
import {PageHeader} from "../../../../layouts/pageHeader";
import {HAEDER_ACTION_BUTTON, HEADER_FACE_BOOK_ORDERS} from "./interface/_const";
import {OrderFilterForm} from "./component/filter/index"
import {TableLayout} from "../../../../layouts/tableLayout";
import {OrderTHead} from "./component/orderTable/_orderTHead";
import {OrderTBody} from "./component/orderTable/_orderTBody";
import {FacebookOrdersContext} from "./provider/_context";
import {Pagination} from "../../../../common/pagination";
import {StickyFooter} from "../../../../common/stickyFooter";
import useFacebookFilterForm from "./hooks/useFacebookFilterForm";

export const FacebookOrders = () => {
    const [state, dispatch] = useReducer(
        FacebookOrdersReducer,
        facebookOrdersInitialState,
    )

    return (
        <FacebookOrdersProvider value={{pageState: state, pageDispatch: dispatch}}>
            <PageContainer/>
        </FacebookOrdersProvider>
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
    const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
    const {facebookAuth, logout, getUser, setAuthData} = useFacebookAuth()
    const {data, methods, fetch, pagination} = useFacebookOrders()
    const {auth} = facebookAuth
    const {table} = pageState
const {functions} = useFacebookFilterForm()
    useEffect(() => {
        // fetch.origin()
        fetch.paymentMethod()

    }, [])

    useEffect(() => {
        FacebookService.initFacebookSdk({
            getAuthData: data => setAuthData(data),
        })
    }, [])

    useEffect(() => {
        if (auth.userId) {
            getUser()
            methods.getListPage(auth.userId)
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
                    {/*content order*/}
                    <div id={'order_background-facebook'} className="container order_background" style={{
                        backgroundImage: "url('/img/facebook/background-fb-conversation.png')",
                        marginLeft: '64px',
                        height: '100%',
                        padding: '16px 24px 16px 32px'
                    }}>
                        <PageHeader
                            actions={HAEDER_ACTION_BUTTON.map((item, i) => ({
                                ...item,
                                onClick: functions.refresh,
                            }))}
                            breadcrumbLinks={HEADER_FACE_BOOK_ORDERS}
                            breadcrumbTitle="Quản lý đơn hàng Facebook"
                        />
                        <TableLayout
                            header={
                                <>
                                    <OrderFilterForm/>
                                </>
                            }
                            table={{
                                tHead: <OrderTHead/>,
                                tBody: <OrderTBody/>,
                            }}
                            // pagination={{
                            //     ...table.pagination,
                            //     onAmountChange: pagination.onAmountChange,
                            //     onPageChange: pagination.onPageChange,
                            // }}
                            className={'table_facebook_order'}
                        />
                        <StickyFooter style={{width: 'calc(100% - 63px)'}}>
                            <div style={{height: '100%', display: 'flex', alignItems: 'center',}}>
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