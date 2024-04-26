import React from "react";

import Typography from "@mui/joy/Typography";
import Tooltip from "@mui/joy/Tooltip";

// icons
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckIcon from "@mui/icons-material/Check";

export default function ToDoStatus({ title, tooltip, variant }) {
  return (
    <Tooltip
      title={
        tooltip
          ? tooltip
          : "Congratulations! Your wallet ranks in the top 10% of global wallets by this metric."
      }
      color={variant}
      placement="top"
      variant="solid"
    >
      <Typography
        color={variant}
        startDecorator={
          variant === "success" ? <CheckIcon /> : <PriorityHighIcon />
        }
      >
        {title}
      </Typography>
    </Tooltip>
  );
}
