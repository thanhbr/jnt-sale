import React, {useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {ConfirmModal} from "./index";
import {ICON_MINIGAME} from "../../interface/icon";
import {Text} from "../../../../../../common/text";
import ReactImageFallback from "react-image-fallback";
import {useMiniGameWinner} from "../../hooks/useMiniGameWinner";
import {Tooltip} from "../../../../../../common/tooltipv2";
import {sendRequestAuth} from "../../../../../../api/api";
import config from "../../../../../../config";
import {MiniGameContext} from "../../provider/context";
import {miniGameAction} from "../../provider/action";
import {format} from "date-fns";
const Index = () => {
    const {pageDispatch} = useContext(MiniGameContext)
    const {winnerList, functions, list, miniGameDetail} = useMiniGameWinner()
    const linkRef = useRef(null)
    const handleExcelListWinner = async () =>{
        pageDispatch({type:miniGameAction.SET_LOADING_UPDATE_COMMENT,payload:true})
        const response = await sendRequestAuth('get',`${config.API}/fb/livestream/minigame/${miniGameDetail?.minigame_id}/winners-export`)
        if(response?.data?.success){
            linkRef.current.href = response?.data?.data?.url
            linkRef.current.download = response?.data?.data?.url.substr(
                response?.data?.data?.url.lastIndexOf('/') + 1,
            )
            linkRef.current.click()
            pageDispatch({type:miniGameAction.OPEN_MODAL_WINNER,payload:{
                    winnerList:false,

                }})
            pageDispatch({type:miniGameAction.SET_LOADING_UPDATE_COMMENT,payload:false})
        }

    }
    return (
        <>
            <a ref={linkRef} style={{display: 'none'}}></a>
            <ConfirmModal
                openModal={winnerList}
                body={<Body list={list}/>}
                // stylePopup={'mini-game-winner-list'}
                stylePopup={'mini-game-winner-list-many'}
                backgroundImage={'/img/minigame/background_winner_large.png'}
                footer={
                    {
                        cancel: {
                            width: 200,
                            title: 'Đóng',

                        },
                        acceptance: {
                            width: 200,
                            title: 'Xuất Excel'
                        },
                    }
                }
                footerProps={
                    {className: 'mini-game-winner-list_action-button'}
                }
                closeModal={() => functions.closeWinnerList()}
                acceptance={() => handleExcelListWinner()}
            />
        </>

    )
}

export default Index;
const Body = ({...props}) => {

    const arrayWinner = (list) => {
        return list?.map((item,i) => {
            return (
                <div key={i} className={'mini-game-winner-list_group'}>
                    <Text fontSize={17} fontWeight={600}
                          color={'#FFFFFF'}  style={{marginRight:'22px'}}>{i + 1}
                    </Text>
                    <div className={'mini-game-winner-list_group-customer'}>
                        <div className={'mini-game-winner-list-border_avatar'}>
                            <ReactImageFallback
                                src={item?.winner_avatar}
                                fallbackImage="/img/facebook/fb_avatar.jpg"
                                alt={'avatar'}
                                className={'mini-game-winner-list-avatar'}
                            />
                        </div>
                        <div>
                            <Tooltip baseOn={'height'} title={item?.winner_name} className={'tooltip-winner-list-name'}>
                                <Text as={'p'} className={'mini-game-winner-list_name'} fontSize={16} fontWeight={600}
                                      color={'#FFFFFF'}>{item?.winner_name ? item?.winner_name : '---'}</Text>
                            </Tooltip>

                            <Text fontSize={14} color={'#7C88A6'}>{item?.create_at? format(new Date(item?.create_at), 'dd/MM/yyyy HH:mm')  : '---'}</Text>
                        </div>

                    </div>
                </div>

            )
        })
    }
    const renderStar = () => {
        return Array.from(Array(5).keys()).map(i => {
            return (
                <img key={i} src={'/img/minigame/star.png'} className={'mini-game-winner-list-star'}/>
            )
        })
    }
    return (
        <StyleMiniGameWinnerDetail className={'mini-game-winner-list_body'}>

            <div className={'mini-game-winner-list_title'}>
                <Text fontSize={24} fontWeight={600} color={'#FFFFFF'}>Danh sách trúng thưởng</Text>
                {renderStar()}
            </div>
            <div className={ 'mini-game-winner-list_customer-winner' }>
                { arrayWinner(props.list) }
            </div>
        </StyleMiniGameWinnerDetail>
    )
}

const StyleMiniGameWinnerDetail = styled.div`
.mini-game-winner-list{
       .tooltip-winner-list-name{
          display: -webkit-box;
          height: 100%;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      &_title{
        width: 276px;
        margin: 112px auto 32px auto;
        text-align: center;
      }
      &-star{
        margin-right: 7px;
      }
      &_customer-winner{
        height: 240px;
        margin: 3rem 8px;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        width: 700px;
      }
      &_group{
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        padding-left: 11px;
        width: 330px;
      }
      &-border_avatar{
        width: 32px;
        height: 32px;
        border: 1px solid #FFFFFF;
        border-radius: 60px;
        margin-right: 12px;
      }
      &-avatar{
        border-radius: 60px;
        width: 100%;
        height: 100%;
      }
      
      &_group-customer{
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      
     &_action-button{
     margin-top: 2.5rem !important;
     }
 
}
.mini-game-winner-list_customer-winner::-webkit-scrollbar-track {
    border-radius: 10px;
    //background-color: var(--white-color);
}

.mini-game-winner-list_customer-winner::-webkit-scrollbar {
    width: 0.375rem;
    background-color: unset;
}

.mini-game-winner-list_customer-winner::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #311D3A;
    marign-right: 30px;
}
`
