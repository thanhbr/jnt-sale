import { getData } from 'api/api';
import { getListDeliveryNote, getListSearchDelivery } from 'api/url';
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons';
import { useContext, useReducer } from 'react';
import { Delivery } from '..';
import { PATH } from '../../../const/path'
import { ActionType } from '../store/action';
import { initialDelivery } from '../store/initial';
import reducerDelivery from '../store/reducer';




//   const [state, dispatch] = useReducer(reducerDelivery, initialDelivery)
export const breadCrumbList=[
    { id: 1, name: 'Cấu hình & cài đặt', url: PATH.SETTING },
    { id: 2, name: 'Mẫu ghi chú giao hàng', url: '#' }
];
export const delivery_button=(state, dispatch)=>{
    //   const {state,dispatch}=useContext(Delivery)
    const DELIVERY_ACTION_BUTTON=[
        {
            id: 1,
            name: null,
            appearance: 'secondary',
            icon: ORDER_ICONS.repeat,
            onClick: async() => {
                dispatch({ type: ActionType.IS_LOADING, payload: false })
                try {
                  const res = await getData(
                    getListDeliveryNote(state.pagination.amount,state.pagination.active*state.pagination.amount,state.valueSearch),
                  )
                  dispatch({ type: ActionType.LIST_NOTE, payload: res.data.data })
                  dispatch({ type: ActionType.IS_LOADING, payload: true })
                  const perPage = res?.data?.meta?.per_page || 0
                  const start = res?.data?.meta?.start || 0
                  const total = res?.data?.meta?.total || 0
                  dispatch({
                    type: ActionType.GET_PAGINATION,
                    payload: {
                      active: Math.floor(start / perPage),
                      amount: perPage,
                      total: Math.ceil(total / perPage),
                      totalItems: total,
                    },
                  })
                } catch (er) {
                  console.log(er)
                }
              },
            tooltip:'Làm mới dữ liệu',
          },
          {
            id: 2,
            name: 'Thêm mới',
            appearance: 'primary',
            icon: ORDER_ICONS.plus,
            onClick: () => dispatch({type:ActionType.OPEN_MODAL,payload:!state.openModal}),
          },
    ]
    return {DELIVERY_ACTION_BUTTON}
}
   

export const tableHeader=[
    {title:'Nội dung ghi chú',align:'left',class:'-note'},
    {title:'Ngày tạo',align:'left',class:'-date'},
    {title:'Trạng thái sử dụng',align:'center',class:'-status'},
]
export const listDrop=[
    {value:1,label:'Kích hoạt'},
    {value:-1,label:'Ngưng sử dụng'}
]

