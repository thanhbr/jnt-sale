import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";
export const StyledConsignmentSearch= styled.div`
    .consingment__search {
    width: 100%;
    height: 66px;
    background: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
    padding: 16px;
    &-content{
        width: 24.5rem;
        height: 2.125rem;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover{
            box-shadow: 0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
            border: 1px solid ${THEME_COLORS.blue};
        }
    }
    .consingment__input {
        width: 22.25rem;
        background: #FFFFFF;
        border: none;
        // padding: 8px;
        padding-left: 12px;
       
    }
    .consingment_focus{
        border: 1px solid ${THEME_COLORS.blue};
    }
    .consingment__iconSearch{
        margin-right: 9px;
        margin-top: 3px;
    }
}
`