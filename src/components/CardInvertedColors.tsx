import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import SvgIcon from "@mui/joy/SvgIcon";
import NftCard from "./NftCard";
import Box from "@mui/material/Box";
import DottedConnector from "./DottedConnector";
import { useState, useEffect } from "react";

const defaultValue = "Loading...";

export default function CardInvertedColors({
  title = defaultValue,
  valueMain = defaultValue,
  valueSecondary = defaultValue,
  percentageLevel = -1,
  requirmentsLevel = defaultValue,
}) {
  return (
    <Card variant="soft" color="success" invertedColors>
      <CardContent orientation="horizontal">
        <CardContent sx={{ textAlign: "left" }}>
          <Typography level="body-md">{title}</Typography>
          <Typography level="h4">{valueMain}</Typography>
          <Typography level="body-md">{valueSecondary}</Typography>
          {/* <Typography level="body-md">Current Balance:</Typography>
          <Typography level="h4">Ξ 0.56548 ETH</Typography>
          <Typography level="body-md">$ 1500.25</Typography> */}
          {/* <Typography level="body-md">
            Spend 0.265489 more ETH to get the Top 50% NFT
          </Typography> */}
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography level="h6" sx={{ width: 64, textAlign: "center" }}>
            TOP
          </Typography>
          <CircularProgress
            size="lg"
            determinate={percentageLevel === -1 ? false : true}
            value={percentageLevel === -1 ? 25 : 100 - percentageLevel}
          >
            <Typography level="h5">
              {percentageLevel === -1 ? "" : percentageLevel + "%"}
            </Typography>
          </CircularProgress>
        </CardContent>
      </CardContent>
      <CardContent>
        <Divider inset="context" />
        <Box component="section" sx={{ p: 2 }}>
          <DottedConnector />
        </Box>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Typography
            level="body-sm"
            fontWeight="md"
            textColor="text.secondary"
          >
            Next Level:
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-sm"
            fontWeight="md"
            textColor="text.secondary"
            sx={{ marginLeft: "auto" }} // Push this text to the far right
          >
            {requirmentsLevel}
          </Typography>
          {/* <Typography
            level="body-sm"
            fontWeight="md"
            textColor="text.secondary"
          >
            Spend 0.265489 more ETH to get the Top 10% NFT
          </Typography> */}
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
