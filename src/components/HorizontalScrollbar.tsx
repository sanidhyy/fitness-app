import { useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Typography } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import type { Exercise } from "../types/exercise";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

type HorizontalScrollbarProps =
  | {
      data: string[];
      isBodyParts: true;
      bodyPart: string;
      setBodyPart: Dispatch<SetStateAction<string>>;
    }
  | {
      data: Exercise[];
      isBodyParts?: false;
      bodyPart?: never;
      setBodyPart?: never;
    };

const HorizontalScrollbar = (props: HorizontalScrollbarProps) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {props.data.map((item) => {
      const itemId = typeof item === "string" ? item : item.id;

      return (
        <Box key={itemId} itemID={itemId} title={itemId} sx={{
          m: "0 40px"
        }}>
          {props.isBodyParts ? (
            <BodyPart
              item={item as string}
              setBodyPart={props.setBodyPart}
              bodyPart={props.bodyPart}
            />
          ) : (
            <ExerciseCard exercise={item as Exercise} />
          )}
        </Box>
      );
    })}
  </ScrollMenu>
);

export default HorizontalScrollbar;
