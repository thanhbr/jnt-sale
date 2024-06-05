import React from 'react';
import styled from "styled-components";

const Index = ({...props}) => {
    const {image,data_grid} = props;
    const render_skeleton = () => {
        if (image) {
            return image.map((item, index) => {
                return (
                    <div data-grid={data_grid} key={index} className={'delivery-over-view_skeleton'}>
                        <img src={item.image} />
                    </div>
                )
            })
        }
    }
    return (
        <StyledSkeleton>
            {render_skeleton()}
        </StyledSkeleton>
    )
}
export default Index;

const StyledSkeleton = styled.div`
    display: flex;
    justify-content: flex-start;
    .delivery-over-view{
      &_skeleton:nth-child(1){
       width: 62.125rem;
       margin-right: 24px;
       height: 786px;
       img{
            width:100%;
        }
      }
      &_skeleton:nth-child(2){
       width: 41.75rem;
       height: 786px;
       img{
            width: 100%;
        }
      }
     
    }
    .delivery-over-view{
       &_skeleton[data-grid = 'true']{
        width: 50.375rem;
        margin-right: 24px;
        height: 786px;
       
      }
    }
    @media screen and (max-width: 1440px){
      display: block;
       .delivery-over-view{
        &_skeleton:nth-child(1){
       width: 100%;
       margin-right: 0;
        img{
            width: 90%;
            margin-left: 4rem;
        }
      }
      &_skeleton:nth-child(2){
       width: 100%;
        img{
           width: 90%;
            margin-left: 4rem;
        }
      }
    }
    }
`