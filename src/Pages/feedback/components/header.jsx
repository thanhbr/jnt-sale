import React from 'react';
import {PageHeader} from "../../../layouts/pageHeader";
import {FEEDBACK_BREADCRUMB, FEEDBACK_BREADCRUMB_TITLE, FEEDBACK_HEADER_ACTIONS} from "../interfaces/_contants";
import useGlobalContext from "../../../containerContext/storeContext";
import useTBoyFeedback from "../hooks/useTBoyFeedback";
import {useTranslation} from "react-i18next";

const Header = () => {
  const {t} = useTranslation()
  const [, dispatch] = useGlobalContext()
  const {methods} = useTBoyFeedback()
  const actions = [
    () => methods?.refreshTable(),
    () => dispatch({type: 'SET_SHOW_FEED_BACK'})
  ]

  return (
    <>
      <PageHeader
        actions={FEEDBACK_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={FEEDBACK_BREADCRUMB}
        breadcrumbTitle={t(FEEDBACK_BREADCRUMB_TITLE)}
      />
    </>
  )
}

export default Header