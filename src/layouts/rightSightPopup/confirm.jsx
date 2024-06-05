import React from 'react';
import {Box, Modal} from "@mui/material";
import {Button} from "../../common/button";

export const ConfirmModal = ({
  header,
  headerProps,
  body,
  bodyProps,
  footer,
  footerProps,
  openModal,
  closeModal,
  acceptance,
  stylePopup = '',
  submitProps = {},
  closeBackdropClick=false
}) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeBackdropClick ? false : closeModal}
      >
        <Box className={`confirm-popup ${stylePopup}`}>
          <div>
            {!!header && (
              <div
                {...headerProps}
                className={`confirm-popup__header ${headerProps?.className || ''}`}
              >
                {header}
              </div>
            )}
            {!!body && (
              <div
                {...bodyProps}
                className={`confirm-popup__body ${bodyProps?.className || ''}`}
              >
                {body}
              </div>
            )}
            {!!footer && (
              <div
                {...footerProps}
                className={`confirm-popup__group-btn ${footerProps?.className || ''}`}
              >
                <Button onClick={closeModal}
                        appearance={'ghost'}
                        className={'confirm-popup__dismiss'}
                >{footer?.cancel?.title || 'Hủy'}</Button>
                <Button onClick={acceptance}
                        className={'confirm-popup__save'}
                        {...submitProps}
                >{footer?.acceptance?.title || 'Xác nhận'}</Button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}