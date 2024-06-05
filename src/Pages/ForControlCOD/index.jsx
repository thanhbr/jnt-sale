import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {Box, Tab} from '@mui/material'
import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import {useState} from 'react'
import styled from 'styled-components'
import PaymentPeriod from './Tab1'
import {ForControlCOD_ICONS} from './Tab1/interfaces/_icons'
import OrderNotVerified from './Tab2'
import {useTranslation} from "react-i18next";

const TABS = {
  TAB_1: 'payment_period',
  TAB_2: 'unsettled_order',
}

export const ForControlCOD = () => {

  const { t } = useTranslation()
  const [tabActive, setTabActive] = useState(TABS.TAB_1)
  const handleChangeTab = e => {
      if(e.target.textContent == t(TABS.TAB_1)){
          setTabActive(TABS.TAB_1)
      } else {
          setTabActive(TABS.TAB_2)
      }
  }

  return (
    <StyledTab>
      <Box
        sx={{
          width: '100%',
          typography: 'body1',
          marginTop: '64px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            padding: '8px 12px 8px 13px',
            background: 'rgba(26, 148, 255, 0.1)',
            border: '1px solid #1A94FF',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99613 18C14.3809 18 18 14.3791 18 10C18 5.62089 14.3731 2 9.9884 2C5.61141 2 2 5.62089 2 10C2 14.3791 5.61914 18 9.99613 18ZM9.81054 11.5938C9.30788 11.5938 9.02948 11.3617 9.02948 10.8975V10.8124C9.02948 10.0851 9.44708 9.67505 10.0193 9.27273C10.6999 8.80077 11.0324 8.54545 11.0324 8.05029C11.0324 7.51644 10.6225 7.16054 9.9884 7.16054C9.52441 7.16054 9.18415 7.39265 8.92895 7.78723C8.68149 8.06576 8.56549 8.30561 8.1015 8.30561C7.72257 8.30561 7.41324 8.05803 7.41324 7.67118C7.41324 7.51644 7.44418 7.37718 7.49831 7.23791C7.7535 6.47969 8.68149 5.86074 10.0657 5.86074C11.5041 5.86074 12.7182 6.62669 12.7182 7.97292C12.7182 8.90135 12.2078 9.36557 11.4036 9.88395C10.8932 10.2166 10.5993 10.4952 10.5761 10.913C10.5761 10.9362 10.5684 10.9749 10.5684 11.0058C10.5452 11.3385 10.2591 11.5938 9.81054 11.5938ZM9.8028 14.0696C9.27695 14.0696 8.84389 13.6905 8.84389 13.1799C8.84389 12.6692 9.26921 12.2901 9.8028 12.2901C10.3287 12.2901 10.754 12.6692 10.754 13.1799C10.754 13.6983 10.3209 14.0696 9.8028 14.0696Z"
              fill="#1A94FF"
            />
          </svg>
            {t("note_for_control_cod")}
        </div>
        <TabContext value={tabActive}>
          <Box
            sx={{borderBottom: 1, borderColor: 'divider'}}
            style={{borderBottom: 'none', borderColor: 'unset'}}
          >
            <TabList
              onChange={handleChangeTab}
              TabIndicatorProps={{
                style: {background: '#E5101D ', padding: '0 16px'},
              }}
              className={'delivery-over-view_tab-list'}
            >
              <Tab className="active" value={TABS.TAB_1} label={t(TABS.TAB_1)} />
              <Tooltip
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 25px 0 5px',
                }}
                placement="bottom"
                title={t("paid_settlement_periods_list")}
              >
                {ForControlCOD_ICONS.questionBlack}
              </Tooltip>
              <Tab value={TABS.TAB_2} label={t(TABS.TAB_2)} />

              <Tooltip
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 25px 0 5px',
                }}
                placement="bottom"
                title={
                  <Text color={'#ffffff'} fontSize={13}>
                    <Text
                      as={'p'}
                      fontSize={13}
                      color={'#ffffff'}
                      style={{marginBottom: '8px'}}
                    >
                        {t("process_for_control_cod")}:
                    </Text>
                    <Text
                      as={'p'}
                      color={'#ffffff'}
                      fontSize={13}
                      style={{paddingLeft: '8px'}}
                    >
                      {' '}
                      &bull; {t("shipping_in_progress")}
                    </Text>
                    <Text
                      as={'p'}
                      color={'#ffffff'}
                      fontSize={13}
                      style={{paddingLeft: '8px'}}
                    >
                      {' '}
                      &bull; {t("successful_delivery_and_settlement_preparation")}
                    </Text>
                  </Text>
                }
              >
                {ForControlCOD_ICONS.questionBlack}
              </Tooltip>
            </TabList>
          </Box>
          <TabPanel
            className={'delivery-over-view_tab-panel'}
            value={TABS.TAB_1}
          >
            <PaymentPeriod />
          </TabPanel>
          <TabPanel
            className={'delivery-over-view_tab-panel'}
            value={TABS.TAB_2}
          >
            <OrderNotVerified />
          </TabPanel>
        </TabContext>
      </Box>
    </StyledTab>
  )
}

const StyledTab = styled.div`
  .delivery-over-view_tab-list .MuiTab-root {
    padding: 16px 0 !important;
  }

  .Mui-selected {
    color: #E5101D !important;
  }
`
