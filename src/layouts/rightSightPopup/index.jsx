import {Box, Modal} from "@mui/material";
import {FEED_BACK_ICONS} from "../../Component/FeedBack/_icons";
import React from "react";
import './~style.scss'
import {Button} from "../../common/button";

export const RightSightPopup = ({
  header,
  headerProps,
  body,
  bodyProps,
  footer,
  footerProps,
  openModal,
  clickClose,
  animationClose,
  confirmBeforeClose,
  acceptance,
  disableSubmit,
  ...props
}) => {
  return (
    <Modal open={openModal} onClose={confirmBeforeClose && clickClose} {...props}>
      <Box className={`right-sight-popup__box ${animationClose && `right-sight-popup__box-close`}`}>
        <div className={`right-sight-popup__box--dismiss`} onClick={confirmBeforeClose && clickClose}>
          {FEED_BACK_ICONS.dismiss}
        </div>
        <div className={`right-sight-popup__wrapper`}>
          {!!header && (
            <div
              {...headerProps}
              className={`right-sight-popup__header ${headerProps?.className || ''}`}
            >
              <p className={`right-sight-popup__header-title`}>{header?.title}</p>
              <p className={`right-sight-popup__header-sub-title`}>{header?.subTitle}</p>
            </div>
          )}
          {Array.isArray(body) && body.length > 0 && (
            <div
              {...bodyProps}
              className={`right-sight-popup__container ${bodyProps?.className || ''}`}
            >
              {body.map((content, i) => (
                <div className={`right-sight-popup__group`} key={i}>
                  {content.item}
                </div>
              ))}
            </div>
          )}
          <div {...footerProps}
               className={`right-sight-popup__footer ${footerProps?.className || ''}`} >
            <hr />
            <div className={`right-sight-popup__footer--group`}>
              {!!footer?.cancel &&
              <Button className={'right-sight-popup__footer--btn-cancel'}
                      type={'button'}
                      appearance={'ghost'}
                      style={{
                        width: `${footer?.cancel?.width || 100}px`,
                        marginRight: '8px',
                      }}
                      onClick={confirmBeforeClose && clickClose}
              >{footer?.cancel?.title}</Button>}
              {!!footer?.save &&
              <Button className={'right-sight-popup__footer--btn-save'}
                      type={'button'}
                      style={{
                        width: `${footer?.save?.width || 100}px`,
                      }}
                      disabled={disableSubmit ?? false}
                      onClick={acceptance}
              >{footer?.save?.title}</Button>}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}