import {Alert} from 'common/alert'
import useGlobalContext from 'containerContext/storeContext'
import {StyledWrapper} from './_styled'

export const Wrapper = ({...props}) => {
  const [globalState] = useGlobalContext()
  const {alert, shouldMinimizeSidebar} = globalState
  return (
    <StyledWrapper
      {...props}
      id={globalState.isLogin && 'content-wrap'}
      data-expand={shouldMinimizeSidebar}
    >
      {props?.children}

      {alert?.open && (
        <Alert
          duration={alert?.duration}
          open={true}
          type={alert?.type}
          onClose={alert?.onClose}
        >
          {alert?.content}
        </Alert>
      )}
    </StyledWrapper>
  )
}
