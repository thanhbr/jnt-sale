import React, {useContext, useState} from "react";
import "./index.scss"
import {Box, Modal} from "@mui/material";
import Tab from "./Tab/index";
import {Button} from "../../../../common/button";
import {Text} from "../../../../common/text";
import {useUpdateLogo} from "../../hook/useUpdateLogo";
import {CustomToolTip} from "../../../tooltip/CustomTooltip";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import ReactImageFallback from "react-image-fallback";
import {ICON} from "../../account";
import {StoreAccountContext} from "../../reducer/context";
import useGlobalContext from "../../../../containerContext/storeContext";
import {useAccountAction} from "../../reducer/reducer";

const Index = ({...props}) => {
    const {open, handleCloseModal,bolUpdate, closeBol,isUpdate,info,fetchShopInfo,setCloseAnchor,changeAnimate,tab} = props;
    const {pageState, pageDispatch} = useContext(StoreAccountContext)
    const {storeConfig} = pageState
    const [confirm, setConfirm] = useState(false)
    const [hover,setHover] = useState(false)
    const [checkValid,setCheckValid] = useState({valid:false,message:''})
    const [aniModalClose, setAniModalClose] = useState(false)
    const [bolUpdateStore,setBolUpdateStore] = useState(false)
    const [state] = useGlobalContext()
    const handleCancelConfirm = () =>{
        setConfirm(true)
    }
    const handleCheck = (bool,title)=>{
        if(bool) setCheckValid({valid:bool,message: title})
        else setCheckValid({valid:false,message: ''})
    }
    const {handleUpdate} = useUpdateLogo(info,fetchShopInfo,handleCheck,)
    const handleCheckBolUpdateStore = boo =>{
        setBolUpdateStore(boo)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    if (!bolUpdate) {
                        setAniModalClose(true)
                        setCloseAnchor()
                        setTimeout(() => {
                            handleCloseModal()
                        }, 300)
                    } else {
                        setConfirm(true)
                    }
                }}
                id={'modal_user_profile'}
            >
                <Box className={`box_modal-account ${aniModalClose && 'modal_custom' }`}>
                    <div className='dismiss'
                         onClick={() => {
                             if (!bolUpdate) {
                                 setAniModalClose(true)
                                 setCloseAnchor()
                                 setTimeout(() => {
                                     handleCloseModal()

                                 }, 300)
                             } else {
                                 setConfirm(true)
                             }
                         }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="#F4F7FC" strokeWidth="1.4" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className='general'>
                        <div className='bgp_img'>
                            <img
                                className='bgp'
                                src={'/img/iconMenu/bgProfile.svg'}
                                alt={'background'}
                            />
                        </div>

                        <CustomToolTip className={'store-account_upload-image'} title={'Dung lượng ảnh cần ≤ 2MB'} placement={'right-end'}>
                            <div className='grp_avatar' onMouseLeave={()=>setHover(false)} onMouseEnter={()=>setHover(true)}>
                                <input title=" " type='file' accept="image/png, image/jpeg" onChange={handleUpdate} className='update_image'/>
                                <ReactImageFallback
                                    src={info?.store_logo || '/img/logo-store.png'}
                                    alt={'avatar'}
                                    className='avatar'
                                    fallbackImage='/img/logo-store.png'
                                />
                                <div className='store-account_upload-camera' style={{position:'absolute',top:'70px',right:0}}>{ICON.camera}</div>
                                {hover && <div className={'hover_image'}><img src={'/img/camera-01.png'} /></div>}
                            </div>
                        </CustomToolTip>

                        <div className='content'>
                            <Text
                                fontSize={18}
                                fontWeight={600}
                                lineHeight={21}
                            >{info?.shopname}</Text>
                            {checkValid.valid && <Text as={'p'} color={THEME_COLORS.red} className={'content_txt'}>{checkValid.message}</Text>}
                        </div>
                        <Tab
                            tab={tab}
                            isUpdate={isUpdate}
                            setCloseAnchor={setCloseAnchor}
                            fetchShopInfo={fetchShopInfo}
                            handleCancelConfirm={handleCancelConfirm}
                            bolUpdate={bolUpdate}
                            info={info}
                            handleCheckBolUpdateStore={handleCheckBolUpdateStore}/>
                    </div>

                </Box>
            </Modal>
            <Modal
                open={confirm}
                onClose={() => {
                    setConfirm(false)
                }}
                className='modal_confirm'
            >
                <Box className='box_confirm_account'>
                        <Text
                            as={'p'}
                            fontSize={20}
                            fontWeight={600}
                            className={'txt_title'}
                        >Xác nhận rời khỏi trang</Text>
                        <Text as={'p'} className={'txt_content'}>Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?</Text>
                        <div className='grp_btn'>
                            <Button  onClick={() => {
                                setConfirm(false)
                            }} className='dismiss' appearance={'ghost'}>Hủy</Button>
                            <Button className='save'
                                    onClick={() => {
                                      pageDispatch({
                                        type: useAccountAction.SET_WARNING_PHONE_CREATE_ORDER,
                                        payload: +state?.shopInfo?.ct_order_warning !== 1
                                      })
                                      setConfirm(false)
                                        setAniModalClose(true)
                                        setCloseAnchor()
                                        setTimeout(() => {
                                            handleCloseModal()
                                            closeBol()
                                        }, 300)
                                    }}
                            >Xác nhận
                            </Button>
                        </div>
                </Box>
            </Modal>
        </>
    )

}
export default Index;