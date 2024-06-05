export const miniGameInitialState = {
    customer:{
        list:[],
        meta:{
            totals:0,
            comments:0,
            phone:0,
        },
        miniGameId:'',
        loading:false,
    },
    winner:{
        list:[],
        detail:{
            comment_id:'',
            sender_id:'',
            winner_name:'',
            winner_avatar:'',
            time:'',
        },
        winnerDetail: false,
        winnerList: false,
    },
    spin:{
        play:false,

    },
    miniGameDetail:{},
    miniGameDetailOrigin:{},
    setting:{
        open:false,
        participation:{
            type:'all comments',
            cond: 1,
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
        },
        miniGame_id:'',
        submit:false,
        createTime:'',
    },
    loading: false,
}