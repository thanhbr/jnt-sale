import { getData } from 'api/api';
import { getListUnit, getListSearchUnit } from 'api/url';
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons';
import { useContext, useReducer } from 'react';
import { Unit } from 'Pages/UnitsManage';
import { PATH } from '../../../const/path'
import { ActionType } from '../store/action';
import { initial } from '../store/initial';
import reducer from '../store/reducer';




export const breadCrumbList=[
    { id: 1, name: 'Cấu hình & cài đặt', url: PATH.SETTING },
    { id: 2, name: 'Đơn vị tính', url: '#' }
];
export const unit_button=(state, dispatch)=>{
    const {active, amount} = state.pagination
    const UNIT_ACTION_BUTTON=[
        {
            id: 1,
            name: null,
            appearance: 'secondary',
            icon: ORDER_ICONS.repeat,
            onClick: async() => {
                dispatch({ type: ActionType.IS_LOADING, payload: false })
                try {
                  const res = await getData(
                    getListUnit(state.valueSearch,amount, active*amount),
                  )
                  dispatch({ type: ActionType.META, payload: res.data.meta })
                  dispatch({ type: ActionType.LIST_UNIT, payload: res.data.data })
                  dispatch({ type: ActionType.IS_LOADING, payload: true })
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
            onClick: () => {
              dispatch({type:ActionType.OPEN_MODAL,payload:!state.openModal})
              dispatch({type:ActionType.DISABLE_SAVE,payload:false})
            },
          },
    ]
    return {UNIT_ACTION_BUTTON}
}
   

export const tableHeader=[
    {title:'Đơn vị tính',align:'left',class:'-note'},
    {title:'Ký hiệu đơn vị tính',align:'left',class:'-date'},
    {title:'Trạng thái sử dụng',align:'center',class:'-status'},
]
export const listDrop=[
    {value:1,label:'Kích hoạt'},
    {value:-1,label:'Ngưng sử dụng'}
]

