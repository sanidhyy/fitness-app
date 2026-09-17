import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box } from "@mui/material";

import {
  exerciseListUrl,
  exerciseUrl,
  fetchData,
  youtubeSearchUrl,
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

      const exerciseDetailData = await fetchData<Exercise>(
        exerciseUrl(`/exercises/exercise/${id}`)
      );

      if (!exerciseDetailData?.name) {
        setExerciseDetail(null);
        return;
      }

      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData<YoutubeSearchResponse>(
        youtubeSearchUrl(exerciseDetailData.name)
      );
      setExerciseVideos(exerciseVideosData.contents ?? []);

      const targetMuscleExercisesData = await fetchData<Exercise[]>(
        exerciseListUrl(`/exercises/target/${exerciseDetailData.target}`)
      );
      setTargetMuscleExercises(
        Array.isArray(targetMuscleExercisesData)
          ? targetMuscleExercisesData
          : []
      );

      const equipmentExercisesData = await fetchData<Exercise[]>(
        exerciseListUrl(`/exercises/equipment/${exerciseDetailData.equipment}`)
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
