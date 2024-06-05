import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";

export const StyledProductGroupSearch = styled.div`
        .product-group-search {
            width: 100%;
            height: 66px;
            background: #fff;
            border-radius: 8px 8px 0 0;
            padding: 16px;
            margin-top: 14px;
            &-content{
                width: 24.5rem;
                height: 2.125rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #ebeef5;
                border-radius: 6px;
            }
            &-input {
                width: 22.25rem;
                background: #fff;
                border: none;
                padding-left: 12px;
                &:hover{
                    border-color: ${THEME_COLORS.primary_300};
                }
            }
            &__iconSearch{
                margin-right: 9px;
                margin-top: 3px;
            }
        }
`