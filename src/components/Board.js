import React, { useRef, useState } from "react";
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
        <img src={blank} alt="blank" style={style}
             onClick={props.onClick}/>
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

  // Unpack states.
  const turn = props.states.turn;
  const setTurn = props.states.setTurn;
  const freeze = props.states.freeze;
  const setScores = props.states.setScores;

  // Since `field` stores an array object, updating it
  // doesn't rerender the component. Instead, dummyState
  // is used to rerender the compoent.
  // eslint-disable-next-line
  const [dummyState, setDummyState] = useState([]);

  const onClick = (x, y) => {
    if (!freeze.current) {
      move(x, y);
    }
  }

  const move = async (x, y) => {
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    freeze.current = true;

    // 8 directions to search.
    const dx = [1,-1, 0, 0,-1, 1, 1,-1]
    const dy = [0, 0, 1,-1,-1,-1, 1, 1]
    const allowed = new Array(8)
    allowed.fill(false);

    const opponent = {black: "white", white: "black"};

    for (let i = 0; i < 8; i++) { // search for 8 directions.
      if (field[y][x] !== "blank") { // not a blank cell
        break;
      }

      let search_state = 0; // search starts.
      for (let j = 1; j < size; j++) {
        const xx = x + j*dx[i];
        const yy = y + j*dy[i];
        if (xx < 0 || xx >= size || yy < 0 || yy >= size) {
          break; // search failed.
        }
        if (field[yy][xx] === opponent[turn]) {
          search_state = 1; // search continues.
          continue;
        }
        if (search_state === 1 && field[yy][xx] === turn) {
          search_state = 2; // search succeeded.
          break;
        }
        break; // search failed.
      }
      if (search_state === 2) {
        allowed[i] = true;
      }
    }

    if (allowed.includes(true)) {
      // Animation starts.
      field[y][x] = turn;
      await setDummyState([]);
      for (let i = 0; i < 8; i++) {
        if (!allowed[i]) {
          continue;
        }
        for (let j = 1; j < size; j++) {
          const xx = x + j*dx[i];
          const yy = y + j*dy[i];
          if (field[yy][xx] === turn) {
            break;
          }
          field[yy][xx] = turn;
          await sleep(100);
          await setDummyState([]);
        }
      }
      // Animation ends.
      await setTurn(opponent[turn]);
    }
    freeze.current = false;
    updateScore();
  }

  const updateScore = () => {
    const newScore = {black: 0, white:0, blank:0};
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        newScore[field[y][x]] += 1;
      }
    }
    setScores({black: newScore.black, white: newScore.white});
  }


  const fieldElements = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      fieldElements.push(
        <Cell key={y.toString()+x.toString()}
              pos_x={x} pos_y={y} mark={field[y][x]}
              onClick={() => onClick(x, y)} />
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
