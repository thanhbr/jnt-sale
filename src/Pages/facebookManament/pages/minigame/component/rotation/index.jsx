import {Text} from 'common/text'
import React, {useContext, useEffect, useReducer, useState} from 'react'
import {ButtonMiniGame} from '../button'
import {MiniGameContext} from '../../provider/context'
import './style.scss'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useParams} from 'react-router-dom'
import {MiniGameIcons} from '../../interface/_icon'
import {useUpdateSettingMiniGame} from "../../hooks/useUpdateSettingMiniGame";
import {useMiniGameWinner} from "../../hooks/useMiniGameWinner";
import useAlert from "../../../../../../hook/useAlert";
import ReactImageFallback from "react-image-fallback";

export const RotationMiniGame = () => {
    const {pageState} = useContext(MiniGameContext)
    const {customer} = pageState
    const customerList = customer.list

    const [spin, setSpin] = useState(false)
    const [symbol, setSymbol] = useState(null)
    const [timeout, setTimeout] = useState(null)
    const {data} = useUpdateSettingMiniGame()
    const {functions, detail} = useMiniGameWinner()
    const {miniGameDetail} = data
    const [heightSpin, setHeigthSpin] = useState(0)


    const {showAlert} = useAlert()
    const turnOffAllLed = () => {
        for (let index = 1; index <= 8; index++) {
            document.getElementById(`led-${index}`).classList.remove('blink')
        }
    }

    useEffect(() => {
        const fetchSpin = async () => {
            if(miniGameDetail?.minigame_id){
                const res = await sendRequestAuth(
                    'get',
                    `${config.API}/fb/livestream/minigame/spin?page_id=${miniGameDetail?.page_id}&stream_id=${miniGameDetail?.stream_id}&minigame_id=${miniGameDetail?.minigame_id}`,
                )
                if (res.data?.success) {
                    turnOffAllLed()
                    clearInterval(timeout)
                    setSymbol(res.data?.winner)
                    functions.getDetailWinner(res.data?.winner)
                } else {
                    turnOffAllLed()
                    clearInterval(timeout)
                    showAlert({type: 'danger', content: res.data?.errors?.message})
                }
            }
        }

        const totalLed = 24
        let index = 1
        let height = 0
        if (spin) {
            const interval = setInterval(() => {
                //spin costumer
                if (height > customerList.length * 130) height = 0
                else height += 80

                setHeigthSpin(height)

                if (index === 1)
                    document.getElementById(`led-${totalLed}`).classList.remove('blink')
                if (index > 1)
                    document.getElementById(`led-${index - 1}`).classList.remove('blink')
                document.getElementById(`led-${index}`).classList.add('blink')
                if (index === totalLed) {
                    document.getElementById(`led-${index}`).classList.remove('blink')
                    index = 1
                } else index++
            }, 100)
            setTimeout(interval)
        }  else {
            setHeigthSpin(0)
            setSymbol(customerList[0])
            fetchSpin()
            clearInterval(timeout)
        }
        return () => clearInterval(timeout)
    }, [spin])

    return (
        <>
            <div className="rotation-mini-game">
                <MiniGameIcons.Frame className="frame"/>
                <div id='rotation' className='rotation-mini-game-scroll'>
                        {!spin ?
                            <div id={'rotation-transform'} style={{transform: `translate3d(0,-${heightSpin}px,0)`}}>
                            <div className="rotation-mini-game-customer-info">
                            {symbol?.name && <div className="rotation-mini-game-image-info">
                                <ReactImageFallback
                                    src={symbol?.avatar}
                                    fallbackImage="/img/facebook/fb_avatar.jpg"
                                    alt={symbol?.name}
                                    className="rotation-mini-game-image"
                                />
                            </div>}
                            <Text
                                className="rotation-mini-game__text"
                                color="#FFFFFF"
                                fontSize={28}
                                fontWeight={600}
                            >
                                {symbol?.name || 'Chưa có khách hàng quay số'}
                            </Text>
                        </div>
                            </div>
                        :
                            <div id={'rotation-transform'} style={{transform: `translate3d(0,-${heightSpin}px,0)`}}>
                                {customerList?.map((item, i) => {
                                    return <div className="rotation-mini-game-customer-info">
                                        {item?.name && <div className="rotation-mini-game-image-info">
                                            <ReactImageFallback
                                                src={item?.avatar}
                                                fallbackImage="/img/facebook/fb_avatar.jpg"
                                                alt={item?.name}
                                                className="rotation-mini-game-image"
                                            />
                                        </div>}
                                        <Text
                                            className="rotation-mini-game__text"
                                            color="#FFFFFF"
                                            fontSize={28}
                                            fontWeight={600}
                                        >
                                            {item?.name || 'Chưa có khách hàng quay số'}
                                        </Text>
                                    </div>
                                })}
                                {customerList?.map((item, i) => {
                                    return <div className="rotation-mini-game-customer-info">
                                        {item?.name && <div className="rotation-mini-game-image-info">
                                            <ReactImageFallback
                                                src={item?.avatar}
                                                fallbackImage="/img/facebook/fb_avatar.jpg"
                                                alt={item?.name}
                                                className="rotation-mini-game-image"
                                            />
                                        </div>}
                                        <Text
                                            className="rotation-mini-game__text"
                                            color="#FFFFFF"
                                            fontSize={28}
                                            fontWeight={600}
                                        >
                                            {item?.name || 'Chưa có khách hàng quay số'}
                                        </Text>
                                    </div>
                                })}
                            </div>
                        }

                    </div>


            </div>
            <ButtonMiniGame spin={spin} setSpin={setSpin}/>
        </>
    )
}
