import React, {useEffect, useReducer, useState} from 'react'
// import "./index.scss";
import {CONSIGNMENT} from 'Component/Icons';
import Reducer from 'Pages/Consignment/store/reducer';
import {InitialState} from 'Pages/Consignment/store/initState';
import {getData} from 'api/api';
import {getSearchConsignment, getConsignment} from 'api/url';
import {StyledConsignmentSearch} from "./_styled";

export default function Search({search, handleSearch, page}) {
    const [state, dispatch] = useReducer(Reducer, InitialState)
    const [focus, setFocus] = useState(false)
    const dataSearch = search.searching;
    let timeOut
    const handleChange = async (e) => {
        let {value} = e.target;
        let perPage = page != undefined ? page.per_page : 20;
        let startPage = page != undefined ? page.start : 0;
        let keyword = value.trim()
        if (value !== '') {
            try {
                const res = await getData(getSearchConsignment(keyword))
                handleSearch(res.data, keyword)
            } catch (er) {
                console.log(er);
            }
        } else {
            const res = await getData(getConsignment(perPage, startPage))
            handleSearch(res.data, keyword)
        }
        // const getSearch = async () => {
        //   try {
        //     if (value !== '') {


        //     } else {
        //       console.log(perPage,startPage);
        //       console.log(value);
        //       const res = await getData(getConsignment(perPage,startPage))
        //       handleSearch(res.data.data)
        //     }

        //   } catch (er) {
        //     console.log(er);
        //   }
        // }
        // getSearch()
    }
    return (
        <StyledConsignmentSearch>
            <div className={'consingment__search'}>
                <div onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                     className={focus ? 'consingment__search-content consingment_focus' : 'consingment__search-content'}>
                    <input id='consignment__search' onChange={handleChange}
                           placeholder='Tìm kiếm theo tên/địa chỉ/SĐT điểm gửi hàng' className='consingment__input'/>
                    <span className='consingment__iconSearch'>{CONSIGNMENT.iconSearch}</span>
                </div>
            </div>
        </StyledConsignmentSearch>
    )
}
