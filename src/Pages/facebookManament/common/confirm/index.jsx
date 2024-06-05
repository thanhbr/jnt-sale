import React from 'react'
import { Box, Modal } from '@mui/material'
import { Button } from '../../../../common/button'
import styled from 'styled-components'

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
  button = [],
  stylePopup = '',
  submitProps = {}
}) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
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
                <StyledConfirm>
                  {button?.length > 0
                    ?
                    button.map((btn, index) => (
                      <Button
                        key={index}
                        onClick={btn.onClick}
                        appearance={btn.appearance}
                        className={btn.className}
                      >{btn.title}</Button>
                    ))
                    :
                    <>
                      <Button onClick={closeModal}
                              appearance={'ghost'}
                              className={'confirm-popup__dismiss'}
                      >{footer?.cancel?.title || 'Hủy'}</Button>
                      <Button onClick={acceptance}
                              className={'confirm-popup__save'}
                              {...submitProps}
                      >{footer?.acceptance?.title || 'Xác nhận'}</Button>
                    </>
                  }
                </StyledConfirm>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export const StyledConfirm = styled.div`
  .confirm-popup{
    &__save-draft{
        width: 172px!important;
        margin-right: 8px;
      }
    &__dismiss{
        margin-right: 8px!important;
      }
  }
`
