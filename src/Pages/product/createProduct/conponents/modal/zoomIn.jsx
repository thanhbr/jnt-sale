import React from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";

const ZoomIn = ({closeModal, ...props}) => {

  return (
    <StyledZoomIn>
      <Modal open={true}
             // onClose={confirmBeforeClose && clickClose}
      >
        <Box style={{
            background: 'white',
            width: 841,
            height: 560,
            borderRadius: 8,
            margin: '13rem auto',
            padding: 18,
            position: 'relative'
          }}>
          <>
            <div style={{position: 'absolute', right: 18, cursor: 'pointer'}}
                 onClick={closeModal}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.03075 7.78084L13.6546 3.15845C13.7134 3.09953 13.7832 3.05277 13.8601 3.02085C13.937 2.98892 14.0195 2.97246 14.1027 2.97239C14.186 2.97233 14.2685 2.98866 14.3454 3.02046C14.4224 3.05227 14.4923 3.09891 14.5512 3.15774C14.6101 3.21657 14.6569 3.28643 14.6888 3.36333C14.7207 3.44022 14.7372 3.52266 14.7373 3.60592C14.7373 3.68918 14.721 3.77164 14.6892 3.84859C14.6574 3.92554 14.6108 3.99548 14.5519 4.0544L9.92812 8.67821L14.5505 13.302C14.6094 13.3609 14.6562 13.4307 14.6881 13.5076C14.72 13.5845 14.7365 13.6669 14.7366 13.7502C14.7366 13.8335 14.7203 13.9159 14.6885 13.9929C14.6567 14.0698 14.61 14.1398 14.5512 14.1987C14.4924 14.2576 14.4225 14.3044 14.3456 14.3363C14.2687 14.3682 14.1863 14.3847 14.103 14.3847C14.0198 14.3848 13.9373 14.3685 13.8604 14.3367C13.7834 14.3049 13.7135 14.2582 13.6546 14.1994L9.03075 9.57558L4.40694 14.198C4.34811 14.2569 4.27825 14.3036 4.20135 14.3356C4.12445 14.3675 4.04202 14.384 3.95876 14.384C3.87549 14.3841 3.79303 14.3678 3.71608 14.336C3.63913 14.3042 3.5692 14.2575 3.51028 14.1987C3.45136 14.1399 3.4046 14.07 3.37268 13.9931C3.34075 13.9162 3.32429 13.8338 3.32422 13.7505C3.32415 13.6672 3.34049 13.5848 3.37229 13.5078C3.40409 13.4309 3.45074 13.3609 3.50957 13.302L8.13338 8.67821L3.51099 4.0544C3.39199 3.93559 3.32507 3.77437 3.32493 3.60622C3.3248 3.43806 3.39147 3.27674 3.51028 3.15774C3.62909 3.03874 3.7903 2.97181 3.95846 2.97168C4.12662 2.97155 4.28794 3.03822 4.40694 3.15703L9.03075 7.78084Z" fill="#7C8EA0"/>
              </svg>
            </div>
            {props?.linkActive && (
              <div>
                <div style={{textAlign: 'center'}}>
                  <img src={props?.linkActive}
                       alt={'product-image'}
                       style={{height: 408, borderRadius: 8}}
                  />
                </div>
                <div style={{width: 84, height: 84, textAlign: 'center', borderRadius: 6, border: '2px solid #2f83d8', margin: '24px 360px'}}>
                  <img src={props?.linkActive}
                       alt={'product-image'}
                       style={{height: 80, borderRadius: 6}}
                  />
                </div>
              </div>
            )}
          </>
        </Box>
      </Modal>
    </StyledZoomIn>
  );
};

export default ZoomIn;


export const StyledZoomIn = styled.div`

`
