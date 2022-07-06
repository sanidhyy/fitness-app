import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

// Similar Exercises
const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      {/* Similar Target Muscle */}
      <Typography variant="h3" m={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetMuscleExercises?.length ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          // Loader
          <Loader />
        )}
      </Stack>

      {/* Similar Equipment */}
      <Typography variant="h3" m={5}>
        Exercises that target the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetMuscleExercises?.length ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          // Loader
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
