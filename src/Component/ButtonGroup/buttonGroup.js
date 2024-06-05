import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
/**
 *
 * @param {*} param0
 * @returns
 */
export default function ButtonGroup({ ...props }) {
  const { t } = useTranslation();
  const {
    list = [
      { label: "Lưu nháp", fnFunction: () => {}, customClass: "save-draft" },
      {
        label: "Tạo đơn hàng",
        fnFunction: () => {},
        customClass: "create-order",
      },
    ],
    customClassName,
  } = props;
  return (
    <div className={`button-group-wraper ${customClassName || ""}`}>
      {list.map((value, index) => (
        <div
          key={uuidv4()}
          onClick={() => value.fnFunction()}
          className={`cursor-pointer upos-button upos-text ${
            value.customClass || ""
          }`}
        >
          {value.label ? t(value.label) : "--"}
        </div>
      ))}
    </div>
  );
}
