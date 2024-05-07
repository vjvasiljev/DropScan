import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import ArticleIcon from "@mui/icons-material/Article";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faMedium } from "@fortawesome/free-brands-svg-icons";

export default function ColorInversionFooter() {
  const [color, setColor] = React.useState<ColorPaletteProp>("primary");
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "neutral" && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: "sm" },
        // position: 'relative',  // Use 'fixed' if you want it to stay visible always at the bottom
        bottom: -30,
        left: 0,
        right: 0,
        zIndex: 999, // Ensure it's above other content
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton variant="plain">
          <XIcon />
        </IconButton>
        <IconButton variant="plain">
          <TelegramIcon />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faDiscord} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faMedium} />
        </IconButton>
        <IconButton>
          <ArticleIcon />
        </IconButton>
        {/* <Input
          variant="soft"
          placeholder="Sign Up for Newsletter"
          type="email"
          name="email"
          endDecorator={
            <IconButton variant="soft" aria-label="subscribe">
              <SendIcon />
            </IconButton>
          }
          sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}
        /> */}
        <Box sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}>
          <Typography level="body-sm">
            {" "}
            © DropScan.xyz, All Rights Reserved, {new Date().getFullYear()}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}>
          <List role="menubar" orientation="horizontal">
            <ListItem role="none">
              <ListItemButton
                disabled
                role="menuitem"
                component="a"
                href="#horizontal-list"
              >
                Terms
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem role="none">
              <ListItemButton
                disabled
                role="menuitem"
                component="a"
                href="#horizontal-list"
              >
                Privacy
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem role="none">
              <ListItemButton
                disabled
                role="menuitem"
                component="a"
                href="#horizontal-list"
              >
                Cookies
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      {/* <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: "row", md: "column" },
            minWidth: { xs: "100%", md: "auto" },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: "initial" } }}
          >
            <img
              alt=""
              src="/static/blog/mui-product-comparison/ecosystem.png"
            />
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm">Intro to the MUI ecosystem</Typography>
            <Typography level="body-xs">Blog post</Typography>
          </CardContent>
        </Card>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
        >
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Products</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Base UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box> */}
    </Sheet>
  );
}
