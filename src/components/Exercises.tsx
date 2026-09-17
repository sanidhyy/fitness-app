import { useEffect, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseListUrl, exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import type { Exercise } from "../types/exercise";

type ExercisesProps = {
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  bodyPart: string;
};

const Exercises = ({ exercises, setExercises, bodyPart }: ExercisesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercise = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exercisesData =
        bodyPart === "all"
          ? await fetchData<Exercise[]>(
              exerciseListUrl("/exercises"),
              exerciseOptions
            )
          : await fetchData<Exercise[]>(
              exerciseListUrl(`/exercises/bodyPart/${bodyPart}`),
              exerciseOptions
            );

      setExercises(Array.isArray(exercisesData) ? exercisesData : []);
    };

    void fetchExercisesData();
  }, [bodyPart, setExercises]);

  if (!currentExercise.length)
    return (
      <Stack id="exercises" alignItems="center" justifyContent="center">
        <Typography variant="h4" mb="60px" mt="60px">
          No Results Found!
        </Typography>
      </Stack>
    );

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercise.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
