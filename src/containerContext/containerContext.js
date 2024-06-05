import React, { createContext, useContext } from 'react'
import { useLoading } from '../hook'

const ContainerContext = createContext()
export const ContainerProvider = ({
	state = {},
	setState,
	data,
	isLoading = false,
	children,
	...props
}) => {
	useLoading(isLoading)
	return (
		<ContainerContext.Provider
			value={{
				state,
				data,
				setState,
				...props,
			}}
		>
			{children}
		</ContainerContext.Provider>
	)
}

const useContainerContext = () => useContext(ContainerContext)

export default useContainerContext
