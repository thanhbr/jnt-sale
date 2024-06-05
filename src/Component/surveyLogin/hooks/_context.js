import initSurveyLoginState from '../provider/initState'
import SurveyLoginReducer from '../provider/reducer'
import {createContext, useContext, useReducer} from 'react'

const SurveyLoginContext = createContext()
export const SurveyContext = ({children}) => {
  const [state, dispatch] = useReducer(SurveyLoginReducer, initSurveyLoginState)
  return (
    <div className="survey-container">
    <SurveyLoginContext.Provider value={[state, dispatch]}>
      {children}
    </SurveyLoginContext.Provider>
    </div>
  )
}

const useSurveyLoginContext = () => useContext(SurveyLoginContext)
export default useSurveyLoginContext;