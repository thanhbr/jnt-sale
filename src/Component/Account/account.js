import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

export const general = [
    {
        label: DISPLAY_NAME_MENU.GENERAL.USER_PROFILE,
        class: 'user_information',
        value: 'user_information',
    },
    {
        label: DISPLAY_NAME_MENU.GENERAL.PACKAGE_INFO,
        class: 'pack_information',
        value: 'pack_information',
    },
    {
        label: DISPLAY_NAME_MENU.GENERAL.CHANGE_PASSWORD,
        class: 'change_password',
        value: 'change_password',
    },
    {
        label: DISPLAY_NAME_MENU.GENERAL.SIGN_OUT,
        class: 'log_out',
        value: 'log_out',
    },
];
export const STORE_ACCOUNT = [
    {id:1,title:'Thông tin cửa hàng',tooltip:''},
    {id:2,title:'Cấu hình cửa hàng',tooltip:''},
]
export const STORE_CONFIG_PRINT_TEMPLATE=[
    {name:'In mẫu đơn vị vận chuyển',value : 1},
    {name:'In mẫu evoshop A4',value : 2},
    {name:'In mẫu evoshop A5',value : 3},
    {name:'In mẫu evoshop K80',value : 4},
]
export const ICON= {
    camera: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_16160_347205)">
                <rect width="28" height="28" rx="14" fill="#EFF2F8"/>
                <path
                    d="M18.6667 20.2149H9.33333C7.79419 20.2149 7 19.6147 7 18.0833V11.0833C7 9.55196 7.79419 9.08328 9.33333 9.08328H10.8168C11.0577 9.08328 11.2754 8.9589 11.4075 8.76457L12.3326 7.31871C12.4647 7.1166 12.6824 7 12.9234 7H15.0067C15.2399 7 15.4575 7.11661 15.5897 7.30318L16.5924 8.78013C16.7246 8.97447 16.9423 9.08328 17.1755 9.08328H18.6667C20.2058 9.08328 21 9.55196 21 11.0833V18.0833C21 19.6147 19.7407 20.2149 18.2016 20.2149H18.6667Z"
                    fill="#1A94FF" stroke="#1A94FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M13.9961 16.7559C14.9621 16.7559 15.7451 15.9728 15.7451 15.0068C15.7451 14.0409 14.9621 13.2578 13.9961 13.2578C13.0301 13.2578 12.2471 14.0409 12.2471 15.0068C12.2471 15.9728 13.0301 16.7559 13.9961 16.7559Z"
                    fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.1932 11.8594H16.7939" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </g>
            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="white"/>
            <defs>
                <clipPath id="clip0_16160_347205">
                    <rect width="28" height="28" rx="14" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}