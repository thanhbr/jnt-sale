import React from "react";
import {ConfirmModal} from "../../../../../../../layouts/rightSightPopup/confirm";
import {useLiveStreamMiniGame} from "../../../hooks/useLiveStreamMiniGame";
import ChooseCondition from "./_chooseCondition"
import ChooseConditionTime from "./_coditionTime"
import styled from "styled-components";
import {LIVE_STREAM_MINI_GAME_CONDITION} from "../../../interface/_constants";
import {Text} from "../../../../../../../common/text";
const Index = ()=>{
    const {miniGame, functions, data} = useLiveStreamMiniGame()
    return(
        <ConfirmModal
            openModal={!!miniGame.open}
            body={<Body/>}
            stylePopup={'setting-confirm-mini-game'}
            submitProps={{
                disabled:miniGame.submit
            }}
            footer={
                {
                    cancel: {
                        width: 110,
                        title: 'Hủy',

                    },
                    acceptance: {
                        width: 110,
                        title: 'Lưu cấu hình'
                    },
                }
            }
            footerProps={
                { className: 'setting-confirm-mini-game_action-button' }
            }
            closeModal={() => functions.dismiss()}
            acceptance={(e) => functions.accept()}
        />
    )
};

export default Index;
const Body = ()=>{
    const {data, functions} = useLiveStreamMiniGame()
    const { participation, priority, winner} = data

    return(
        <StyledBodySettingMiniGame>
            <div style={{marginBottom:'32px'}}>
                <Text fontSize={20} fontWeight={600} >Cài đặt Mini Game</Text>
            </div>
            <div>
                <ChooseCondition
                    label={'Điều kiện tham gia'}
                    content={LIVE_STREAM_MINI_GAME_CONDITION?.participation}
                    type={participation?.type}
                    chooseCondition={functions?.checkBox}
                />
                <ChooseCondition
                    label={'Điều kiện ưu tiên'}
                    content={LIVE_STREAM_MINI_GAME_CONDITION?.priority}
                    type={priority?.type}
                    chooseCondition={functions?.checkBox}
                />
                <ChooseCondition
                    label={'Điều kiện loại trừ'}
                    content={LIVE_STREAM_MINI_GAME_CONDITION?.winner}
                    type={winner?.type}
                    chooseCondition={functions?.checkBox}
                />

                    <ChooseConditionTime/>

            </div>
        </StyledBodySettingMiniGame>
    )
}
const StyledBodySettingMiniGame = styled.div`
 
  
`