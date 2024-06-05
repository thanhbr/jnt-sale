export const MINIGAME_STATUSES = {
  _1: {background: '#EBF5FF', color: '#1A94FF'},
  _2: {background: '#EFFBF4', color: '#33CC70'},
  _3: {background: '#ECF4FE', color: '#0B74E5'},
  _4: {background: '#EBFFF5', color: '#00AB56'},
}

export const MINIGAME_INFO = [
  {
    id: 'img1',
    icon: '/img/minigame/participant.png',
    background: 'url("/img/minigame/frame.png")',
    name: 'Người tham gia',
    total: '26',
    class:'footer-mini-game__icon-participant'
  },
  {
    id: 'img2',
    icon: '/img/minigame/comment.png',
    background: 'url("/img/minigame/frame.png")',
    name: 'Bình luận',
    total: '26',
    class:'footer-mini-game__icon-comment'
  },
  {
    id: 'img3',
    icon: '/img/minigame/phone.png',
    background: 'url("/img/minigame/frame.png")',
    name: 'Bình luận có SĐT',
    total: '26',
    class:'footer-mini-game__icon-phone'
  },
]
export const SETTING_MINI_GAME_CONDITION= {
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