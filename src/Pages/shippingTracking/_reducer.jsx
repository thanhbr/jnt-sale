export const actions = {
  FETCH_LOADING: 'FETCH_LOADING',
  CHANGE_KEYWORD: 'CHANGE_KEYWORD',
  CLEAR_KEYWORD: 'CLEAR_KEYWORD',
  FETCH_BILLCODE: 'FETCH_BILLCODE',
  CHANGE_POSITION : 'CHANGE_POSITION',
}

export const initialState = {
  dataDisplay: [],
  dataTracking: [],
  keyword : '',
  isLoading : false,
  isRightLoading : false,
  positionActive : 0,
  prePosition : false,
  nextposition : false,
}

export const reducer = (state, action) => {
  switch (action.type) {

    case actions.FETCH_BILLCODE : 
    {
      const data = Array.isArray(action?.payload?.data) ? action.payload.data : []
      const position = action?.payload?.position ?? 0
      return {
        ...state,
        dataDisplay: data,
        dataTracking: data[position] ?? [],
        positionActive : position,
        nextposition : data[(position+1)] ? (position+1) : false,
        prePosition : data[(position-1)] ? (position-1) : false,
        isLoading : false,
        isRightLoading : false
      }
    }

    case actions.CHANGE_POSITION : 
    {
      const data = Array.isArray(action?.payload?.data) ? action.payload.data : []
      const position = action?.payload?.position ?? 0
      return {
        ...state,
        dataDisplay: data,
        dataTracking: data[position] ?? [],
        positionActive : position,
        nextposition : data[(position+1)] ? (position+1) : false,
        prePosition : data[(position-1)] ? (position-1) : false,
        isLoading : false,
        isRightLoading : false
      }
    }

    case actions.CHANGE_KEYWORD :
    {
      return {
        ...state,
        keyword : action?.payload?.keyword ?? ''
      }
    }

    case actions.CLEAR_KEYWORD :
    {
      return {
        ...state,
        keyword : '',
        dataDisplay: [],
        dataTracking: [],
        positionActive : 0,
        nextposition : false,
        prePosition : false,
        isLoading : false,
        isRightLoading : false
        
      }
    }
    
    case actions.FETCH_LOADING: {
      return {...state, isLoading: true, isRightLoading : true}
    }

    case actions.RIGHT_LOADING: {
      return {...state, isRightLoading: true}
    }
      
    default:
      throw new Error()
  }
}