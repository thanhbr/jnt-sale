import { 
    postConnectJnt,postConfigJnt,
    postConnectGHTK,postConfigGHTK,
    postConnectViettelPost,postConfigViettelPost,
    postConnectVietNamPost,postConfigVietNamPost,
    postTokenGHN,postConfigGHN,
    postOTPGHN,
    postConnectGHN,
    getUrlPartnerDefault,postUrlConfigPartnerDefault,
    getUrlPartnerDetail,
    
} from '../../../api/url'
import {getData} from '../../../api/api'
import usePartnerContext from './partnerContext' 
import { useEffect,useState } from 'react';

export const getListPartner =  () => { 
    const [,GlobalDispatch] = usePartnerContext();
    const reloadShippingPartner = () => { 
        const url = getUrlPartnerDefault() ;
        getData(url)
        .then(res => {
            if (res && res.data && res.data.success) {
            const data = res.data.data || [] ;
                GlobalDispatch({type: 'GET_LIST_PARTNER', payload: data})
            }
        })
        .catch(error => {
        })
    }
    return {
        reloadShippingPartner,
    }
} 
const loadShippingPartner = (GlobalDispatch) => {
    const url = getUrlPartnerDefault() ;
    getData(url)
    .then(res => {
        if (res && res.data && res.data.success) {
        const data = res.data.data || [] ;
            GlobalDispatch({type: 'GET_LIST_PARTNER', payload: data})
        }
    })
    .catch(error => {
    })
}

export const getPartnerDetail =  (id) => { 
    const [infor,infoDispatch] = usePartnerContext(); 
    const getDataPartnerDetail =  () => {
        const url = getUrlPartnerDetail(id) ;
        getData(url)
        .then(res => {
            if (res && res.data && res.data.success) {
                const data =  res.data.data || [] ;
                infoDispatch({type: 'GET_PARTNER_INFO', payload: data})
                infoDispatch({type: 'GET_PARTNER_SETTING', payload: data.setting})
                infoDispatch({type: "SET_STATUS_CHANGE", payload:false});
            }
        })
        .catch(error => {
        })
    }
    return {
        getDataPartnerDetail
    }
}  
export const setPartnerDefault = (id,status) => { 
    const [infor,infoDispatch] = usePartnerContext(); 
    const postDataPartnerDefault =  () => {
        const url = postUrlConfigPartnerDefault(id,status) ;
        getData(url)
        .then(res => {
            if (res && res.data && res.data.success) { 
                const data =  res.data.data || [] ;
                infoDispatch({type: 'GET_PARTNER_INFO', payload: data})
                infoDispatch({type: 'SET_FIELD_DEFAULT', payload: status})
                infoDispatch({type: "SET_STATUS_CHANGE", payload:false});
                loadShippingPartner(infoDispatch);
            }
        })
        .catch(error => {
        })
    }
    return {
        postDataPartnerDefault
    }
}
export const getUrlConnectPartnerById = (idPartner) => {
    switch(idPartner){
        case 1:
            return postConnectJnt();
        case 2:
            return postConnectGHTK();
        case 4:
            return postConnectViettelPost();
        case 6:
            return postConnectVietNamPost();
        default:
            return postConnectJnt();
    }
} 
export const getUrlConnectGHN = (type) => {
    switch(type){
        case 'get_store':
            return postTokenGHN();
        case 'get_otp':
            return postOTPGHN();
        case 'get_connect':
            return postConnectGHN();
        default:
            return '';
    }
} 
export const getUrlConfigPartnerId = (idPartner) => {
    switch(idPartner){
        case 1:
            return postConfigJnt();
        case 2:
            return postConfigGHTK();
        case 3:
            return postConfigGHN();
        case 4:
            return postConfigViettelPost();
        case 6:
            return postConfigVietNamPost();
        default:
            return '';
    }
} 

export const importScript = url => {
    useEffect(() => {
      const script = document.createElement('script');
  
      script.src = url;
      script.async = true;
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      }
    }, [url]);
  };
