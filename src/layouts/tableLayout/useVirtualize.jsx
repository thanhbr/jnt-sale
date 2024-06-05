import {useEffect, useRef, useState} from 'react'

const amount = 20

const useVirtualize = data => {
  const height = data?.height || 66

  const [viewport, setViewport] = useState({
    top: 0,
    bottom: 2 * height * amount,
  })

  const handleScroll = scrollTop => {
    setViewport({
      top: scrollTop - height * amount,
      bottom: scrollTop + 2 * height * amount,
    })
  }

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (!!!wrapper) return

    wrapper.addEventListener('scroll', () => handleScroll(wrapper.scrollTop))
    return () =>
      wrapper.removeEventListener('scroll', () =>
        handleScroll(wrapper.scrollTop),
      )
  }, [])

  return {
    viewport: viewport,
  }
}

export default useVirtualize
