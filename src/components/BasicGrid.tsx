import * as React from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import CardInvertedColors from "./CardInvertedColors";
import NftCard from "./NftCard";
import NftGrid from "./NftGrid";
import ScrollableCards from "./ScrollableCards";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1 }}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Grid xs={12} sm={12} md={12} lg={6} key={index}>
          <Item>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={12}>
                <Item>
                  <CardInvertedColors />
                </Item>
              </Grid>
              <Grid xs={12}>
                <Item>
                  {/* <NftGrid />{" "} */}
                  <Carousel responsive={responsive}>
                    <div>
                      <NftCard />
                    </div>
                    <div>
                      <NftCard />
                    </div>
                    <div>
                      <NftCard />
                    </div>
                    <div>
                      <NftCard />
                    </div>
                  </Carousel>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}
