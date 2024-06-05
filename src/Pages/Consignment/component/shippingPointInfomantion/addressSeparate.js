import { InitialState } from "Pages/Consignment/store/initState";
import Reducer from "Pages/Consignment/store/reducer";
import { SCRIPT } from "Pages/customer/CreateCustomer/_script";
import { useEffect, useReducer, useState } from "react";
import { set } from "react-hook-form";
import dataAddress from "../../../addressSeparationTool/_data.json";
export const separtionAddress = (dataInfo) => {
    const [state, dispatch] = useReducer(Reducer, InitialState)
    const listCity = dataAddress.filter(item => item.name)
    const cities = listCity.map(item => item.name)
    const [cityName, setCitiName] = useState(dataInfo ? dataInfo.city_name : '')
    const [districtName, setDistrictName] = useState(dataInfo ? dataInfo.district_name : '')
    const [wardname, setWardName] = useState(dataInfo ? dataInfo.ward_name : '')
    const [listDistrict, setListDistrict] = useState()
    const [listWard, setListWard] = useState()
    const [districts, setDistricts] = useState()
    const [wards, setWards] = useState()
    const [cityId, setCityId] = useState(dataInfo ? dataInfo.city_id : '')
    const [districtId, setDistrictId] = useState(dataInfo ? dataInfo.district_id : '')
    const [wardId, setWardId] = useState(dataInfo ? dataInfo.ward_id : '')
    const [showAddress, seShowAddress] = useState(false)
    const handleChangeCity = val => {
        const selectCity = listCity.find(item => item.name === val)
        const listDistricts = selectCity.list.map(item => item.name)
        setListDistrict(selectCity.list)
        setDistricts(listDistricts)
        setCitiName(val)
        dispatch({ type: 'SET_SUCCESS_CITY', payload: true })
        dispatch({ type: 'VALID_CITY', payload: { valid: false, error: '' } })
        setCityId(selectCity.id)
        seShowAddress(true)
        setDistrictName('')
        setWardName('')
        setWards()
        setDistrictId('')
        setWardId('')
    }
    const handleChangeDistrict = val => {
        if (val === null) {
            setDistrictName(SCRIPT.SE_CUS_DISTRICT)
        } else {
            const selectDistrict = listCity.find(item => item.name === cityName)
            const data_district = selectDistrict.list.map(item => item.name)
            const check = data_district.find(item => item == val)
            if (check !== undefined) {
                const listWard = selectDistrict.list.find(item => {
                    if (item.name == val) return item.list

                })
                const dataWard = listWard.list.map(item => item.name)
                setListWard(listWard)
                setDistricts(data_district)
                setDistrictName(val)
                dispatch({ type: 'SET_SUCCESS_DISTRICT', payload: true })
                dispatch({ type: 'VALID_DISTRICT', payload: { valid: false, error: '' } })
                setDistrictId(listWard.id)
                setWardName('')
                setWardId('')
                setWards(dataWard)
                // console.log(listWard);
            }


            // const dataWard = listWard.list.map(item=>item.name)
            // setListWard(listWard)
            // setDistricts(data_district)
            // setDistrictName(val)
            // dispatch({ type: 'SET_SUCCESS_DISTRICT', payload: true })
            // dispatch({ type: 'VALID_DISTRICT', payload: { valid: false, error: '' } })
            // setDistrictId(listWard.id)
            // setWardName('')
            // setWardId('')
            // setWards(dataWard)

        }


    }

    const handleChangeWard = val => {
        if (districtName == null) setWardName(SCRIPT.SE_CUS_WARD)
        else {
            const selectDistrict = listCity.find(item => item.name === cityName)
            const district = selectDistrict.list.find(item => item.name == districtName)
            if (district !== undefined) {
                const idWard = district?.list.find(item => {
                    if (item.name == val) return item
                })
                dispatch({ type: 'SET_SUCCESS_WARD', payload: true })
                dispatch({ type: 'VALID_WARD', payload: { valid: false, error: '' } })
                setWardId(idWard?.id)
                setWardName(val)
            }

        }

    }
    return {
        listCity,
        districts,
        cityName,
        districtName,
        wardname,
        cities,
        wards,
        cityId,
        districtId,
        wardId,
        handleChangeCity,
        handleChangeDistrict,
        handleChangeWard,
        showAddress,

    }
}