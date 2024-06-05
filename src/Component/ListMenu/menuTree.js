import {PATH} from '../../const/path'
import {DISPLAY_NAME_MENU} from '../../const/display_name_menu'
import {ROLE} from '../../const/role'

export const MENU_TREE = [
  {
    level: 1,
    path: PATH.OVERVIEW,
    display_name: DISPLAY_NAME_MENU.MANAGEMENT,
    iconLeft: '',
    child: [
      {
        key: '01',
        level: 2,
        path: PATH.ADMIN_DASHBOAR,
        display_name: DISPLAY_NAME_MENU.OVERVIEW,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.126 20.2054V15.4371C14.126 15.2264 14.0423 15.0242 13.8932 14.8752C13.7442 14.7261 13.542 14.6424 13.3313 14.6424H10.1524C9.94165 14.6424 9.73951 14.7261 9.59047 14.8752C9.44143 15.0242 9.3577 15.2264 9.3577 15.4371V20.2054C9.3577 20.4162 9.27398 20.6183 9.12494 20.7674C8.9759 20.9164 8.77376 21.0001 8.56299 21.0001H3.79471C3.58394 21.0001 3.3818 20.9164 3.23277 20.7674C3.08373 20.6183 3 20.4162 3 20.2054V11.0165C3.00178 10.9066 3.02555 10.798 3.0699 10.6974C3.11426 10.5967 3.17831 10.506 3.25828 10.4304L11.2054 3.20848C11.3519 3.07445 11.5433 3.00012 11.7418 3.00012C11.9404 3.00012 12.1318 3.07445 12.2783 3.20848L20.2254 10.4304C20.3054 10.506 20.3694 10.5967 20.4138 10.6974C20.4581 10.798 20.4819 10.9066 20.4837 11.0165V20.2054C20.4837 20.4162 20.4 20.6183 20.2509 20.7674C20.1019 20.9164 19.8997 21.0001 19.689 21.0001H14.9207C14.7099 21.0001 14.5078 20.9164 14.3587 20.7674C14.2097 20.6183 14.126 20.4162 14.126 20.2054Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
      {
        key: '03',
        level: 2,
        path: PATH.PRODUCT_MANAGEMENT,
        display_name: DISPLAY_NAME_MENU.PRODUCT,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.25 17.25H6.54375L3.92813 2.86875C3.89752 2.69653 3.80768 2.54042 3.67415 2.42743C3.54062 2.31444 3.37179 2.25168 3.19687 2.25H1.5"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 21C8.53553 21 9.375 20.1605 9.375 19.125C9.375 18.0895 8.53553 17.25 7.5 17.25C6.46447 17.25 5.625 18.0895 5.625 19.125C5.625 20.1605 6.46447 21 7.5 21Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.25 21C18.2855 21 19.125 20.1605 19.125 19.125C19.125 18.0895 18.2855 17.25 17.25 17.25C16.2145 17.25 15.375 18.0895 15.375 19.125C15.375 20.1605 16.2145 21 17.25 21Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.85938 13.5H17.6344C17.985 13.5011 18.3247 13.3785 18.5939 13.1539C18.8631 12.9293 19.0445 12.617 19.1063 12.2719L20.25 6H4.5"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        role: ROLE.ADMINTRATOR,
      },
      {
        key: '03',
        level: 2,
        // path: PATH.ORDER,
        display_name: DISPLAY_NAME_MENU.BILL,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5749 6.75H4.42488C4.24033 6.75087 4.06242 6.81891 3.92439 6.94141C3.78636 7.06391 3.69766 7.23249 3.67488 7.41562L2.34363 19.4156C2.33179 19.5202 2.34208 19.6261 2.37384 19.7264C2.4056 19.8267 2.45811 19.9192 2.52796 19.9979C2.59781 20.0766 2.68344 20.1397 2.77928 20.1831C2.87513 20.2266 2.97903 20.2494 3.08426 20.25H20.9155C21.0207 20.2494 21.1246 20.2266 21.2205 20.1831C21.3163 20.1397 21.4019 20.0766 21.4718 19.9979C21.5416 19.9192 21.5942 19.8267 21.6259 19.7264C21.6577 19.6261 21.668 19.5202 21.6561 19.4156L20.3249 7.41562C20.3021 7.23249 20.2134 7.06391 20.0754 6.94141C19.9373 6.81891 19.7594 6.75087 19.5749 6.75Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.25 9.75V6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3C12.9946 3 13.9484 3.39509 14.6517 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75V9.75"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '05',
            level: 3,
            path: PATH.NEW_ORDER,
            iconLeft: 'img/iconMenu/product.svg',
            display_name: DISPLAY_NAME_MENU.CREATE_ORDER,
          },
          {
            key: '04',
            level: 3,
            path: PATH.ORDER,
            iconLeft: 'img/iconMenu/product.svg',
            display_name: DISPLAY_NAME_MENU.ORDER_MANAGER,
          },
        ],
      },
      {
        key: '03',
        level: 2,
        // path: PATH.ADMIN_DASHBOAR,
        display_name: DISPLAY_NAME_MENU.SALES_CHANEL,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-miterlimit="10"
            />
            <path
              d="M3.51562 9H20.4844"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.51562 15H20.4844"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 20.7566C14.0711 20.7566 15.75 16.8363 15.75 12.0004C15.75 7.16445 14.0711 3.24414 12 3.24414C9.92893 3.24414 8.25 7.16445 8.25 12.0004C8.25 16.8363 9.92893 20.7566 12 20.7566Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-miterlimit="10"
            />
          </svg>
        ),
        child: [
          {
            key: '01',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            display_name: DISPLAY_NAME_MENU.SALE_AT_SHOP,
            role: ROLE.ADMINTRATOR,
            iconLeft: (
              <svg
                className="iconLeft off-event-point"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5682 9.77503C11.2401 10.1942 10.8146 10.5344 10.3254 10.7687C9.83626 11.003 9.29689 11.125 8.75 11.125C8.20311 11.125 7.66374 11.003 7.17459 10.7687C6.68544 10.5344 6.25995 10.1942 5.93182 9.77503C5.65566 10.1317 5.30814 10.4321 4.90954 10.6587C4.51094 10.8853 4.06924 11.0337 3.61018 11.0951C3.15112 11.1565 2.6839 11.1297 2.23576 11.0162C1.78762 10.9028 1.36753 10.7051 1 10.4345V13.825C1.00112 14.7198 1.37262 15.5776 2.03302 16.2103C2.69342 16.843 3.58879 17.1989 4.52273 17.2H12.9773C13.9112 17.1989 14.8066 16.843 15.467 16.2103C16.1274 15.5776 16.4989 14.7198 16.5 13.825V10.4325C16.1326 10.7032 15.7126 10.9011 15.2646 11.0146C14.8165 11.1282 14.3493 11.1552 13.8903 11.094C13.4312 11.0328 12.9895 10.8846 12.5908 10.6582C12.1921 10.4317 11.8445 10.1315 11.5682 9.77503Z"
                  fill="#9FB7CE"
                />
                <path
                  d="M15.5841 3.11347C15.4477 2.51211 15.0997 1.97393 14.5984 1.58916C14.0972 1.20438 13.473 0.996391 12.8307 1.00005H12.2727V3.02504C12.2727 3.20406 12.1985 3.37575 12.0664 3.50234C11.9342 3.62892 11.755 3.70004 11.5682 3.70004C11.3813 3.70004 11.2021 3.62892 11.07 3.50234C10.9379 3.37575 10.8636 3.20406 10.8636 3.02504V1.00005H6.63636V3.02504C6.63636 3.20406 6.56213 3.37575 6.43001 3.50234C6.29788 3.62892 6.11868 3.70004 5.93182 3.70004C5.74496 3.70004 5.56576 3.62892 5.43363 3.50234C5.3015 3.37575 5.22727 3.20406 5.22727 3.02504V1.00005H4.66927C4.02686 0.996424 3.40267 1.20451 2.90137 1.58942C2.40007 1.97433 2.05214 2.51266 1.91591 3.11414L1.0155 7.00753L1 7.76353C1.00093 8.02946 1.05651 8.2926 1.16359 8.53795C1.27066 8.78329 1.42713 9.00603 1.62405 9.19344C2.02176 9.57193 2.56011 9.78356 3.12068 9.78177C3.39825 9.78089 3.67291 9.72763 3.929 9.62505C4.18508 9.52246 4.41757 9.37256 4.61318 9.18389C4.8088 8.99523 4.96371 8.7715 5.06908 8.52548C5.17444 8.27945 5.2282 8.01596 5.22727 7.75003C5.22727 7.57101 5.3015 7.39932 5.43363 7.27273C5.56576 7.14615 5.74496 7.07503 5.93182 7.07503C6.11868 7.07503 6.29788 7.14615 6.43001 7.27273C6.56213 7.39932 6.63636 7.57101 6.63636 7.75003C6.63636 8.28709 6.85905 8.80216 7.25543 9.18192C7.65182 9.56168 8.18943 9.77502 8.75 9.77502C9.31057 9.77502 9.84818 9.56168 10.2446 9.18192C10.641 8.80216 10.8636 8.28709 10.8636 7.75003C10.8636 7.57101 10.9379 7.39932 11.07 7.27273C11.2021 7.14615 11.3813 7.07503 11.5682 7.07503C11.755 7.07503 11.9342 7.14615 12.0664 7.27273C12.1985 7.39932 12.2727 7.57101 12.2727 7.75003C12.2727 8.28709 12.4954 8.80216 12.8918 9.18192C13.2882 9.56168 13.8258 9.77502 14.3864 9.77502C14.9469 9.77502 15.4845 9.56168 15.8809 9.18192C16.2773 8.80216 16.5 8.28709 16.5 7.75003V7.14726L15.5841 3.11347Z"
                  fill="#9FB7CE"
                />
              </svg>
            ),
          },
          {
            key: '03',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            display_name: DISPLAY_NAME_MENU.FACEBOOK,
            role: ROLE.ADMINTRATOR,
            iconLeft: (
              <svg
                className="iconLeft off-event-point"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75638 10.1602C6.68747 10.1602 5.17146 10.1602 4.48237 10.1602C4.11485 10.1602 4 10.025 4 9.68711C4 8.78598 4 7.86233 4 6.9612C4 6.60075 4.13782 6.48811 4.48237 6.48811H6.75638C6.75638 6.42053 6.75638 5.11389 6.75638 4.50563C6.75638 3.60451 6.91717 2.74844 7.37657 1.95995C7.85893 1.14894 8.54803 0.60826 9.42088 0.292866C9.99513 0.0901125 10.5694 0 11.1896 0H13.4406C13.7622 0 13.9 0.135169 13.9 0.450563V3.01877C13.9 3.33417 13.7622 3.46934 13.4406 3.46934C12.8204 3.46934 12.2002 3.46934 11.58 3.49186C10.9599 3.49186 10.6383 3.78473 10.6383 4.41552C10.6153 5.09136 10.6383 5.74468 10.6383 6.44305H13.3028C13.6703 6.44305 13.8081 6.57822 13.8081 6.93867V9.66458C13.8081 10.025 13.6933 10.1377 13.3028 10.1377C12.4759 10.1377 10.7072 10.1377 10.6383 10.1377V17.4819C10.6383 17.8648 10.5234 18 10.11 18C9.14524 18 8.20348 18 7.23875 18C6.8942 18 6.75638 17.8648 6.75638 17.5269C6.75638 15.1615 6.75638 10.2278 6.75638 10.1602Z"
                  fill="#9FB7CE"
                />
              </svg>
            ),
          },
          {
            key: '06',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            display_name: DISPLAY_NAME_MENU.MARKET,
            role: ROLE.ADMINTRATOR,
            iconLeft: (
              <svg
                className="iconLeft off-event-point"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1916 3.01019C16.9787 2.76095 16.7122 2.5605 16.4109 2.42307C16.1096 2.28564 15.781 2.2146 15.4485 2.215H3.2108L3.17901 1.95584C3.11395 1.41717 2.84853 0.920504 2.43307 0.560009C2.01761 0.199515 1.48098 0.000252357 0.92494 0L0.756907 0C0.556163 0 0.36364 0.0777885 0.221693 0.216253C0.0797453 0.354717 0 0.542515 0 0.738333C0 0.934151 0.0797453 1.12195 0.221693 1.26041C0.36364 1.39888 0.556163 1.47667 0.756907 1.47667H0.92494C1.11033 1.47669 1.28927 1.54308 1.42781 1.66325C1.56635 1.78343 1.65486 1.94901 1.67655 2.12861L2.71805 10.7671C2.82618 11.6655 3.26869 12.4939 3.96158 13.0951C4.65448 13.6963 5.54953 14.0284 6.47685 14.0283H14.3812C14.582 14.0283 14.7745 13.9505 14.9164 13.8121C15.0584 13.6736 15.1381 13.4858 15.1381 13.29C15.1381 13.0942 15.0584 12.9064 14.9164 12.7679C14.7745 12.6295 14.582 12.5517 14.3812 12.5517H6.47685C6.00837 12.5504 5.55176 12.4078 5.16962 12.1434C4.78749 11.879 4.49853 11.5059 4.34237 11.075H13.3647C14.252 11.0751 15.1111 10.771 15.792 10.2159C16.4728 9.66083 16.932 8.89005 17.0894 8.03823L17.6836 4.82353C17.7429 4.50458 17.7296 4.1768 17.6446 3.86343C17.5596 3.55006 17.4049 3.25876 17.1916 3.01019Z"
                  fill="#9FB7CE"
                />
                <path
                  d="M5.29836 17.72C6.13442 17.72 6.81217 17.0589 6.81217 16.2434C6.81217 15.4278 6.13442 14.7667 5.29836 14.7667C4.4623 14.7667 3.78455 15.4278 3.78455 16.2434C3.78455 17.0589 4.4623 17.72 5.29836 17.72Z"
                  fill="#9FB7CE"
                />
                <path
                  d="M12.8674 17.72C13.7034 17.72 14.3812 17.0589 14.3812 16.2434C14.3812 15.4278 13.7034 14.7667 12.8674 14.7667C12.0313 14.7667 11.3536 15.4278 11.3536 16.2434C11.3536 17.0589 12.0313 17.72 12.8674 17.72Z"
                  fill="#9FB7CE"
                />
              </svg>
            ),
          },
        ],
        role: ROLE.ADMINTRATOR,
      },
      {
        key: '06',
        level: 2,
        // path: PATH.ADMIN_DASHBOAR,
        display_name: DISPLAY_NAME_MENU.TRANPORT,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 11.25H16.5V7.5H20.4922C20.6421 7.5 20.7886 7.54491 20.9127 7.62895C21.0368 7.71298 21.1329 7.83228 21.1886 7.97146L22.5 11.25Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 13.5H16.5"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.625 20.25C18.8676 20.25 19.875 19.2426 19.875 18C19.875 16.7574 18.8676 15.75 17.625 15.75C16.3824 15.75 15.375 16.7574 15.375 18C15.375 19.2426 16.3824 20.25 17.625 20.25Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.375 20.25C7.61764 20.25 8.625 19.2426 8.625 18C8.625 16.7574 7.61764 15.75 6.375 15.75C5.13236 15.75 4.125 16.7574 4.125 18C4.125 19.2426 5.13236 20.25 6.375 20.25Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.375 18H8.625"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.125 18H2.25C2.05109 18 1.86032 17.921 1.71967 17.7803C1.57902 17.6397 1.5 17.4489 1.5 17.25V6.75C1.5 6.55109 1.57902 6.36032 1.71967 6.21967C1.86032 6.07902 2.05109 6 2.25 6H16.5V16.0514"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.5 16.0514V11.25H22.5V17.25C22.5 17.4489 22.421 17.6397 22.2803 17.7803C22.1397 17.921 21.9489 18 21.75 18H19.875"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '08',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            iconLeft: 'img/iconMenu/Delivery.svg',
            display_name: DISPLAY_NAME_MENU.TRANPORT_OVERVIEW,
          },
          {
            key: '07',
            level: 3,
            path: PATH.DELIVERY_MANAGEMENT,
            iconLeft: 'img/iconMenu/Delivery.svg',
            display_name: DISPLAY_NAME_MENU.TRANPORTs,
          },
          {
            key: '08',
            level: 3,
            path: PATH.PART_SIGN,
            iconLeft: 'img/iconMenu/Delivery.svg',
            display_name: DISPLAY_NAME_MENU.SIGN_1_PART,
          },
          // {
          //   key: '08',
          //   level: 3,
          //   path: PATH.ADMIN_DASHBOAR,
          //   iconLeft: 'img/iconMenu/Delivery.svg',
          //   display_name: DISPLAY_NAME_MENU.TOOL_DEVIDE_ADRESS,
          // },
          // {
          //   key: '08',
          //   level: 3,
          //   path: PATH.ADMIN_DASHBOAR,
          //   iconLeft: 'img/iconMenu/Delivery.svg',
          //   display_name: DISPLAY_NAME_MENU.AUTO_BILL,
          // },
          {
            key: '08',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            iconLeft: 'img/iconMenu/Delivery.svg',
            display_name: DISPLAY_NAME_MENU.COD_MANAGEMENT,
          },
          {
            key: '08',
            level: 3,
            path: PATH.ADMIN_DASHBOAR,
            iconLeft: 'img/iconMenu/Delivery.svg',
            display_name: DISPLAY_NAME_MENU.COD_FOR_CONTROL,
          },
        ],
        role: ROLE.ADMINTRATOR,
      },
      // {
      //   key: '03',
      //   level: 2,
      //   // path: PATH.ADMIN_DASHBOAR,
      //   display_name: DISPLAY_NAME_MENU.CUSTOMER,
      //   role: ROLE.ADMINTRATOR,
      //   iconLeft: (
      //     <svg
      //       className="iconLeft off-event-point"
      //       width="18"
      //       height="18"
      //       viewBox="0 0 18 18"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M9.2515 9.41226C11.5658 9.41226 13.4576 7.52043 13.4576 5.20613C13.4576 2.89183 11.5658 1 9.2515 1C6.9372 1 5.04541 2.89183 5.04541 5.20613C5.04541 7.52043 6.93724 9.41226 9.2515 9.41226Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M16.47 12.7735C16.3598 12.498 16.2128 12.2408 16.0475 12.002C15.2026 10.7531 13.8986 9.92653 12.4292 9.72449C12.2455 9.70613 12.0435 9.74284 11.8965 9.85305C11.1251 10.4224 10.2067 10.7163 9.25162 10.7163C8.29649 10.7163 7.37814 10.4224 6.60671 9.85305C6.45976 9.74284 6.25771 9.68775 6.07406 9.72449C4.60467 9.92653 3.28223 10.7531 2.4557 12.002C2.2904 12.2408 2.14345 12.5164 2.03327 12.7735C1.97818 12.8837 1.99653 13.0123 2.05162 13.1225C2.19857 13.3796 2.38223 13.6368 2.54753 13.8572C2.80467 14.2062 3.08019 14.5184 3.39244 14.8123C3.64958 15.0694 3.94345 15.3082 4.23735 15.547C5.68836 16.6307 7.43327 17.2 9.23327 17.2C11.0333 17.2 12.7782 16.6306 14.2292 15.547C14.5231 15.3266 14.8169 15.0694 15.0741 14.8123C15.368 14.5184 15.6618 14.2061 15.919 13.8572C16.1027 13.6184 16.268 13.3796 16.4149 13.1225C16.5067 13.0123 16.5251 12.8837 16.47 12.7735Z"
      //         fill="#9FB7CE"
      //       />
      //     </svg>
      //   ),
      // },
    ],
  },
  {
    level: 1,
    display_name: DISPLAY_NAME_MENU.WAREHOUSE,
    child: [
      {
        key: '03',
        level: 2,
        // path: PATH.INVENTORY_REPORT,
        display_name: DISPLAY_NAME_MENU.WAREHOUSE,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.80005L2 8.40005H22L12 2.80005Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linejoin="round"
            />
            <path
              d="M3.59961 8.39966V21.1997H20.3996V8.39966"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linejoin="round"
            />
            <path
              d="M7 21.0005V11.0005H17V21.0005"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linejoin="round"
            />
            <path
              d="M10 14.0001H14"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 17.0004H10"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '04',
            level: 3,
            path: PATH.INVENTORY_REPORT,
            display_name: DISPLAY_NAME_MENU.LIST_WAREHOUSE,
          },
          {
            key: '05',
            level: 3,
            path: PATH.SALE_BY_TIME,
            display_name: DISPLAY_NAME_MENU.INVENTORY_INFO,
          },
          {
            key: '04',
            level: 3,
            path: PATH.IMPORT_REPORT,
            display_name: DISPLAY_NAME_MENU.IMPORT_GOODS,
          },
          {
            key: '04',
            level: 3,
            path: PATH.IMPORT_REPORT,
            display_name: DISPLAY_NAME_MENU.WAREHOUSE_TRANSFER,
          },
          {
            key: '04',
            level: 3,
            path: PATH.IMPORT_REPORT,
            display_name: DISPLAY_NAME_MENU.WAREHOUSE_CHECK,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    display_name: DISPLAY_NAME_MENU.ACCOUNTANT,
    child: [
      {
        key: '03',
        level: 2,
        // path: PATH.INVENTORY_REPORT,
        display_name: DISPLAY_NAME_MENU.ACCOUNTANT,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 11V15M18 9V13M17 4C19.4487 4 20.7731 4.37476 21.4321 4.66544C21.5199 4.70415 21.5638 4.72351 21.6904 4.84437C21.7663 4.91682 21.9049 5.12939 21.9405 5.22809C22 5.39274 22 5.48274 22 5.66274V16.4111C22 17.3199 22 17.7743 21.8637 18.0079C21.7251 18.2454 21.5914 18.3559 21.3319 18.4472C21.0769 18.5369 20.562 18.438 19.5322 18.2401C18.8114 18.1017 17.9565 18 17 18C14 18 11 20 7 20C4.55129 20 3.22687 19.6252 2.56788 19.3346C2.48012 19.2958 2.43624 19.2765 2.3096 19.1556C2.23369 19.0832 2.09512 18.8706 2.05947 18.7719C2 18.6073 2 18.5173 2 18.3373L2 7.58885C2 6.68009 2 6.2257 2.13628 5.99214C2.2749 5.75456 2.40859 5.64412 2.66806 5.55281C2.92314 5.46305 3.43803 5.56198 4.46783 5.75985C5.18862 5.89834 6.04348 6 7 6C10 6 13 4 17 4ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '04',
            level: 3,
            path: PATH.INVENTORY_REPORT,
            display_name: DISPLAY_NAME_MENU.RECEIPTS_VOUCHER,
          },
          {
            key: '05',
            level: 3,
            path: PATH.SALE_BY_TIME,
            display_name: DISPLAY_NAME_MENU.PAYMENT_VOUCHER,
          },
          {
            key: '04',
            level: 3,
            path: PATH.IMPORT_REPORT,
            display_name: DISPLAY_NAME_MENU.CASH_BOOK,
          },
          {
            key: '04',
            level: 3,
            path: PATH.IMPORT_REPORT,
            display_name: DISPLAY_NAME_MENU.COST_PRICE_UPDATE,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    display_name: DISPLAY_NAME_MENU.PARTNER_MANAGER,
    child: [
      {
        key: '03',
        level: 2,
        // path: PATH.INVENTORY_REPORT,
        display_name: DISPLAY_NAME_MENU.PARTNER_MANAGER,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5673 11.4173L20.25 12.576L17.25 6.83079L19.5909 5.66036C19.7667 5.57242 19.9701 5.55707 20.1572 5.61761C20.3443 5.67814 20.5001 5.80973 20.5911 5.98403L22.8967 10.3994C22.9428 10.4877 22.9708 10.5842 22.9792 10.6835C22.9876 10.7827 22.9761 10.8827 22.9454 10.9774C22.9148 11.0722 22.8655 11.1599 22.8006 11.2354C22.7357 11.311 22.6564 11.3728 22.5673 11.4173V11.4173Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.75042 12.4755L1.43314 11.3169C1.34406 11.2723 1.26474 11.2105 1.19981 11.135C1.13488 11.0594 1.08565 10.9717 1.05498 10.877C1.02432 10.7822 1.01284 10.6823 1.02121 10.583C1.02958 10.4838 1.05763 10.3872 1.10374 10.2989L3.40932 5.88357C3.50034 5.70927 3.65616 5.57768 3.84323 5.51714C4.03031 5.45661 4.23368 5.47196 4.40955 5.55989L6.75042 6.73033L3.75042 12.4755Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.25 12.5759L18.75 14.3308L15.3003 17.7805C15.2087 17.8721 15.095 17.9384 14.9701 17.9729C14.8453 18.0075 14.7137 18.0092 14.588 17.9778L9.15458 16.6194C9.05266 16.5939 8.95724 16.5473 8.87448 16.4826L3.75 12.4755"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.7498 14.3308L14.6248 11.3308L13.4248 12.2308C12.9055 12.6203 12.2739 12.8308 11.6248 12.8308C10.9757 12.8308 10.3441 12.6203 9.8248 12.2308L9.3166 11.8497C9.23064 11.7852 9.15953 11.703 9.1081 11.6087C9.05667 11.5143 9.02611 11.41 9.01849 11.3028C9.01087 11.1956 9.02637 11.0881 9.06395 10.9874C9.10152 10.8867 9.16029 10.7953 9.23627 10.7193L12.9051 7.05048C12.9748 6.98084 13.0574 6.92559 13.1484 6.8879C13.2394 6.85021 13.337 6.83081 13.4355 6.83081H17.2498"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.80371 6.73035L11.615 5.3277C11.7868 5.2776 11.971 5.29062 12.1341 5.36442L15.3749 6.83083"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 19.9558L7.67443 19.2494C7.55977 19.2207 7.4535 19.1654 7.3643 19.0878L5.25 17.25"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '04',
            level: 3,
            path: PATH.INVENTORY_REPORT,
            display_name: DISPLAY_NAME_MENU.CUSTOMER,
          },
          {
            key: '05',
            level: 3,
            path: PATH.SALE_BY_TIME,
            display_name: DISPLAY_NAME_MENU.SUPPLIER,
          },
          {
            key: '04',
            level: 3,
            path: PATH.SHIPPING_COMPANY,
            display_name: DISPLAY_NAME_MENU.SHIPPING_COMPANY,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    display_name: DISPLAY_NAME_MENU.REPORT,
    child: [
      {
        key: '01',
        level: 2,
        display_name: DISPLAY_NAME_MENU.REPORT,
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        child: [
          {
            key: '04',
            level: 3,
            path: PATH.INVENTORY_REPORT,
            iconLeft: 'img/iconMenu/product.svg',
            display_name: DISPLAY_NAME_MENU.WAREHOUSE_REPORT,
          },
          {
            key: '05',
            level: 3,
            path: PATH.SALE_BY_TIME,
            iconLeft: 'img/iconMenu/product.svg',
            display_name: DISPLAY_NAME_MENU.SALES_REPORT,
          },
          // {
          //   key: '04',
          //   level: 3,
          //   path: PATH.IMPORT_REPORT,
          //   iconLeft: 'img/iconMenu/product.svg',
          //   display_name: DISPLAY_NAME_MENU.IMPORT_REPORT,
          // },
        ],
      },
      // {
      //   key: '03',
      //   level: 2,
      //   // path: PATH.ADMIN_DASHBOAR,
      //   display_name: DISPLAY_NAME_MENU.ROLE,
      //   role: ROLE.ADMINTRATOR,
      //   iconLeft: (
      //     <svg
      //       className="iconLeft off-event-point"
      //       width="18"
      //       height="18"
      //       viewBox="0 0 18 18"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M14.0283 1.8H3.69167C2.71294 1.80115 1.77463 2.18339 1.08256 2.86288C0.390491 3.54236 0.00117237 4.46361 0 5.42455L0 11.2238C0.00117237 12.1848 0.390491 13.106 1.08256 13.7855C1.77463 14.465 2.71294 14.8472 3.69167 14.8484H8.12167V16.2982H5.16833C4.97251 16.2982 4.78472 16.3746 4.64625 16.5105C4.50779 16.6465 4.43 16.8308 4.43 17.0231C4.43 17.2154 4.50779 17.3997 4.64625 17.5357C4.78472 17.6716 4.97251 17.748 5.16833 17.748H12.5517C12.7475 17.748 12.9353 17.6716 13.0737 17.5357C13.2122 17.3997 13.29 17.2154 13.29 17.0231C13.29 16.8308 13.2122 16.6465 13.0737 16.5105C12.9353 16.3746 12.7475 16.2982 12.5517 16.2982H9.59833V14.8484H14.0283C15.0071 14.8472 15.9454 14.465 16.6374 13.7855C17.3295 13.106 17.7188 12.1848 17.72 11.2238V5.42455C17.7188 4.46361 17.3295 3.54236 16.6374 2.86288C15.9454 2.18339 15.0071 1.80115 14.0283 1.8ZM14.0283 9.04909H11.8392L10.584 10.9012C10.5164 11.0008 10.4246 11.0824 10.3171 11.1386C10.2095 11.1949 10.0894 11.2242 9.9675 11.2238C9.95199 11.2238 9.93649 11.2238 9.92172 11.2238C9.79254 11.216 9.66773 11.175 9.55978 11.1049C9.45184 11.0348 9.36456 10.9381 9.30669 10.8244L7.66095 7.59058L6.89013 8.72651C6.82268 8.82576 6.73133 8.90713 6.62417 8.96341C6.51701 9.01968 6.39736 9.04911 6.27583 9.04909H3.69167C3.49585 9.04909 3.30805 8.97272 3.16959 8.83677C3.03112 8.70083 2.95333 8.51644 2.95333 8.32419C2.95333 8.13193 3.03112 7.94754 3.16959 7.8116C3.30805 7.67565 3.49585 7.59928 3.69167 7.59928H5.88082L7.13599 5.74713C7.20704 5.64025 7.30592 5.55398 7.42238 5.49726C7.53883 5.44054 7.66861 5.41543 7.79828 5.42455C7.92745 5.43236 8.05227 5.47337 8.16022 5.54348C8.26816 5.61358 8.35544 5.71031 8.41331 5.82397L10.0591 9.05634L10.8299 7.92041C10.8975 7.82143 10.9889 7.74034 11.0961 7.68432C11.2032 7.62831 11.3228 7.5991 11.4442 7.59928H14.0283C14.2242 7.59928 14.4119 7.67565 14.5504 7.8116C14.6889 7.94754 14.7667 8.13193 14.7667 8.32419C14.7667 8.51644 14.6889 8.70083 14.5504 8.83677C14.4119 8.97272 14.2242 9.04909 14.0283 9.04909Z"
      //         fill="#9FB7CE"
      //       />
      //     </svg>
      //   ),
      //   child: [
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.USER_MANAGEMENT,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.GROUP_USER,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //   ],
      // },
      // {
      //   key: '06',
      //   level: 2,
      //   // path: PATH.ADMIN_DASHBOAR,
      //   display_name: DISPLAY_NAME_MENU.CONFIG,
      //   role: ROLE.ADMINTRATOR,
      //   iconLeft: (
      //     <svg
      //       className="iconLeft off-event-point"
      //       width="18"
      //       height="18"
      //       viewBox="0 0 18 18"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M1.00836 9.56601C1.06256 9.24081 1.33355 9.07822 1.65875 9.13242C1.76715 9.13242 9.4634 10.2706 16.2383 1.21936C16.4009 0.948369 16.7803 0.948369 16.9971 1.11097C17.2139 1.27356 17.2681 1.65296 17.1055 1.86975C12.0108 8.64463 5.66947 10.8126 1.44195 10.2164C1.17096 10.1622 0.954162 9.8912 1.00836 9.56601Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M5.12749 11.1378C5.29008 11.1378 5.45268 11.1378 5.56108 11.2462C5.66948 11.3546 5.77787 11.5172 5.77787 11.6798V15.6363C5.77787 15.9615 5.50688 16.1783 5.23588 16.1783H1.98395C1.71295 16.1783 1.44196 15.9615 1.44196 15.6363V11.8966C1.44196 11.5714 1.71295 11.3546 2.03814 11.3546C2.79693 11.4088 3.88091 11.3546 5.12749 11.1378Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M16.2922 5.0675C16.509 5.1759 16.6174 5.3385 16.6174 5.55529V15.6363C16.6174 15.9615 16.3464 16.1783 16.0754 16.1783H12.8235C12.5525 16.1783 12.2815 15.9615 12.2815 15.6363V8.37364C12.2815 8.21105 12.3899 8.04845 12.4983 7.94005C13.5823 7.18126 14.6663 6.25988 15.696 5.1759C15.8586 5.0133 16.0754 4.95911 16.2922 5.0675Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M10.9268 9.295C11.0894 9.4034 11.1978 9.566 11.1978 9.78279V15.6363C11.1978 15.9615 10.9268 16.1783 10.6558 16.1783H7.40387C7.13287 16.1783 6.86188 15.9615 6.86188 15.6363V11.1378C6.86188 10.921 7.02447 10.7042 7.24127 10.5958C8.32525 10.2706 9.40923 9.78279 10.3848 9.2408C10.5474 9.1866 10.7642 9.1866 10.9268 9.295Z"
      //         fill="#9FB7CE"
      //       />
      //     </svg>
      //   ),
      //   child: [
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.SHOP_SETTING,
      //       display_name: DISPLAY_NAME_MENU.SHOP_CONFIG,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.MANAGEMENT_ORDER_SOURCES,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.CONTACT,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.SHIPPING_PARTNER,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //     {
      //       key: '06',
      //       level: 3,
      //       path: PATH.ADMIN_DASHBOAR,
      //       display_name: DISPLAY_NAME_MENU.PRINT_TEMPLATE_SETTING,
      //       role: ROLE.ADMINTRATOR,
      //       iconLeft: 'img/iconMenu/sp.svg',
      //     },
      //   ],
      // },
      // {
      //   key: '06',
      //   level: 2,
      //   path: PATH.ADMIN_DASHBOAR,
      //   display_name: DISPLAY_NAME_MENU.SUPPORT,
      //   role: ROLE.ADMINTRATOR,
      //   iconLeft: (
      //     <svg
      //       className="iconLeft off-event-point"
      //       width="17"
      //       height="17"
      //       viewBox="0 0 17 17"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M5.91526 5.24405C6.52086 4.78007 7.27815 4.50417 8.09998 4.50417C8.92182 4.50417 9.6791 4.78007 10.2847 5.24405L13.4818 2.04702C12.0509 0.773866 10.166 0 8.09998 0C6.03401 0 4.14908 0.773866 2.7182 2.04702L5.91526 5.24405Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M14.1529 2.71822L10.9559 5.91525C11.4198 6.52085 11.6958 7.27813 11.6958 8.1C11.6958 8.92186 11.4198 9.67915 10.9559 10.2848L14.1529 13.4818C15.4261 12.0509 16.2 10.166 16.2 8.1C16.2 6.03403 15.4261 4.1491 14.1529 2.71822ZM13.4733 9.78749V6.41251H14.4225V9.78752H13.4733V9.78749Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M10.2847 10.9559C9.6791 11.4199 8.92182 11.6958 8.09998 11.6958C7.27815 11.6958 6.52083 11.4199 5.91523 10.9559L2.7182 14.153C4.14908 15.4261 6.03401 16.2 8.09998 16.2C10.166 16.2 12.0509 15.4261 13.4818 14.153L10.2847 10.9559Z"
      //         fill="#9FB7CE"
      //       />
      //       <path
      //         d="M5.24408 10.2848C4.78011 9.67915 4.5042 8.92186 4.5042 8.1C4.5042 7.27813 4.78011 6.52085 5.24408 5.91525L2.04702 2.71822C0.773866 4.1491 0 6.03403 0 8.1C0 10.166 0.773866 12.0509 2.04702 13.4818L5.24408 10.2848ZM1.77747 6.41251H2.72669V9.78752H1.77747V6.41251Z"
      //         fill="#9FB7CE"
      //       />
      //     </svg>
      //   ),
      // },
    ],
  },
  {
    level: 1,
    // path: PATH.OVERVIEW,
    display_name: DISPLAY_NAME_MENU.REPORT,
    class: 'menu_bottom_fix',
    child: [
      {
        key: '01',
        level: 2,
        // path: PATH.INVENTORY_REPORT,
        display_name: 'Công cụ bổ trợ',
        role: ROLE.ADMINTRATOR,
        iconLeft: (
          <svg
            className="iconLeft off-event-point"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z"
              stroke="#7C88A6"
              strokeWidth="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
    ],
  },
]
