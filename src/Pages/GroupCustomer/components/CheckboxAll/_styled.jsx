import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";
export const StyledCheckboxAll= styled.div`
   
    .checkbox-all-group {
        input[type="checkbox"] {
            width: 18px;
            height: 18px;
            color: dodgerblue;
            vertical-align: middle;
            -webkit-appearance: none;
            background: none;
            border: 1px solid #DDDDE3;
            outline: 0;
            flex-grow: 0;
            border-radius: 4px;
            background-color: #F5F5FA;
            transition: background 300ms;
            cursor: pointer;

            &::before {
                content: "";
                display: inline-block;
                color: transparent;
                width: 16px;
                height: 16px;
                border-radius: inherit;
                background-color: transparent;
                background-size: contain;
            }

            &:checked {
                background-color: ${THEME_COLORS.green};
                border: 1px solid ${THEME_COLORS.green};
            }

            &:checked::before {
                top: 56.5%;
                left: 66%;
                width: 11px;
                height: 5px;
                border: 2px solid #fff;
                border-top: none;
                border-right: none;
                opacity: 1;
                content: '';
                -webkit-transition: opacity 0.25s;
                transition: opacity 0.25s;
                -webkit-transform: translate(-50%,-65%) rotate(-45deg);
                -ms-transform: translate(-50%,-65%) rotate(-45deg);
                transform: translate(-50%,-65%) rotate(-45deg);
                pointer-events: none;
                margin-left: 8px;
                // background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACQElEQVRoge3ZP2gUQRiG8b0kkqiISkACSlCwkTQpTCFiBAWLgJIqrSlNIwpWFkGw0dIUAdFK0lhYaBMhFloIoiBaiAgWIkEF8Q8hosQkP4s78ZzbM5nzcqOwT7nMfN/zsjPL7myWFRQUFBQUNE4ptcBKoJRl2cEsy7qyLJsplUpLiZUaA5N+cS21T0PgqN9ZRFtqryiwGbNBkIepvaLB1Zy7MZDaKwocwnIQ5GJqryiwAS+DEC+wPrVbFJgIQizhQGqvKLCvsheqmUjtFQU68SwI8QqbUrtFgQtBiGUcSe0VBfqxEAS5ktorCnTgcRDiDbamdosC42oZTu0VBfbgaxBiKrVXFGjD/SDEe2xL7RYFzuQsqZHUXlFgF+aDELdSe0VRWVL3ghCfsX2tGg5iBtfR28S6YzlLarRZ9cNmnfhY1egt9jahbi/mghDTzXCu17Bb7ffAPI79Zd3poOZcM+92vaaTalnEyQbrHc+pN9Zs77zGJZzLaQ6X0RFRqwcfghp3lY96WgNG1b7QwW2rfMXGjWDuF+xea/c8kcP4lBPmKXasMHckZ97pVrnnCfUpf+iEzKK/zpxuvAvGP0B7q/1DsR48ygkzh6Gc8VPBuG/oS+FeAzbiZk6Y7zhRNW4oZ8zZlO41oB2XckRVrm/B6+D6E6xL7Z4LTikf14SER50L6uyjfwYMKz9O/8T51J6rAgNqn04/eY6u1I6rBjvVnkstYX9qt2gqm/xOVZDx1E4No/yONuh/+wVQUFBQ0FJ+AMrBgcy5jxXMAAAAAElFTkSuQmCC");
            }

            &:hover {
                border: 1px solid ${THEME_COLORS.green};
                box-shadow: 0px 0px 0px 2px rgba(0, 171, 86, 0.15);
                border-radius: 4px;
            }
        }


        #table-header {
            width: 20px;
        }

        .checked-less {
            background-color: ${THEME_COLORS.green};
            border: 1px solid ${THEME_COLORS.green};

            &::before {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAWUlEQVRoge3P0QnCQAAD0JxziPuIe3Tx6x7xxwG8UoXCe/8JSQIAAABwCW1fbfeeb7Z9ru4ZBw7MJPfV3JfmGOOxErj9aMjfHDmwJdnPHpJkfroBAAAALuANhAJlmBVP1zcAAAAASUVORK5CYII=") !important;
                clip-path: none;
            }
        }
    }

}
`