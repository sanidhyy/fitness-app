import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {
  EXERCISE_DB_URL,
  exerciseListUrl,
  exerciseOptions,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import Loader from "../components/Loader";
import type { Exercise, YoutubeSearchResponse, YoutubeVideo } from "../types/exercise";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState<YoutubeVideo[]>([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState<Exercise[]>(
    []
  );
  const [equipmentExercises, setEquipmentExercises] = useState<Exercise[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchExercisesData = async () => {
      if (!id) return;

      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData<Exercise>(
        `${EXERCISE_DB_URL}/exercises/exercise/${id}`,
        exerciseOptions
      );

      if (!exerciseDetailData?.name) {
        setExerciseDetail(null);
        return;
      }

      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData<YoutubeSearchResponse>(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents ?? []);

      const targetMuscleExercisesData = await fetchData<Exercise[]>(
        exerciseListUrl(`/exercises/target/${exerciseDetailData.target}`),
        exerciseOptions
      );
      setTargetMuscleExercises(
        Array.isArray(targetMuscleExercisesData)
          ? targetMuscleExercisesData
          : []
      );

      const equipmentExercisesData = await fetchData<Exercise[]>(
        exerciseListUrl(`/exercises/equipment/${exerciseDetailData.equipment}`),
        exerciseOptions
      );
      setEquipmentExercises(
        Array.isArray(equipmentExercisesData) ? equipmentExercisesData : []
      );
    };

    void fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <Loader />;

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
