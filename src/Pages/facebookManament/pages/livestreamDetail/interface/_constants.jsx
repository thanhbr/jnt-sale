import { ICON_CONVERSATION } from './icon'

export const ORDER_SHIPPING_STATUSES = {
    _1: {background: '#EBF5FF', color: '#1A94FF'},
    _2: {background: '#EFFBF4', color: '#33CC70'},
    _3: {background: '#ECF4FE', color: '#0B74E5'},
    _4: {background: '#EBFFF5', color: '#00AB56'},
    _5: {background: '#FFEBF2', color: '#FC5994'},
    _6: {background: '#EBFFF9', color: '#007B56'},
    _7: {background: '#FFEBEB', color: '#FF7471'},
    _8: {background: '#EBFAFF', color: '#038DB2'},
    _15: {background: '#EFF3FB', color: '#7C88A6'},
    _17: {background: '#FFF0EB', color: '#FC4C0A'},
    _19: {background: '#EBFFF4', color: '#007D3A'},
    _20: {background: '#FFF5EB', color: '#FC820A'},
    _21: {background: '#EFF3FB', color: '#7C88A6'},
    _22: {background: '#EBF8FE', color: '#1BACF9'},
    _23: {background: '#FFEBEC', color: '#FF424E'},
  }


  export const ORDER_SHIPPING_CODE = {
    _1 : {code : 'jt',name: 'J&T Express'},
    _3 : {code : 'ghn80',name: 'GHN'},
    _4 : {code : 'vtp',name: 'Viettel Post'},
    _5 : {code : 'supership',name: 'SuperShip'},
    _8 : {code : 'nhattin',name: 'In đơn Nhất Tín'},
    _10 : {code : 'snappy',name: 'SNAPPY'}
  }

export const EXTRA_SETTING = [
  {id: 1, name: 'Mini game', icon: ICON_CONVERSATION.miniGame},
  {id: 2, name: 'Cài đặt livestream', icon: ICON_CONVERSATION.liveSetting},
];
export const EXTRA_SORT = [
    {id:1,name:'Mặc định (Mới nhất)',tooltip:'Bình luận mới nhất sẽ được xếp lên đầu danh sách.'},
    {id:2,name:'Bình luận chưa đọc',tooltip:'Bình luận chưa đọc sẽ được xếp lên đầu danh sách.'},
]
export const LIVE_STREAM_MINI_GAME_CONDITION= {
    participation:[
        {id: 1,value:'all comments',cond: 1, title:'Tất cả bình luận',},
        {id: 2,value:'comments with phone',cond: 2, title: 'Bình luận chứa số điện thoại'}
    ],
    priority:[
        {id: 1,value:'non priority',cond: 0, title:'Không ưu tiên (Tỷ lệ trúng thưởng như nhau)',},
        {id: 2,value:'priority with comments',cond: 1, title: ' Ưu tiên bình luận nhiều (Mỗi bình luận là 1 vé quay)'},
        {id: 3,value:'priority with phone',cond: 2, title: ' Ưu tiên có số điện thoại (Bình luận có số điện thoại sẽ x2 vé quay)'}
    ],
    winner:[
        {id: 1,value:'non winner',cond: 0, title:'Không lặp lại người trúng thưởng',},
        {id: 2,value:'repeat winner',cond: 1, title: 'Cho phép lặp lại người trúng thưởng'}
    ],
    time:[
        {id: 1,value:'full time',cond: 0, title:'Toàn thời gian diễn ra livestream',},
        {id: 2,value:'period time',cond: 1, title: 'Chỉ áp dụng các bình luận được gửi trong một khoảng thời gian'}
    ]

}
export const MINI_GAME_CONDITION=[
    'all comments',
    'comments with phone',
    'non priority',
    'priority with comments',
    'priority with phone',
    'non winner',
    'repeat winner'
]