import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import Loader from "./Loader";

// Exercises Videos
const ExerciseVideos = ({ exerciseVideos, name }) => {
  // Loader
  if (!exerciseVideos.length) return <Loader />;

  // No of exercises videos
  const noOfExercisesVideos = 6;

  return (
    <Box sx={{ marginTop: { lg: "200px", xs: "20px" } }} p="20px">
      {/* Title */}
      <Typography variant="h4" mb="33px">
        Watch{" "}
        <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        Exercise Videos
      </Typography>
      <Stack
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        sx={{
          flexDirection: { lg: "row" },
          gap: { lg: "10px", xs: "0" },
        }}
      >
        {/* Exercises videos */}
        {exerciseVideos?.slice(0, noOfExercisesVideos).map((item, i) => (
          <a
            key={i}
            className="exercise-video"
            href={`https://youtube.com/watch?v=${item?.video?.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            {/* thumbnail */}
            <img
              src={item?.video?.thumbnails[0].url}
              alt={item?.video?.title}
            />
            <Box>
              {/* video title */}
              <Typography variant="h5" color="#000">
                {item?.video?.title}
              </Typography>
              {/* video channel name */}
              <Typography variant="h6" color="#000">
                {item?.video?.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
