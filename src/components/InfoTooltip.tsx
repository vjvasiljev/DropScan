import React from "react";
import Tooltip from "@mui/joy/Tooltip";
import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function InfoTooltip({ title }) {
  return (
    <Tooltip title={title || "?"} placement="top" size="sm">
      <IconButton
        sx={{
          "--Button-gap": "11px",
          "--IconButton-size": "20px",
          borderRadius: "50%",
          padding: "3px", // Padding to center the icon
          minWidth: "auto", // Removes minimum width constraint
        }}
      >
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
