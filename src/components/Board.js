import React, { useState, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import black from "../assets/black.png";
import white from "../assets/white.png";
import blank from "../assets/blank.png";

import "./Board.css";


const Cell = (props) => {
  let x = 25 + 67 * props.pos_x;
  let y = 28 + 67 * props.pos_y;
  const style = {
    position: "absolute",
    width: "65px", height: "65px",
    left: x, top: y,
  };

  var element;
  switch (props.mark) {
    case "black":
      element = (
        <img src={black} alt="black" style={style}/>
      );
    break;
    case "white":
      element = (
        <img src={white} alt="white" style={style}/>
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


class BoardInfo {
  constructor() {
    this.size = 8;
    this.field = new Array(this.size)

    for (let y = 0; y < this.size; y++) {
      this.field[y] = new Array(this.size);
      this.field[y].fill(" ");
    }
    this.field[3][3] = "white";
    this.field[3][4] = "black";
    this.field[4][3] = "black";
    this.field[4][4] = "white";
  }
}


export const Board = (props) => {
  // eslint-disable-next-line
  const [gameInfo, setGameInfo] = props.gameInfo;

  const opponent = {"black": "white", "white": "black"}
  const boardInfo = useRef(new BoardInfo(props));
  const info = boardInfo.current;
  // Since `field` stores an array object, updating it doesn't rerender the component.
  // Instead, dummyState is used to rerender the compoent.
  // eslint-disable-next-line
  const [dummyState, setDummyState] = useState([]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

  const onClick = (x, y) => {
    move(x, y);
  };

  const move = async (x, y) => {
    gameInfo.freeze.value = true;

    // 8 directions to search.
    const dx = [1,-1, 0, 0,-1, 1, 1,-1]
    const dy = [0, 0, 1,-1,-1,-1, 1, 1]

    let allowed = false;
    for (let i = 0; i < 8; i++) { // search for 8 directions.
      if (info.field[y][x] !== " ") { // not a blank cell
        break;
      }
      let search_state = 0;
      var j;
      for (j = 1; j < 8; j++) {
        const xx = x + j*dx[i];
        const yy = y + j*dy[i];
        if (xx < 0 || xx >= info.size || yy < 0 || yy >= info.size) {
          break; // search failed.
        }
        if (info.field[yy][xx] === opponent[gameInfo.turn]) {
          search_state = 1; // search continues.
          continue;
        }
        if (search_state === 1 && info.field[yy][xx] === gameInfo.turn) {
          search_state = 2; // search succeeded.
          break;
        }
        break; // search failed.
      }

      if (search_state === 2) {
        // Animation starts.
        info.field[y][x] = gameInfo.turn;
        if (!allowed) {
          await sleep(100);
          await setDummyState([]);
        }
        for (let jj = 1; jj < j; jj++) {
          info.field[y + jj*dy[i]][x + jj*dx[i]] = gameInfo.turn;
          await sleep(100);
          await setDummyState([]);
        }
        info.field[y][x] = " ";
        allowed = true;
        // Animation ends.
      }
    }
    if (allowed) {
      info.field[y][x] = gameInfo.turn;
      setGameInfo.turn(opponent[gameInfo.turn]);
      await setDummyState([]);
    }
    gameInfo.freeze.value = false;
  }

  const field_elements = [];
  let black_score = 0;
  let white_score = 0;
  for (let y = 0; y < info.size; y++) {
    for (let x = 0; x < info.size; x++) {
      if (info.field[y][x] === "black"){
        black_score += 1;
      }
      if (info.field[y][x] === "white"){
        white_score += 1;
      }
      // Add the cell value to the unique key so that modified cell will be rerendered.
      field_elements.push(
        <Cell key={y.toString()+x.toString()+info.field[y][x]}
              pos_x={x} pos_y={y} mark={info.field[y][x]}
              onClick={() => onClick(x, y)} />
      );
    }
  }

  // As the parent's state cannot be modified while rerendering the child's component,
  // use `useEffect` to update scores after the rerendering.
  useEffect(
    () => {
      setGameInfo.score.black(black_score);
      setGameInfo.score.white(white_score);
    },
    [black_score, white_score, setGameInfo.score]
  );

  const element = (
      <Box className="bg-image">
        {field_elements}
      </Box>
  );

  return element;
}
