import React, {memo, useEffect} from 'react';
import UseDeliveryOverview from "./hooks/useDeliveryOverview";
import {DeliveryOverviewProvider} from "./provider";
import Header from "./components/header";
import Content from "./components/content";
import useGlobalContext from "../../containerContext/storeContext";

export const DeliveryOverview = memo(() => {
    const {provider, fetch} = UseDeliveryOverview()
    const {state, dispatch} = provider
    const [globalState, globalDispatch] = useGlobalContext()
    useEffect(() => {
        fetch.handleFetchDeliveryOverview()
    }, [])
    useEffect(() => {
        if (!globalState?.shouldMinimizeSidebar && window.screen.width < 1600) {
            globalDispatch({type: 'TOGGLE_SIDEBAR', payload: {toggle: true}})
        }
    }, [])
    return (
        <DeliveryOverviewProvider value={{ pageState: state, pageDispatch: dispatch }}>
            <Header />
            <Content />
        </DeliveryOverviewProvider>
    );
})