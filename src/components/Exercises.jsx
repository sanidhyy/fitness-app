import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

// Exercises
const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9; // no of exercises to be shown per page

  const indexOfLastExercise = currentPage * exercisesPerPage; // get last exercise
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage; // get first exercise

  const currentExercise = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  ); // current exercises list

  // pagination
  const paginate = (_, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  // fetch exercises
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
    // eslint-disable-next-line
  }, [bodyPart]);

  // No Results Found
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
      {/* Showing results */}
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      {/* current exercises */}
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercise.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>

      {/* exercises pagination */}
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
