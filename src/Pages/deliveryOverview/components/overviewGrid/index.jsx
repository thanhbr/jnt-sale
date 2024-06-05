import React from "react";
import Grid from '@mui/material/Grid';
import {StyledGridOverView} from "./_styled";

const Index = ({...props})=>{
    const {content_1,content_2,grid} = props
    return(
    <StyledGridOverView>
        <div className={'delivery-over-view'}>
            <div
                className='delivery-over-view_grid-left delivery-over-view_grid-border'
                data-grid={grid}
            >{content_1}</div>
            <div
                className='delivery-over-view_grid-right  delivery-over-view_grid-border'
                data-grid={grid}
            >{content_2}</div>
        </div>
    </StyledGridOverView>
    )
}
export default Index;