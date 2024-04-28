import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import NftCard from "./NftCard";

export default function CenteredElementGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NftCard />
        </Grid>
        <Grid
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NftCard />
        </Grid>
        <Grid
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NftCard />
        </Grid>
        <Grid
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NftCard />
        </Grid>
      </Grid>
    </Box>
  );
}
