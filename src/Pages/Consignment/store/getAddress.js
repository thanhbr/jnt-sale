import { getData, postData } from 'api/api'
import { getUrlAReasList, getUrlProvince, getUrlProvinceDistrict, createAddress, postActiveStatus } from 'api/url'
import toast from 'Component/Toast'
import { InitialState } from 'Pages/Consignment/store/initState'
import Reducer from 'Pages/Consignment/store/reducer'
import React, { useEffect, useReducer } from 'react'
import { ERROR_TITLE } from '../ERROR_TITLE'
export default function getAddress() {
    const [state, dispatch] = useReducer(Reducer, InitialState)
    const getArea = async () => {
        try {
            const res = await getData(getUrlAReasList())
            dispatch({ type: 'GET_AREAS', payload: res.data.data })
        } catch (er) {
            console.log(er);
        }
    }
    const getProvinceList = async () => {
        try {
            const res = await getData(getUrlProvince())
            dispatch({ type: 'GET_PROVICES', payload: res.data.data })
        } catch (er) {
            console.log(er);
        }
    }
    const getProviceDistrictList = async () => {
        try {
            const res = await getData(getUrlProvinceDistrict())
        } catch (er) {
            console.log(er);
        }
    }
    useEffect(() => {
        getArea();
        getProvinceList();
        getProviceDistrictList();
    }, [])
    return {
        state
    }

}
export const activeStatus = async (data) => {
    try {
        const res = await postData(postActiveStatus(), data)
        if (res.data.code == '6041') {
            toast.success({ title: 'Ngưng sử dụng điểm gửi hàng thành công!' })
        }else toast.success({ title: 'Kích hoạt điểm gửi hàng thành công!' })
    } catch (er) {
        console.log(er);
    }
}
export const createActiveStatus = async (data,handleFlag) => {
    try {
        const res = await postData(postActiveStatus(), data)
        handleFlag()
    } catch (er) {
        console.log(er);
    }
}
export const createNewAddress = async (data, dispatch,status,handleClosePopup,handleFlag) => {

    try {
        const res = await postData(createAddress(), data)
        if (res.data.success == false) {
            dispatch({type:'SET_SUCCESS',payload:false})
            res.data.errors.map(item => {
                switch (item.field) {
                    case 'name':
                        dispatch({ type: 'VALID_NAME', payload:{valid:true,error:item.field == 'name' ? ERROR_TITLE.EMPTY_NAME : '' } })
                        break;
                
                    case 'phone':
                        dispatch({ type: 'VALID_PHONE', payload: {valid:true,error:item.field == 'phone' ? ERROR_TITLE.EMPTY_PHONE : '' }})
                        break;
                
                    case 'city_id':
                        dispatch({ type: 'VALID_CITY', payload: {valid:true,error: item.field == 'city_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                        break;
                
                    case 'district_id':
                        dispatch({ type: 'VALID_DISTRICT', payload: {valid:true,error: item.field == 'district_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' } })
                        break;
                
                    case 'ward_id':
                        dispatch({ type: 'VALID_WARD', payload: {valid:true,error: item.field == 'ward_id' ? ERROR_TITLE.EMPTY_ADDRESS : '' }})
                        break;
                
                    case 'address':
                        dispatch({ type: 'VALID_ADDRESS', payload: {valid:true,error: item.field == 'address' ? ERROR_TITLE.EMPTY_ADDRESS : '' }})
                        break;
                
                    default:
                        break;
                }
   
            })
        } else {
            toast.success({ title: 'Thêm mới điểm gửi hàng thành công!' })
            let ids = res.data.meta.insert_id
            createActiveStatus({ id: [ids], status: status.value },handleFlag)
            handleClosePopup()
        }
    } catch (er) {
        console.log(er);
    }
}
