import React from 'react';
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../../../common/button";
import './index.scss'
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
                                 backgroundImage = '',
                                 closeBackdropClick=false
                             }) => {
    return (
        <>
            <Modal
                open={openModal}
                onClose={closeBackdropClick ? false : closeModal}
            >
                <Box className={`confirm-winner ${stylePopup}`} style={{backgroundImage:`url("${backgroundImage}")`}}>
                    <div>
                        {!!header && (
                            <div
                                {...headerProps}
                                className={`confirm-winner__header ${headerProps?.className || ''}`}
                            >
                                {header}
                            </div>
                        )}
                        {!!body && (
                            <div
                                {...bodyProps}
                                className={`confirm-winner__body ${bodyProps?.className || ''}`}
                            >
                                {body}
                            </div>
                        )}
                        {!!footer && (
                            <div
                                {...footerProps}
                                className={`confirm-winner__group-btn ${footerProps?.className || ''}`}
                            >
                                <Button onClick={closeModal}
                                        className={'confirm-winner__dismiss'}
                                        style={{width: `${footer?.cancel?.width}px`}}
                                >{footer?.cancel?.title || 'Hủy'}</Button>
                                <Button onClick={acceptance}
                                        className={'confirm-winner__save'}
                                        style={{width: `${footer?.acceptance?.width}px`}}
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