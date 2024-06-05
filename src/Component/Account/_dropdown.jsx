import {Text} from 'common/text'
import React, {useContext, useReducer, useState} from 'react'
import styled from 'styled-components'
import {CustomToolTip} from '../tooltip/CustomTooltip'
import {STORE_ACCOUNT} from "./account"
import {useAccountAction, useAccountReducer, useAccountState} from "./reducer/reducer";
import StoreInfomation from "./component/modal";
import {getData} from "../../api/api";
import {getShopInfo} from "../../api/url";
import ReactImageFallback from "react-image-fallback";
import {StoreAccountContext} from "./reducer/context";

export const AccountDropdown = ({data, setCloseAnchor,fetchShopInfo, ...props}) => {
    const [imgUrl, setImgUrl] = useState(data?.store_logo)
    const [state, dispatch] = useReducer(useAccountReducer, useAccountState)
    const [open, setOpen] = useState(false)
    const [tab,setTab] = useState('store')
    const [bolUpdate, setBolUpdate] = useState(false)
    const [aniModalClose, setAniModalClose] = useState(false)
    const { pageDispatch} = useContext(StoreAccountContext)
    const closeBolupdate = () => {
        setBolUpdate(false)
    }
    const closeAnimate = () => {
        setAniModalClose(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
        setAniModalClose(false)
        pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:true})
    }
    const isUpdate = bol => bol ? setBolUpdate(true) : setBolUpdate(false)
    const changeAnimate = () =>{
        setAniModalClose(false)
    }

    const handleOpen = (id) => {
        switch (id) {
            case 1 :
                setOpen(true)
                setAniModalClose(false)
                setTab('store')
                break;
            case 2 :
                setOpen(true)
                setAniModalClose(false)
                setTab('store config')
                break;
            default:
                break;

        }
    }
    const show = () => {
        if (STORE_ACCOUNT) {
            return STORE_ACCOUNT.map((item, index) => {
                return (
                    <CustomToolTip title={item.tooltip ? item.tooltip : ''} placement="top">
                        <div className="account-dropdown__menu-item"
                             onClick={() => handleOpen(item.id)}>{item.title}</div>
                    </CustomToolTip>
                )
            })
        }
    }
    return (
        <Styled {...props}>
            <div className="account-dropdown__header">
                <div className="account-dropdown__avatar">
                    <ReactImageFallback
                        src={data?.store_logo || '/img/logo-store.png'}
                        alt={data?.shopname}
                        fallbackImage='/img/logo-store.png'
                    />
                </div>
                <div className="account-dropdown__info">
                    <Text
                        as="h5"
                        color="#222222"
                        fontSize={15}
                        fontWeight={600}
                        lineHeight={18}
                    >
                        {data?.shopname}
                    </Text>
                    <Text color="#7E8299" fontSize={15} fontWeight={400} lineHeight={20}>
                        {data?.email}
                    </Text>
                </div>
            </div>
            <div className="account-dropdown__menu">
                {show()}
            </div>
            {open && <StoreInfomation
                open={open}
                handleCloseModal={handleCloseModal}
                bolUpdate={bolUpdate}
                closeBol={closeBolupdate}
                aniModalClose={aniModalClose}
                closeAnimate={closeAnimate}
                isUpdate={isUpdate}
                info={data}
                fetchShopInfo={fetchShopInfo}
                setCloseAnchor={setCloseAnchor}
                changeAnimate={changeAnimate}
                tab={tab}
            />}

        </Styled>
    )
}

const Styled = styled.div`
  width: 300px;
  padding: 20px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  .account-dropdown {
    &__header {
      padding: 0 0 16px 0;

      display: flex;
      align-items: center;

      border-bottom: 1px solid #ebeef5;
    }

    &__avatar {
      width: 56px;
      height: 56px;

      overflow: hidden;

      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__info {
      margin: 0 0 0 16px;
    }

    &__menu {
      padding: 12px 0;

      border-bottom: 1px solid #ebeef5;

      &:last-child {
        border: none;
        padding-top: 10px;
        padding-bottom: 0;
      }
    }

    &__menu-item {
      width: 100%;
      height: 40px;
      margin: 0 0 8px 0;
      padding: 0 12px;

      display: flex;
      align-items: center;

      border-radius: 4px;

      color: #151624;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;

      transition: all 0.25s;

      cursor: pointer;

      &:last-child {
        margin: 0;
      }

      &:hover {
        background: #F3F6FC;
        color: #E5101D;
      }
    }
  }
`
