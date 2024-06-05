import React from 'react';
import {Text} from "../../../../common/text";
import styled from "styled-components";
import {Button} from "../../../../common/button";
import useTBoyFeedback from "../../hooks/useTBoyFeedback";
import useGlobalContext from "../../../../containerContext/storeContext";
import {ICONS_FEEDBACK} from "../../interfaces/_icons";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const EmptyPage = ({...props}) => {
  const {t} = useTranslation()
  const {shouldShowCreateBtn} = useTBoyFeedback()
  const [, dispatch] = useGlobalContext()
  const actions = _ => {
    dispatch({type: 'SET_SHOW_FEED_BACK'})
  }
  return (
    <StyledEmptyPage {...props}>
      <img
        className={"product-empty__banner"}
        src={"/img/order/order-empty.png"}
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 12}}>
        {shouldShowCreateBtn ? t(DISPLAY_NAME_MENU.FEEDBACK.NOT_YET) : t(DISPLAY_NAME_MENU.FEEDBACK.NOT_FOUND)}
      </Text>
      {shouldShowCreateBtn && (
        <Button onClick={() => actions()}
                icon={ICONS_FEEDBACK.plus}
                style={{width: 207}}
        >{t(DISPLAY_NAME_MENU.FEEDBACK.CREATE)}</Button>
      )}
    </StyledEmptyPage>
  );
};

export default EmptyPage;


export const StyledEmptyPage = styled.div`
  min-height: calc(100vh - 300px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .product-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
`
