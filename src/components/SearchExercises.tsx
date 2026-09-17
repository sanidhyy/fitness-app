import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import {
  EXERCISE_DB_URL,
  exerciseListUrl,
  exerciseOptions,
  fetchData,
} from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";
import type { Exercise } from "../types/exercise";

type SearchExercisesProps = {
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  bodyPart: string;
  setBodyPart: Dispatch<SetStateAction<string>>;
};

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
}: SearchExercisesProps) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData<string[]>(
        `${EXERCISE_DB_URL}/exercises/bodyPartList`,
        exerciseOptions
      );

      setBodyParts(["all", ...(Array.isArray(bodyPartsData) ? bodyPartsData : [])]);
    };

    void fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData<Exercise[]>(
        exerciseListUrl("/exercises"),
        exerciseOptions
      );

      const searchedExercises = Array.isArray(exercisesData)
        ? exercisesData.filter(
            (exercise) =>
              exercise.name.toLowerCase().includes(search) ||
              exercise.target.toLowerCase().includes(search) ||
              exercise.equipment.toLowerCase().includes(search) ||
              exercise.bodyPart.toLowerCase().includes(search)
          )
        : [];

      setSearch("");
      setExercises(searchedExercises);
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises for You
        <br /> Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
            height: "76px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") void handleSearch();
          }}
        />

        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={() => {
            void handleSearch();
          }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
