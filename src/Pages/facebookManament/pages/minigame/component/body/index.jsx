import { ButtonMiniGame } from '../button/index.jsx'
import { FooterMiniGame } from '../footer/index.jsx'
import {HeaderMiniGame} from '../header/index.jsx'
import {RotationMiniGame} from '../rotation/index.jsx'
import {SettingMiniGame} from '../setting/index.jsx'
import {StyledMiniGame} from './style.jsx'
import {useMiniGame} from "../../hooks/useMiniGame";
import {MiniGameProvider} from "../../provider/index"
import React, {useEffect} from "react";
export const MiniGame = (...props) => {
    const {provider, fetch} = useMiniGame()
    const {state,dispatch} = provider
    const {miniGameSetting} = state
    useEffect(()=>{
        fetch.origin()
    },[])
  return (
      <MiniGameProvider  value={{ pageState : state, pageDispatch : dispatch}}>
          <StyledMiniGame>
              <div>
                  <HeaderMiniGame />
                  <SettingMiniGame />
                  <RotationMiniGame />
                  <FooterMiniGame />
              </div>

          </StyledMiniGame>
      </MiniGameProvider>
  )
}
