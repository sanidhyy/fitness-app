import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Typography } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

// Left Arrow
const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    // Left Arrow Icon
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

// Right Arrow
const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    // Right Arrow Icon
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

// Horizontal Scrollbar
const HorizontalScrollbar = ({ data, isBodyParts, setBodyPart, bodyPart }) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {/* render data */}
    {data.map((item) => (
      <Box
        key={item?.id || item}
        itemId={item?.id || item}
        title={item?.id || item}
        m="0 40px"
      >
        {isBodyParts ? (
          // Body Part
          <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ) : (
          // Exercise Card
          <ExerciseCard exercise={item} />
        )}
      </Box>
    ))}
  </ScrollMenu>
);

export default HorizontalScrollbar;
