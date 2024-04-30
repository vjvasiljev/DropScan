import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LogoSvg from "/src/assets/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg";
// import { ReactComponent as Logo } from '.assets/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg'; // Adjust the path to your SVG file

export default function AboutChainInfo() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Box />
      <Card
        orientation="horizontal"
        variant="soft"
        color="success"
        invertedColors
      >
        <AspectRatio
          flex
          ratio="1"
          maxHeight={100}
          sx={{ minWidth: 100, height: 100 }}
        >
          <img src={LogoSvg} loading="lazy" alt="Chain Logo" />
        </AspectRatio>
        <CardContent sx={{ textAlign: "left" }}>
          <Typography level="h1" fontWeight="lg">
            Scroll
          </Typography>
          {/* Dissapears on 600 */}
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            level="body-lg"
            fontWeight="lg"
            textColor="text.tertiary"
          >
            Scroll seamlessly augments Ethereum's functionality with
            zero-knowledge technology and EVM compatibility, offering a
            specialized L2 network designed by and for Ethereum developers.
          </Typography>
          {/* Appears on smalkler screens */}
          <Typography
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            level="body-lg"
            fontWeight="lg"
            textColor="text.tertiary"
          >
            Zero-knowledge L2 for Ethereum devs.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
