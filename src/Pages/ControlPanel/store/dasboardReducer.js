const Reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TOTAL':
            return {
                ...state,
                total: action.payload
            };
        case 'CHANGE_SELECTED_DURATION':
            return {
                ...state,
                SelectedDuration: action.payload
            };
        case 'CHANGE_START_TIME':
            return {
                ...state,
                date_start: action.payload
            }
        case 'CHANGE_DAY':
            return {
                ...state,
                day: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;