import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";
export const StyledCreateDelivery=styled.div`
    .delivery_info {
    .delivery__create-p{
        margin-top: 4px;
    }
    &-body {
        margin-top: 32px;
    }
    &-title{
        display: flex;
        align-items: flex-start;
    }
    &-icon {
        color: #FF424E;
        margin-left: 2px;
    }
    &-note{
        height: 122px;
    }
    &-textArea {
        padding: 10px 8px 7px 16px;
        grid-gap: 8px;
        gap: 8px;
        width: 452px;
        height: 68px;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        margin-top: 8px;
        resize: none;

        &:hover {
            border: 1px solid ${THEME_COLORS.blue};
            box-shadow:0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
        }
    }

    &-position {
        height: 81px;
    }
    &-question{
        display: flex;
        align-items: center;
        svg{
            margin-left: 5px;
        }
    }
    &-positionInput {
        padding: 7px 8px 7px 16px;
        gap: 8px;
        width: 452px;
        height: 34px;
        background: #FFFFFF;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        margin-top: 8px;
        &:hover {
            border: 1px solid ${THEME_COLORS.blue};
            box-shadow: 0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
        }
    }
    
    &-checkbox{
        display: flex;
        align-items: center;
        margin-top: 4px;
        cursor: pointer;
        
        input[disabled]{
            cursor: not-allowed;
        }
    }
    &-checkbox[data-disable=true]{
        cursor: not-allowed;
    }
    &-checkboxText{
        margin-left: 9px;
    }
    &-status{
        margin-top: 33px;
        display: flex;
        align-items: center;
        .switch{
            .slider{
                &::before{
                    top: 0.14rem;
                }
            }
        }
    }
    &-statusText{
        margin-left: 8px;
    }
    &-error{
        color: #FF424E;
        font-size: 12px;
    }
    .error_border{
        border: 1px solid #FF424E;
    }
}
`
