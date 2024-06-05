import {useContext} from "react";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {format} from "date-fns";
import toast from "../../../../../Component/Toast";
import {miniGameAction} from "../provider/action"
import {MINI_GAME_CONDITION} from "../interface/_constants"
import {MiniGameContext} from "../provider/context";
import useAlert from "../../../../../hook/useAlert";
import {facebookLiveStreamDetailActions} from "../../livestreamDetail/provider/_actions";
export const useUpdateSettingMiniGame = ()=>{
    const {pageState, pageDispatch} = useContext(MiniGameContext)
    const {setting, miniGameDetail, miniGameDetailOrigin} = pageState
    const {participation, priority, winner, time, miniGame_id } = setting;
    const {start, end} = time
    const {showAlert} = useAlert()
    const dataPost = {
        minigame_id: miniGameDetail?.minigame_id || '',
        page_id: miniGameDetail?.page_id,
        cond_participation: participation?.cond || 1,
        cond_priority: priority?.cond || 0,
        cond_winner: winner?.cond || 0,
        cond_time: {"status": time?.status || 0, "dt_start": time.start, "dt_end": time.end }
    }
    const handleOpenModalMiniGame = async () => {
        const date = new Date()
        pageDispatch({type: miniGameAction.OPEN_MODAL_SETTING_MINI_GAME, payload: true})
        pageDispatch({type: miniGameAction.SET_SUBMIT_BUTTON, payload: false})
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/post/livestream-detail?page_id=${miniGameDetail?.page_id}&video_id=${miniGameDetail?.stream_id}`
        )
        if(!!response.data.success) pageDispatch({type:miniGameAction.SET_START_DATE_TIME,payload:{
                miniGame_id: response?.data?.data?.minigame_id || '',
                createTime: format(new Date(response?.data?.data?.created_time),'yyyy-MM-dd HH:mm')
            }})

    }
    const handleCancelMiniGame = () => {
        pageDispatch({type: miniGameAction.OPEN_MODAL_SETTING_MINI_GAME, payload: false})
        pageDispatch({type:miniGameAction.GET_DETAIL_SETTING_CONDITION,payload: miniGameDetailOrigin})
    }
    const handleAcceptSettingMiniGame = async () => {
        pageDispatch({type: miniGameAction.SET_SUBMIT_BUTTON, payload: true})
        const response = await sendRequestAuth('post',
            `${config.API}/fb/livestream/${miniGameDetail?.stream_id}/minigame/setting`,
            dataPost
        )
        if (response?.data?.success) {
            showAlert({content: response?.data?.messages,type:'success'})
            fetchDetailListSettingMiniGame(dataPost?.minigame_id)
        } else {
            response?.data?.errors?.details?.map(item => handleErrorSetting(item?.field, item?.message))
        }
    }
    const fetchDetailListSettingMiniGame = async (idMiniGame)=>{
        const response = await Promise.all([
            sendRequestAuth('get',`${config.API}/fb/livestream/minigame/setting-detail/${idMiniGame}`),
            sendRequestAuth('get',
                `${config.API}/fb/livestream/minigame/persons?page_id=${miniGameDetail?.page_id}&stream_id=${miniGameDetail?.stream_id}&minigame_id=${miniGameDetail?.minigame_id}`
            )
        ])
        if(response[0]?.data?.success && response[1]?.data?.success) {
            pageDispatch({type:miniGameAction.GET_DETAIL_SETTING_MINI_GAME,payload: response[0]?.data?.data})
            pageDispatch({type:miniGameAction.GET_LIST_CUSTOMER_MINI_GAME,payload:{
                    list: response[1]?.data?.data,
                    meta: response[1]?.data?.meta
                }})
            pageDispatch({type: miniGameAction.OPEN_MODAL_SETTING_MINI_GAME, payload: false})
        }
    }

    const handleErrorSetting = (field, message) => {
        switch (field) {
            case 'cond_participation':
                toast.error({title: message})
                break;
            case 'cond_priority':
                toast.error({title: message})
                break;
            case 'cond_winner':
                toast.error({title: message})
                break;
            case 'cond_time':
                toast.error({title: message})
                break;
            default:
                break;
        }
    }
    const handleChecked = (val) => {
        pageDispatch({type: miniGameAction.SET_SUBMIT_BUTTON, payload: false})
        switch (val?.type) {
            case MINI_GAME_CONDITION[0] :
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        participation: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[1]:
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        participation: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[2]:
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case  MINI_GAME_CONDITION[3]:
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[4] :
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[5]:
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        winner: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[6]:
                pageDispatch({
                    type: miniGameAction.SETTING_CONDITION_MINI_GAME, payload: {
                        winner: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            default:
                break
        }

    }
    const handleCheckedTime = (val) => {
        pageDispatch({type: miniGameAction.SET_SUBMIT_BUTTON, payload: false})
        pageDispatch({
            type: miniGameAction.SETTING_MINI_GAME_TIME, payload: {
                type: val?.type,
                status: val?.cond,
            }
        })
    }
    const handleSetTimeMiniGame = (val, pos) => {
        const startTime = format(new Date(val[0]), 'yyyy-MM-dd HH:mm')
        const endTime = format(new Date(val[1]), 'yyyy-MM-dd HH:mm')
        pageDispatch({
            type: facebookLiveStreamDetailActions.SETTING_MINI_GAME_TIME, payload: {
                type: 'period time',
                status: 1,
                start: startTime || start,
                end: endTime || start,
            }
        })

    }

    return{
        setting,
        functions: {
            handleOpenModalMiniGame,
            dismiss: handleCancelMiniGame,
            accept: handleAcceptSettingMiniGame,
            checkBox: handleChecked,
            checkTime: handleCheckedTime,
            setTime: handleSetTimeMiniGame
        },
        data: {
            participation,
            priority,
            winner,
            time,
            miniGameDetail
        }
    }
}