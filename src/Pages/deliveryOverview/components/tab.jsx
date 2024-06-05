import React, {useContext} from 'react';
import {Box, Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {SCRIPT} from "../interfaces/~scripts";
import UseDeliveryOverviewFilter from "../hooks/useDeliveryOverviewFilter";
import {ChartsDeliveryOverview} from "./charts";
import CharBillOfLadingStatistics from "./charts/indexTwo";
import "./index.scss"
const TabDeliveryOverview = () => {
    const {value, functions} = UseDeliveryOverviewFilter()
    return (
        <>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value?.tabActive}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList
                            onChange={(e) => functions.handleChangeTab(e)}
                            className={'delivery-over-view_tab-list'}
                        >
                            <Tab
                                value={SCRIPT.TABS.TAB_1}
                                label={SCRIPT.TABS.TAB_1}
                                className={'delivery-over-view_tab-button'}
                            />
                            <Tab
                                value={SCRIPT.TABS.TAB_2}
                                label={SCRIPT.TABS.TAB_2}
                                className={'delivery-over-view_tab-button'}
                            />
                        </TabList>
                    </Box>
                    <TabPanel className={'delivery-over-view_tab-panel'} value={SCRIPT.TABS.TAB_1}>
                        <ChartsDeliveryOverview />
                    </TabPanel>
                    <TabPanel  className={'delivery-over-view_tab-panel'} value={SCRIPT.TABS.TAB_2}>
                        <CharBillOfLadingStatistics/>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default TabDeliveryOverview;