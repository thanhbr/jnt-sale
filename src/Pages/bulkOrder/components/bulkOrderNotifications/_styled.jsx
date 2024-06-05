import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledBulkOrderNotifications = styled.div`
  .bulk-order-notifications {
    &__item {
      margin-bottom: 16px;
    }

    &__default-noti {
      ul {
        padding-left: 20px;

        li {
          margin-bottom: 4px;

          list-style-type: disc;

          color: ${THEME_COLORS.secondary_100};

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`
