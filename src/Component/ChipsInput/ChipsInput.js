import { Grid } from "@material-ui/core";
import { ProductContext } from "LayoutWrapper";
import { useContext, useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
import { relativeTimeRounding } from "moment";
import { useTranslation } from "react-i18next";
/**
 *
 * @param {*} chips ( list chips - array)
 * @param {*} canDelete ( show delete button - true)
 * @param {*} chips ( list chips - array)
 *
 * @returns chips input
 *
 */
export default function ChipsInput({ ...props }) {
  const {
    handleAddChip = () => {},
    handleDeleteChip = () => {},
    chips = [],
    srcIconDelete = "/img/product/delete-white.svg",
  } = props;
  const [text, changeText] = useState("");
  const [listChips, changeListChips] = useState(chips);

  const RenderChip = ({ ...props }, key) => {
    const { value } = props;
    return (
      <div className="chip-wrapper">
        <div className="chip-content upos-text">{value}</div>
        <div className="chip-delete">
          <img onClick={props.handleDelete} src={srcIconDelete} />
        </div>
      </div>
    );
  };
  return (
    <ChipInput
      chipRenderer={RenderChip}
      className="upos-chip-input"
      value={chips}
      onAdd={(chip) => handleAddChip(chip)}
      onDelete={(chip, index) => handleDeleteChip(chip, index)}
    />
  );
}
