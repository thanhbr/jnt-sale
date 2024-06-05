const {default: useGlobalContext} = require('containerContext/storeContext')

const useAlert = () => {
  const [, dispatch] = useGlobalContext()

  const showAlert = opt => {
    dispatch({
      type: 'ALERT_OPEN',
      payload: {
        content: opt?.content,
        duration: opt?.duration || 5000,
        type: opt?.type || 'info',
        onClose: () => {
          if (opt?.onClose) opt.onClose()
          dispatch({type: 'ALERT_CLOSE'})
        },
      },
    })
  }

  const hideAlert = () => dispatch({type: 'ALERT_CLOSE'})

  return {showAlert, hideAlert}
}

export default useAlert
