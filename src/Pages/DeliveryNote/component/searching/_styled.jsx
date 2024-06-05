import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";
export const StyledSearchDeliveryNote=styled.div`
    .setting__search {
    width: 100%;
    height: 66px;
    background: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
    padding: 16px;
    margin-top: 14px;
    &-content{
        width: 24.5rem;
        height: 2.125rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #EBEEF5;
        border-radius: 6px;
        &:hover{
            box-shadow: 0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
            border: 1px solid ${THEME_COLORS.blue};
        }
    }
    &-focus{
        border: 1px solid ${THEME_COLORS.blue};
    }
    &-input {
        width: 22.25rem;
        background: #FFFFFF;
        border: none;
        padding-left: 12px;
    }
    &__iconSearch{
        margin-right: 9px;
    margin-top: 3px;
    }
}
`
