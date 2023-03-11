import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";

import board from "../assets/board.png";
import black from "../assets/black.png";
import white from "../assets/white.png";
import blank from "../assets/blank.png";


const Cell = (props) => {
  const x = 25 + 67 * props.pos_x;
  const y = 28 + 67 * props.pos_y;

  const style = {
    position: "absolute",
    width: "65px",
    height: "65px",
    left: x,
    top: y,
  };

  var element;
  switch (props.mark) {
    case "black":
      element = (
        <img src={black} alt="black" style={style} />
      );
    break;
    case "white":
      element = (
        <img src={white} alt="white" style={style} />
      );
    break;
    default:
      element = (
        <img src={blank} alt="blank" style={style} />
      );
  }
  return element;
}


const getField = (size) => {
  const field = new Array(size);
  for (let y = 0; y < size; y++) {
    field[y] = new Array(size);
    field[y].fill("blank");
  }
  field[3][3] = "white";
  field[3][4] = "black";
  field[4][3] = "black";
  field[4][4] = "white";
  return field;
}


export const Board = (props) => {
  const size = 8;
  const fieldRef = useRef(getField(size));
  const field = fieldRef.current;

  const fieldElements = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      fieldElements.push(
        <Cell key={y.toString()+x.toString()}
              pos_x={x} pos_y={y} mark={field[y][x]} />
      );
    }
  }

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
        {fieldElements}
      </Box>
  );

  return element;
}
