import {miniGameInitialState} from "./intialState";
import {miniGameAction} from "./action";
import {format} from "date-fns";
export const MiniGameReducer = (state = miniGameInitialState, action) =>{
    switch (action.type) {
        case miniGameAction.GET_DETAIL_SETTING_MINI_GAME:
            return {
                ...state,
                miniGameDetail: {
                    ...state.miniGameDetail,
                    ...action.payload,
                },
                miniGameDetailOrigin: {
                    ...state.miniGameDetailOrigin,
                    ...action.payload,
                }
            }
        case miniGameAction.GET_LIST_CUSTOMER_MINI_GAME:
            return{
                ...state,
                customer:{
                    ...state.customer,
                    list: action.payload?.list,
                    meta:{
                        ...state.meta,
                        totals: action.payload?.meta?.totals,
                        comments: action.payload?.meta?.comments,
                        phone: action.payload?.meta?.phone,
                    }
                },

            }
        case miniGameAction.GET_DETAIL_SETTING_CONDITION:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    participation:{
                        type: +action.payload.condition === 1 ?'all comments' : 'comments with phone',
                        cond: +action.payload.condition,
                    },
                    priority:{
                        type: +action.payload.priority === 0 ?  'non priority' : +action.payload.priority === 1 ? 'priority with comments'  : 'priority with phone',
                        cond: +action.payload.priority,
                    },
                    winner:{
                        type:+action.payload.winner === 0 ? 'non winner' : 'repeat winner',
                        cond: +action.payload.winner,
                    },
                    time:{
                        type:+action.payload.condition_time === 0 ?'full time' :'period time',
                        status:+action.payload.condition_time,
                        start:action.payload?.dt_start || action.payload?.create_at,
                        end:action.payload?.dt_end || format(new Date(), 'yyyy-MM-dd HH:mm')
                    },
                    createTime: action.payload?.create_at
                },

            }


         //======setting mini game======
        case miniGameAction.OPEN_MODAL_SETTING_MINI_GAME:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    open:action.payload,
                }
            }
        case miniGameAction.SETTING_CONDITION_MINI_GAME:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    ...action.payload
                }
            }
        case miniGameAction.SET_START_DATE_TIME:
            return {
                ...state,
                setting:{
                    ...state.setting,
                    miniGame_id: action.payload?.miniGame_id,
                    createTime: action.payload?.createTime
                }
            }
        case miniGameAction.RESET_SETTING_MINI_GAME:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    participation:{
                        type:'all comments',
                        cond: 0,
                    },
                    priority:{
                        type:'non priority',
                        cond: 0,
                    },
                    winner:{
                        type:'non winner',
                        cond: 0,
                    },
                    time:{
                        type:'full time',
                        status:0,
                        start:'',
                        end:''
                    }
                }
            }
        case miniGameAction.SETTING_MINI_GAME_TIME:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    time:{
                        ...state.setting.time,
                        ...action.payload,
                    }
                }
            }
        case miniGameAction.SET_SUBMIT_BUTTON:
            return{
                ...state,
                setting:{
                    ...state.setting,
                    submit:action.payload
                }
            }   
       // MODAL WINNER MINI GAME
        case miniGameAction.OPEN_MODAL_WINNER:
            return {
                ...state,
                winner:{
                    ...state.winner,
                    ...action.payload
                }

            }
        case miniGameAction.GET_LIST_WINNER_MINI_GAME:
            return {
                ...state,
                winner: {
                    ...state.winner,
                    list:action.payload
                }
            }
        case miniGameAction.GET_DETAIL_WINNER_MINI_GAME:
            return{
                ...state,
                winner: {
                    ...state.winner,
                    detail:{
                        ...state.winner.detail,
                        comment_id: action.payload?.comment_id,
                        sender_id: action.payload?.sender_id,
                        winner_name: action.payload?.name,
                        winner_avatar: action.payload?.avatar,
                        time:format(new Date(), 'dd/MM/yyyy HH:mm'),
                    }
                }
            }
            //loading update comment
        case miniGameAction.SET_LOADING_UPDATE_COMMENT:
            return {
                ...state,
                loading:action.payload
            }
        default:
            throw new Error()
    }
}