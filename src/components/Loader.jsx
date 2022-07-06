import React from "react";
import { Stack } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";

// Loader
const Loader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {/* Infinity Spin */}
      <InfinitySpin color="gray" />
    </Stack>
  );
};

export default Loader;
