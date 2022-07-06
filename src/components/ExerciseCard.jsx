import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

// Exercise Card
const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise?.id}`}>
      {/* exercise gif */}
      <img src={exercise?.gifUrl} alt={exercise?.name} loading="lazy" />
      <Stack direction="row">
        {/* body part */}
        <Button
          sx={{
            ml: "21px",
            color: "#FFF",
            background: "#FFA9A9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise?.bodyPart}
        </Button>

        {/* target */}
        <Button
          sx={{
            ml: "21px",
            color: "#FFF",
            background: "#FCC757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise?.target}
        </Button>
      </Stack>

      {/* exercise name */}
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capitalize"
        fontSize="20px"
      >
        {exercise?.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
