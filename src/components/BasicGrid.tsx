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
import WithStyles from "@mui/material";

const responsive = {
  mobile: {
    breakpoint: {
      max: 475,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 650,
      min: 475,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: {
      max: 1200,
      min: 650,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  largeDesktop: {
    breakpoint: {
      max: 3000,
      min: 1200,
    },
    items: 2,
    partialVisibilityGutter: 40,
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

export default function BasicGrid({ deviceType }) {
  return (
    <>
      <style>
        {`
    .carousel-item-padding-30-px {
      margin-right: 15px;
    }
  `}
      </style>
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
                    <div
                      //Dots fro Carousel lower
                      style={{
                        paddingBottom: "30px",
                        position: "relative",
                      }}
                    >
                      <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode
                        className=""
                        containerClass="container-padding-bottom"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        itemClass="carousel-item-padding-30-px"
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={true}
                        responsive={responsive}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={true}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                      >
                        <NftCard />
                        <NftCard />
                        <NftCard />
                        <NftCard />
                        <NftCard />
                      </Carousel>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
