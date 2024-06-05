const Reducer = (state, action) => {
    switch (action.type) {
        case 'IS_LOAIDNG':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'TITLE':
            return {
                ...state,
                titleSeaching: action.payload
            };

        case 'IS_STATUS':
            return {
                ...state,
                status: action.payload
            };
        case 'ID_ADDRESS':
            return {
                ...state,
                idAddress: action.payload
            };
        case 'IS_DEFAULT_ADDRESS':
            return {
                ...state,
                isDefaultAddress: action.payload
            };
        case 'IS_HIDDEN_ADDRESS':
            return {
                ...state,
                isHiddenAddress: action.payload
            };
        case 'IS_HIDDEN_PHONE':
            return {
                ...state,
                isHiddenPhone: action.payload
            };
        case 'IS_HIDDEN_PROVINCE_ADDRESS':
            return {
                ...state,
                isHiddenProvinceDistrict: action.payload
            };

        case 'GET_CONSIGNMENT':
            return {
                ...state,
                getConsignment: action.payload
            };
        case 'GET_SEARCHING':
            return {
                ...state,
                searching: action.payload
            };
        case 'GET_ID_INFO':
            return {
                ...state,
                searching: action.payload
            };

        case 'GET_INFO_CONSINGMENT':
            return {
                ...state,
                getInfoConsigment: action.payload
            };
        case 'GET_AREAS':
            return {
                ...state,
                getAreas: action.payload
            };

        case 'GET_PROVICES':
            return {
                ...state,
                getprovices: action.payload
            };

        case 'GET_DISTRICTS':
            return {
                ...state,
                getDistrict: action.payload
            };

        case 'GET_WARDS':
            return {
                ...state,
                getWards: action.payload
            };

        case 'GET_PROVICES_DISTRICTS':
            return {
                ...state,
                getProvice_districts: action.payload
            };
        case 'GET_PROVINCES':
            return {
                ...state,
                provinces: action.payload
            };

        case 'GET_CITY':
            return {
                ...state,
                city: action.payload
            };
        case 'GET_CITY_ID':
            return {
                ...state,
                cityId: action.payload
            };
        case 'GET_DISTRICT':
            return {
                ...state,
                district: action.payload
            };
        case 'GET_DISTRICT_ID':
            return {
                ...state,
                districtId: action.payload
            };
        case 'GET_WARD':
            return {
                ...state,
                ward: action.payload
            };
        case 'GET_WARD_ID':
            return {
                ...state,
                wardId: action.payload
            };

        case 'GET_META':
            return {
                ...state,
                meta: action.payload
            };

        case 'SET_META_START':
            return {
                ...state,
                meta: { ...state.meta, start: action.payload }
            };

        case 'SET_META_PAGE':
            return {
                ...state,
                meta: { ...state.meta, per_page: action.payload }
            };
        case 'SET_META_TOTAL':
            return {
                ...state,
                meta: { ...state.meta, total: action.payload }
            };
        case 'GET_NUMBER_ADDRESS':
            return {
                ...state,
                numberAddress: action.payload
            };
        case 'VALID_NAME':
            return {
                ...state,
                validName: action.payload
            };
        case 'VALID_PHONE':
            return {
                ...state,
                validPhone: action.payload
            };
        case 'VALID_EMAIL':
            return {
                ...state,
                validEmail: action.payload
            };
        case 'VALID_CITY':
            return {
                ...state,
                validCity: action.payload
            };
        case 'VALID_DISTRICT':
            return {
                ...state,
                validDistrict: action.payload
            };
        case 'VALID_WARD':
            return {
                ...state,
                validWard: action.payload
            };
        case 'VALID_ADDRESS':
            return {
                ...state,
                validAddress: action.payload
            };
        case 'SET_SUCCESS_NAME':
            return {
                ...state,
                validName: {...state.validName,valid:action.payload}
            };
        case 'SET_SUCCESS_PHONE':
            return {
                ...state,
                validPhone: {...state.validPhone,valid:action.payload}
            };
        case 'SET_SUCCESS_CITY':
            return {
                ...state,
                validCity: {...state.validCity,valid:action.payload}
            };
        case 'SET_SUCCESS_DISTRICT':
            return {
                ...state,
                validDistrict: {...state.validDistrict,valid:action.payload}
            };
        case 'SET_SUCCESS_WARD':
            return {
                ...state,
                validWard: {...state.validWard,valid:action.payload}
            };
        case 'SET_SUCCESS':
            return {
                ...state,
                success: action.payload
            };
        case 'SET_CONFIRM':
            return {
                ...state,
                confirm: action.payload
            };
            case 'VALUE_SEARCH':
            return {
                ...state,
                value_search: action.payload
            };
        default:
            return state;
    }
}
export default Reducer;