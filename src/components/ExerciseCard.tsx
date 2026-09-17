import { Link } from "react-router";
import { Button, Stack, Typography } from "@mui/material";

import { getExerciseGifUrl } from "../utils/fetchData";
import type { Exercise } from "../types/exercise";

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img
        src={getExerciseGifUrl(exercise.id)}
        alt={exercise.name}
        loading="lazy"
      />
      <Stack direction="row">
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
          {exercise.bodyPart}
        </Button>

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
          {exercise.target}
        </Button>
      </Stack>

      <Typography
        sx={{
          ml: "21px",
          color: "#000",
          fontWeight: "bold",
          mt: "11px",
          pb: "10px",
          textTransform: "capitalize",
          fontSize: "20px"
        }}>
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
