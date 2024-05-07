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
import InfoTooltip from "./InfoTooltip";
import Skeleton from "@mui/joy/Skeleton";

const defaultValue = "Loading...";

export default function CardInvertedColors({
  title = defaultValue,
  infoTooltipTitle = defaultValue,
  valueMain = defaultValue,
  valueSecondary = defaultValue,
  percentageLevel = -1,
  nextStepText = defaultValue,
  nextStepData = defaultValue,
  steps,
  cardOverflowHidden = false,
}) {
  const [widthSm, setWidthSm] = useState(window.innerWidth < 768); // Example breakpoint at 768px
  const [widthXs, setWidthXs] = useState(window.innerWidth < 500);
  useEffect(() => {
    const handleResize = () => {
      setWidthSm(window.innerWidth < 768);
      setWidthXs(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card variant="soft" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CardContent sx={{ textAlign: "left" }}>
          <Typography level="body-md">
            {title}
            <InfoTooltip title={infoTooltipTitle} />
          </Typography>
          <Typography level="h4">
            <Skeleton loading={false}>{valueMain}</Skeleton>
          </Typography>
          <Typography level="body-md">
            <Skeleton loading={false}>{valueSecondary} </Skeleton>
          </Typography>
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
            Top
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
        <Box
          component="section"
          sx={{
            p: 2,
            display: widthXs
              ? "none"
              : widthSm && steps.length > 5
              ? "none"
              : "block",
          }}
        >
          <DottedConnector
            steps={steps}
            currentPercentageLevel={percentageLevel}
          />
        </Box>
      </CardContent>
      <CardOverflow
        variant="soft"
        sx={{
          bgcolor: "background.level1",
          display: cardOverflowHidden ? "none" : "block",
        }}
      >
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
            {nextStepText}
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-sm"
            fontWeight="xl"
            textColor="text.secondary"
          >
            <Skeleton loading={false}>{nextStepData}</Skeleton>
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
