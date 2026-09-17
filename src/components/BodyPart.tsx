import type { Dispatch, SetStateAction } from "react";
import { Stack, Typography } from "@mui/material";

import Icon from "../assets/icons/gym.png";

type BodyPartProps = {
  item: string;
  setBodyPart: Dispatch<SetStateAction<string>>;
  bodyPart: string;
};

const BodyPart = ({ item, setBodyPart, bodyPart }: BodyPartProps) => {
  return (
    <Stack
      className="bodyPart-card"
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        borderTop: bodyPart === item ? "4px solid #FF2625" : "",
        backgroundColor: "#FFF",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px"
      }}>
      <img src={Icon} alt="dumbell" style={{ width: "40px", height: "40px" }} />

      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#3A1212",
          textTransform: "capitalize"
        }}>
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
