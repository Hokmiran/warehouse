import Lottie from "lottie-react";

import nodata from "./nodata.json";
import { Container, Grid } from "@mui/material";

const NoData = () => {
  return (
    <Container>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={8} sm={4}>
          <Lottie animationData={nodata} loop={false} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoData;
