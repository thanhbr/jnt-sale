import { useEffect } from 'react'

import useAppContext from './appContext'

const useLoading = isLoading => {
	const { setIsLoading } = useAppContext()
	useEffect(() => {
		setIsLoading(isLoading)
	}, [isLoading, setIsLoading])
}

export default useLoading
