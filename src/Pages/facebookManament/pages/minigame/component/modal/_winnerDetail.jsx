import React from "react";
import styled from "styled-components";
import {ConfirmModal} from "./index";
import {ICON_MINIGAME} from "../../interface/icon";
import {Text} from "../../../../../../common/text";
import ReactImageFallback from "react-image-fallback";
import {useMiniGameWinner} from "../../hooks/useMiniGameWinner";
import {Tooltip} from "../../../../../../common/tooltipv2";

const Index = () => {
    const {winnerDetail, functions, detail} = useMiniGameWinner()
    return (
        <ConfirmModal
            openModal={winnerDetail}
            body={<Body item={detail} />}
            stylePopup={'mini-game-winner-detail'}
            backgroundImage={'/img/minigame/background_winner.png'}
            footer={
                {
                    cancel: {
                        width: 200,
                        title: 'Hủy kết quả',

                    },
                    acceptance: {
                        width: 200,
                        title: 'Lưu kết quả'
                    },
                }
            }
            footerProps={
                {className: 'mini-game-winner-detail_action-button'}
            }
            closeModal={() => functions.closeWinnerDetail()}
            acceptance={() => functions.saveResult()}
        />
    )
}

export default Index;
const Body = ({item}) => {
    return (
        <StyleMiniGameWinnerDetail className={'mini-game-winner-detail_body'}>
            <div className={'mini-game-winner-detail_body-header'}>
                <Text className={'mini-game-winner-detail_label'} fontSize={24} fontWeight={600} color={'#FFFFFF'}>CÔNG
                    BỐ KẾT QUẢ</Text>
                <Text className={'mini-game-winner-detail_title'} fontSize={18} color={'#7C88A6'}>Chúc mừng khách hàng
                    may mắn</Text>
                <img className={'mini-game-winner-detail_fire-flower'} src={'/img/minigame/fire_flower.png'}/>
            </div>
            <div className={'mini-game-winner-detail_body-content-winner'}>
                <div className={'mini-game-winner-detail_border-avatar'}>
                    <ReactImageFallback
                        src={item?.winner_avatar}
                        fallbackImage="/img/facebook/fb_avatar.jpg"
                        alt={'avatar'}
                        className={'mini-game-winner-detail-avatar'}
                    />
                </div>
            </div>
            <div className={'mini-game-winner-detail_name-winner'}>
                <Tooltip baseOn={'height'} title={item?.winner_name} className={'tooltip-winner-name'}>
                    <Text as={'p'} className={'mini-game-winner-detail_name'} fontSize={20} fontWeight={600}
                          color={'#FFFFFF'}>{item?.winner_name ? item?.winner_name : '---'}</Text>
                </Tooltip>

                <Text fontSize={18} color={'#7C88A6'}>{item?.time ? item?.time : '---'}</Text>
            </div>
        </StyleMiniGameWinnerDetail>
    )
}

const StyleMiniGameWinnerDetail = styled.div`
.mini-game-winner-detail{
     &_body-header{
      position: relative;
      height: 183px;
      top: 10px;
     }
     &_star-left{
        position: absolute;
        top: 69px;
        left: 35px;
     }
     &_star-center{
        position: absolute;
        top: -35px;
        left: 40%;
     }
     &_star-right{
        position: absolute;
        top: 69px;
        right: 35px;
     }
     &_fire-flower{
         position: absolute;
         top: 0px;
         right: 5%;
     }
     &_label{
        position: absolute;
        top: 69px;
        right: 25%;
     }
     &_title{
        position: absolute;
        top: 64%;
        right: 29%;
        width: 194px !important;
        text-align: center;
     }
     &_body-content-winner{
      text-align: center;
     }
     &_border-avatar{
        width: 128px;
        height: 128px;
        border: 6px solid #DCFF00;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
     }
     &-avatar{
        width: 110px;
        height: 110px;
        border-radius: 50%;
     }
     &_name-winner{
        text-align: center;
        margin-top: 20px;
        .tooltip-winner-name{
          display: -webkit-box;
          height: 100%;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
     }
     &_name{
      width: 198px !important;
      margin: 4px auto;
     }
     &_action-button{
        &__dismiss {
    background: linear-gradient(181.58deg, #E8FC04 -14.34%, #FF4D00 115.55%);
    &:hover {
      border: 1px solid var(--color-package-up2022-7);
    }
  }
  &__save {
    background: linear-gradient(338.02deg, #0DA64F 22.27%, #DCFF00 119.14%);
    &:hover {
      background: var(--color-hover-package-up2022-7);
    
    }
  }
     }
  }
`
