import {useContext} from "react";
import {MiniGameContext} from "../provider/context";
import {miniGameAction} from "../provider/action";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import useAlert from "../../../../../hook/useAlert";

export const useMiniGameWinner = () =>{
    const {pageState, pageDispatch} = useContext(MiniGameContext)
    const { winner, miniGameDetail,loading, customer} = pageState;
    const {winnerDetail, winnerList, detail, list} = winner;
    const {showAlert} = useAlert()
    const dataWinner = {
        comment_id: detail?.comment_id || '',
        sender_id: detail?.sender_id || '',
        winner_name: detail?.winner_name || '',
        winner_avatar: detail?.winner_avatar || ''
    }
    //========winner detail=======

    const handleCloseWinnerDetail = ()=>{
        pageDispatch({type:miniGameAction.OPEN_MODAL_WINNER,payload:{
            winnerDetail:false,
            detail:{
              comment_id:'',
              sender_id:'',
              winner_name:'',
              winner_avatar:'',
              time:'',
            },
        }})
    }

    const handleSaveResult = async() => {
            const response = await sendRequestAuth('post',
                `${config.API}/fb/livestream/minigame/${miniGameDetail?.minigame_id}/save-winner`,
                dataWinner
                )
        if(response?.data?.success){
            showAlert({type:'success',content:response?.data?.message})
            fetchListWinner()
            handleCloseWinnerDetail()
        }

    }

    //=====winner list =====
    const handleOpenWinnerList = ()=>{
        pageDispatch({type:miniGameAction.OPEN_MODAL_WINNER,payload:{
                winnerList:true,

            }})
    }
    const handleCloseWinnerList = ()=>{
        pageDispatch({type:miniGameAction.OPEN_MODAL_WINNER,payload:{
                winnerList:false,

            }})
    }
    const fetchListWinner = async ()=>{
        const response = await sendRequestAuth('get',`${config.API}/fb/livestream/minigame/${miniGameDetail?.minigame_id}/winners`)
        if(response?.data?.success){
            pageDispatch({type:miniGameAction.GET_LIST_WINNER_MINI_GAME,payload:response?.data?.data})
        }
    }
    const handleGetDetailWinner = (data)=>{
        pageDispatch({type:miniGameAction.OPEN_MODAL_WINNER,payload:{
                winnerDetail:true,

            }})
        pageDispatch({type:miniGameAction.GET_DETAIL_WINNER_MINI_GAME,payload:data})
    }
    //update comment
    const updateNewComment = async ()=>{
        pageDispatch({type:miniGameAction.SET_LOADING_UPDATE_COMMENT,payload:true})
        const response = await sendRequestAuth('get',
            `${config.API}/fb/livestream/filter/${miniGameDetail?.stream_id}?keyword=&group_person=&tags=&is_read=&is_phone=&is_order=&is_done=&start_date=&end_date=&order_by=&start=0&page=0`
        )
        if(response?.data){
            fetchListWinner()
            pageDispatch({type:miniGameAction.SET_LOADING_UPDATE_COMMENT,payload:false})
        }
    }

    return{
        winnerDetail,
        winnerList,
        detail,
        list,
        customer,
        miniGameDetail,
        functions:{
            closeWinnerDetail : handleCloseWinnerDetail,
            closeWinnerList: handleCloseWinnerList,
            saveResult: handleSaveResult,
            getDetailWinner: handleGetDetailWinner,
            openWinnerList: handleOpenWinnerList,
        },
        updateComment: updateNewComment,
        loading
    }
}