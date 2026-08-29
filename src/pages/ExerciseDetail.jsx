import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {
  exerciseOptions,
  youtubeOptions,
  fetchData,
  EXERCISE_DB_URL,
  exerciseListUrl,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

// Exercises Detail
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      // fetch exercises detail data
      const exerciseDetailData = await fetchData(
        `${EXERCISE_DB_URL}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      // fetch exercises video data
      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData?.contents || []);

      // fetch target exercises data
      const targetMuscleExercisesData = await fetchData(
        exerciseListUrl(`/exercises/target/${exerciseDetailData?.target}`),
        exerciseOptions
      );
      setTargetMuscleExercises(
        Array.isArray(targetMuscleExercisesData)
          ? targetMuscleExercisesData
          : []
      );

      // fetch equipment exercises data
      const equipmentExercisesData = await fetchData(
        exerciseListUrl(
          `/exercises/equipment/${exerciseDetailData?.equipment}`
        ),
        exerciseOptions
      );
      setEquipmentExercises(
        Array.isArray(equipmentExercisesData) ? equipmentExercisesData : []
      );
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      {/* Exercise Details */}
      <Detail exerciseDetail={exerciseDetail} />
      {/* Exercise Videos */}
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      {/* Similar Exercises */}
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
