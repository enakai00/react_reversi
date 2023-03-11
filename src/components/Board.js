import React from "react";
import { Box } from "@chakra-ui/react";

import board from "../assets/board.png";


export const Board = (props) => {
  const style = {
    position: "relative",
    width: "584px",
    height: "592px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${board})`,
    backgroundSize: "100%"
  };

  const element = (
      <Box style={style}>
      </Box>
  );

  return element;
}
