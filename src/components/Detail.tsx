import { Stack, Typography, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { getExerciseGifUrl } from "../utils/fetchData";
import type { Exercise } from "../types/exercise";

type DetailProps = {
  exerciseDetail: Exercise;
};

const Detail = ({ exerciseDetail }: DetailProps) => {
  const { bodyPart, id, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      sx={{
        gap: "60px",
        flexDirection: { lg: "row" },
        p: "20px",
        alignItems: "center"
      }}>
      <img
        src={getExerciseGifUrl(id)}
        alt={name}
        loading="lazy"
        className="detail-image"
      />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3" sx={{
          textTransform: "capitalize"
        }}>
          {name}
        </Typography>
        <Typography variant="h6">
          Exercises keep you strong.{" "}
          <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {name}
          </span>{" "}
          is one of the best exercises to target your{" "}
          <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {bodyPart}
          </span>
          . It will help you improve your mood and gain energy.
        </Typography>

        {extraDetail.map((item) => (
          <Stack
            key={item.name}
            direction="row"
            sx={{
              gap: "24px",
              alignItems: "center"
            }}>
            <Button
              sx={{
                background: "#FF2DB",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Typography variant="h5" sx={{
              textTransform: "capitalize"
            }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
