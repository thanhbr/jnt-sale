import {facebookLiveStreamDetailActions} from "../provider/_actions";
import {useContext} from "react";
import {FacebookLivestreamContext} from "../provider/_context";
import {MINI_GAME_CONDITION} from '../interface/_constants'
import {format} from "date-fns";
import {useNavigate, useParams} from "react-router-dom";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import toast from "../../../../../Component/Toast";
import {PATH} from "../../../../../const/path";

export const useLiveStreamMiniGame = () => {
    const {state, dispatch} = useContext(FacebookLivestreamContext)
    const {miniGame, } = state
    const {participation, priority, winner, time, miniGame_id, miniGameDetail} = miniGame;
    const {start, end} = time
    let {liveStreamId, pageId} = useParams()
    const dataPost = {
        minigame_id: miniGame_id || '',
        page_id: pageId,
        cond_participation: participation?.cond || 1,
        cond_priority: priority?.cond || 0,
        cond_winner: winner?.cond || 0,
        cond_time: {"status": time?.status || 0, "dt_start": time.start, "dt_end": time.end }
    }
    const handleOpenModalMiniGame = async () => {
        const date = new Date()
        dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_MINI_GAME, payload: true})
        dispatch({type: facebookLiveStreamDetailActions.SET_SUBMIT_BUTTON, payload: false})
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/post/livestream-detail?page_id=${pageId}&video_id=${liveStreamId}`
        )
        if(!!response.data.success) dispatch({type:facebookLiveStreamDetailActions.SET_START_DATE_TIME,payload:{
                start: response?.data?.data?.created_time ? format(new Date(response?.data?.data?.created_time),'yyyy-MM-dd HH:mm')  : format(date,'yyyy-MM-dd HH:mm'),
                end: response?.data?.data?.end_time ? format(new Date(response?.data?.data?.end_time),'yyyy-MM-dd HH:mm') : format(date,'yyyy-MM-dd HH:mm'),
                miniGame_id: response?.data?.data?.minigame_id || '',
                createTime: format(new Date(response?.data?.data?.created_time),'yyyy-MM-dd HH:mm')
            }})

    }
    const handleCancelMiniGame = () => {
        dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_MINI_GAME, payload: false})
        dispatch({type: facebookLiveStreamDetailActions.RESET_SETTING_MINI_GAME,payload: miniGameDetail})
    }
    const handleAcceptSettingMiniGame = async () => {
        dispatch({type: facebookLiveStreamDetailActions.SET_SUBMIT_BUTTON, payload: true})
        const response = await sendRequestAuth('post',
            `${config.API}/fb/livestream/${liveStreamId}/minigame/setting`,
            dataPost
        )
        if (response?.data?.success) {
            toast.success({title: response?.data?.messages})
            window.open(`${PATH.MINI_GAME}/${response?.data?.insert_id || dataPost?.minigame_id}?live_stream_id=${liveStreamId}&page_id=${pageId}`,'_blank')
            dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_MINI_GAME, payload: false})
            dispatch({type:'SET_DETAIL_MINI_GAME_LIVE_STREAM',payload: dataPost})
        } else {
            if(response?.data?.errors?.details) response?.data?.errors?.details?.map(item => handleErrorSetting(item?.field, item?.message))
            else toast.error({title: response?.data?.errors?.message})

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
        dispatch({type: facebookLiveStreamDetailActions.SET_SUBMIT_BUTTON, payload: false})
        switch (val?.type) {
            case MINI_GAME_CONDITION[0] :
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        participation: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[1]:
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        participation: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[2]:
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case  MINI_GAME_CONDITION[3]:
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[4] :
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        priority: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[5]:
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
                        winner: {
                            type: val?.type,
                            cond: val?.cond
                        }
                    }
                })
                break;
            case MINI_GAME_CONDITION[6]:
                dispatch({
                    type: facebookLiveStreamDetailActions.SETTING_CONDITION_MINI_GAME, payload: {
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
        dispatch({type: facebookLiveStreamDetailActions.SET_SUBMIT_BUTTON, payload: false})
        dispatch({
            type: facebookLiveStreamDetailActions.SETTING_MINI_GAME_TIME, payload: {
                    type: val?.type,
                    status: val?.cond,
            }
        })
    }
    const handleSetTimeMiniGame = (val, pos) => {
        const startTime = format(new Date(val[0]), 'yyyy-MM-dd HH:mm')
        const endTime = format(new Date(val[1]), 'yyyy-MM-dd HH:mm')
        dispatch({
            type: facebookLiveStreamDetailActions.SETTING_MINI_GAME_TIME, payload: {
                type: 'period time',
                status: 1,
                start: startTime || start,
                end: endTime || start,
            }
        })

    }
    return {
        functions: {
            handleOpenModalMiniGame,
            dismiss: handleCancelMiniGame,
            accept: handleAcceptSettingMiniGame,
            checkBox: handleChecked,
            checkTime: handleCheckedTime,
            setTime: handleSetTimeMiniGame
        },
        miniGame,
        data: {
            participation,
            priority,
            winner,
            time,
        }

    }
}