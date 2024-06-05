import useGlobalContext from 'containerContext/storeContext'
import {useEffect, useState} from 'react'
import {StyledStickyFooter} from './_styled'

export const StickyFooter = ({...props}) => {
  const [globalState] = useGlobalContext()
  const {shouldMinimizeSidebar} = globalState
  const [shouldTransparent, setShouldTransparent] = useState(false)

  let timer = null
  const handleWrapperScroll = () => {
    setShouldTransparent(true)
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      setShouldTransparent(false)
    }, 150)
  }

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    wrapper.addEventListener('scroll', handleWrapperScroll)

    return () => wrapper.removeEventListener('scroll', handleWrapperScroll)
  }, [])

  return (
    <StyledStickyFooter
      {...props}
      data-pl-sm={shouldMinimizeSidebar}
      data-transparent={shouldTransparent}
    >
      {props?.children}
    </StyledStickyFooter>
  )
}
