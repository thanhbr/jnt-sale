import { useTranslation } from "react-i18next";

export default function PopupConfirm({ ...props }) {
  const { t } = useTranslation();
  const {
    customClass = "",
    pathIcon = "",
    title = "",
    cbConfirm = () => {},
    cbCancel = () => {},
    CloseClick = () => {},
    textContent = "",
    textConfirm = "",
    textCancel = "",
  } = props;
  return (
    <div
      id="popup-confirm"
      className={customClass ? customClass : "defaul-popup-wrapper"}
    >
      <div onClick={() => CloseClick()} className="close-modal-button">
        <img src="/svg/bigCloseButton.svg" />
      </div>
      <div className="popup-icon">
        <img src={pathIcon || "/img/order/no-image.png"} />
      </div>
      <div className="upos-text popup-confirm-title">
        {t(title) || "title_here"}
      </div>
      <div className="upos-text popup-confirm-content">
        {t(textContent) || "content_here"}
      </div>
      <div className="popup-button-group">
        <div
          onClick={() => cbCancel()}
          className="popup-cancel popup-button upos-text"
        >
          {t(textCancel) || "cancel"}
        </div>
        <div
          onClick={() => cbConfirm()}
          className="popup-confirm popup-button upos-text"
        >
          {t(textConfirm) || "ok"}
        </div>
      </div>
    </div>
  );
}
