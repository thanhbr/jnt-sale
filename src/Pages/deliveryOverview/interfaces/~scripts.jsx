export const SCRIPT = {
    BREADCRUMB: {
        TITLE: 'Tổng quan giao hàng',
        TRANSPORT: 'Vận chuyển',
    },
    TABS: {
        TAB_1: 'Tình hình giao hàng và đối soát',
        TAB_2: 'Các chỉ số vận chuyển',
    }
}
export const TOOLTIP_SERIES = (index) => {
    switch (index) {
        case 0:
            return 'Bao gồm đơn ở các trạng thái: Lấy hàng thành công, Đang phát hàng, Đang vận chuyển, Chờ chuyển hoàn, Kiện vấn đề.';
        case 1 :
            return 'Bao gồm đơn ở các trạng thái: Giao hàng thành công, Chờ đối soát, Đã đối soát.';
        default :
            return 'Bao gồm đơn ở các trạng thái: Chuyển hoàn, Chuyển hoàn thành công.'
    }

}
export const TOOLTIP_ONE_PART = (index) => {
    switch (index) {
        case 0:
            return 'Bao gồm đơn có chọn ký nhận 1 phần ở các trạng thái: Lấy hàng thành công, Đang phát hàng, Đang vận chuyển, Chờ chuyển hoàn, Kiện vấn đề.';
        case 1 :
            return 'Bao gồm đơn có chọn ký nhận 1 phần ở các trạng thái: Giao hàng thành công, Đã đối soát, Chờ đối soát và khách hàng chỉ nhận 1 phần hàng hóa.';
            case 2 :
            return 'Bao gồm đơn có chọn ký nhận 1 phần ở các trạng thái: Giao hàng thành công, Đã đối soát, Chờ đối soát và khách hàng đã nhận toàn bộ hàng hóa.';
        default :
            return 'Bao gồm đơn có chọn ký nhận 1 phần ở các trạng thái: Chuyển hoàn, Chuyển hoàn thành công.'
    }

}
export const TOOLTIP_FOR_CONTROL = (index) => {
    switch (index) {
        case 0:
            return 'Bao gồm đơn ở các trạng thái: Lấy hàng thành công, Đang phát hàng, Đang vận chuyển, Chờ chuyển hoàn, Kiện vấn đề.';
        case 1 :
            return 'Bao gồm đơn ở các trạng thái: Giao hàng thành công, Chờ đối soát.';
        default :
            return 'Bao gồm đơn ở trạng thái: Đã đối soát.'
    }

}
