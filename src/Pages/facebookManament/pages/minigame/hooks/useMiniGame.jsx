import { useReducer} from "react";
import {MiniGameReducer} from "../provider/reducer";
import {miniGameInitialState} from "../provider/intialState";
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {miniGameAction} from "../provider/action";
import useAlert from "../../../../../hook/useAlert";
export const useMiniGame= ()=>{
    const [state, dispatch] = useReducer(MiniGameReducer,miniGameInitialState)
    const {idMiniGame} = useParams()
    const [searchParams] = useSearchParams()
    const pageId = !!searchParams.get('page_id') ? searchParams.get('page_id') : []
    const liveStreamId = !!searchParams.get('live_stream_id') ? searchParams.get('live_stream_id') : []
    const fetchOrigin =  async () =>{
        const response = await Promise.all([
            sendRequestAuth('get',`${config.API}/fb/livestream/minigame/setting-detail/${idMiniGame}`),
            sendRequestAuth('get',
                `${config.API}/fb/livestream/minigame/persons?page_id=${pageId}&stream_id=${liveStreamId}&minigame_id=${idMiniGame}`
            ),
            sendRequestAuth('get',
                `${config.API}/fb/livestream/minigame/${idMiniGame}/winners`
            )
        ])
        if(response[0]?.data?.success && response[1]?.data?.success && response[2]?.data?.success) {
            dispatch({type:miniGameAction.GET_DETAIL_SETTING_MINI_GAME,payload: response[0]?.data?.data})
            dispatch({type:miniGameAction.GET_LIST_CUSTOMER_MINI_GAME,payload:{
                    list: response[1]?.data?.data,
                    meta: response[1]?.data?.meta
                }})
            dispatch({type:miniGameAction.GET_DETAIL_SETTING_CONDITION,payload: response[0]?.data?.data})
            dispatch({type:miniGameAction.GET_LIST_WINNER_MINI_GAME,payload: response[2]?.data?.data})

        }

    }

    return{
        provider:{
            state,
            dispatch
        },
        fetch:{
            origin : fetchOrigin,
        }
    }
}