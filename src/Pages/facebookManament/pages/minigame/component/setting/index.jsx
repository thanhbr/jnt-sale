import {Text} from 'common/text'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import { ICON_MINIGAME } from '../../interface/icon'
import './style.scss'
import {useUpdateSettingMiniGame} from "../../hooks/useUpdateSettingMiniGame";
import SettingMiniGameModal from "./settingMiniGame";
import React from "react";
import {useMiniGameWinner} from "../../hooks/useMiniGameWinner";
import {Loading} from "../../../../../../common/loading";

export const SettingMiniGame = () => {
    const {functions, setting} = useUpdateSettingMiniGame()
    const {updateComment, loading} = useMiniGameWinner()
  return (
    <div className="setting-mini-game">
      <div className="setting-mini-game__icon" onClick={functions.handleOpenModalMiniGame}>
        <CustomToolTip title={'Cài đặt Minigame'} placement={'bottom'}>
          <img src={'/img/minigame/settings_icon.svg'} alt="settings-icon" />
        </CustomToolTip>
      </div>
      <div onClick={updateComment} className="setting-mini-game__update">
        {ICON_MINIGAME.setting}
        <Text
          className="setting-mini-game__text"
          color="#FFFFFF"
          fontSize={16}
          fontWeight={600}
        >
          Cập nhật bình luận mới nhất
        </Text>
      </div>
        {setting.open && <SettingMiniGameModal/>}
        {loading && <Loading/>}
    </div>
  )
}
