import React from "react";
import { Stack, Typography, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

// Detail
const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  // extra detail
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
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      {/* exercise gif */}
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        {/* exercise name */}
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        {/* exercise description */}
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

        {/* extra detail */}
        {extraDetail.map((item, i) => (
          <Stack key={i} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#FF2DB",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              {/* detail icon */}
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            {/* detail */}
            <Typography variant="h5" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
