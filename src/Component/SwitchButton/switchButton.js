import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { OrderContext } from "../../LayoutWrapper";

export default function SwichButton({ ...props }) {
  const { status = {}, callback = () => {} } = props;
  const { t } = useTranslation();
  return (
    <>
      <div
        className={
          status.value === "1"
            ? "add-effect-all upos-switch-button upos-able-switch-button"
            : "add-effect-all upos-switch-button upos-disable-switch-button"
        }
        onClick={() => callback(status.value)}
      >
        {t(status.label)}
      </div>
      <div
        className={
          status.value === "1"
            ? "add-effect-all upos-thumb-active upos-switch-thumb"
            : "add-effect-all upos-thumb-disable upos-switch-thumb"
        }
       />
    </>
  );
}
