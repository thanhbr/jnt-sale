import React, {useContext, useState} from 'react'
import {Box, Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import cls from 'clsx'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import {ICON_ACCOUNT} from '../../../interface/icon'
import DetailStore from "./storeInfomation/detail/index"
import UpdateStore from "./storeInfomation/update/index"
import {Text} from "../../../../../common/text";
import "./index.scss"
import {useEditStore} from "../../../hook/useEditStore";
import {CustomToolTip} from "../../../../tooltip/CustomTooltip";
import EditStoreConfig from "../Tab/storeConfig/_editStoreConfig"
import StoreConfig from "../Tab/storeConfig"
import {useUpdateStoreConfig} from "../../../hook/useUpdateStoreConfig";
import {useAccountAction} from "../../../reducer/reducer";
import {StoreAccountContext} from "../../../reducer/context";
import ModalConfirmSwitchTab from "../confirm/index"
const Index = ({...prop}) => {
    const {userProfile, tab, isUpdate} = prop
    const [value, setValueC] = useState(tab)
    const {info, bolUpdate, handleCancelConfirm,fetchShopInfo, setCloseAnchor, handleCheckBolUpdateStore} = prop
    const {functions, data} = useUpdateStoreConfig()
    const [edit, setEdit] = useState(true)
    const {pageState, pageDispatch} = useContext(StoreAccountContext)
    const changeEdit = () => {
        setEdit(false)
    }
    const cancelEdit = () => {
        if (bolUpdate) handleCancelConfirm()
        else setEdit(true)
    }
    const handleClose = () => {
        setEdit(true)
    }
    const acceptEdit = () => {
        setEdit(true)
    }
    const handleTab = (event, newValue) => {
        if(bolUpdate){
            pageDispatch({type: useAccountAction.OPEN_MODAL_COFIRM_SWITCH_TAB,payload:true})
        }else{
            setValueC(newValue)
            setEdit(true)
            pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:true})
        }

    }
    return (
        <>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList
                            onChange={handleTab}
                            TabIndicatorProps={{style: {background: '#2BB8A9'}}}
                            className='tab_list'
                        >
                            <Tab
                                value="store"
                                label="Thông tin cửa hàng"
                                icon={ICON_ACCOUNT.store}
                                className={`tab ${
                                    value === 'store' ? 'selected' : ''
                                }`}
                            />
                            <Tab
                                value="store config"
                                label="Cấu hình cửa hàng"
                                icon={ICON_ACCOUNT.setting}
                                className={`tab ${
                                    value === 'store config' ? 'selected' : ''
                                }`}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="store" className={'tab_modal'}>
                        <div className='account-detail'>
                            {edit ? <DetailStore info={info} changeEdit={changeEdit}/>:
                                <UpdateStore isUpdate={isUpdate} info={info} acceptEdit={acceptEdit}
                                             cancelEdit={cancelEdit}
                                             handleClose={handleClose}
                                             fetchShopInfo={fetchShopInfo}
                                />
                            }

                        </div>

                    </TabPanel>
                    <TabPanel value="store config">
                        {data?.updateStoreConfig ? <StoreConfig/>
                            : <EditStoreConfig
                                setEdit={setEdit}
                                setCloseAnchor={setCloseAnchor}
                                isUpdate={isUpdate}
                                handleCheckBolUpdateStore={prop.handleCheckBolUpdateStore}
                            />
                        }

                    </TabPanel>
                </TabContext>
            </Box>
            {pageState?.switchTab && <ModalConfirmSwitchTab
                isUpdate={isUpdate}
                confirm={pageState?.switchTab}
                setEdit={setEdit}
                setValueC={setValueC}
                value={value}
            />}
        </>
    )
}
export default Index