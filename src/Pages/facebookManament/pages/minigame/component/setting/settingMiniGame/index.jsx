import React from "react";
import {ConfirmModal} from "../../../../../../../layouts/rightSightPopup/confirm";
import ChooseCondition from "./_chooseCondition"
import ChooseConditionTime from "./_coditionTime"
import styled from "styled-components";
import {Text} from "../../../../../../../common/text";
import {useUpdateSettingMiniGame} from "../../../hooks/useUpdateSettingMiniGame";
import {SETTING_MINI_GAME_CONDITION} from "../../../interface/_constants";
const Index = ()=>{
    const {setting, functions} = useUpdateSettingMiniGame()
    return(
        <ConfirmModal
            openModal={!!setting.open}
            body={<Body/>}
            stylePopup={'setting-confirm-modal-mini-game'}
            submitProps={{
                disabled:setting.submit
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
                { className: 'setting-confirm-modal-mini-game_action-button' }
            }
            closeModal={() => functions.dismiss()}
            acceptance={() => functions.accept()}
        />
    )
};

export default Index;
const Body = ()=>{
    const {data, functions} = useUpdateSettingMiniGame()
    const { participation, priority, winner} = data

    return(
        <StyledBodySettingMiniGame>
            <div style={{marginBottom:'32px'}}>
                <Text fontSize={20} fontWeight={600} >Cài đặt Mini Game</Text>
            </div>
            <div>
                <ChooseCondition
                    label={'Điều kiện tham gia'}
                    content={SETTING_MINI_GAME_CONDITION?.participation}
                    type={participation?.type}
                    chooseCondition={functions?.checkBox}
                />
                <ChooseCondition
                    label={'Điều kiện ưu tiên'}
                    content={SETTING_MINI_GAME_CONDITION?.priority}
                    type={priority?.type}
                    chooseCondition={functions?.checkBox}
                />
                <ChooseCondition
                    label={'Điều kiện loại trừ'}
                    content={SETTING_MINI_GAME_CONDITION?.winner}
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