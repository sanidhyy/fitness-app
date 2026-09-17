import { useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  ScrollMenu,
  VisibilityContext,
  type publicApiType,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Typography } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import type { Exercise } from "../types/exercise";

const LeftArrow = () => {
  const api = useContext<publicApiType>(VisibilityContext);
  const disabled = api.useLeftArrowVisible();

  return (
    <Typography
      onClick={() => api.scrollPrev()}
      className="right-arrow"
      sx={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.3 : 1 }}
    >
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const api = useContext<publicApiType>(VisibilityContext);
  const disabled = api.useRightArrowVisible();

  return (
    <Typography
      onClick={() => api.scrollNext()}
      className="left-arrow"
      sx={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.3 : 1 }}
    >
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
        <div key={itemId} {...{ itemId }} style={{ margin: "0 40px" }}>
          {props.isBodyParts ? (
            <BodyPart
              item={item as string}
              setBodyPart={props.setBodyPart}
              bodyPart={props.bodyPart}
            />
          ) : (
            <ExerciseCard exercise={item as Exercise} />
          )}
        </div>
      );
    })}
  </ScrollMenu>
);

export default HorizontalScrollbar;
